from typing import Annotated, Literal
from urllib.parse import urlparse, parse_qs
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from .languages import LanguageCode

Seconds = Annotated[float, Field(ge=0, allow_inf_nan=False)]
YouTubeLink=Annotated[str,Field(pattern=r'^https://(?:www\.)?youtube\.com/')]


class WireModel(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True, allow_inf_nan=False, json_schema_serialization_defaults_required=True)


class FlexibleSettings(WireModel):
    focus: Literal["insightful", "funny", "actionable", "controversial"] = "insightful"
    format: Literal["list", "qa"] = "list"
    amount: Literal["short", "auto", "detailed"] = "auto"
    emoji: bool = True
    highlight: bool = True
    grouping: bool = True


class TimestampedSettings(WireModel):
    emoji: bool = True
    timestamps: bool = True
    details: bool = True


class TranscriptSettings(WireModel):
    timestamps: bool = True


class CommentsSettings(WireModel):
    tldr: bool = True


class SettingsV1(WireModel):
    schemaVersion: Literal[1] = 1
    interfaceLanguage: Literal["fr", "en"] = "fr"
    outputLanguage: LanguageCode = "EN"
    autoSummary: bool = False
    flexible: FlexibleSettings = Field(default_factory=FlexibleSettings)
    timestamped: TimestampedSettings = Field(default_factory=TimestampedSettings)
    transcript: TranscriptSettings = Field(default_factory=TranscriptSettings)
    comments: CommentsSettings = Field(default_factory=CommentsSettings)

class ExportRun(WireModel):
    text:str
    bold:bool=False
    italic:bool=False
    code:bool=False

class ExportBlock(WireModel):
    kind:Literal['heading','paragraph','bullet']
    direction:Literal['ltr','rtl','auto']='auto'
    runs:list[ExportRun]

class ExportDocument(WireModel):
    title:str
    language:str
    scope:Literal['summary','comments']
    blocks:list[ExportBlock]
    sourceUrl:Annotated[str,Field(pattern=r'^https://www\.youtube\.com/watch\?v=[A-Za-z0-9_-]{11}$')]|None=None


def normalize_settings(value: object) -> SettingsV1:
    if not isinstance(value, dict) or value.get("schemaVersion", 0) not in (0, 1):
        return SettingsV1()
    data = {**value, "schemaVersion": 1}
    try:
        return SettingsV1.model_validate(data)
    except ValueError:
        return SettingsV1()


class VideoContext(WireModel):
    videoId: Annotated[str, Field(pattern=r"^[A-Za-z0-9_-]{11}$")]
    canonicalUrl: Annotated[str, Field(pattern=r"^https://www\.youtube\.com/watch\?v=[A-Za-z0-9_-]{11}$")]
    title: str | None = None
    durationSeconds: Seconds | None = None
    navigationRevision: Annotated[int, Field(ge=0)]

    @model_validator(mode="after")
    def same_video(self):
        if parse_qs(urlparse(self.canonicalUrl).query).get("v") != [self.videoId]:
            raise ValueError("Video URL does not match ID")
        return self


class TranscriptSegment(WireModel):
    id: str
    startSeconds: Seconds
    durationSeconds: Seconds
    text: str


class Transcript(WireModel):
    language: str
    source: Literal["import", "manual", "automatic", "audio"]
    complete: bool
    segments: list[TranscriptSegment]
    diagnostics: list[str] = Field(default_factory=list)

    @field_validator("segments")
    @classmethod
    def unique_ids(cls, segments):
        if len({s.id for s in segments}) != len(segments):
            raise ValueError("Duplicate segment IDs")
        return segments


class JobRequest(WireModel):
    video: VideoContext
    kind: Literal["insights", "timestamped", "comments", "transcript"]
    settings: SettingsV1
    providerId: Literal["ollama"]
    modelId: Annotated[str, Field(min_length=1, max_length=200)]
    importedSource: Transcript | None = None
    allowAudioFallback: bool = False


