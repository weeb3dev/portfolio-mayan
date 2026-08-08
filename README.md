# Alberto Jauregui — Mayan Codex Portfolio (v0)

Hero-first creative-coding portfolio. Scroll drives a day→night cycle over a Mayan step pyramid; a Milky Way arm drifts through as night deepens.

## Stack

- Vite + React + TypeScript
- Three.js / React Three Fiber / Drei
- GSAP ScrollTrigger + Lenis
- Deploy target: Cloudflare Pages (static)

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/components/scene/` — WebGL pyramid, sky, stars, Milky Way
- `src/components/Hero.tsx` — brand-first first viewport
- `src/components/CodexSections.tsx` — thin Story / Work / Contact (copy from albertojauregui.dev)
- Scroll progress syncs DOM + shader/scene uniforms via `useScrollProgress`
