"""Sarcastic HTTP status code responses for testing and development.

Mirrors the behaviour of the @mockeroo/mock-responses npm package.

Example::

    from mockeroo_mock_responses import get_response, get_available_codes

    resp = get_response(404)
    if resp is not None:
        print(resp.status, resp.message)

    codes = get_available_codes()
    print(codes)  # [200, 201, 204, ...]

Response data is copied from responses/*.json by the Hatch build hook
(hatch_build.py) at install time.
"""

from __future__ import annotations

import json
import random
from dataclasses import dataclass
from importlib.resources import files


def _load_responses() -> dict[int, list[str]]:
    pkg = files("mockeroo_mock_responses") / "responses"
    data: dict[int, list[str]] = {}
    for entry in pkg.iterdir():
        if not entry.name.endswith(".json"):
            continue
        code = int(entry.name.removesuffix(".json"))
        messages: list[str] = json.loads(entry.read_text(encoding="utf-8"))
        if messages:
            data[code] = messages
    return data


_RESPONSES: dict[int, list[str]] = _load_responses()
_CODES: list[int] = sorted(_RESPONSES)


@dataclass
class Response:
    status: int
    message: str


def get_response(status_code: int) -> Response | None:
    """Return a Response with a random sarcastic message for *status_code*.

    Returns ``None`` if the code is not recognised.
    """
    messages = _RESPONSES.get(status_code)
    if not messages:
        return None
    return Response(status=status_code, message=random.choice(messages))


def get_available_codes() -> list[int]:
    """Return all supported HTTP status codes in ascending order."""
    return list(_CODES)
