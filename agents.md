# Design OS 代理指令

Design OS 是一个**产品规划与设计工具**，帮助用户定义产品愿景 (Product Vision)、规划数据模型 (Data Shape)、设计 UI，并为在独立代码库中实施准备导出包。

> **重要提示**: Design OS 是一个规划工具，而非最终产品的代码库。这里生成的界面设计 (Design Screen) 和组件旨在被导出并集成到你实际产品的代码库中。

---

## 理解 Design OS 上下文

在 Design OS 中工作时，请注意两个不同的上下文：

### 1. Design OS 应用程序 (Application)
显示和管理规划文件的 React 应用程序。修改 Design OS UI 本身时：
- 文件位于 `src/`（组件、页面、工具函数）
- 使用 Design OS 设计系统（stone 色板、DM Sans 字体等）
- 提供查看规范、界面设计 (Design Screen)、导出等功能的界面

### 2. 产品设计 (Product Design - 界面设计 (Design Screen) 与导出)
你正在规划和设计的产品。创建界面设计 (Design Screen) 和导出时：
- 界面设计 (Design Screen) 组件位于 `src/sections/[section-name]/` 和 `src/shell/`
- 产品定义文件位于 `product/`
- 导出文件打包至 `product-plan/`，以便集成到独立代码库中
- 遵循每个模块规范中指定的设计要求

---

## 快速开始 — 规划流程

Design OS 遵循结构化的规划序列：

### 1. 产品愿景 (Product Vision) (`/product-vision`)
在一次对话流中定义你的产品概览、路线图模块和数据模型 (Data Shape)。在回答完澄清性问题后，这三个文件将自动生成。
**输出:** `product/product-overview.md`, `product/product-roadmap.md`, `product/data-shape/data-shape.md`

在初始创建后，使用 `/product-roadmap` 和 `/data-shape` 分别更新这些文件。

### 2. 原子设计 (Design Tokens) (`/design-tokens`)
选择你的色板（来自 Tailwind）和字体（来自 Google Fonts）。这些原子 (Tokens) 将应用于所有界面设计 (Design Screen)。
**输出:** `product/design-system/colors.json`, `product/design-system/typography.json`

### 3. 容器设计 (Shell Design) (`/design-shell`)
设计包装所有模块的持久导航和布局。
**输出:** `product/shell/spec.md`, `src/shell/components/`

### 4. 针对每个模块 (Section):
- `/shape-section` — 定义规范并生成示例数据 + 类型
- `/sample-data` — 更新示例数据和类型（如果已创建）
- `/design-screen` — 创建界面设计 (Design Screen)
- `/screenshot-design` — 截取屏幕截图

### 5. 导出 (`/export-product`)
生成包含所有组件、类型和交付文档的完整导出包。
**输出:** `product-plan/`

---

## 文件结构

```
product/                           # 产品定义 (可移植)
├── product-overview.md            # 产品描述、问题/解决方案、功能点
├── product-roadmap.md             # 模块路线图列表（标题与描述）
│
├── data-shape/                    # 产品数据模型 (Data Shape)
│   └── data-shape.md              # 实体名称、描述及关系
│
├── design-system/                 # 原子设计 (Design Tokens)
│   ├── colors.json                # { 主色, 辅助色, 中性色 }
│   └── typography.json            # { 标题, 正文, 等宽 }
│
├── shell/                         # 容器 (Shell)
│   └── spec.md                    # 容器规范
│
└── sections/
    └── [section-name]/
        ├── spec.md                # 模块规范
        ├── data.json              # 界面设计 (Design Screen) 的示例数据
        ├── types.ts               # TypeScript 接口
        └── *.png                  # 屏幕截图

src/
├── shell/                         # 容器设计 (Shell Design) 组件
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── MainNav.tsx
│   │   ├── UserMenu.tsx
│   │   └── index.ts
│   └── ShellPreview.tsx
│
└── sections/
    └── [section-name]/
        ├── components/            # 可导出的组件
        │   ├── [Component].tsx
        │   └── index.ts
        └── [ViewName].tsx         # 预览包装器

product-plan/                      # 导出包 (生成的)
├── README.md                      # 快速入门指南
├── product-overview.md            # 产品摘要
├── prompts/                       # 供编码代理使用的就绪提示词
│   ├── one-shot-prompt.md         # 全量实施提示词
│   └── section-prompt.md          # 增量实施的提示词模板
├── instructions/                  # 实施指南
│   ├── one-shot-instructions.md   # 合并的所有里程碑指南
│   └── incremental/               # 按里程碑划分的实施指南
│       ├── 01-shell.md
│       └── [NN]-[section-id].md   # 模块特定指南
├── design-system/                 # 原子设计 (Design Tokens)、颜色、字体
├── data-shapes/                   # UI 数据契约（组件期望的类型）
├── shell/                         # 容器组件
└── sections/                      # 模块组件（每个包含 tests.md）
```

