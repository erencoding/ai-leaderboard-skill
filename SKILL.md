---
name: ai-leaderboard
description: Fetches AI model rankings from Artificial Analysis (artificialanalysis.ai) including Intelligence Index, Speed, Price, and individual benchmarks. Sends screenshot + formatted TOP5 text. Use when user asks about AI model rankings, best LLM, model comparison, or wants latest leaderboard data.
version: "1.3"
author: Judy (朱迪)
license: MIT
---

# AI Leaderboard Skill

Fetches real-time AI model rankings from Artificial Analysis using Playwright and outputs:
1. **Full-page screenshot** via message tool
2. **Formatted TOP5 text** for each ranking (Intelligence / Speed / Price) via message tool

## Usage

```
AI排行榜
大模型排行榜
Artificial Analysis
最佳LLM
模型对比
AI leaderboard
```

## Workflow

### Step 1: Screenshot

```bash
node -e "
const { chromium } = require('/usr/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('https://artificialanalysis.ai/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/ai-leaderboard.png', fullPage: false });
  await browser.close();
})().catch(e => console.error(e.message));
"
```

Send screenshot via message tool:
```
action: send
channel: feishu
target: ou_13198dff86df39f443084c8dc460d89f
message: 🌐 完整排行榜截图（点击放大）
media: /tmp/ai-leaderboard.png
```

### Step 2: Parse & Send TOP5 Text

Send via message tool with this exact format:

```
🏆 Artificial Analysis · AI 排行榜
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 综合智能指数 TOP 5
────────────────────
🥇  GPT-5.5 (xhigh)              60
🥈  Claude Opus 4.7 (max)        57
🥈  Gemini 3.1 Pro Preview        57
4   GPT-5.4 (xhigh)               54
5   Kimi K2.6                     54

🏎️ 速度排行榜 TOP 5
────────────────────
🥇  gpt-oss-120B (high)         209 tps
🥈  NVIDIA Nemotron 3 Super      154 tps
🥉  Gemini 3.1 Pro Preview      123 tps
4   Grok 4.20 0309 v2            115 tps
5   Kimi K2.6                     112 tps

💰 价格排行榜 TOP 5
────────────────────
🥇  gpt-oss-120B (high)         $0.30
🥈  NVIDIA Nemotron 3 Super       $0.40
🥉  DeepSeek V4 Flash (Max)      $0.14
4   DeepSeek V3.2                 $0.28
5   Mistral Small 4               $0.15

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📂 完整 28 模型 → 见上方截图
🔗 artificialanalysis.ai
```

## Data Source

https://artificialanalysis.ai
Updated daily. 496 models tracked.
