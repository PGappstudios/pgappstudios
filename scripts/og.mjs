/**
 * Social share images and brand icons. Run locally, not in the deploy build
 * (it needs a browser):
 *
 *   npm run build            # so dist/ exists
 *   npx vite preview --port 4791 &   (or any static server on dist/)
 *   node scripts/og.mjs http://localhost:4791
 *
 * Writes public/og/default.png, public/og/apps/<slug>.png,
 * public/og/blog/<slug>.png and the favicon / app icon PNGs. Commit them.
 * Re-run after adding an app or a post.
 */
import fs from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';
import matter from 'gray-matter';
import puppeteer from 'puppeteer';

const BASE = process.argv[2] || 'http://localhost:4791';
const only = process.argv[3]; // optional: "apps", "blog", "brand"

await build({ entryPoints: ['src/data/catalog.ts'], bundle: true, format: 'esm', platform: 'node', outfile: '/tmp/pg-catalog.mjs', logLevel: 'error' });
const cat = await import('/tmp/pg-catalog.mjs?' + Date.now());

const font = (p) => 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
const GEIST = font('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2');
const SERIF_I = font('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2');
const MONO = font('node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const shell = (body, glow = '196 181 253') => `<!doctype html><html><head><style>
@font-face{font-family:G;src:url(${GEIST}) format('woff2');font-weight:100 900}
@font-face{font-family:S;src:url(${SERIF_I}) format('woff2');font-style:italic}
@font-face{font-family:M;src:url(${MONO}) format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;background:#07070A;color:#F4F3F8;font-family:G;overflow:hidden;-webkit-font-smoothing:antialiased}
.bg{position:absolute;inset:0;background:
 radial-gradient(60% 80% at 85% 10%, rgb(${glow} / .38), transparent 60%),
 radial-gradient(50% 60% at 0% 100%, rgb(${glow} / .14), transparent 60%), #07070A}
.grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);background-size:26px 26px;-webkit-mask-image:radial-gradient(70% 70% at 30% 40%,#000,transparent)}
.mono{font-family:M;text-transform:uppercase;letter-spacing:.16em;font-size:15px;color:#A9A7B8}
.serif{font-family:S;font-style:italic;font-weight:400;letter-spacing:-.01em}
.grad{background:linear-gradient(92deg,#C4B5FD,#F0ABFC 45%,#FDBA74);-webkit-background-clip:text;color:transparent}
.brand{position:absolute;left:64px;bottom:52px;display:flex;align-items:center;gap:14px;font-size:22px;font-weight:600;letter-spacing:-.02em}
.mark{width:44px;height:44px;border-radius:13px;background:#F4F3F8;color:#07070A;display:grid;place-items:center;font-family:S;font-style:italic;font-size:28px;line-height:1}
.icon{border-radius:22.5%;box-shadow:0 0 0 1px rgba(255,255,255,.1),0 20px 50px -12px rgba(0,0,0,.8)}
.shot{position:absolute;width:250px;border-radius:24px;box-shadow:0 0 0 1px rgba(255,255,255,.1),0 40px 80px -20px rgba(0,0,0,.9)}
</style></head><body><div class="bg"></div><div class="grid"></div>${body}</body></html>`;

const brandRow = `<div class="brand"><div class="mark">pg</div>PG App Studios<span class="mono" style="margin-left:10px">pgappstudios.com</span></div>`;

const triplet = (hex) => [0, 2, 4].map((i) => parseInt(hex.replace('#', '').slice(i, i + 2), 16)).join(' ');

function appCard(app) {
  const shots = cat.screensFor(app).slice(0, 3);
  const glow = triplet(cat.accentFor(app));
  const name = esc(cat.shortName(app));
  const shotsHtml = shots.length
    ? `<img class="shot" src="${BASE}${shots[0]}" style="right:300px;top:120px;transform:rotate(-7deg);opacity:.85">
       <img class="shot" src="${BASE}${shots[2] || shots[1]}" style="right:20px;top:110px;transform:rotate(7deg);opacity:.85">
       <img class="shot" src="${BASE}${shots[1] || shots[0]}" style="right:150px;top:70px;width:280px;z-index:2">`
    : `<img src="${BASE}${app.image.startsWith('/') ? app.image : '/' + app.image}" style="position:absolute;right:56px;top:120px;width:520px;border-radius:24px;box-shadow:0 0 0 1px rgba(255,255,255,.1)">`;
  return shell(
    `${shotsHtml}
     <div style="position:absolute;left:64px;top:64px;width:600px">
       <img class="icon" src="${BASE}${cat.iconFor(app)}" width="112" height="112">
       <div class="mono" style="margin-top:36px">${esc(cat.groupById(cat.groupOf(app)).label)}</div>
       <div style="margin-top:14px;font-size:${name.length > 16 ? 64 : 76}px;font-weight:600;letter-spacing:-.04em;line-height:1">${name}</div>
       <div class="serif" style="margin-top:18px;font-size:38px;line-height:1.15;color:#E8E6F0;max-width:560px">${esc(app.tagline || '')}</div>
     </div>${brandRow}`,
    glow
  );
}

const HUES = { Language: '52 211 153', Portugal: '248 113 113', Health: '240 171 252', Fitness: '251 146 60', Parenting: '125 211 252', Faith: '253 224 71', Games: '167 139 250', Pickleball: '74 222 128', Cycling: '96 165 250', Productivity: '147 197 253', Apps: '196 181 253' };

function relatedApp(meta, content) {
  const ids = [...content.matchAll(/apps\.apple\.com\/(?:[a-z]{2}\/)?app\/(?:[^/\s)]+\/)?id(\d+)/g)].map((m) => m[1]);
  for (const id of ids) {
    const a = cat.iosApps.find((x) => cat.storeId(x) === id);
    if (a) return a;
  }
  const hay = `${meta.slug} ${meta.title} ${(meta.tags || []).join(' ')}`.toLowerCase();
  return cat.iosApps.find((a) => hay.includes((a.slug || '').split('-')[0]) && (a.slug || '').length > 4);
}

function postCard(meta, app) {
  const glow = app ? triplet(cat.accentFor(app)) : HUES[meta.category] || '196 181 253';
  const t = esc(meta.title);
  const size = t.length > 70 ? 54 : t.length > 48 ? 62 : 70;
  const shot = app ? cat.screensFor(app, 'sm')[0] : null;
  return shell(
    `${shot ? `<img class="shot" src="${BASE}${shot}" style="right:70px;top:90px;width:240px;transform:rotate(7deg)">` : ''}
     <div style="position:absolute;left:64px;top:64px;width:${shot ? 760 : 1060}px">
       <div style="display:flex;align-items:center;gap:16px">
         ${app ? `<img class="icon" src="${BASE}${cat.iconFor(app)}" width="64" height="64">` : ''}
         <span class="mono" style="border:1px solid rgba(255,255,255,.18);border-radius:99px;padding:8px 16px;color:#F4F3F8">${esc(meta.category)}</span>
         <span class="mono">${meta.readTime || ''} min read</span>
       </div>
       <div style="margin-top:40px;font-size:${size}px;font-weight:600;letter-spacing:-.035em;line-height:1.04">${t}</div>
     </div>${brandRow}`,
    glow
  );
}

const defaultCard = () => {
  const icons = cat.iosApps.slice(0, 12).map((a) => `<img class="icon" src="${BASE}${cat.iconFor(a)}" width="92" height="92">`).join('');
  return shell(
    `<div style="position:absolute;right:56px;top:80px;width:430px;display:grid;grid-template-columns:repeat(4,92px);gap:20px;transform:rotate(-6deg)">${icons}</div>
     <div style="position:absolute;left:64px;top:84px;width:640px">
       <div class="mono">Independent app studio · Lisbon</div>
       <div style="margin-top:26px;font-size:100px;font-weight:600;letter-spacing:-.05em;line-height:.95">Apps people <span class="serif grad" style="font-size:108px">open every day.</span></div>
     </div>${brandRow}`
  );
};

const iconHtml = (size) => `<!doctype html><html><head><style>
@font-face{font-family:S;src:url(${SERIF_I}) format('woff2');font-style:italic}
html,body{margin:0;width:${size}px;height:${size}px;background:transparent}
.m{width:${size}px;height:${size}px;border-radius:${size * 0.225}px;background:radial-gradient(120% 120% at 20% 0%,#2a2340,#07070A 70%);display:grid;place-items:center;overflow:hidden;position:relative}
.m:before{content:"";position:absolute;inset:0;background:radial-gradient(60% 60% at 80% 100%,rgba(240,171,252,.35),transparent 70%)}
.t{font-family:S;font-style:italic;font-size:${size * 0.62}px;line-height:1;color:transparent;background:linear-gradient(110deg,#E9E2FF,#F0ABFC 55%,#FDBA74);-webkit-background-clip:text;transform:translateY(-4%);position:relative}
</style></head><body><div class="m"><span class="t">pg</span></div></body></html>`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const shoot = async (html, out, w = 1200, h = 630, transparent = false) => {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
  await page.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out, omitBackground: transparent });
};

let n = 0;
if (!only || only === 'brand') {
  await shoot(defaultCard(), 'public/og/default.png'); n++;
  for (const [size, out] of [[512, 'public/icon-512.png'], [180, 'public/apple-touch-icon.png'], [32, 'public/favicon-32.png'], [64, '/tmp/pg-fav64.png']]) {
    await shoot(iconHtml(size), out, size, size, size !== 180); n++;
  }
}
if (!only || only === 'apps') {
  for (const app of cat.products) {
    await shoot(appCard(app), `public/og/apps/${app.slug}.png`);
    n++;
  }
}
if (!only || only === 'blog') {
  for (const f of fs.readdirSync('src/content/blog').filter((f) => f.endsWith('.md'))) {
    const { data, content } = matter(fs.readFileSync(path.join('src/content/blog', f), 'utf8'));
    await shoot(postCard(data, relatedApp(data, content)), `public/og/blog/${data.slug}.png`);
    n++;
  }
}
await browser.close();
console.log(`wrote ${n} images`);
