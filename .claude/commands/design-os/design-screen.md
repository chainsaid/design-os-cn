# 界面设计 (Design Screen)

你正在协助用户为他们产品的某个模块创建界面设计 (Design Screen)。该界面设计 (Design Screen) 是一个基于 props 的 React 组件，可以导出并集成到任何 React 代码库中。

## 第 1 步：检查先决条件

首先，确定目标模块并确认 `spec.md`、`data.json` 和 `types.ts` 是否都已存在。

阅读 `/product/product-roadmap.md` 以获取可用模块列表。

如果只有一个模块，则自动选择它。如果有多个模块，请使用 AskUserQuestion 工具询问用户想要为哪个模块创建界面设计 (Design Screen)。

然后验证所有必需文件是否存在：
- `product/sections/[section-id]/spec.md`
- `product/sections/[section-id]/data.json`
- `product/sections/[section-id]/types.ts`

如果 `spec.md` 不存在：
“我还没看到 **[模块标题]** 的规范。请先运行 `/shape-section` 来定义该模块的要求。”

如果 `data.json` 或 `types.ts` 不存在：
“我还没看到 **[模块标题]** 的示例数据。请先运行 `/sample-data` 来为界面设计 (Design Screen) 创建示例数据和类型。”

如果缺少任何文件，请停止操作。

## 第 2 步：检查原子设计 (Design Tokens) 和容器 (Shell)

检查是否有可选的增强项：

**原子设计 (Design Tokens)：**
- 检查 `/product/design-system/colors.json` 是否存在
- 检查 `/product/design-system/typography.json` 是否存在

如果存在原子设计 (Design Tokens)，请阅读并将其用于样式设置。如果不存在，显示警告：
“注意：原子设计 (Design Tokens) 尚未定义。我将使用默认样式，但为了保持品牌一致性，建议先运行 `/design-tokens`。”

**容器 (Shell)：**
- 检查 `src/shell/components/AppShell.tsx` 是否存在

如果容器存在，在 Design OS 中界面设计 (Design Screen) 将在该容器内渲染。如果不存在，显示警告：
“注意：尚未进行容器设计 (Shell Design)。界面设计 (Design Screen) 将独立渲染。建议先运行 `/design-shell`，以便在完整的容器背景下查看模块界面设计 (Design Screen)。”

## 第 3 步：分析需求

阅读并分析以下三个文件：
1. **spec.md** - 了解用户流程和 UI 要求
2. **data.json** - 了解数据模型 (Data Shape) and 示例内容
3. **types.ts** - 了解 TypeScript 接口 and 可用的回调

根据规范确定需要哪些视图。常见模式包括：
- 列表/仪表板视图（显示多个项）
- 详情视图（显示单项）
- 表单/创建视图（用于添加/编辑）

## 第 4 步：澄清界面设计 (Design Screen) 范围

如果规范暗示有多个视图，使用 AskUserQuestion 工具确认先构建哪个：
“规范建议为 **[模块标题]** 构建几个不同的视图：
1. **[视图 1]** - [简要描述]
2. **[视图 2]** - [简要描述]

我应该先创建哪个视图？”

如果只有一个明显的视图，请直接继续。

## 第 5 步：调用前端设计技能 (Frontend Design Skill)

在创建界面设计 (Design Screen) 之前，阅读 `frontend-design` 技能以确保高质量的设计输出。
阅读 `.claude/skills/frontend-design/SKILL.md` 文件并遵循其指导，打造独特且生产级的界面。

## 第 6 步：创建基于 Props 的组件

在 `src/sections/[section-id]/components/[ViewName].tsx` 创建主组件文件。

### 组件结构

组件**必须**满足：
- 从 `types.ts` 文件导入类型
- 通过 props 接收所有数据（严禁直接导入 `data.json`）
- 为所有操作接受回调 props
- 完全自包含且可移植

示例：
```tsx
import type { InvoiceListProps } from '@/../product/sections/[section-id]/types'

export function InvoiceList({
  invoices,
  onView,
  onEdit,
  onDelete,
  onCreate
}: InvoiceListProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 此处为组件内容 */}

      {/* 示例：使用回调 */}
      <button onClick={onCreate}>创建发票</button>

      {/* 示例：映射数据并使用回调 */}
      {invoices.map(invoice => (
        <div key={invoice.id}>
          <span>{invoice.clientName}</span>
          <button onClick={() => onView?.(invoice.id)}>查看</button>
          <button onClick={() => onEdit?.(invoice.id)}>编辑</button>
          <button onClick={() => onDelete?.(invoice.id)}>删除</button>
        </div>
      ))}
    </div>
  )
}
```

### 设计要求
- **移动端响应式：** 使用 Tailwind 响应式前缀（`sm:`, `md:`, `lg:`），确保布局在手机、平板和桌面端都能优雅适配。
- **亮色与暗色模式：** 为所有颜色使用 `dark:` 变体。
- **使用原子设计 (Design Tokens)：** 如果已定义，请应用产品的色板和排版字体选择。
- **遵循 frontend-design 技能：** 打造独特且难忘的界面。

