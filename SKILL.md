---
name: ai-leaderboard
description: Fetches AI model rankings from Artificial Analysis (artificialanalysis.ai) including Intelligence Index, Speed, Price, and individual benchmarks. Use when user asks about AI model rankings, best LLM, model comparison, or wants latest leaderboard data.
version: "1.0"
author: Judy (朱迪)
license: MIT
---

# AI Leaderboard Skill

Fetches real-time AI model rankings from Artificial Analysis using Playwright and outputs structured markdown tables.

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

### Step 2: Output

The script outputs formatted markdown tables covering:
- Intelligence Index (综合智能指数)
- Speed Rankings (速度排行榜)
- Price Rankings (价格排行榜)
- Individual Benchmark results (细项测评)
- Image Arena rankings (图生图排行榜)

### Step 3: Presentation

Present tables in markdown format. Include source URL at the bottom.

## Data Source

https://artificialanalysis.ai

Updated daily. Data reflects the latest independent evaluations run by Artificial Analysis.
