// Bakes the painted art of /studentexperience/ into images in studentexperience/art/.
//
// The page draws its washes, scenes and brushed timeline with SVG watercolor filters,
// which are far too slow to run live while scrolling (phones especially). This script
// loads the page with ?live&bake, renders each piece on a transparent background, and
// saves it as WebP. The page then shows those images, with only the small moving parts
// (gestures, steam, leaves, scrolling code) drawn live on top.
//
// Run it after any change to the drawings. It also records where each scene's art sits
// (ART_FIT) and bumps ART_V in the page, so browsers fetch the new images:
//
//   python3 -m http.server 8000          (in the repo root, in another terminal)
//   node tools/bake-student-experience.js [http://localhost:8000]
//
// Needs Node with Playwright and Chromium installed.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.argv[2] || 'http://localhost:8000';
const out = path.join(__dirname, '..', 'studentexperience', 'art');
// Pixels per drawing unit. Scenes are crisp line work; washes and the line are soft.
const K = { scene: 2.6, wash: 1.2, line: 2 };
const QUALITY = { scene: 0.9, wash: 0.8, line: 0.9 };

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  // ignoreHTTPSErrors lets the Google Fonts load behind proxies that re-sign HTTPS
  const page = await browser.newPage({ viewport: { width: 9200, height: 1100 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  await page.goto(`${base}/studentexperience/?live&bake`);
  // The handwriting in the scenes is Caveat; without it the boards bake in a fallback font
  const caveat = await page.evaluate(async () => (await document.fonts.load('16px Caveat')).length > 0);
  if (!caveat) throw new Error('Caveat did not load');
  const jobs = await page.evaluate(() => {
    const b = window.__bake;
    return [...b.washes.map(j => ({ ...j, kind: 'wash' })), ...b.scenes.map(j => ({ ...j, kind: 'scene' })), { ...b.line, kind: 'line' }];
  });
  // Record each scene's placement in the page, and bump the image version
  const fits = await page.evaluate(() => window.__bake.fits);
  const pageFile = path.join(__dirname, '..', 'studentexperience', 'index.html');
  let html = fs.readFileSync(pageFile, 'utf8');
  const fitLine = /const ART_FIT = .*;/;
  const verLine = /ART_V = '(\d+)'/;
  if (!fitLine.test(html) || !verLine.test(html)) throw new Error('ART_FIT or ART_V line not found in the page');
  html = html.replace(fitLine, `const ART_FIT = ${JSON.stringify(fits)};`)
    .replace(verLine, (m, v) => `ART_V = '${+v + 1}'`);
  // Drop the live page so gradient and mask ids resolve to the copy being baked
  await page.evaluate(() => document.getElementById('journey').remove());
  // A clean, transparent sheet that keeps the page's filter definitions
  await page.addStyleTag({ content: `
    html, body { background: transparent !important; }
    #bk { position: absolute; left: 0; top: 0; }
    #bk svg { display: block; width: 100%; height: 100%; overflow: visible; }
    #bk [class*="a-"] { visibility: hidden; }` });

  for (const j of jobs) {
    const k = K[j.kind];
    const w = Math.round(j.w * k), h = Math.round(j.h * k);
    await page.evaluate(({ svg, w, h }) => {
      document.getElementById('bk')?.remove();
      const d = document.createElement('div');
      d.id = 'bk'; d.style.width = w + 'px'; d.style.height = h + 'px';
      d.innerHTML = svg;
      const s = d.firstElementChild;
      s.removeAttribute('style'); s.removeAttribute('class');
      document.body.appendChild(d);
      // Handwriting with a maximum width is squeezed to fit, as on the page
      d.querySelectorAll('text[data-max]').forEach(t => {
        if (t.getComputedTextLength() > +t.dataset.max) { t.setAttribute('textLength', t.dataset.max); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); }
      });
    }, { svg: j.svg, w, h });
    await page.waitForTimeout(300);
    const png = await page.locator('#bk').screenshot({ omitBackground: true });
    const webp = await page.evaluate(async ({ b64, q }) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      return c.toDataURL('image/webp', q).split(',')[1];
    }, { b64: png.toString('base64'), q: QUALITY[j.kind] });
    const file = path.join(out, `${j.name}.webp`);
    fs.writeFileSync(file, Buffer.from(webp, 'base64'));
    console.log(`${j.name}.webp  ${w}x${h}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
  }
  fs.writeFileSync(pageFile, html);
  console.log('page updated: ART_FIT recorded, ' + html.match(verLine)[0]);
  await browser.close();
})();
