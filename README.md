# Vivek Sanandiya — portfolio

Frontend only. React + Vite + Tailwind CSS v4, with Framer Motion used in the
few places where motion actually adds something.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the built output
```

Deploy `dist/` anywhere static — Vercel, Cloudflare Pages, Netlify, Render.
No environment variables, no backend, no API keys.

## Before you deploy

1. **`index.html`** — replace every `REPLACE-WITH-YOUR-DOMAIN.com` with your real
   URL (canonical, `og:url`, `og:image`, `twitter:image`, and the JSON-LD `url`).
2. **`public/og.png`** — add a 1200×630 share image. Nothing references a file
   that does not exist yet except the two `og:image` tags, so links will still
   work without it; they just will not show a preview card.

## Where things live

```
src/
  data/          all copy, links and project metadata — edit here first
    site.js      identity, hero statement, nav, about, education, contact
    projects.js  the three projects, each with its own art direction
    skills.js    the stack, grouped as layers
  components/    one file per section, plus small shared primitives
  hooks/         active-section tracking, local time, pointer label, scroll lock
  lib/ui.js      shared class strings (container, label, section spacing)
  index.css      design tokens and the handful of CSS primitives
  assets/        project screenshots
```

Nothing in `data/` imports from `components/`, so all the text can be changed
without opening a component.

## Editing

**Change any wording** — `src/data/site.js`.

**Add a project** — append an object to the array in `src/data/projects.js`:

```js
{
  id: 'slug',
  index: '04',
  title: 'Name',
  kind: 'What kind of thing it is',      // shown top-right of the spread
  subtitle: 'One line',
  description: 'Two sentences, plain.',
  note: 'The one interesting thing about building it.',
  stack: [{ layer: 'Interface', items: 'React · Tailwind CSS' }],
  image: yourImport,                      // import it at the top of the file
  alt: 'What the screenshot shows.',
  links: { live: '…', code: '…' },
  pull: 'left',                           // alternate from the project above
  focal: 'center top',                    // object-position for this crop
  tint: 'patina',                         // 'brass' | 'patina'
}
```

Screenshots want a roughly 2.1:1 landscape crop (the frame is `19/9`) and at
least 1600px wide.

**Add a section** — add an entry to `sections` in `src/data/site.js` (the rail
nav, the mobile bar and the section header all read from that one array, so the
numbering can never drift), then render a component with a matching `id`.

**Swap a typeface** — change the `<link>` in `index.html` *and* the matching
`--font-*` token in `src/index.css`. Both faces have real fallback stacks, so
the layout holds if the font request fails.

**Retune the look** — everything is a token at the top of `src/index.css`:
surfaces, hairlines, text tones, the one accent, the type scale. Changing
`--color-brass` re-accents the whole site.

## Notes on how it is built

- **Tailwind v4, CSS-first.** No `tailwind.config.js`. Tokens are declared in
  `@theme` in `src/index.css` and become utilities automatically (`--color-brass`
  → `text-brass`, `--text-h2` → `text-h2`).
- **Accessibility.** Semantic landmarks, one `h1`, focus rings on everything
  focusable, a skip link, `prefers-reduced-motion` honoured throughout. Text
  tones were checked against their backgrounds and all pass WCAG AA.
- **Motion is optional.** With animation disabled the page loses nothing
  structural: reveals render in place, the hero instrument parks mid-path with
  every layer lit, and the screenshots show at full colour instead of waiting
  for a hover.
- **Pointer effects stay off the render path.** The cursor label and the
  magnetic button write CSS custom properties straight to the DOM inside a
  single `requestAnimationFrame`, so moving the mouse never re-renders React.
- **Dependencies.** React, Framer Motion, Lucide React. That is all.
