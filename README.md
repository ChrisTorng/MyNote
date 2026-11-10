# MyNote

Minimal, mobile-first private notes.

[Open MyNote](https://mynote.christorng.workers.dev/)

## Features

- Categories: add, rename, delete; deletion moves notes to Inbox.
- Inline mobile editing; other-device notes expand read-only.
- Archive/restore from any signed-in device.
- Created/edited dates with weekdays, compact duplicate suppression.
- Search by note text or date.
- Current/Archive counts and per-category Current counts.
- Sticky mobile categories and a compact quick-add button when scrolling.
- Resizable, persistent three-panel desktop layout.
- Local IndexedDB autosave, offline queue and WebSocket refresh.
- Device names and origin-device-only content edits.

## Stack

- Frontend: plain HTML, CSS and JavaScript PWA — `src/ui.js`
- API: Cloudflare Worker — `src/worker.js`
- Database: SQLite-backed Durable Object
- Authentication: access code plus device session (180-day sliding expiry)

## Deploy

Worker: `mynote` · Durable Object: `STORE` / `MyNoteStore` · Session credential hash: `SETUP_CODE_HASH`

Use the official GitHub connector for source edits and the Cloudflare connector for deployment.

## Status

Cloudflare deployment is configured; end-to-end browser validation is pending.

**Privacy:** No end-to-end encryption or independent backup yet. Cloudflare stores plaintext note content.
