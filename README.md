# ToDo‑List App

A small, dependency‑free single‑page To‑Do web app with a cheerful UI. Built with vanilla HTML, CSS and JavaScript and persisting data in the browser via localStorage.

## Quick start

1. Open the project folder in your browser, or run a local HTTP server from the repo root (recommended):
```powershell
# from project root (Windows PowerShell)
python -m http.server 8000
# then open http://localhost:8000/index.html
```

2. Use the input to add tasks, click a task row to toggle completion, double‑click to edit, and use the red trash button to delete. Completed tasks can be cleared with the "Clear completed" control.

## Features

- Add, edit, toggle (complete/uncomplete), and delete tasks
- Filter views: All / Active / Done (with live counts)
- Persistent storage using localStorage (key: `todo.tasks.v1`)
- Responsive, mobile‑friendly UI with animated micro‑interactions
- Bold, accessible action buttons and inline SVG icons (consistent across platforms)

## Project structure

- index.html — single page entry (loads style.css and app.js)
- style.css — visual styles, responsive rules, animations
- app.js — application logic: state, rendering, events, and localStorage I/O
- logo/ — image assets (contains `todofavicon copy.png` used by index.html)

Notes:
- The favicon file name contains a space (`todofavicon copy.png`). If you rename assets, update the paths in `index.html`.
- No build tools or dependencies are used.

## Data & storage

- Data is stored locally under `localStorage` key: `todo.tasks.v1`
- Each task object: { id, text, done (boolean), created (timestamp) }
- To reset app data in the browser console:
```js
localStorage.removeItem('todo.tasks.v1'); location.reload();
```

## Development & debugging tips

- If layout or styles seem stale, perform a hard refresh (Ctrl+F5) to clear cached CSS/JS.
- Serve files over HTTP (python http.server or a tiny static server) rather than opening the file via file:// for consistent asset loading.
- If the header/input disappears when many tasks are present, ensure `.task-list` is scrollable and `.app` is constrained to viewport height (the CSS enforces this). Inspect DevTools Layout to check for max-height/overflow rules.
- View tasks in DevTools: Application → Local Storage → your origin → `todo.tasks.v1`

## Customization

- Change the font: index.html currently includes Nunito via Google Fonts.
- Swap the favicon/logo: update files under `logo/` and adjust paths in `index.html`.
- Theme tweaks: edit CSS variables in `:root` of `style.css` (colors, shadows, spacing).

## Contributing

This is a small static app — open an issue or submit a PR for bug fixes, UI/UX improvements, or feature additions. Keep changes dependency‑free unless a build system is intentionally added.

## License

No license file provided. Add a LICENSE if you want to set reuse terms.

