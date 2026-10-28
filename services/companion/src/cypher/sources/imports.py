import json
import re
from ..contracts import Transcript, TranscriptSegment
from .webvtt import normalize_webvtt

class ImportFailure(ValueError):
    pass

def _seconds(value: str) -> float:
    parts = value.replace(",", ".").split(":")
    if len(parts) not in (2, 3) or not re.fullmatch(r"(?:\d+:)?\d{2}:\d{2}\.\d{3}", value.replace(",", ".")):
        raise ImportFailure("invalid_timestamp")
    minutes, seconds = map(float, parts[-2:])
    if minutes >= 60 or seconds >= 60:
        raise ImportFailure("invalid_timestamp")
    return (float(parts[0]) * 3600 if len(parts) == 3 else 0) + minutes * 60 + seconds

def parse_import(contents: bytes, format: str) -> Transcript:
    try:
        text = contents.decode("utf-8-sig").replace("\r\n", "\n").strip()
        if not text:
            raise ImportFailure("empty_transcript")
        if format == "json":
            transcript = Transcript.model_validate(json.loads(text))
            if not transcript.segments or not any(s.text.strip() for s in transcript.segments):
                raise ImportFailure("empty_transcript")
            return transcript
        if format == "txt":
            return Transcript(language="und", source="import", complete=True,
                segments=[TranscriptSegment(id="s1", startSeconds=0, durationSeconds=0, text=text)],
                diagnostics=["timing_unavailable"])
        if format not in {"srt", "vtt"}:
            raise ImportFailure("unsupported_import")
        segments = []
        # A WebVTT payload may contain a line consisting of a space (YouTube
        # uses it for roll-up captions). Only an actually empty line ends it.
        separator = r'\n{2,}' if format == 'vtt' else r'\n\s*\n'
        for block in re.split(separator, text):
            lines = block.splitlines()
            if lines[0].startswith(("WEBVTT", "NOTE", "STYLE", "REGION")):
                continue
            index = next((i for i, line in enumerate(lines) if "-->" in line), None)
            if index is None:
                raise ImportFailure("invalid_cue")
            start, end = lines[index].split("-->", 1)
            start_time = _seconds(start.strip())
            end_time = _seconds(end.strip().split()[0])
            cue_text = "\n".join(lines[index + 1:]).strip()
            if end_time < start_time:
                raise ImportFailure("invalid_cue")
            # WebVTT can clear the displayed subtitle with an empty cue.
            # Such a cue carries timing, but no speech to summarise.
            if not cue_text:
                if format == 'vtt':
                    continue
                raise ImportFailure('invalid_cue')
            segments.append(TranscriptSegment(id=f"s{len(segments) + 1}", startSeconds=start_time,
                durationSeconds=end_time - start_time, text=cue_text))
        if not segments:
            raise ImportFailure("empty_transcript")
        transcript = Transcript(language="und", source="import", complete=True, segments=segments)
        return normalize_webvtt(transcript) if format == 'vtt' else transcript
    except (ValueError, UnicodeError, IndexError) as error:
        raise ImportFailure("invalid_import") from error