class InsightItem(WireModel):
    id: str
    text: str
    sourceSegmentIds: list[str]


class InsightGroup(WireModel):
    id: str
    title: str | None = None
    items: list[InsightItem]


class Provenance(WireModel):
    providerId: str
    modelId: str
    promptVersion: str
    modelDigest: str | None = None
    sourceHash: str | None = None


def _optional_sources(schema):
    schema['required']=[name for name in schema.get('required',[]) if name!='sources']
    schema['properties']['sources'].pop('default',None)

class InsightsResult(WireModel):
    model_config=ConfigDict(json_schema_extra=_optional_sources)
    kind: Literal["insights"] = "insights"
    groups: list[InsightGroup]
    language: str
    provenance: Provenance
    sources: list[TranscriptSegment] | None = None


class TranscriptResult(WireModel):
    kind: Literal["transcript"] = "transcript"
    transcript: Transcript

class TimestampedSection(WireModel):
    id: str
    startSeconds: Seconds
    title: str
    summary: str
    details: list[str]
    sourceSegmentIds: list[str]

class TimestampedResult(WireModel):
    kind: Literal['timestamped'] = 'timestamped'
    overview: str
    sections: list[TimestampedSection]
    language: str
    provenance: Provenance

class Comment(WireModel):
    id: Annotated[str,Field(min_length=1,max_length=256)]
    author: str | None = None
    text: str
    authorUrl: YouTubeLink | None = None
    likes: Annotated[int,Field(ge=0)] | None = None
    startSeconds: Seconds | None = None
    sourceUrl: YouTubeLink | None = None

    @field_validator('authorUrl','sourceUrl')
    @classmethod
    def safe_links(cls,value):
        if value is not None:
            parsed=urlparse(value)
            if parsed.scheme!='https' or parsed.hostname not in ('www.youtube.com','youtube.com') or parsed.username or parsed.password or parsed.port not in (None,443):
                raise ValueError('Invalid comment link')
        return value

class CommentBatch(WireModel):
    items: list[Comment]
    cursor: str | None = None
    complete: bool
    diagnostics: list[str] = Field(default_factory=list)
    announcedCount: Annotated[int,Field(ge=0)] | None = None

class CommentCollection(WireModel):
    fetchedCount: Annotated[int,Field(ge=0)]
    complete: bool
    diagnostics: list[str]
    announcedCount: Annotated[int,Field(ge=0)] | None = None

class CommentsResult(WireModel):
    kind: Literal['comments'] = 'comments'
    tldr: str | None = None
    comments: list[Comment]
    collection: CommentCollection
    language: str
    provenance: Provenance | None = None

    @model_validator(mode='after')
    def actual_count(self):
        if self.collection.fetchedCount!=len(self.comments) or len({comment.id for comment in self.comments})!=len(self.comments):
            raise ValueError('Comment count must match unique acquired items')
        return self


class JobError(WireModel):
    code: str
    message: str


def _legacy_job_metadata(schema):
    # Old persisted snapshots and older clients omit these additive fields.
    schema['required']=[name for name in schema.get('required',[]) if name not in {'requestSettings','modelId'}]
    for name in ('requestSettings','modelId'):schema['properties'][name].pop('default',None)

class JobSnapshot(WireModel):
    model_config=ConfigDict(json_schema_extra=_legacy_job_metadata)
    id: str
    video: VideoContext
    state: Literal["queued", "running", "completed", "failed", "cancelled", "interrupted"]
    stage: str
    completed: Annotated[int, Field(ge=0)] = 0
    total: Annotated[int, Field(ge=0)] | None = None
    revision: Annotated[int, Field(ge=0)] = 0
    result: InsightsResult | TimestampedResult | CommentsResult | TranscriptResult | None = None
    error: JobError | None = None
    requestSettings: SettingsV1 | None = None
    modelId: str | None = None
