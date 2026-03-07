# 产品导出 (Export Product)

你正在协助用户将其完整的产品设计导出为交付包（Handoff Package）以供实施。这将生成将 UI 设计集成到真实代码库所需的所有文件。

## 第 1 步：检查先决条件

确认是否满足最低要求：

**必需：**
- `/product/product-overview.md` — 产品概览
- `/product/product-roadmap.md` — 已定义的模块
- 至少有一个模块在 `src/sections/[section-id]/` 中拥有界面设计 (Design Screen)

**建议（如果缺失则显示警告）：**
- `/product/data-shape/data-shape.md` — 产品实体
- `/product/design-system/colors.json` — 颜色原子 (Tokens)
- `/product/design-system/typography.json` — 排版原子 (Tokens)
- `src/shell/components/AppShell.tsx` — 容器 (Shell)

如果缺少必需文件：

“要导出你的产品，你至少需要：
- 产品概览 (`/product-vision`)
- 包含模块的路线图 (`/product-roadmap`)
- 至少一个带有界面设计 (Design Screen) 的模块

请先完成这些内容。”

如果缺少必需文件，请停止操作。

如果缺少建议的文件，显示警告但继续进行：

“注意：缺少一些建议项：
- [ ] 产品实体 — 运行 `/data-shape` 以获得一致的实体命名
- [ ] 原子设计 (Design Tokens) — 运行 `/design-tokens` 以获得一致的风格
- [ ] 容器设计 (Shell Design) — 运行 `/design-shell` 以获得导航结构

你可以继续导出，但这些项有助于确保交付的完整性。”

## 第 2 步：收集导出信息

阅读所有相关文件：

1. `/product/product-overview.md` — 产品名称、描述、功能
2. `/product/product-roadmap.md` — 按顺序排列的模块列表
3. `/product/data-shape/data-shape.md` (如果存在)
4. `/product/design-system/colors.json` (如果存在)
5. `/product/design-system/typography.json` (如果存在)
6. `/product/shell/spec.md` (如果存在)
7. 针对每个模块：`spec.md`, `data.json`, `types.ts`
8. 列出 `src/sections/` 和 `src/shell/` 中的界面设计 (Design Screen) 组件

## 第 3 步：创建导出目录结构

创建 `product-plan/` 目录，其结构如下：

```
product-plan/
├── README.md                    # 快速入门指南
├── product-overview.md          # 产品摘要（始终提供）
│
├── prompts/                     # 供编码代理使用的就绪提示词
│   ├── one-shot-prompt.md       # 全量实施演示提示词
│   └── section-prompt.md        # 模块化实施的提示词模板
│
├── instructions/                # 实施指南
│   ├── one-shot-instructions.md # 合并的所有里程碑指南
│   └── incremental/             # 按里程碑划分的实施指南
│       ├── 01-shell.md
│       ├── 02-[第一个模块].md
│       ├── 03-[第二个模块].md
│       └── ...
│
├── design-system/               # 原子设计 (Design Tokens)
│   ├── tokens.css
│   ├── tailwind-colors.md
│   └── fonts.md
│
├── data-shapes/                 # UI 数据契约
│   ├── README.md
│   └── overview.ts
│
├── shell/                       # 容器组件
│   ├── README.md
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── MainNav.tsx
│   │   ├── UserMenu.tsx
│   │   └── index.ts
│   └── screenshot.png (如果存在)
│
└── sections/                    # 模块组件
    └── [section-id]/
        ├── README.md
        ├── tests.md               # UI 行为测试规范
        ├── components/
        │   ├── [Component].tsx
        │   └── index.ts
        ├── types.ts
        ├── sample-data.json
        └── screenshot.png (如果存在)
```

## 第 4 步：生成 product-overview.md

创建 `product-plan/product-overview.md`：

```markdown
# [产品名称] — 产品概览

## 摘要

[来自 product-overview.md 的产品描述]

## 计划模块

[来自路线图的排序列表，包含描述]

1. **[模块 1]** — [描述]
2. **[模块 2]** — [描述]
...

## 产品实体

[如果存在数据模型 (Data Shape)：列出实体名称和简要描述]
[如果不存在：“实体将在实施过程中定义”]

## 原子设计 (Design Tokens)

**颜色：**
- 主色: [颜色 或 “未定义”]
- 辅助色: [颜色 或 “未定义”]
- 中性色: [颜色 或 “未定义”]

**排版字体：**
- 标题: [字体 或 “未定义”]
- 正文: [字体 或 “未定义”]
- 等宽: [字体 或 “未定义”]

## 实施序列

分里程碑构建此产品：

1. **容器 (Shell)** — 设置原子设计 (Design Tokens) 和容器设计 (Shell Design)
2. **[模块 1]** — [简要描述]
3. **[模块 2]** — [简要描述]
...

每个里程碑在 `product-plan/instructions/` 中都有专门的指南文档。
```

