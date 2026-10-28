"""Turn caption presentation events into timed speech, once at ingestion."""
import html
import re
from ..contracts import Transcript

_TIMESTAMP = re.compile(r'<(?:\d{2,}:)?\d{2}:\d{2}\.\d{3}>')
_TAG = re.compile(r'</?(?:c(?:\.[\w-]+)*|v|lang|b|i|u|ruby|rt)(?:\s[^<>]*)?>')
_VERSION = 'webvtt_normalized_v1'


def normalize_webvtt(transcript: Transcript) -> Transcript:
    if _VERSION in transcript.diagnostics:
        return transcript
    rolling = any(_TIMESTAMP.search(segment.text) for segment in transcript.segments)
    segments = []
    previous_lines = []
    previous_end = -1
    for segment in transcript.segments:
        # Decode entities after removing actual VTT syntax: escaped literal
        # angle brackets remain text. Unknown tags stay inert text as before.
        lines, timed = [], []
        for raw_line in segment.text.splitlines():
            text = html.unescape(_TAG.sub('', _TIMESTAMP.sub('', raw_line))).strip()
            if text:
                lines.append(text)
                timed.append(bool(_TIMESTAMP.search(raw_line)))
        fresh = lines
        if rolling and segment.startSeconds <= previous_end + .05:
            for overlap in range(min(len(previous_lines), len(lines)), 0, -1):
                if not any(timed[:overlap]) and previous_lines[-overlap:] == lines[:overlap]:
                    fresh = lines[overlap:]
                    break
        if fresh:
            segments.append(segment.model_copy(update={'text': '\n'.join(fresh)}))
        previous_lines = lines
        previous_end = segment.startSeconds + segment.durationSeconds
    return transcript.model_copy(update={
        'segments': segments, 'diagnostics': [*transcript.diagnostics, _VERSION]})
