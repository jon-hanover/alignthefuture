# alignthefuture.org

Static landing page for alignthefuture.org, served by GitHub Pages.

## How it works

- `index.html` is the whole site. No build step, no dependencies.
- `CNAME` tells GitHub Pages to serve the site at `alignthefuture.org`.
- `.nojekyll` skips Jekyll processing so files are published exactly as committed.

## Making a change

Edit `index.html`, commit, push. GitHub Pages redeploys in about a minute.

## Local preview

Open `index.html` in a browser, or run:

```
python3 -m http.server 8000
```

then visit http://localhost:8000