---

## 设计要求

创建界面设计 (Design Screen) 时，请遵循以下准则：

- **移动端响应式**: 使用 Tailwind 的响应式前缀（`sm:`, `md:`, `lg:`, `xl:`）确保布局适配不同屏幕尺寸。

- **亮色与暗色模式**: 为所有颜色使用 `dark:` 变体。测试 UI 元素在两种模式下是否清晰可见。

- **使用原子设计 (Design Tokens)**: 如果定义了原子 (Tokens)，请应用产品的色板和字体。否则，默认使用 `stone` 作为中性色，`lime` 作为强调色。

- **基于 Props 的组件**: 所有界面设计 (Design Screen) 组件必须通过 props 接收数据和回调。严禁在可导出组件中直接导入数据。

- **模块设计中不含导航**: 模块界面设计 (Design Screen) 不应包含导航框架。导航由容器 (Shell) 统一处理。

---

## Tailwind CSS 指令

这些规则适用于 Design OS 应用程序及其生成的界面设计 (Design Screen)/组件：

- **Tailwind CSS v4**: 始终使用 Tailwind CSS v4（而非 v3）。不要参考或创建 v3 模式。

- **无 tailwind.config.js**: Tailwind CSS v4 不使用 `tailwind.config.js` 文件。严禁参考、创建或修改该文件。

- **使用内置工具类**: 避免编写自定义 CSS。所有样式均应使用 Tailwind 的内置工具类。

- **使用内置颜色**: 避免定义自定义颜色。使用 Tailwind 的内置颜色工具类（例如 `stone-500`, `lime-400`, `red-600`）。

---

## 四大支柱

Design OS 围绕四个主要领域组织：

1. **产品概览 (Product Overview)** — “是什么”及“为什么”
   - 产品名称与描述
   - 问题与解决方案
   - 核心功能
   - 模块/路线图

2. **数据模型 (Data Shape)** — 系统的“名词”
   - 核心实体名称与描述
   - 实体间的逻辑关系
   - 用于确保各模块命名一致的共享词汇表

3. **原子设计 (Design Tokens)** — “外观与感受”
   - 色板（Tailwind 颜色）
   - 字体（Google Fonts）

4. **容器设计 (Shell Design)** — 持久框架
   - 全局导航结构
   - 用户菜单
   - 布局模式

外加 **模块 (Sections)** — 单独的功能点，每个包含规范、数据，并进行界面设计 (Design Screen)。

---

## 设计系统范围

Design OS 区分了其自身 UI 与所设计产品之间的关注点：

- **Design OS UI**: 始终使用 stone/lime 色板和 DM Sans 字体
- **产品界面设计 (Design Screen)**: 使用为产品定义的动态原子 (Tokens)（如有）
- **Shell**: 使用产品原子 (Tokens) 来预览完整的应用体验

---

## 导出与交付

使用 `/export-product` 命令生成 UI 设计交付包：

- **就绪提示词**: 预先写好的提示词，可直接复制到编码代理中
  - `one-shot-prompt.md`: 用于在一次会话中完成全量实施
  - `section-prompt.md`: 模块化实施的模板
- **实施指南**: 专注于 UI 的里程碑指南
  - `product-overview.md`: 始终提供作为背景信息
  - `one-shot-instructions.md`: 合并的所有里程碑指南
  - `instructions/incremental/` 下的增量指南
- **测试规范**: 每个模块包含 `tests.md`，规定 UI 行为规范
- **便携组件**: 基于 Props，适用于任何 React 设置
- **数据模型 (Data Shape)**: TypeScript 接口，定义组件期望的数据格式

交付物专注于 UI 设计、产品要求和用户流程。后端架构、建模和业务逻辑决策留给实施代理（Implementation Agent）。提示词会引导代理在构建前询问技术栈及相关要求的澄清问题。

---

## 设计系统（Design OS 应用程序本身）

Design OS 应用程序本身采用“精炼实用 (Refined Utility)”审美：

- **排版**: 标题和正文使用 DM Sans，代码使用 IBM Plex Mono
- **颜色**: Stone 色板用于中性色（暖灰色），lime（青柠）用于强调色
- **布局**: 内容宽度最大 800px，留白充足
- **卡片**: 极简边框 (1px)，微妙投影，内边距充足
- **动态**: 微妙的淡入效果 (200ms)，无回弹动画