### 应用原子设计 (Design Tokens)
**如果 `/product/design-system/colors.json` 存在：**
- 将主色用于按钮、链接和核心强调处
- 将辅助色用于标签、高亮及辅助元素
- 将中性色用于背景、文本和边框
- 示例：如果主色是 `lime`，则对主要操作使用 `lime-500`, `lime-600` 等。

**如果 `/product/design-system/typography.json` 存在：**
- 在注释中注明字体选择供参考
- 字体将在应用级应用，但请使用适当的字重（font weights）。

**如果不存在原子设计 (Design Tokens)：**
- 默认使用 `stone` 作为中性色，`lime` 作为强调色（Design OS 默认值）。

### 包含项
- 实现规范中所有的用户流程和 UI 要求。
- 使用 prop 数据（而非硬编码值）。
- 包含真实的 UI 状态（悬停、点击等）。
- 为所有交互元素使用回调 props。
- 使用可选链 handle 可选的回调：`onClick={() => onDelete?.(id)}`。

### 严禁项
- 严禁 `import data from` 语句 —— 数据必须通过 props 传入。
- 严禁非规范指定的额外功能。
- 严禁路由逻辑 —— 回调应处理导航意图。
- 严禁导航元素（导航由容器处理）。

## 第 7 步：创建子组件（如有需要）

对于复杂的视图，将其拆分为子组件。每个子组件也应是基于 props 的。
在 `src/sections/[section-id]/components/[SubComponent].tsx` 创建子组件。

示例：
```tsx
import type { Invoice } from '@/../product/sections/[section-id]/types'

interface InvoiceRowProps {
  invoice: Invoice
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function InvoiceRow({ invoice, onView, onEdit, onDelete }: InvoiceRowProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <p className="font-medium">{invoice.clientName}</p>
        <p className="text-sm text-stone-500">{invoice.invoiceNumber}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onView}>查看</button>
        <button onClick={onEdit}>编辑</button>
        <button onClick={onDelete}>删除</button>
      </div>
    </div>
  )
}
```
然后在主组件中导入并使用它。

## 第 8 步：创建预览包装器 (Preview Wrapper)

在 `src/sections/[section-id]/[ViewName].tsx` 创建预览包装器（注意：是在模块根目录，而非 components/ 下）。
这是 Design OS 实际渲染的文件。它导入示例数据并将其喂给基于 props 的组件。

示例：
```tsx
import data from '@/../product/sections/[section-id]/data.json'
import { InvoiceList } from './components/InvoiceList'

export default function InvoiceListPreview() {
  return (
    <InvoiceList
      invoices={data.invoices}
      onView={(id) => console.log('查看发票:', id)}
      onEdit={(id) => console.log('编辑发票:', id)}
      onDelete={(id) => console.log('删除发票:', id)}
      onCreate={() => console.log('创建新发票')}
    />
  )
}
```
预览包装器满足：
- 具有 `default` 导出（Design OS 路由所需）。
- 从 `data.json` 导入示例数据。
- 通过 props 将数据传递给组件。
- 为回调提供用于调试交互的 `console.log` 处理函数。
- **不会**导出到用户的代码库 —— 仅供 Design OS 使用。
- 如果容器已设计，将在容器内渲染。

## 第 9 步：创建组件索引 (Index)

在 `src/sections/[section-id]/components/index.ts` 创建索引文件，以便整洁地导出所有组件。

## 第 10 步：确认与后续步骤

告知用户：
“我已经为 **[模块标题]** 创建了界面设计 (Design Screen)：

**可导出组件**（基于 props，可移植）：
- `src/sections/[section-id]/components/[ViewName].tsx`
- `src/sections/[section-id]/components/[SubComponent].tsx` (如有)
- `src/sections/[section-id]/components/index.ts`

**预览包装器**（仅供 Design OS 使用）：
- `src/sections/[section-id]/[ViewName].tsx`

**重要提示：** 请重启开发服务器以查看更改。
[如有容器]：界面设计 (Design Screen) 将在容器 (Shell) 内渲染，展示完整的应用体验。
[如有原子设计]：我已应用了你的色板（[主色], [辅助色], [中性色]）和排版字体选择。

**后续步骤：**
- 运行 `/screenshot-design` 截取此屏幕截图用于文档说明。
- 如果规范要求其他视图，再次运行 `/design-screen` 来创建它们。
- 当所有模块完成后，运行 `/export-product` 生成完整的交付包。”

## 重要注意事项
- 创建界面设计 (Design Screen) 前，**务必**阅读 `frontend-design` 技能。
- 组件必须基于 props —— 严禁在导出组件中导入 `data.json`。
- 预览包装器是**唯一**导入 `data.json` 的文件。
- 所有 props 应使用 `types.ts` 中的 TypeScript 接口。
- 回调应是可选的（使用 `?`）并使用可选链（`?.`）调用。
- 提示用户在创建文件后重启开发服务器。
- 界面设计 (Design Screen) 在 Design OS 中查看时渲染在容器内（如容器存在）。
