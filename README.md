# Cocoon Breaker · 信息茧房冲破工具

[English](#english) | [中文](#中文)

---

## English

A browser extension (Edge / Chrome) that helps you **break out of algorithmic filter bubbles** by automatically searching diverse, random-domain keywords across multiple content platforms — and optionally auto-playing the results so you actually consume content outside your comfort zone.

### What Problem Does This Solve?

Recommendation algorithms trap you in an "information cocoon": they only show content similar to what you already watch. Over time, you stop seeing anything outside your bubble.

This tool **forcefully diversifies your feed** by:
- Generating keywords from 20+ domains (science, history, art, philosophy, sports, food, etc.)
- Searching those keywords across multiple platforms automatically
- Optionally auto-clicking and playing the first result so you actually watch it

### Features

- **AI-powered keyword generation** — Uses DeepSeek API to generate diverse search keywords across 20+ knowledge domains
- **Built-in fallback** — 120 pre-curated keywords work without any API key
- **7 platforms supported** — Bilibili, Douyin, Xiaohongshu, Zhihu, Weibo, Baidu, Toutiao
- **Single-tab mode** — Searches cycle through one tab (no tab explosion)
- **Auto-play mode** — Automatically clicks and plays the first search result, then moves to the next after a configurable watch duration
- **Configurable keyword count** — 25 / 50 / 100 or custom
- **Configurable DeepSeek model** — `deepseek-chat`, `deepseek-v4-flash`, `deepseek-v4-pro`, or any custom model name

### Installation

1. Open **Edge** and go to `edge://extensions/` (or **Chrome** → `chrome://extensions/`)
2. Enable **Developer mode** (toggle in the bottom-left)
3. Click **Load unpacked** and select the project folder
4. The extension icon appears in your toolbar

### Usage

1. Click the extension icon → popup opens
2. Click **「生成关键词」** to generate search keywords (via DeepSeek API or built-in fallback)
3. Check the platforms you want to search (all 7 selected by default)
4. Click **「开始搜索」** — the tool opens one tab and cycles through all searches
5. Watch the results flow in

### Settings (click the gear ⚙ icon)

| Setting | Description |
|---|---|
| DeepSeek API Key | Required for AI keyword generation. Get one free at [platform.deepseek.com](https://platform.deepseek.com/api_keys) |
| Model | `deepseek-chat`, `deepseek-v4-flash`, `deepseek-v4-pro`, or custom |
| Keyword Count | 25 / 50 / 100 or custom (5–200) |
| Auto-play | Auto-click first result and play content after each search |
| Watch Duration | How long to stay on each result (10–120 seconds) |
| Platforms | Select which platforms to search |
| Tab Interval | Delay between searches (when auto-play is off) |

### Tech Stack

- Manifest V3 browser extension
- Vanilla JavaScript (zero dependencies, no build step)
- DeepSeek API (OpenAI-compatible)
- Works on Edge and Chrome (Chromium-based)

---

## 中文

一款浏览器扩展（Edge / Chrome），通过 **在多个内容平台自动搜索不同领域的随机关键词** 来帮助你打破算法推荐形成的信息茧房——并可选择自动播放搜索结果，让你真正消费舒适区之外的内容。

### 解决什么问题？

推荐算法把你困在"信息茧房"里：只给你看和你已经看过的东西相似的内容。久而久之，你再也看不到茧房之外的任何信息。

这个工具通过以下方式**强制多样化你的信息流**：
- 从 20+ 个领域（科学、历史、艺术、哲学、体育、美食等）生成搜索关键词
- 在多个平台自动搜索这些关键词
- 可选择自动点击并播放第一条结果，让你真正看进去

### 功能

- **AI 生成关键词** — 调用 DeepSeek API 在 20+ 个知识领域生成多样化搜索关键词
- **内置备用词库** — 120 个精心筛选的关键词，无需 API Key 也能使用
- **支持 7 个平台** — B站、抖音、小红书、知乎、微博、百度、头条
- **单标签页轮巡** — 所有搜索在一个标签页中循环刷新（不会开几百个标签页）
- **自动播放模式** — 搜完后自动点击播放第一个结果，停留指定时长后切换到下一个搜索
- **可配置关键词数量** — 25 / 50 / 100 或自定义
- **可配置 DeepSeek 模型** — `deepseek-chat`、`deepseek-v4-flash`、`deepseek-v4-pro` 或自定义模型名

### 安装

1. 打开 **Edge** → `edge://extensions/`（或 **Chrome** → `chrome://extensions/`）
2. 打开左下角 **「开发人员模式」**
3. 点击 **「加载解压缩的扩展」**，选择项目文件夹
4. 工具栏出现扩展图标

### 使用方法

1. 点击扩展图标 → 弹出窗口
2. 点击 **「生成关键词」** 生成搜索词（调 DeepSeek API 或使用内置词库）
3. 勾选要搜索的平台（默认全选 7 个）
4. 点击 **「开始搜索」** → 工具打开一个标签页，在上面循环搜索
5. 坐等多元内容刷进来

### 设置（点齿轮 ⚙ 图标）

| 设置项 | 说明 |
|---|---|
| DeepSeek API Key | AI 生成关键词需要。在 [platform.deepseek.com](https://platform.deepseek.com/api_keys) 免费申请 |
| 模型选择 | `deepseek-chat`、`deepseek-v4-flash`、`deepseek-v4-pro` 或自定义 |
| 关键词数量 | 25 / 50 / 100 或自定义（5–200） |
| 自动播放 | 每次搜索后自动点开第一个结果播放内容 |
| 观看时长 | 每个结果停留多久再切换（10–120 秒） |
| 默认平台 | 选择要搜索的平台 |
| 标签页间隔 | 搜索切换间隔（关闭自动播放时生效） |

### 技术栈

- Manifest V3 浏览器扩展
- 原生 JavaScript（零依赖、无需构建）
- DeepSeek API（OpenAI 兼容接口）
- 支持 Edge 和 Chrome（Chromium 内核）
