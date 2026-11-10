# MyNote

Fast, private, plain-text notes for Android Edge and desktop browsers.

[Open MyNote](https://mynote.christorng.workers.dev/)

## Features

- Mobile: sticky category strip; quick add moves to the top-right on scroll.
- Inline mobile editor; read-only notes expand to show full text once.
- Desktop: resizable three-pane layout, persistent pane widths, new-note action at the top of the detail pane.
- Hover over desktop categories to rename or delete.
- Archive/restore on any signed-in device; only the origin device can edit note text.
- Local IndexedDB autosave, offline queue, and live updates.
- Compact timestamps with weekdays; hide redundant edit dates/times.
- Search note content, device names, and dates.
- Per-category current counts and Current/Archive totals.

## Desktop shortcuts

| Shortcut | Action |
| --- | --- |
| Alt+N | New note |
| Alt+1 / Alt+2 | Current / Archive |
| Ctrl+K or / | Search |
| Alt+Up / Alt+Down | Previous / next note |
| Up / Down | Move between focused note rows |
| Enter | Open a focused note |
| Alt+A | Archive or restore selected note |
| Alt+C | Add category |
| Alt+R | Rename selected category |
| Alt+Delete | Delete selected category |
| Ctrl+S | Sync now |
| Esc or Ctrl+Enter | Close the editor |

Hover a control for its shortcut.

## Stack

- Frontend: HTML, CSS, JavaScript PWA (`src/ui.js`)
- Backend: Cloudflare Worker (`src/worker.js`)
- Storage: SQLite-backed Durable Object, plus IndexedDB for offline changes
- Login: access code and per-device session (180-day sliding expiry)

## Deployment

Worker: `mynote`; Durable Object: `STORE` / `MyNoteStore`; login hash binding: `SETUP_CODE_HASH`.

Use the official GitHub connector for source changes and the Cloudflare connector to deploy.

**Limitations:** No end-to-end encryption or independent backup. Server-side note content is plaintext. Live Android/Windows interaction tests have not been completed.
