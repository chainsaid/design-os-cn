# 什么是 Design OS？

Design OS 是你的产品想法与最终代码库之间那块“失落的拼图”。

它是一个产品规划与设计工具，帮助你定义产品愿景 (Product Vision)、勾勒数据模型 (Data Shape)、设计 UI，并导出生产就绪的组件以供开发。与其直接埋头写代码，不如通过它提供的引导式流程来捕捉你要构建的内容及其核心原因——然后将你编码代理（AI Coding Agent）所需的一切精准交付，确保它能构建出正确的产品。

## 问题所在

AI 编码工具在快速构建方面表现惊人。但结果往往偏离目标。你描述了需求，代理构建了*一些东西*，但那并不是你预想的样子。UI 看起来千篇一律。功能只实现了一半。最后你发现，你花在修复和纠正方向上的时间，居然和自己动手写代码的时间一样多。

**核心问题：** 我们在要求编码代理搞清楚“构建什么”的同时完成“构建”。设计决策是临时做出的，埋没在代码深处，如果不推倒重来就根本无法调整。没有规范，没有共识，也没有一个关于“什么叫已完成”的唯一事实来源。

## Design OS 流程

Design OS 驱动一个引导式的设计与架构流程。你与 AI 协作，通过结构化的步骤进行工作：

1. **产品规划 (Product Planning)** — 定义愿景，分解路线图，并进行数据模型 (Data Shape) 规划。
2. **原子设计 (Design Tokens)** — 选择颜色、排版，并进行容器设计 (Shell Design)。
3. **模块设计 (Section Design)** — 针对每个功能区域：指定要求，生成示例数据，并进行界面设计 (Design Screen)。
4. **导出 (Export)** — 生成一个完整的交付包用于实施。

每一步都是一场对话。AI 提出问题，你提供指导，共同打造一个符合你愿景的产品——在任何实际编码开始之前。

## 工作原理

Design OS 本身是一个独立的代库——它是你在开始构建产品*之前*使用的设计环境。当你完成后，你可以导出组件和资源，并将其导入到你实际产品的代码库中。

你通过斜杠命令 (slash commands) 与 Design OS 交互，每个命令都会引导你完成流程的特定部分：

- `/product-vision` — 定义产品 (Product Vision)、分解模块并勾勒数据模型 (Data Shape) —— 一步到位。
- `/design-tokens` — 进行原子设计 (Design Tokens)，选择色板和排版字体。
- `/design-shell` — 进行容器设计 (Shell Design)，设计导航和整体布局。
- `/shape-section` — 定义模块范围、要求，并生成示例数据 + 类型 (Section Design)。
- `/design-screen` — 创建界面设计 (Design Screen) 生产就绪的 React 组件。
- `/screenshot-design` — 截取完成的界面设计 (Design Screen) 快照，以便快速参考。
- `/export-product` — 生成完整的交付包 (Export)。
- `/product-roadmap` — 更新产品模块（初始创建后）。
- `/data-shape` — 更新数据模型 (Data Shape)（初始创建后）。
- `/sample-data` — 更新示例数据和类型（初始创建后）。

请参阅 [使用指南 (Usage)](usage.md) 了解完整工作流。

## 适用人群

- **技术构建者 (Technical builders)** — 在不用亲力亲为处理所有细碎琐事的情况下，对架构和设计决策拥有完全的掌控力。
- **非技术产品构建者 (Non-technical product builders)** — 即使没有技术背景，也能对产品的运作方式拥有强有力的愿景，并能将其烙印在产品的系统底层。

## 兼容性

- 适用于任何 AI 编码代理：Claude Code, Cursor, Copilot，或者任何能根据交付包进行实施的工具。
- 你的前端需要使用 React 和 Tailwind CSS。
- 你的后端可以是任何技术——Rails, Laravel, Next.js, Python 等。

## 开源

Design OS 是免费、开源的，且在本地运行。
