# Chloe's Birthday Site

Just open `index.html` in any browser — no build step, no install.

## Replace the placeholder avatar
Search `index.html` for the two `dicebear` image URLs (hero card + Discord pop-up)
and swap the `src` for a real photo of Chloe, e.g.:
`<img src="assets/chloe.jpg" ...>` — just drop the photo into the `assets/` folder.

## Things you can easily swap
- **Hero headline / subtext** — top of `index.html`, `.hero-copy`
- **Discord role tags** — `.dc-roles` block (currently: photographer, volunteer, archer, whip cracker, future olympian)
- **Olivia Rodrigo song list** — `.music-tags` block
- **Server name** — `.server-card-top h4` (currently "Chloe's Hangout")
- **Appreciation message** — `#appreciateCard`, near the bottom
- **Colors** — top of `css/style.css`, the `:root` block (`--gold`, `--pink`, `--teal`)

## What's interactive
- Hero card tilts in 3D as you move your mouse over it (also responds to phone tilt)
- Click the Discord icon under the hero card to pop out her "profile"
- Scroll down to the archery target — the arrow fires once it's in view
- Click the vinyl record to "spin" it
- The appreciation card near the bottom pops in with a confetti burst when you scroll to it
