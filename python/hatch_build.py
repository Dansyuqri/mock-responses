"""
Hatch build hook — mirrors the role of build.rs in the Rust crate.

Copies ../responses/*.json into src/mockeroo_mock_responses/responses/
at build time (including editable installs). The copied files are not
committed; they are regenerated on every install.
"""

import shutil
from pathlib import Path

from hatchling.builders.hooks.plugin.interface import BuildHookInterface


class CustomBuildHook(BuildHookInterface):
    def initialize(self, version: str, build_data: dict) -> None:
        responses_src = Path(self.root).parent / "responses"
        responses_dst = (
            Path(self.root) / "src" / "mockeroo_mock_responses" / "responses"
        )
        responses_dst.mkdir(parents=True, exist_ok=True)

        for src_file in sorted(responses_src.glob("*.json")):
            shutil.copy2(src_file, responses_dst / src_file.name)
