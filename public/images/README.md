# Images

- `yash-profile.jpg` — Hero portrait
- `yash-about.jpg` — About section portrait
- `yash-yproc.jpg` — Y-PROC section portrait
- `yash-education.jpg` — Education section portrait
- `yash-contact.jpg` — Contact section portrait
- `og-cover.jpg` — not yet added. 1200×630px social share image, referenced in `index.html`'s Open Graph/Twitter tags.

To swap any portrait, replace the file at the same path/filename — every component reads these paths from `src/data/profile.ts`, so no code changes are needed. If a file here ever goes missing, the relevant section falls back to a small placeholder note instead of a broken image.
