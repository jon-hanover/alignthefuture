# alignthefuture.org

Static site for **alignthefuture.org**. `index.html` is the homepage: the
content of the two-pager (the "Two Pager" tab of the internal collab doc, see
`docs/WORKING-DOCS.md`), appendix left out, with its TEAM section as the
contact block at the bottom. An older copy in a separate "Align the Future
(WIP)" doc is stale; do not work from it. The page uses the watercolor logo
brand described in `brand/README.md` (colors sampled from the wordmark,
Raleway headings, Manrope body) and is hand-written responsive HTML with no
build step. The earlier marine/tangerine brand kit is kept in `brand/retired/`
and is no longer used anywhere.

The Humanities / AI circle duet is one inline script at the bottom of
`index.html`, used twice. The two circles flirt for about 20 seconds
(overlapping, twice passing through each other) and settle overlapping. Behind
the hero text it is faint: the pair starts at rest top right with its names
showing, holds about 2 seconds, then dances with the names hidden and settles
back in the same spot, where the names return. That spot is where the static
`.situation .circles` CSS draws the pair for no-script and reduced-motion
visitors; keep those in step. In the experience section it is stronger, the
circles drift in from either side when scrolled into view, and they settle
centered above the table.
Each circle carries its name in Caveat Brush, fixed at the circle's center so
it moves only with its own circle (an earlier version slid the names apart
where the circles overlapped, which read as the circles bumping each other;
Jon rejected that). In the hero the names fade almost out over lines of text.

`align/` is the Humanities / Align / AI table (slide 1 of the program deck)
under a static flat-color Venn, with the categories down the left, stacking
into tagged rows on phones. Its CSS lives in `assets/venn/`. The same table
sits on the homepage in "The experience" section, where the duet replaces the
static Venn. Keep the table text in both copies in step. An animated
version and a textured watercolor version were both tried and dropped; they are
in git history if wanted again.

`landscape/` is the "Is anyone else doing this already?" appendix question of
the two-pager as a graphic. The organizations run across the top under the
appendix's three headings (Kairos as a bracket over Pathfinder and SPAR), with
Align the Future pinned as the first column. The criteria run down the left
(full disc yes, half disc in part, blank no). Each organization's link and
short description sit in an "i" bubble under its name: hover on desktop, tap on
phones, where the matrix scrolls sideways under the pinned criteria and Align
the Future columns. The whole graphic is the `figure.landscape` element, sized
so a desktop screenshot of it drops into the Google Doc. Row colors follow the
Venn: teal for who and where, then Humanities blue, Align green and AI yellow,
and deep blue for placement. Keep the organizations and their descriptions in
step with the two-pager appendix. It is not linked from the homepage.

## Working agreement

Jon is not an engineer and does not work in GitHub directly. No one else is
watching this repo, so the stakes on any single change are low.

**Default to shipping.** When Jon asks for something, take it all the way to
production: commit it, get it onto `main`, and tell him the live site is
updated. Do not stop at a branch or an open pull request waiting on a review he
did not ask for. If he wants to see it first he will say so, and then hold at a
branch or PR until he approves it.

This applies to work that lands in the repo. Research, analysis and drafts that
are not repo changes still come back to him in chat or as an artifact.

The four items under "Things that will break the site" still get checked before
a structural change ships. That is a verification step on the way out the door,
not a reason to stop and ask.

## How it deploys

GitHub Pages, "Deploy from a branch", `main` branch, `/ (root)` folder. Push to
`main` and the live site updates in roughly a minute. There is no build step,
no package.json, no CI.

## Things that will break the site

Check these before making structural changes.

1. **`CNAME` must stay at the repo root**, containing exactly
   `alignthefuture.org`. GitHub Pages reads this file to claim the custom
   domain. Deleting it, or publishing from a build directory that omits it,
   drops the site back to `jon-hanover.github.io/alignthefuture` and takes
   HTTPS down with it.
2. **`.nojekyll` must stay.** Without it, Pages runs the files through Jekyll,
   which ignores any file or directory starting with an underscore.
3. **The repo must stay public.** GitHub Pages only publishes from private
   repos on paid plans, and this account is on the free plan.
4. **Pages source must stay on `main` / root.** If you switch it to "GitHub
   Actions" for a framework build, the workflow has to copy `CNAME` and
   `.nojekyll` into the published artifact, and you have to re-enter the custom
   domain and re-tick "Enforce HTTPS" in Settings → Pages afterward.

## Adding a build step

Fine to do, and the four points above are the whole checklist. Prefer a static
output (Astro, Eleventy, plain Vite) over anything needing a server, since
Pages serves static files only.

## The .com

`alignthefuture.com` redirects here. It is served from a separate repo,
[jon-hanover/alignthefuture-com](https://github.com/jon-hanover/alignthefuture-com),
because GitHub Pages allows one custom domain per Pages site. That repo has an
`index.html` for the root and a `404.html` for every other path, so
`alignthefuture.com/anything` lands on `alignthefuture.org/anything`. Adding
routes here needs no change there.

## DNS

Registrar is Namecheap, nameservers are **Namecheap BasicDNS**, records live
under the **Advanced DNS** tab. Both domains are configured identically:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `jon-hanover.github.io.` |

Email for `alignthefuture.org` uses Namecheap's free email forwarding (MX
records `eforward1` to `eforward5.registrar-servers.com` plus an SPF TXT
record). The site publishes `team@alignthefuture.org`, which only works if a
forward for it exists in Namecheap under Domain → Redirect Email. Leave those MX records alone
when touching DNS.

Those four A records are GitHub's published Pages addresses. No AAAA records
are set, so the site is IPv4 only. That is fine, and adding the four AAAA
records from GitHub's docs is the fix if IPv6 ever matters.

Namecheap's own "URL Redirect Record" was rejected for the `.com` because it
serves no SSL certificate for the redirecting domain, so `https://` hits a
browser security warning. Do not reach for it as a shortcut later.

## Local preview

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Check the page at a phone width too, not just
desktop.

## Docs

`docs/` holds working documents about the project itself. `docs/VISION.md` is
the cleaned-up statement of the core idea and the open questions behind it.
`docs/WORKING-DOCS.md` points at the live Google files (the Ecosystem Map and
the internal collab doc) where the day-to-day work actually happens. Nothing in
`docs/` is linked from the site.
