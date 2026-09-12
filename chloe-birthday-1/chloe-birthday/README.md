# Chloe's Birthday Site

Just open `index.html` in any browser — no build step, no install.

The site is a scroll-through sequence of glassy "phone screens" (light,
gold/floral, glassmorphism) — hero, about, passions, favorites, a photo
quote screen, a moments collage, a note for Loofy, a gratitude screen,
a music player, and a closing screen.

## Replace the placeholder photos
Every photo is currently a `picsum.photos/seed/...` placeholder so the
site works out of the box. Search `index.html` for `picsum.photos` and
swap each `src` for a real photo, e.g. `assets/chloe-portrait.jpg` —
just drop your photos into the `assets/` folder. Seeds used, so you know
what each one is for: `chloe-portrait` (hero + Discord popup),
`chloe-photography`, `chloe-volunteer`, `chloe-travel`, `chloe-archery`,
`chloe-whip`, `chloe-shooting`, `chloe-xmen`, `chloe-angel`,
`chloe-olivia` / `chloe-olivia-big`, `chloe-sunset`, `chloe-m1`–`chloe-m5`.

## Things you can easily swap
- **Hero text** — `.hero-text` block near the top of `index.html`
- **About paragraph / Loofy line** — screen 2, `.body-copy`
- **Discord role tags** — `.dc-roles` block
- **Passions & Favorites list text** — `.passion-list` items, screens 3 & 4
- **Song / quote text** — screens 4 and 9 (music player)
- **Gratitude & closing messages** — screens 7, 8, 10
- **Colors** — top of `css/style.css`, the `:root` block (`--gold`, `--blush`, `--cream`)

## What's interactive
- Hero photo tilts in 3D as you move your mouse over it
- Click the Discord icon on the hero photo to pop out her "profile" card
- Butterflies drift at different speeds as you scroll (parallax)
- Click the mini play button (Favorites screen) or the main player controls (Music screen) to animate playback
- Sparkle/confetti burst fires once when you scroll to the Gratitude and Final screens
