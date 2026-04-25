---
name: ai-leaderboard
description: Fetches AI model rankings from Artificial Analysis (artificialanalysis.ai) including Intelligence Index, Speed, Price, and individual benchmarks. Use when user asks about AI model rankings, best LLM, model comparison, or wants latest leaderboard data.
version: "1.1"
author: Judy (朱迪)
license: MIT
---

# AI Leaderboard Skill

Fetches real-time AI model rankings from Artificial Analysis using Playwright and outputs data formatted for Feishu table display.

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

### Step 1: Fetch Data

Run the fetcher script:
```bash
node /root/.openclaw/workspace/.agents/skills/ai-leaderboard/scripts/fetch_leaderboard.js
```

### Step 2: Format for Feishu

The script outputs data as **Feishu interactive card** with table elements.

Send using the message tool:
```
action: send
channel: feishu
target: ou_13198dff86df39f443084c8dc460d89f  (user's open_id)
msg_type: interactive
content: <feishu_card_json>
```

### Step 3: Feishu Card Format

Use Feishu interactive card with `table` element:

```json
{
  "msg_type": "interactive",
  "card": {
    "header": {
      "title": { "tag": "plain_text", "content": "🏆 AI 排行榜 · YYYY-MM-DD" },
      "template": "blue"
    },
    "elements": [
      {
        "tag": "table",
        "columns": [
          { "title": "排名", "width": 50 },
          { "title": "模型", "width": 200 },
          { "title": "综合分", "width": 80 },
          { "title": "速度", "width": 80 },
          { "title": "价格", "width": 100 }
        ],
        "elements": [
          { "tag": "tr", "cells": ["1", "GPT-5.5", "60", "74", "$11.30"] },
          ...
        ]
      }
    ]
  }
}
```

### Alternative: Rich Text Table

If card table is not available, send as formatted text with clear column separation using `|`.

## Data Source

https://artificialanalysis.ai

Updated daily. Data reflects the latest independent evaluations run by Artificial Analysis.
