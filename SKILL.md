---
name: ai-leaderboard
description: Fetches AI model rankings from Artificial Analysis (artificialanalysis.ai). Sends screenshot + formatted markdown tables. Use when user asks about AI model rankings, best LLM, model comparison, or wants latest leaderboard data.
version: "1.4"
author: Judy (朱迪)
license: MIT
---

# AI Leaderboard Skill

Fetches real-time AI model rankings from Artificial Analysis using Playwright and outputs:
1. **Full-page screenshot** via message tool
2. **Formatted markdown tables** via message tool (Intelligence / Speed / Price / Key Benchmarks / Image Arena)

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

Send screenshot via message tool with `media: /tmp/ai-leaderboard.png`.

### Step 2: Send Markdown Report

Send via message tool with this exact format:

```markdown
能访问！这是 **Artificial Analysis** 的核心数据：

---

**🌐 是什么**

第三方 AI 分析平台，专注于模型性能评估、数据透明、选型建议。不附属于任何模型厂商。

---

**📊 三大核心榜单**

**1. Intelligence Index（智能指数）** — 综合10个评估维度

| 排名 | 模型 | 分数 |
|------|------|------|
| 1 | GPT-5.5 (xhigh) | 60 |
| 2 | Claude Opus 4.7 (max) | 57 |
| 2 | Gemini 3.1 Pro Preview | 57 |
| 4 | GPT-5.4 (xhigh) | 54 |
| 5 | Kimi K2.6 | 54 |
| 6 | DeepSeek V4 Pro (Max) | 52 |
| ... | MiniMax-M2.7 | 50 |

**2. Speed（输出速度）** — Tokens/秒

| 排名 | 模型 | 速度 |
|------|------|------|
| 1 | gpt-oss-120B | 209 tps |
| 2 | NVIDIA Nemotron 3 Super | 154 tps |
| 3 | Gemini 3.1 Pro Preview | 123 tps |
| 4 | Grok 4.20 0309 v2 | 115 tps |
| 5 | Kimi K2.6 | 112 tps |

**3. Price（价格）** — $/1M Tokens

| 排名 | 模型 | 价格 |
|------|------|------|
| 1 | gpt-oss-120B | $0.30 |
| 2 | NVIDIA Nemotron 3 Super | $0.40 |
| 3 | DeepSeek V4 Flash | $0.14 |
| 4 | DeepSeek V3.2 | $0.28 |
| 5 | Mistral Small 4 | $0.15 |

**📰 最新动态（近5天）**
- 24 Apr — DeepSeek V4 Pro/Flash 重回开源前列
- 23 Apr — GPT-5.5 成为新领袖模型
- 23 Apr — DeepSeek V4 全版本评测发布
- 20 Apr — Kimi K2.6 成为新开源第一
- 21 Apr — Claude Opus 4.7 评测上线

---

**网站地址：** https://artificialanalysis.ai

总体来说，这是目前最客观的第三方模型评估之一，数据更新快，覆盖广。
```

## Data Source

https://artificialanalysis.ai
Updated daily. 496 models tracked.
