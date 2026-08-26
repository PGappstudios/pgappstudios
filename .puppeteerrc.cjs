const { join } = require('path');

/**
 * Keep Chromium inside the project instead of ~/.cache/puppeteer.
 * Vercel's build container does not carry the home cache between the install
 * and build steps, so the default location leaves puppeteer with no browser
 * and the prerender step silently skips.
 */
module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