## 第 5 步：生成里程碑指南

每个里程碑指南文档都应以以下前言开头（根据具体里程碑调整细节）：

```markdown
---

## 关于本次交付

**你收到的是：**
- 已完成的 UI 设计（带完整样式的 React 组件）
- 产品要求和用户流程规范
- 原子设计 (Design Tokens)（颜色、排版）
- 展示组件期望数据格式的示例数据
- 专注于用户端行为的测试规范

**你的工作：**
- 将这些组件集成到你的应用程序中
- 将回调 props 连接到你的路由和业务逻辑
- 用来自后端的真实数据替换示例数据
- 实现加载中、错误及空状态

这些组件是基于 props 的 —— 它们接受数据并触发回调。如何构建后端、数据层和业务逻辑由你决定。

---
```

### 01-shell.md

存放在 `product-plan/instructions/incremental/01-shell.md`：

```markdown
# 里程碑 1：容器 (Shell)

> **配套提供：** `product-overview.md`
> **先决条件：** 无

[包含上述前言]

## 目标

设置原子设计 (Design Tokens) 和容器设计 (Shell Design) —— 包装所有模块的持久框架。

## 需要实现的内容

### 1. 原子设计 (Design Tokens)

[如果存在原子设计 (Design Tokens)：]
使用这些原子 (Tokens) 配置你的样式系统：

- CSS 变量见 `product-plan/design-system/tokens.css`
- Tailwind 配置见 `product-plan/design-system/tailwind-colors.md`
- Google Fonts 设置见 `product-plan/design-system/fonts.md`

[如果不存在：]
根据你的品牌准则定义自己的原子设计 (Design Tokens)。

### 2. 容器设计 (Shell Design)

[如果存在容器 (Shell)：]

将 `product-plan/shell/components/` 中的容器组件复制到你的项目中：

- `AppShell.tsx` — 主容器包装器
- `MainNav.tsx` — 导航组件
- `UserMenu.tsx` — 带头像的用户菜单

**连接导航：**

将导航连接到你的路由系统：

[列出外壳规范中的导航项]

**用户菜单：**

用户菜单预期接收：
- 用户姓名
- 头像 URL（可选）
- 退出登录回调

[如果容器不存在：]

自行设计并实现一个容器 (Shell)，包含：
- 涵盖所有模块的导航
- 用户菜单
- 响应式布局

## 需参考的文件

- `product-plan/design-system/` — 原子设计 (Design Tokens)
- `product-plan/shell/README.md` — 容器设计意图
- `product-plan/shell/components/` — 容器 React 组件
- `product-plan/shell/screenshot.png` — 设计效果图

## 完成标准

- [ ] 原子设计 (Design Tokens) 已配置
- [ ] 容器带着导航栏正常渲染
- [ ] 导航链接指向正确的路由
- [ ] 用户菜单显示用户信息
- [ ] 移动端适配正常
```

### [NN]-[section-id].md (针对每个模块)

存放在 `product-plan/instructions/incremental/[NN]-[section-id].md`（第一个模块从 02 开始）：

