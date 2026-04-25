---
name: ai-leaderboard
description: Fetches AI model rankings from Artificial Analysis (artificialanalysis.ai) including Intelligence Index, Speed, Price, and individual benchmarks. Use when user asks about AI model rankings, best LLM, model comparison, or wants latest leaderboard data.
version: "1.2"
author: Judy (朱迪)
license: MIT
---

# AI Leaderboard Skill

Fetches real-time AI model rankings from Artificial Analysis using Playwright and outputs data as:
1. **Full-page screenshot** — complete overview
2. **Feishu interactive card** — TOP 5 of each ranking (Intelligence / Speed / Price)

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

### Step 1: Fetch & Screenshot

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

### Step 2: Parse TOP 5 Data

Use Playwright to extract the top 5 from each ranking section (Intelligence, Speed, Price).

### Step 3: Send Screenshot via message tool

```
action: send
channel: feishu
target: ou_13198dff86df39f443084c8dc460d89f
message: 🌐 完整 AI 排行榜截图
media: /tmp/ai-leaderboard.png
```

### Step 4: Send Feishu Card via feishu_im_user_message tool

```
action: send
receive_id_type: open_id
receive_id: ou_13198dff86df39f443084c8dc460d89f
msg_type: interactive
content: {
  "header": {
    "title": { "tag": "plain_text", "content": "🏆 AI 排行榜 TOP5 · Artificial Analysis" },
    "template": "purple"
  },
  "elements": [
    { "tag": "div", "text": { "tag": "lark_md", "content": "**📊 综合智能指数**\n🥇 GPT-5.5 (xhigh) — 60\n🥈 Claude Opus 4.7 (max) — 57\n🥈 Gemini 3.1 Pro Preview — 57\n4. GPT-5.4 (xhigh) — 54\n5. Kimi K2.6 — 54" }},
    { "tag": "hr" },
    { "tag": "div", "text": { "tag": "lark_md", "content": "**🏎️ 速度排行榜（Tokens/sec）**\n🥇 gpt-oss-120B — 209\n🥈 NVIDIA Nemotron 3 Super — 154\n🥉 Gemini 3.1 Pro Preview — 123\n4. Grok 4.20 0309 v2 — 115\n5. Kimi K2.6 — 112" }},
    { "tag": "hr" },
    { "tag": "div", "text": { "tag": "lark_md", "content": "**💰 价格排行榜（$/1M Tokens）**\n🥇 gpt-oss-120B — $0.30\n🥈 NVIDIA Nemotron 3 Super — $0.40\n🥉 DeepSeek V4 Flash — $0.14\n4. DeepSeek V3.2 — $0.28\n5. Mistral Small 4 — $0.15" }},
    { "tag": "hr" },
    { "tag": "note", "elements": [{ "tag": "plain_text", "content": "数据来源：artificialanalysis.ai · 完整28模型见截图" }]}
  ]
}
```

## Data Source

https://artificialanalysis.ai
Updated daily. 496 models tracked.
