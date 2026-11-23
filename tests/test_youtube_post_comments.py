import sys
import unittest
from pathlib import Path
from unittest.mock import MagicMock

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

import youtube_post_comments as ypc


class TestYoutubePostComments(unittest.TestCase):
    def _mock_yt(self, existing_author_id: str | None):
        yt = MagicMock()
        yt.channels().list().execute.return_value = {
            "items": [{"contentDetails": {"relatedPlaylists": {"uploads": "UU123"}}}]
        }
        yt.playlistItems().list().execute.return_value = {
            "items": [{"contentDetails": {"videoId": "vid1"}}, {"contentDetails": {"videoId": "vid2"}}]
        }
        yt.videos().list().execute.return_value = {
            "items": [
                {"id": "vid1", "snippet": {"title": "Video 1"}, "status": {"privacyStatus": "public"}},
                {"id": "vid2", "snippet": {"title": "Video 2"}, "status": {"privacyStatus": "private"}},
            ]
        }
        threads = []
        if existing_author_id:
            threads.append({
                "snippet": {
                    "topLevelComment": {
                        "snippet": {"authorChannelId": {"value": existing_author_id}}
                    }
                }
            })
        yt.commentThreads().list().execute.return_value = {"items": threads}
        yt.commentThreads().insert().execute.return_value = {"id": "cmt123"}
        return yt

    def test_skips_if_owner_already_commented(self):
        yt = self._mock_yt(existing_author_id="UC_OWNER")
        res = ypc.run_comments(yt, "UC_OWNER", {"vid1": "Hello"}, execute=True)
        self.assertEqual(res, [{"video_id": "vid1", "title": "Video 1", "status": "already_has_owner_comment"}])

    def test_dry_run_and_execute_posts_only_public_missing(self):
        yt = self._mock_yt(existing_author_id="UC_OTHER")
        dry = ypc.run_comments(yt, "UC_OWNER", {"vid1": "Hello", "vid2": "Ignored"}, execute=False)
        self.assertEqual(dry[0]["status"], "dry_run_would_post")
        self.assertEqual(len(dry), 1)

        exe = ypc.run_comments(yt, "UC_OWNER", {"vid1": "Hello", "vid2": "Ignored"}, execute=True)
        self.assertEqual(exe, [{"video_id": "vid1", "title": "Video 1", "status": "posted", "comment_id": "cmt123"}])


if __name__ == "__main__":
    unittest.main()
