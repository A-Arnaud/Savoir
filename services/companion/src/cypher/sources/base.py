from dataclasses import dataclass
from typing import Literal, Protocol
from ..contracts import VideoContext, Transcript

class SourceFailure(Exception):
    def __init__(self, code):
        self.code = code
        super().__init__(code)

@dataclass
class SourceResult:
    state: Literal["complete", "absent", "failed"]
    transcript: Transcript | None = None
    diagnostic: str | None = None

class VideoSource(Protocol):
    async def load(self, video: VideoContext) -> SourceResult: ...