```markdown
# 里程碑 [N]：[模块标题]

> **配套提供：** `product-overview.md`
> **先决条件：** 里程碑 1 (Shell) 已完成，以及之前的模块里程碑已完成

[包含上述前言]

## 目标

实现 [模块标题] 功能 —— [来自路线图的简要描述]。

## 概览

[一段描述此模块允许用户做什么的内容。从用户视角出发，体现其价值。提取自 spec.md 概览。]

**关键功能点：**
- [功能点 1 — 例如，“查看所有项目的列表及其状态指示器”]
- [功能点 2 — 例如，“创建包含名称、描述和截止日期的新项目”]
...

[列出 3-6 个 UI 组件支持的关键能力]

## 提供的组件

从 `product-plan/sections/[section-id]/components/` 复制模块组件：

[列出组件及其简要说明]

## Props 参考

组件期望以下数据模型 (Data Shape)（详见 `types.ts`）：

**数据 Props：**

[来自 types.ts 的关键类型 — 简要展示主接口]

**回调 Props：**

| 回调 | 触发时机 |
|----------|---------------|
| `onView` | 用户点击查看详情时 |
| `onEdit` | 用户点击编辑时 |
| `onDelete` | 用户点击删除时 |
| `onCreate` | 用户点击创建新项时 |

[根据实际 Props 接口进行调整]

## 预期用户流程

完整实现后，用户应能完成以下流程：

### 流程 1：[主要流程名称 — 例如，“创建一个新项目”]

1. 用户 [开始动作 — 例如，“点击‘新项目’按钮”]
2. 用户 [下一步 — 例如，“填写项目名称和描述”]
3. 用户 [下一步 — 例如，“点击‘创建’保存”]
4. **结果：** [预期结果 — 例如，“新项目显示在列表中”]

...

[包含 2-4 个涵盖该模块主要用户旅程的流程。参考组件中的具体 UI 元素和按钮标签。]

## 空状态 (Empty States)

组件包含空状态设计。请务必处理：

- **尚无数据：** 当主列表/集合为空时显示空状态 UI
- **无关联记录：** 处理关联记录不存在的情况（例如：没有任务的项目）
- **首次体验：** 引导用户通过清晰的 CTA 创建他们的第一个条目

## 测试

详见 `product-plan/sections/[section-id]/tests.md` 中的 UI 行为测试规范，涵盖：
- 用户流程的成功与失败路径
- 空状态渲染
- 组件交互与边界情况

## 需参考的文件

- `product-plan/sections/[section-id]/README.md` — 功能概览与设计意图
- `product-plan/sections/[section-id]/tests.md` — UI 行为测试规范
- `product-plan/sections/[section-id]/components/` — React 组件
- `product-plan/sections/[section-id]/types.ts` — TypeScript 接口
- `product-plan/sections/[section-id]/sample-data.json` — 测试数据
- `product-plan/sections/[section-id]/screenshot.png` — 视觉参考图

## 完成标准

- [ ] 组件使用真实数据渲染
- [ ] 无记录时空状态显示正常
- [ ] 所有回调 props 已连接到实际功能
- [ ] 用户可以完整完成所有预期流程
- [ ] 与视觉设计匹配（见截图）
- [ ] 移动端适配正常
```

## 第 6 步：生成 one-shot-instructions.md

将所有里程碑内容合并到一个文档中创建 `product-plan/instructions/one-shot-instructions.md`。在最顶部包含前言：

```markdown
# [产品名称] — 完整实施指南

---

## 关于本次交付

[包含完整前言]

---

## 测试

每个模块都包含一个 `tests.md` 文件，规定了 UI 行为测试规范。这些是**框架无关**的 —— 请将其适配到你的测试设置中。

**针对每个模块：**
1. 阅读 `product-plan/sections/[section-id]/tests.md`
2. 为关键用户流程编写测试（成功与失败路径）
3. 实施功能使测试通过
4. 在保持测试通过的情况下进行重构

---

[包含来自 product-overview.md 的内容]

---

# 里程碑 1：容器 (Shell)

[包含 01-shell.md 的内容，不含前言]

---

# 里程碑 2：[第一个模块名称]

[包含第一个模块的交付内容，不含前言]

[重复所有模块，递增里程碑编号]
```

## 第 7 步：复制并转换组件

### 容器组件 (Shell Components)

从 `src/shell/components/` 复制到 `product-plan/shell/components/`：
- 将导入路径从 `@/...` 转换为相对路径
- 移除任何 Design OS 特有的导入
- 确保组件是自包含的

### 模块组件 (Section Components)

针对每个模块，从 `src/sections/[section-id]/components/` 复制到 `product-plan/sections/[section-id]/components/`：
- 转换导入路径：将 `@/../product/sections/[section-id]/types` 转换为 `../types`
- 移除 Design OS 特有的导入
- 仅保留可导出的组件（而非预览包装器）

### 类型文件 (Types Files)

将 `product/sections/[section-id]/types.ts` 复制到 `product-plan/sections/[section-id]/types.ts`。

### 示例数据 (Sample Data)

将 `product/sections/[section-id]/data.json` 复制到 `product-plan/sections/[section-id]/sample-data.json`。

## 第 8 步：生成模块 README

为每个模块创建 `product-plan/sections/[section-id]/README.md`：

```markdown
# [模块标题]

## 概览
[来自 spec.md 的概览]

## 用户流程
[来自 spec.md 的用户流程]

## 设计决策
[界面设计 (Design Screen) 中值得注意的交互或状态]
[导出组件如何映射到此模块]
[关于数据如何映射到 props 的特别说明]

## 视觉参考
查看 `screenshot.png` 以获取目标 UI 设计。

## 提供的组件
- `[组件名]` — [简要说明]

## 回调 Props
| 回调 | 触发时机 |
|----------|---------------|
...
```

## 第 9 步：生成模块测试指令

为每个模块创建 `product-plan/sections/[section-id]/tests.md`。

```markdown
# 测试规范：[模块标题]

这些测试规范是**框架无关**的。请将其适配到你的测试设置（Jest, Vitest, Playwright, RTL 等）。

## 概览
[此模块的功能及关键测试点描述]

---

## 用户流程测试

### 流程 1：[主要流程名称]
**场景：** [用户试图完成的具体任务描述]

#### 成功路径
...

#### 失败路径：[具体失败场景]
...

---

## 空状态测试
...

## 组件交互测试
...
```

