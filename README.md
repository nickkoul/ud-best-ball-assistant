# UD Best Ball Draft Helper

This Chrome extension will be a Best Ball Draft Helper

## Installation
1. Open Chrome and go to `chrome://extensions`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select this project directory.
4. Click the extension icon to see the popup.

## Structure
- `manifest.json`: extension metadata.
- `src/popup.html`: popup UI.
- `src/popup.js`: popup script.
- `dist/`: production bundle (auto-generated).

## Local Development

Install dependencies and start live-reload build and test runners:

```bash
bun install
bun run dev  # watches and rebuilds src/ → dist/
```

- `bun run dev` rebuilds on changes and outputs to `dist/`, copying assets automatically.

`bun run dev` watches `src/`, rebuilds to `dist/`, and copies assets.

Load the `dist/` folder as an unpacked extension via `chrome://extensions` (Developer mode → Load unpacked).

Run unit tests in watch mode:

```bash
bun test
```

Place tests under `src/` with `*.test.js`, importing only exported logic.
