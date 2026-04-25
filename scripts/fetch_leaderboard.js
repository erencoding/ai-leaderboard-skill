#!/usr/bin/env node
/**
 * Artificial Analysis Leaderboard Fetcher
 * Fetches AI model rankings from https://artificialanalysis.ai
 * Outputs formatted text suitable for Feishu display
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

    // Parse Intelligence Index - find all model/score pairs
    const lines = data.split('\n').filter(l => l.trim());
    
    // Extract sections
    const intelStart = data.indexOf('Intelligence Index; Higher');
    const speedStart = data.indexOf('Output Tokens per Second; Higher');
    const priceStart = data.indexOf('USD per 1M Tokens; Lower');
    const intelSection = data.substring(intelStart, speedStart);
    const speedSection = data.substring(speedStart, priceStart);
    const priceSection = data.substring(priceStart);

    // Parse model names and scores
    const parseSection = (section, count) => {
      const results = [];
      const scoreRegex = /([a-zA-Z0-9\-\.\s\(\)']+)\s+(\d+)\s+(\d+)/g;
      // More robust: find alternating lines
      const modelLines = section.split('\n').filter(l => {
        const trimmed = l.trim();
        return trimmed.length > 3 && !trimmed.includes('Higher is better') 
          && !trimmed.includes('Artificial Analysis') && !trimmed.includes('Index')
          && !trimmed.includes('USD') && !trimmed.includes('Output Tokens');
      });
      
      let i = 0;
      while (i < modelLines.length && results.length < count) {
        const line = modelLines[i].trim();
        const scoreLine = modelLines[i + 1];
        if (scoreLine && scoreLine.trim().match(/^\d+$/)) {
          const score = parseInt(scoreLine.trim());
          if (score > 5 && score < 100) {
            results.push({ name: line.replace(/\s+/g, ' '), score });
            i++;
          }
        }
        i++;
      }
      return results;
    };

    const intelModels = parseSection(intelSection, 25);
    const speedModels = parseSection(speedSection, 10);
    const priceModels = parseSection(priceSection, 10);

    const today = new Date().toISOString().split('T')[0];
    
    console.log(`🏆 Artificial Analysis · AI 模型排行榜`);
    console.log(`━━━━━━━━━━━━━━━━━━━━`);
    console.log(`数据来源：artificialanalysis.ai　更新于 ${today}`);
    console.log(`共收录 496 个模型，以下为 Top ${intelModels.length}`);
    console.log();
    console.log(`【一】综合智能指数 · Intelligence Index`);
    console.log();
    intelModels.forEach((m, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ` ${i + 1} `;
      console.log(`${medal} ${m.name.padEnd(35)} ${m.score}`);
    });
    
    console.log();
    console.log(`【二】速度排行榜 · Output Speed（Tokens/sec）`);
    console.log();
    speedModels.forEach((m, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ` ${i + 1} `;
      console.log(`${medal} ${m.name.padEnd(35)} ${m.score}`);
    });
    
    console.log();
    console.log(`【三】价格排行榜 · Price（$/1M Tokens）`);
    console.log();
    priceModels.forEach((m, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ` ${i + 1} `;
      console.log(`${medal} ${m.name.padEnd(35)} $${m.score}`);
    });
    
    console.log();
    console.log(`完整数据 → https://artificialanalysis.ai`);

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
