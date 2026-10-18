"""Exercise actual monitor.html against live localhost PTY (no paid AI CLI needed).

Requires 'playwright' with Chromium installed. Provides a harmless fake OpenCode
executable that responds to native PTY keystrokes, including SIGINT.
"""
import base64
import json
import os
import signal
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "out" / "terminal-smoke"
OUTPUT.mkdir(parents=True, exist_ok=True)


def run():
    with tempfile.TemporaryDirectory() as temp:
        cli = Path(temp) / "opencode"
        cli.write_text("""#!/usr/bin/env python3
import signal
import sys
signal.signal(signal.SIGINT, lambda *_: print("SIGINT_RECEIVED", flush=True))
if len(sys.argv)>1 and sys.argv[1] in ("models", "--version", "version"):
    print("fake/model")
    sys.exit(0)
print("NATIVE_PTY_READY", flush=True)
while True:
    try:
        line=sys.stdin.readline()
    except InterruptedError:
        continue
    if not line:
        break
    print("PTY_ECHO:"+line.rstrip("\\r\\n"), flush=True)
""", encoding="utf8")
        cli.chmod(0o755)
        env = {**os.environ, "PATH": str(temp) + os.pathsep + os.environ["PATH"]}
        cmd = [sys.executable, "-I", str(ROOT / "scripts" / "pipeline.py"), "serve", "--port", "4180"]
        server_log = OUTPUT / "monitor-server.log"
        server_stream = server_log.open("w", encoding="utf8")
        process = subprocess.Popen(cmd, cwd=ROOT, env=env, stdout=server_stream,
                                   stderr=subprocess.STDOUT, start_new_session=True)
        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
                page = browser.new_page(viewport={"width": 1440, "height": 900})
                exceptions = []
                failed_requests = []
                page.on("pageerror", lambda exc: exceptions.append(str(exc)))
                page.on("requestfailed", lambda req: failed_requests.append((req.url, req.failure)))
                for i in range(80):
                    try:
                        response = page.request.get("http://127.0.0.1:4180/api/terminal/capabilities", timeout=1500)
                        if response.ok:
                            break
                    except Exception:
                        pass
                    time.sleep(.1)
                else:
                    raise AssertionError("monitor server/API never started")
                caps = response.json()
                assert caps["api_version"] >= 2, caps
                assert caps["providers"]["opencode"], caps
                page.goto("http://127.0.0.1:4180/", wait_until="domcontentloaded", timeout=30000)
                page.wait_for_selector("#p-orch .orchestration-card", timeout=25000)
                assert page.locator("#command-dock").is_hidden(), "Terminal not hidden by default"
                assert page.locator("#terminal-toggle").count() == 1
                page.wait_for_function("document.querySelector('#p-orch .orchestration-title')?.textContent?.trim().length > 0", timeout=10000)
                headings_before = page.locator("#p-orch .orchestration-title").text_content().strip()
                print("Original Agent Orchestration title:", repr(headings_before), flush=True)
                page.screenshot(path=str(OUTPUT / "full-monitor-closed.png"), full_page=True)

                page.locator("#terminal-toggle").click()
                page.wait_for_selector("#command-dock", state="visible")
                page.wait_for_function("!!document.querySelector('#term-render .xterm')", timeout=20000)
                page.screenshot(path=str(OUTPUT / "full-monitor-terminal-before-start.png"), full_page=True)
                try:
                    page.wait_for_function("!document.querySelector('#term-start').disabled", timeout=10000)
                except Exception:
                    print("TERMINAL_DIAGNOSTICS", page.evaluate("""() => ({
                      badge:document.querySelector('#term-badge')?.textContent,
                      hint:document.querySelector('#term-feedback')?.textContent,
                      notice:document.querySelector('#term-notice-text')?.textContent,
                      model:document.querySelector('#term-model')?.value,
                      provider:document.querySelector('#term-provider')?.value,
                      xterm:!!window.Terminal,
                      startDisabled:document.querySelector('#term-start')?.disabled
                    })"""), flush=True)
                    print("FAILED_REQUESTS", failed_requests[-15:], flush=True)
                    print("PAGE_ERRORS", exceptions[-15:], flush=True)
                    print("BACKEND_TRACEBACK", server_log.read_text(encoding="utf8")[-6000:], flush=True)
                    print("CREATE_OPTIONS", page.request.get("http://127.0.0.1:4180/api/create-options").text()[:2200], flush=True)
                    raise
                assert page.locator("#term-provider").input_value() == "opencode"
                page.locator("#term-start").click()
                page.wait_for_function("document.querySelector('#term-badge').textContent.includes('Live')", timeout=12000)
                page.wait_for_function("document.querySelector('#term-notice').hidden", timeout=12000)
                page.locator(".xterm-helper-textarea").focus()
                video = page.evaluate("decodeURIComponent(location.hash.slice(1))")
                assert video, "video selection missing"
                sessions_url = "http://127.0.0.1:4180/api/terminal/" + video + "/sessions"
                sessions = page.request.get(sessions_url).json()["sessions"]
                assert len(sessions) == 1 and sessions[0]["state"] == "running", sessions
                session = sessions[0]["id"]
                output_url = ("http://127.0.0.1:4180/api/terminal/"
                              + video + "/" + session + "/output?offset=0")

                def expect_output(marker, timeout=12):
                    deadline = time.monotonic() + timeout
                    while time.monotonic() < deadline:
                        response = page.request.get(output_url)
                        assert response.ok, (response.status, response.text())
                        output = base64.b64decode(response.json()["output"]).decode("utf-8", "replace")
                        if marker in output:
                            return output
                        time.sleep(.1)
                    raise AssertionError("PTY never returned " + marker)

                expect_output("NATIVE_PTY_READY")
                page.keyboard.type("smoke-hello")
                page.keyboard.press("Enter")
                expect_output("PTY_ECHO:smoke-hello")
                page.screenshot(path=str(OUTPUT / "full-monitor-terminal-running.png"), full_page=True)
                page.locator("#term-reconnect").click()
                page.wait_for_function("document.querySelector('#term-badge').textContent.includes('Live')", timeout=12000)
                expect_output("PTY_ECHO:smoke-hello")
                page.locator("#term-interrupt").click()
                expect_output("SIGINT_RECEIVED")
                page.once("dialog", lambda d: d.accept())
                page.locator("#term-stop").click()
                page.wait_for_function("document.querySelector('#term-badge').textContent.includes('Exited')", timeout=12000)
                page.locator("#terminal-toggle").click()
                assert page.locator("#command-dock").is_hidden()
                assert headings_before == page.locator("#p-orch .orchestration-title").text_content().strip()
                assert not exceptions, exceptions
                browser.close()
        finally:
            server_stream.close()
            if process.poll() is None:
                os.killpg(process.pid, signal.SIGTERM)
                try:
                    process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    os.killpg(process.pid, signal.SIGKILL)


if __name__ == "__main__":
    run()
