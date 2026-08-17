# MDL Mission — Standalone Deployable Preview

This ZIP contains ONLY the redesigned **Our Mission** screen, but it includes everything required to open and deploy it by itself.

## View it immediately

Double-click `index.html`.

No npm install, React build, Tailwind build, or server is required for the preview.

## Put it on GitHub + Vercel

1. Create a new GitHub repository or branch for the preview.
2. Upload the CONTENTS of this folder so that `index.html` is at the repository root.
3. Import that GitHub repository into Vercel.
4. Framework Preset: **Other** / no framework is fine.
5. Do not set a Build Command.
6. Do not set an Output Directory.
7. Deploy.

`vercel.json` is included so direct URLs fall back to `index.html`.

## Included

- `index.html` — the entire Mission page markup
- `styles.css` — responsive styling + motion
- `script.js` — scroll reveals, photo interaction, mobile menu, section navigation
- `assets/` — the existing MDL images and logo used by the page

## Interactions

- Scroll-triggered content/image entrances
- Hover/tap photo captions
- Subtle cursor tilt on desktop
- Floating image labels
- Desktop section navigator
- Mobile mission menu
- Responsive single-column mobile layout

The top navbar is visual-only in this standalone preview because the other MDL pages are intentionally not included.
