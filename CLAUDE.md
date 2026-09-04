# alignthefuture.org

Static site for **alignthefuture.org**. Currently a placeholder page. The real
design has not been built yet.

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

`docs/` holds working documents about the project itself, starting with
`docs/VISION.md`, the cleaned-up statement of the core idea and the open
questions behind it. Nothing in `docs/` is linked from the site.
