## Purpose

This file gives concise, actionable guidance for AI coding agents working on this repository: a very small static To‑Do web app (single HTML entry). It highlights where to look, project-specific patterns, and safe edit conventions so an agent can be immediately productive.

## Quick facts (what I found)

- Single-page static site: `index.html` is the entry point.
- Styling is referenced from `style.css` in the project root (linked in `index.html`).
- There is a `logo/` asset folder and a root favicon reference `todofavicon copy.png` (note: the filename contains a space).
- No build system, package manager files, or test harness detectable in the repository root.

## How to view and test locally

- Fast local preview: open `index.html` in a browser. For a simple HTTP server (recommended for path/asset parity):

```powershell
# run from repository root (PowerShell)
python -m http.server 8000
# then open http://localhost:8000/index.html
```

## Important patterns & conventions to follow (project-specific)

- Keep assets and paths relative to the repo root as shown in `index.html` (e.g., `style.css`, `todofavicon copy.png`, `logo/`).
- Filenames are referenced literally in HTML — avoid renaming files without updating references (note the space in `todofavicon copy.png`).
- This repo currently contains no JS file references in `index.html` (the `<body>` is empty). Before adding JavaScript, prefer adding a single `app.js` in the root and include it right before `</body>`.
- Use minimal, dependency-free code unless the user adds a package manifest. Do not introduce frameworks (React/Vue/Node) unless the repository is explicitly expanded to include a build system.

## Typical edits an AI agent may perform here

- Add a minimal UI inside `index.html` body and link a new `app.js` and `style.css`.
- Add or fix assets under `logo/` and update the favicon reference (consider renaming to remove spaces, then update HTML).
- If adding JS, follow the simple pattern: create `app.js` in repo root, include feature code and DOM-ready initialization; keep it vanilla JS (no bundlers).

## Examples from this repo (concrete references)

- `index.html` head shows expected links:
  - `<link rel="stylesheet" href="style.css" />`
  - `<link rel="icon" type="image/png" href="todofavicon copy.png" />`
- If you add JS, follow this insertion point pattern:
  - Place `<script src="app.js"></script>` immediately before `</body>`.

## Merge/update rules for this file

- If `.github/copilot-instructions.md` already exists, merge by preserving any existing project-specific instructions. Add or update the Quick facts and Examples sections only when they remain accurate after changes.

## Safety and assumptions

- Assumption: this is a tiny, static front-end project. If the repo later adds a `package.json`, `pyproject.toml`, `build.gradle`, or other build metadata, re-evaluate and expand instructions accordingly.
- Avoid network downloads and installing dependencies without an explicit change to the repository (do not add npm/pip installs automatically).

## When in doubt

- Search the repository root for newly added files (`package.json`, `style.css`, `app.js`) and re-run these instructions.
- Ask the human maintainer before introducing a build toolchain or external dependency.

---

If anything in this file is unclear or missing (for example, more detailed UI/UX expectations or intended feature set), tell me what you expect the app to do and I will update these instructions.
