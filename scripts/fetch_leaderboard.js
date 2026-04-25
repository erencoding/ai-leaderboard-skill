#!/usr/bin/env node
/**
 * Artificial Analysis Leaderboard Fetcher
 * Fetches AI model rankings from https://artificialanalysis.ai
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });

  try {
    await page.goto('https://artificialanalysis.ai/', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(3000);

    const data = await page.evaluate(() => {
      return document.body.innerText.substring(0, 30000);
    });

    console.log(data);

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
