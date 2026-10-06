# AGENTS.md

Instructions for AI coding agents (Codex and others) working on
alignthefuture.org.

**Read `CLAUDE.md` in this folder before doing anything.** It is the full
project guide: what each page holds, how the pages stay in step with the
two-pager, how the site deploys, and the four things that will take the site
down. Everything in it applies to you. This file exists only because some
agents look for `AGENTS.md` and never open `CLAUDE.md`.

A few notes for people and agents new to the repo:

- **Who you are working for.** `CLAUDE.md` is written for work with Jon, who
  owns the site. If you are working for someone else, ask them before pushing
  to `main`, since a push there updates the live site within a minute. A pull
  request for Jon to approve is the safe default.
- **Preview through a local server.** Pages load their styles, images and
  scripts from root paths like `/assets/site/site.css`, so opening
  `index.html` straight from disk shows a broken, unstyled page. Run
  `python3 -m http.server 8000` in this folder and open
  http://localhost:8000 instead.
- **The graphics are code.** Visual page editors can change text but not the
  graphics:
  - The Humanities / AI Research circles on the homepage are positioned by the
    inline script at the bottom of `index.html`.
  - In the "Who else is doing this work?" grid (`figure.landscape` in
    `index.html`), a check is `<i role="img" aria-label="Yes"></i>` and a
    blank is `<span class="sr">No</span>`. The checks are drawn by
    `assets/landscape/landscape.css`. Swap one tag for the other to change a
    cell.
  - `landscape/index.html` copies the grid from the homepage when it loads.
    Edit the grid in `index.html` only.
  - `studentexperience/index.html` draws every scene in its own inline
    script (people, furniture and washes are SVG built from helper
    functions). Edit the scenes and captions there, then re-run
    `tools/bake-student-experience.js`, which rewrites the images, the
    `ART_FIT` placements and `ART_V` in the page: visitors see baked images of
    the art, so a drawing change does not show until it is baked.
  - `v2/index.html` (a link-only alternative homepage) loads that animation
    from `/studentexperience/` when it opens. Edit the animation there only.
