import asyncio
from urllib.parse import urlparse
import httpx
import yt_dlp
from .base import SourceFailure, SourceResult
from .imports import parse_import
from ..contracts import VideoContext

def select_track(info: dict, language: str):
    for field, source in [("subtitles", "manual"), ("automatic_captions", "automatic")]:
        languages = info.get(field) or {}
        # The model translates summaries. Fetch original automatic speech first
        # instead of requesting an unnecessary server-translated caption track.
        ordered = sorted(languages, key=lambda code: (source == 'automatic' and not code.endswith('-orig'), code != language, code != "en"))
        for code in ordered:
            for track in languages[code]:
                if track.get("ext") == "vtt" and track.get("url"):
                    return code.removesuffix('-orig'), source, track["url"]
    return None

def validate_caption_url(url: str):
    parsed = urlparse(url)
    hostname = parsed.hostname or ""
    allowed = any(hostname == domain or hostname.endswith("." + domain) for domain in
                  ("youtube.com", "youtube-nocookie.com", "googlevideo.com"))
    if parsed.scheme != "https" or not allowed or parsed.username or parsed.password or parsed.port not in (None, 443):
        raise SourceFailure("invalid_caption_url")
    return url

class QuietLogger:
    def debug(self, message): pass
    def warning(self, message): pass
    def error(self, message): pass

class YouTubeSource:
    def __init__(self, language: str = "en"):
        self.language = language

    async def load(self, video: VideoContext) -> SourceResult:
        def extract():
            with yt_dlp.YoutubeDL({"quiet": True, "no_warnings": True, "logger": QuietLogger(),
                "skip_download": True, "noplaylist": True, "socket_timeout": 15,
                "retries": 0, "extractor_retries": 0}) as downloader:
                return downloader.extract_info(video.canonicalUrl, download=False)
        try:
            info = await asyncio.to_thread(extract)
            track = select_track(info, self.language)
            if not track:
                return SourceResult("absent", diagnostic="transcript_unavailable")
            language, source, url = track
            validate_caption_url(url)
            async with httpx.AsyncClient(timeout=30, follow_redirects=False, trust_env=False) as client:
                response = await client.get(url)
                response.raise_for_status()
            transcript = parse_import(response.content, "vtt").model_copy(update={"language": language, "source": source})
            return SourceResult("complete", transcript)
        except httpx.HTTPStatusError as error:
            return SourceResult('failed',diagnostic='caption_rate_limited' if error.response.status_code==429 else 'caption_unavailable')
        except Exception:
            return SourceResult("failed", diagnostic="source_unavailable")
