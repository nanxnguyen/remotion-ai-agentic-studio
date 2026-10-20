"""Interactive local PTY sessions for provider CLIs (macOS/Linux).

The session is genuinely interactive: input is written to a TTY, output is read from
that TTY, and browser reconnect can replay an in-memory scrollback buffer.
This module does not bypass pipeline gates or reinterpret native slash commands.
"""
import base64
import errno
import fcntl
import os
import pty
import select
import signal
import struct
import subprocess
import termios
import threading
import time
import uuid
from collections import deque

SESSIONS = {}
LOCK = threading.RLock()
LIMIT = 2_000_000
POLL_BYTES = 131_072  # bounded streaming response
ALLOWED = {"claude", "codex", "opencode"}


class Session:
    def __init__(self, video, provider, argv, cwd, cols=100, rows=28, model="", effort=""):
        if os.name == "nt":
            raise RuntimeError("PTY requires macOS/Linux. Windows needs a ConPTY adapter.")
        self.id = uuid.uuid4().hex
        self.video, self.provider = video, provider
        self.model, self.effort = model, effort
        self.output = bytearray()
        self.output_start = 0
        self.lock = threading.RLock()
        self.state = "running"
        self.created = time.time()
        master, slave = pty.openpty()
        self.fd = master
        self._resize(cols, rows)
        try:
            self.process = subprocess.Popen(argv, stdin=slave, stdout=slave, stderr=slave,
                                            cwd=cwd, start_new_session=True,
                                            env={**os.environ, "TERM": "xterm-256color", "COLORTERM": "truecolor",
                                                 "PYTHONUTF8": "1"})
        except Exception:
            os.close(master)
            raise
        finally:
            os.close(slave)
        threading.Thread(target=self._read, daemon=True).start()

    def _resize(self, cols, rows):
        cols = max(20, min(300, int(cols)))
        rows = max(8, min(120, int(rows)))
        fcntl.ioctl(self.fd, termios.TIOCSWINSZ, struct.pack("HHHH", rows, cols, 0, 0))

    def resize(self, cols, rows):
        with self.lock:
            if self.state == "running":
                self._resize(cols, rows)
                os.killpg(self.process.pid, signal.SIGWINCH)

    def _read(self):
        try:
            while True:
                ready, _, _ = select.select([self.fd], [], [], .25)
                if not ready:
                    if self.process.poll() is not None:
                        break
                    continue
                try:
                    chunk = os.read(self.fd, 65536)
                except OSError as exc:
                    if exc.errno == errno.EIO:
                        break
                    raise
                if not chunk:
                    break
                with self.lock:
                    self.output.extend(chunk)
                    if len(self.output) > LIMIT:
                        removed = len(self.output) - LIMIT
                        del self.output[:removed]
                        self.output_start += removed
        finally:
            self.process.wait()
            with self.lock:
                self.state = "exited"
                self.exit_code = self.process.returncode
            os.close(self.fd)

    def input(self, data):
        if len(data.encode("utf-8")) > 8192:
            raise ValueError("input too long")
        with self.lock:
            if self.state != "running":
                raise ValueError("session is not running")
            os.write(self.fd, data.encode("utf-8"))

    def interrupt(self):
        with self.lock:
            if self.state == "running":
                os.killpg(self.process.pid, signal.SIGINT)

    def stop(self):
        with self.lock:
            if self.state == "running":
                os.killpg(self.process.pid, signal.SIGTERM)

    def poll(self, offset):
        with self.lock:
            requested = max(0, int(offset))
            truncated = requested < self.output_start
            start = max(0, min(len(self.output), requested - self.output_start))
            end = min(len(self.output), start + POLL_BYTES)
            return {"id": self.id, "video": self.video, "provider": self.provider,
                    "state": self.state, "model": self.model, "effort": self.effort,
                    "offset": self.output_start + end, "truncated": truncated,
                    "hasMore": end < len(self.output),
                    "output": base64.b64encode(self.output[start:end]).decode("ascii"),
                    "exitCode": getattr(self, "exit_code", None)}

def start(video, provider, cmd, cwd, cols=100, rows=28, model="", effort=""):
    if provider not in ALLOWED:
        raise ValueError("unsupported terminal provider")
    with LOCK:
        for old in SESSIONS.values():
            if old.video == video and old.state == "running":
                raise ValueError("a terminal is already active for this video")
        session = Session(video, provider, cmd, cwd, cols, rows, model, effort)
        SESSIONS[session.id] = session
        return session


def get(session_id, video):
    with LOCK:
        session = SESSIONS.get(session_id)
        if session is None or session.video != video:
            raise KeyError("session not found for video")
        return session


def sessions(video):
    with LOCK:
        return [{"id": s.id, "provider": s.provider, "state": s.state,
                 "model": s.model, "effort": s.effort, "created": s.created} for s in SESSIONS.values() if s.video == video]