## 第 10 步：生成原子设计文件 (Atomic Design Files)

### tokens.css
```css
/* [产品名称] 的原子 (Tokens) */
:root {
  --color-primary: [Tailwind 颜色];
  ...
}
```

### tailwind-colors.md
```markdown
# Tailwind 颜色配置
**主色：** `[颜色]` — 用于按钮、链接、核心强调
...
```

### fonts.md
```markdown
# 排版字体配置
## Google Fonts 导入
[HTML 导入代码]
...
```

## 第 11 步：生成数据契约文件

### data-shapes/README.md
```markdown
# UI 数据契约
这些类型定义了 UI 组件期望作为 props 接收的数据形状。它们代表了**前端契约**。
...
```

### data-shapes/overview.ts
汇总所有模块的数据接口（不含 Props 接口）。

## 第 12 步：生成提示词文件 (Prompt Files)

在 `product-plan/prompts/` 目录下创建两个就绪提示词文件。

### one-shot-prompt.md

创建 `product-plan/prompts/one-shot-prompt.md`：

```markdown
# 全量实施提示词 (One-Shot Implementation Prompt)

我需要你根据我提供的详细 UI 设计和产品规范，实现一个完整的 Web 应用程序。

## 指令

请仔细阅读并分析以下文件：

1. **@product-plan/product-overview.md** — 包含模块和实体概览的产品摘要
2. **@product-plan/instructions/one-shot-instructions.md** — 包含所有里程碑的完整实施指南

阅读完这些后，还要审查：
- **@product-plan/design-system/** — 颜色和排版原子 (Tokens)
- **@product-plan/data-shapes/** — UI 数据契约（组件期望的数据格式）
- **@product-plan/shell/** — 容器组件
- **@product-plan/sections/** — 所有模块的组件、类型、示例数据和测试规范

## 在你开始之前

在审查完所有提供的文件后，请向我询问以下方面的澄清问题：

1. **我的技术栈** — 我正在使用的框架、语言和工具，以及任何现有的代码库约定
2. **身份验证与用户** — 用户应如何注册、登录，以及存在哪些权限
3. **产品要求** — 规范或用户流程中任何需要澄清的内容
4. **其他事项** — 你在实施前需要了解的任何信息

最后，询问我对于本次实施是否有任何额外的备注。

一旦我回答了你的问题，请在编码前创建一个全面的实施计划。
```

### section-prompt.md

创建 `product-plan/prompts/section-prompt.md`：

```markdown
# 模块实施提示词 (Section Implementation Prompt)

## 定义模块变量

- **SECTION_NAME** = [易读名称，例如：“发票” 或 “项目仪表板”]
- **SECTION_ID** = [sections/ 中的文件夹名，例如：“invoices” 或 “project-dashboard”]
- **NN** = [里程碑编号，例如：“02” 或 “03” — 模块从 02 开始，因为 01 是 Shell]

---

我需要你实现我应用程序中的 **SECTION_NAME** 模块。

## 指令

请仔细阅读并分析以下文件：

1. **@product-plan/product-overview.md** — 提供整体背景的产品摘要
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md** — 本模块的具体指南

同时审查模块资源：
- **@product-plan/sections/SECTION_ID/README.md** — 功能概览与设计意图
- **@product-plan/sections/SECTION_ID/tests.md** — UI 行为测试规范
- **@product-plan/sections/SECTION_ID/components/** — 要集成的 React 组件
- **@product-plan/sections/SECTION_ID/types.ts** — TypeScript 接口
- **@product-plan/sections/SECTION_ID/sample-data.json** — 测试数据

## 在你开始之前

在审查完所有提供的文件后，请向我询问以下方面的澄清问题：

1. **集成** — 本模块如何与现有功能以及已构建的 API 连接
2. **产品要求** — 规范或用户流程中任何需要澄清的内容
3. **其他事项** — 你在实施前需要了解的任何信息

最后，询问我对于本次实施是否有任何额外的备注。

一旦我回答了你的问题，请开始实施。
```

## 第 13 步：生成 README.md

创建 `product-plan/README.md`，这是一份交付总览和快速入门指南，详细说明如何使用生成的提示词和资源进行后续开发。

## 第 14 步：复制截图
复制 `product/shell/` 和 `product/sections/[section-id]/` 下的 `.png` 文件至对应导出目录。

## 第 15 步：创建 Zip 文件
使用 Bash 命令将 `product-plan/` 文件夹打包为 `product-plan.zip`。

## 第 16 步：确认完成

告知用户导出已完成，并提供详细的后续使用说明（简体中文）。
（由于 export-product.md 主要是指令逻辑，我在此处将输出总结也进行了本地化处理。）
