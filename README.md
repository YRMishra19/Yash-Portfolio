# Yash Ramakant Mishra — Portfolio

A premium, cinematic personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-checks and builds to /dist
npm run preview   # serve the production build locally
```

Deploy `dist/` (or the whole repo) to Vercel, Netlify, or GitHub Pages — it's a static site with no server required.

## Project structure

```
src/
  components/   Reusable UI: Nav, Footer, Button, Reveal (scroll animation), SocialIcons, etc.
  sections/     One file per page section (Hero, About, Experience, Projects, Y-PROC, ...)
  data/         All content lives here — edit these files to update your resume/profile
                without touching any component code.
  hooks/        useScrollSpy (nav active-state), usePrefersReducedMotion
  lib/          Small shared utilities
```

To update your information, you generally only need to edit files in `src/data/`:

- `profile.ts` — name, title, hero copy, summary, resume/portrait paths
- `experience.ts` — work history
- `education.ts` — degrees, coursework, certifications
- `skills.ts` — skill categories
- `projects.ts` — case-study project cards
- `yproc.ts` — the Y-PROC feature section
- `journey.ts` — the career-evolution stepper
- `social.ts` — social links

## Things still marked as placeholders

Photos, resume, and real employment/education dates are now filled in from your resume. Search the codebase for `[ADD` for what's left:

- **NFC/QR project & ApplyAI**: a bit more detail and any metrics you want to add, in `src/data/projects.ts`.
- **Y-PROC architecture**: tech-stack specifics once finalized, in `src/data/yproc.ts`.
- **Domain**: replace `REPLACE-WITH-YOUR-DOMAIN.com` in `index.html` (canonical URL, Open Graph, JSON-LD) once you have one.
- **OG image**: `public/images/og-cover.jpg` for social share previews (1200×630px) — separate from the portrait photos already in place.

To swap any of the five photos later, replace the file at its existing path in `public/images/` (same filename) — no code changes needed:

- `yash-profile.jpg` — Hero
- `yash-about.jpg` — About
- `yash-yproc.jpg` — Y-PROC
- `yash-education.jpg` — Education
- `yash-contact.jpg` — Contact

## Connecting the contact form

The consultation form on the Contact section (`src/components/ConsultationForm.tsx`) validates input and shows loading/success/error states, but is **not connected to a backend** — it currently shows an honest "not connected yet" message on submit rather than pretending to send an email.

To wire it up:

1. Pick a service: [Formspree](https://formspree.io), [Resend](https://resend.com), a Supabase Edge Function, or a Firebase Cloud Function.
2. Set `CONTACT_ENDPOINT` near the top of `ConsultationForm.tsx` to that service's endpoint URL.
3. That's it — `DEMO_MODE` automatically turns off once `CONTACT_ENDPOINT` is non-empty, and the form will POST the JSON body `{ name, email, phone, reason, message }` to it.

## Notes

- Respects `prefers-reduced-motion` throughout (see `src/hooks/usePrefersReducedMotion.ts` and the global CSS rule in `src/index.css`).
- All scroll-reveal animations are progressive enhancement — the page is fully readable and accessible with motion disabled or JavaScript slow to load, since content is always present in the DOM.
- Fonts (Inter Variable + Instrument Serif) are self-hosted via `@fontsource`, so there's no external font request at runtime.
