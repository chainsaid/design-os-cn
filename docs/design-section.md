# 功能模块设计 (Designing Sections)

完成 [产品规划](product-planning.md) 后，你就可以开始设计各个具体模块了。按照路线图中的顺序，为每个模块完成以下步骤。

## 1. 模块定义 (Shape the Section)

```
/shape-section
```

唯一定义模块的功能并生成其示例数据 —— 一步到位。如果你有多个模块，AI 会询问你要处理哪一个。

这是一个对话过程，旨在确定：

- **概览** — 此模块的作用（2-3 句话）。
- **用户流程** — 主要操作和逐步交互。
- **UI 要求** — 所需的具体布局、模式或组件。
- **范围边界** — 有意不包含的内容。

分享你的任何笔记或想法。AI 会针对用户操作、要显示的信息和 UI 模式提出澄清性问题。专注于用户体验和界面要求 —— 无需讨论后端或数据库细节。

你还会被询问该模块应显示在容器 (Shell) 内（大多数模块如此），还是作为独立页面显示（用于落地页或嵌入式挂件等）。

一旦获得足够的信息，AI 会自动编写规范并生成示例数据 + TypeScript 类型：

- **示例数据** — 5-10 条真实的记录，包含多样化的内容、边界情况，以及描述每个实体的 `_meta` 部分。
- **TypeScript 类型** — 每个的数据接口模型，以及包含操作回调的 Props 接口。

**创建文件：**
- `product/sections/[section-id]/spec.md` — 模块规范。
- `product/sections/[section-id]/data.json` — 包含 `_meta` 描述的示例数据。
- `product/sections/[section-id]/types.ts` — TypeScript 接口。

**稍后更新示例数据：** 运行 `/sample-data` 以修改数据模型 (Data Shape) 或示例记录。

---

## 2. 界面设计 (Design Screen)

```
/design-screen
```

为该模块构建实际的 React 组件。在这里，规范和示例数据将转化为可运行的 UI。

### 创建的内容

**可导出组件**（基于 props，可移植）：

主组件和任何子组件，所有这些组件都通过 props 接收数据和回调。这些是将被导出到你实际产品代码库的内容。

```tsx
// 示例：组件接收 props，严禁直接导入数据
export function InvoiceList({
  invoices,
  onView,
  onEdit,
  onDelete,
  onCreate
}: InvoiceListProps) {
  // ...
}
```

**预览包装器 (Preview wrapper)**（仅供 Design OS 使用）：

一个导入示例数据并将其喂给组件的包装器，这样你就可以在 Design OS 中看到它的运行效果。

### 设计要求

所有界面设计 (Design Screen) 均包含：

- **移动端响应式** — 使用 Tailwind 响应式前缀（`sm:`, `md:`, `lg:`）。
- **亮色与暗色模式** — 使用 `dark:` 变体。
- **应用原子设计 (Design Tokens)** — 应用你的色板和排版字体选择。
- **满足所有规范要求** — 实现规范中的每一个用户流程和 UI 要求。

### 多个视图

如果规范暗示有多个视图（列表视图、详情视图、表单等），AI 会询问先构建哪一个。再次运行 `/design-screen` 来创建其他视图。

**创建文件：**
- `src/sections/[section-id]/components/[ViewName].tsx` — 主组件。
- `src/sections/[section-id]/components/[SubComponent].tsx` — 根据需要的子组件。
- `src/sections/[section-id]/components/index.ts` — 组件导出索引。
- `src/sections/[section-id]/[ViewName].tsx` — 预览包装器。

**重要提示：** 创建界面设计 (Design Screen) 后，请重启开发服务器以查看更改。

---

## 3. 捕捉截图 (可选)

```
/screenshot-design
```

为你的界面设计 (Design Screen) 截取屏幕截图以便存档。截图会与规范和数据文件保存在一起。

该命令会：
1. 自动启动开发服务器。
2. 导航到你的界面设计 (Design Screen)。
3. 隐藏 Design OS 导航栏。
4. 捕捉全屏截图。

截图的用途：
- 实施过程中的视觉参考。
- 文档和交付材料。
- 在各模块之间比较设计。

**需要：** Playwright MCP 服务器。如果未安装，系统会提示你安装说明。

**创建文件：** `product/sections/[section-id]/[screen-name].png`

---

## 为每个模块重复此过程

按顺序处理路线图中的各个模块。每个模块都建立在你奠定的基础之上，并受益于全局数据模型 (Data Shape) 和原子设计 (Design Tokens) 的一致性。

---

## 下一步

当所有模块设计完成后，你就可以导出了。请参阅 [导出](export.md) 以生成完整的交付包。
