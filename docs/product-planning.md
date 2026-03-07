# 产品规划 (Product Planning)

Design OS 的第一阶段是为你的产品奠定基础。在进行任何界面设计 (Design Screen) 之前，请务必完成这些步骤。

## 1. 产品愿景 (Product Vision)

```
/product-vision
```

通过对话流程定义产品的核心身份。你将确定：

- **产品名称** — 一个清晰、好记的名字。
- **描述** — 用 1-3 句话捕捉产品的精髓。
- **问题与解决方案** — 你正在解决哪些痛点，以及如何解决。
- **关键功能** — 使其成为可能的主要能力。
- **路线图模块** — 你产品的 3-5 个独立功能区域。
- **数据模型 (Data Shape)** — 核心实体（“名词”）及其关联方式。

分享你对于要构建的内容的任何笔记、想法或粗略构思。AI 会提出澄清性问题，涵盖你的愿景、产品的主要区域以及用户将与之交互的核心事物。一旦获得足够的信息，它会自动编写所有对应的三个文件。

**创建文件：**
- `product/product-overview.md` — 产品描述、问题/解决方案、功能点。
- `product/product-roadmap.md` — 按开发优先级排序的 3-5 个模块。
- `product/data-shape/data-shape.md` — 核心实体及关系。

**稍后可单独更新的命令：**
- `/product-roadmap` — 添加、删除或重新排序模块。
- `/data-shape` — 添加、删除或更新实体及关系。

---

## 2. 原子设计 (Design Tokens)

```
/design-tokens
```

选择你的视觉身份：

### 颜色 (Colors)

从 Tailwind 的内置色板中选择：

- **主色 (Primary)** — 用于按钮、链接、关键操作的主要强调色（例如：`blue`, `indigo`, `emerald`, `lime`）。
- **辅助色 (Secondary)** — 用于标签、高亮处的补充强调色（例如：`violet`, `amber`, `teal`）。
- **中性色 (Neutral)** — 用于背景、文本和边框（例如：`slate`, `gray`, `zinc`, `stone`）。

### 排版字体 (Typography)

从 Google Fonts 中选择：

- **标题字体 (Heading)** — 用于标题和模块页眉（例如：`DM Sans`, `Inter`, `Space Grotesk`）。
- **正文字体 (Body)** — 用于段落和 UI 文本（例如：`Inter`, `Source Sans 3`, `Nunito Sans`）。
- **等宽字体 (Mono)** — 用于代码和技术内容（例如：`JetBrains Mono`, `Fira Code`）。

AI 会根据你的产品类型提供建议，并帮助你找到合适的组合。

**创建文件：** `product/design-system/colors.json`, `product/design-system/typography.json`

---

## 3. 容器设计 (Shell Design)

```
/design-shell
```

设计包装所有模块的持久导航和布局。从常见模式中选择：

- **侧边栏导航 (Sidebar Navigation)** — 左侧垂直导航，右侧内容区。最适合仪表板类工具、管理面板以及具有多个模块的应用。
- **顶部导航 (Top Navigation)** — 顶部水平导航，下方内容区。最适合较简单的应用、营销类产品或模块较少的情况。
- **极简页眉 (Minimal Header)** — 仅包含 Logo + 用户菜单。最适合单一用途的工具或向导式流程。

你还将定义：

- 用户菜单的位置和内容。
- 响应式行为（在移动端如何调整）。
- 任何额外的导航项（如设置、帮助等）。

容器 (Shell) 以 React 组件的形式实现，将包装你的模块界面设计 (Design Screen)。

**创建文件：**
- `product/shell/spec.md` — 容器规范。
- `src/shell/components/AppShell.tsx` — 主容器包装器。
- `src/shell/components/MainNav.tsx` — 导航组件。
- `src/shell/components/UserMenu.tsx` — 用户菜单组件。
- `src/shell/ShellPreview.tsx` — Design OS 的预览包装器。

---

## 下一步

随着基础的奠定，你已准备好设计各个具体模块。请参阅 [功能模块设计](design-section.md) 进行后续步骤。
