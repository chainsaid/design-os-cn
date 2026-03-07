# 示例数据 (Sample Data)

你正在协助用户为他们产品的某个功能模块创建或更新真实的示例数据。这些数据将用于填充界面设计 (Design Screen)。你还将根据数据模型 (Data Shape) 生成 TypeScript 类型。

## 第 1 步：检查先决条件

首先，确定目标模块并确认该模块已存在 `spec.md` 文件。

阅读 `/product/product-roadmap.md` 以获取可用模块列表。

如果只有一个模块，则自动选择它。如果有多个模块，请使用 AskUserQuestion 工具询问用户想要为哪个模块生成数据。

然后检查 `product/sections/[section-id]/spec.md` 是否存在。如果不存在：

“我还没看到 **[模块标题]** 的规范。请先运行 `/shape-section` 来定义该模块的要求，然后再回来生成示例数据。”

如果规范不存在，请停止操作。

## 第 2 步：检查现有示例数据

检查 `product/sections/[section-id]/data.json` 是否已存在。

**如果示例数据已存在：**

阅读现有的 `data.json` 和 `types.ts` 文件，然后询问用户：

“**[模块标题]** 已存在示例数据。你想对现有的数据模型 (Data Shape) 或示例数据进行哪些修改？”

等待用户描述他们想要更改的内容。一旦收到他们的笔记，**立即继续**根据所要求的更改更新 `data.json` 和 `types.ts` —— 不要展示草案等待批准。

更新后，通知用户：

“我已经根据你的反馈更新了 **[模块标题]** 的示例数据和类型。请查看更改并告知我是否需要进一步调整，或者在准备就绪后运行 `/design-screen`。”

此处停止 —— 以下步骤仅适用于从头开始生成新数据。

**如果不存在示例数据：** 继续执行第 3 步。

## 第 3 步：检查全局数据模型 (Data Shape)

检查 `/product/data-shape/data-shape.md` 是否存在。

**如果存在：**
- 阅读该文件以了解全局实体定义
- 你的示例数据中的实体名称应与全局数据模型 (Data Shape) 匹配
- 将描述和关系作为参考指南

**如果不存在：**
显示警告但继续进行：

“注意：尚未定义全局数据模型 (Data Shape)。我将根据模块规范创建实体结构，但为了确保各模块之间的一致性，建议先运行 `/data-shape`。”

## 第 4 步：分析并生成

阅读并分析 `product/sections/[section-id]/spec.md` 以了解：

- 用户流程中暗示了哪些数据实体？
- 每个实体需要哪些字段/属性？
- 哪些示例值对设计来说是真实且有帮助的？
- 可以对每个实体执行哪些操作？（这些将转化为回调 props）

**如果存在全局数据模型 (Data Shape)：** 将规范与该数据模型进行交叉引用。使用相同的实体名称并确保一致性。

**立即继续**生成这两个文件 —— 不要展示草案等待批准。

### 生成 `product/sections/[section-id]/data.json`

创建包含以下内容的数文件：

- **`_meta` 部分** - 对每个实体及其在 UI 中的关系进行人类可读的描述（显示在 Design OS 界面中）
- **真实的示例数据** - 使用可信的姓名、日期、描述等
- **多样化的内容** - 混合长短文本、不同的状态等
- **边界情况** - 至少包含一个空数组、一个长描述等
- **TypeScript 友好的结构** - 使用一致的字段名称和类型

#### 要求的 `_meta` 结构

每个 `data.json` 必须在顶层包含一个 `_meta` 对象，其中包含：

1. **`models`** - 一个对象，其中每个键是实体名称，值是关于它在 UI 中代表什么的平实语言描述
2. **`relationships`** - 一个描述实体在用户视角下如何关联的字符串数组

结构示例：

```json
{
  "_meta": {
    "models": {
      "invoices": "每张发票代表你向客户发送的已完成工作的账单。",
      "lineItems": "明细项是每张发票上列出的具体服务或产品。"
    },
    "relationships": [
      "每张发票 (Invoice) 包含一个或多个明细项 (Line Items)（费用分解）",
      "发票通过 clientName 字段跟踪所属的客户 (Client)"
    ]
  },
  "invoices": [
    {
      "id": "inv-001",
      "invoiceNumber": "INV-2024-001",
      "clientName": "Acme 集团",
      "clientEmail": "billing@acme.com",
      "total": 1500.00,
      "status": "sent",
      "dueDate": "2024-02-15",
      "lineItems": [
        { "description": "网页设计", "quantity": 1, "rate": 1500.00 }
      ]
    }
  ]
}
```

`_meta` 描述应：
- 使用简单的非技术语言
- 从用户视角解释每个实体代表什么
- 使用“包含”、“属于”、“链接到”来描述关系 —— 这些是概念性的，而非数据库关系
- **如果存在全局数据模型 (Data Shape)，实体名称应与之匹配**

数据应直接支持规范中的用户流程和 UI 要求。

### 生成 `product/sections/[section-id]/types.ts`

根据数据模型 (Data Shape) 生成 TypeScript 类型。

#### 类型生成规则

1. **从示例数据值推断类型：**
   - 字符串 → `string`
   - 数字 → `number`
   - 布尔值 → `boolean`
   - 数组 → `TypeName[]`
   - 对象 → 创建命名的 interface

2. **为状态/枚举字段使用联合类型：**
   - 如果像 `status` 这样的字段具有已知值，使用联合类型：`'draft' | 'sent' | 'paid' | 'overdue'`
   - 根据规范和示例数据的多样性来确定这一点

3. **为主组件创建一个 Props 接口：**
   - 将数据包含为 prop（例如：`invoices: Invoice[]`）
   - 为每个操作包含可选的回调 props（例如：`onDelete?: (id: string) => void`）

4. **使用一致的实体名称：**
   - 如果存在全局数据模型 (Data Shape)，请使用相同的实体名称
   - 这可确保各模块之间的一致性

示例 types.ts：

```typescript
// =============================================================================
// UI 数据模型 (Data Shape) — 这些定义了组件期望接收的数据格式
// =============================================================================

export interface LineItem {
  description: string
  quantity: number
  rate: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail: string
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: string
  lineItems: LineItem[]
}

// =============================================================================
// 组件 Props
// =============================================================================

export interface InvoiceListProps {
  /** 要显示的发票列表 */
  invoices: Invoice[]
  /** 当用户想要查看发票详情时调用 */
  onView?: (id: string) => void
  /** 当用户想要编辑发票时调用 */
  onEdit?: (id: string) => void
  /** 当用户想要删除发票时调用 */
  onDelete?: (id: string) => void
  /** 当用户想要归档发票时调用 */
  onArchive?: (id: string) => void
  /** 当用户想要创建新发票时调用 */
  onCreate?: () => void
}
```

#### 命名规范

- 接口名称使用 PascalCase (大驼峰)：`Invoice`, `LineItem`, `InvoiceListProps`
- 属性名称使用 camelCase (小驼峰)：`clientName`, `dueDate`, `lineItems`
- Props 接口应命名为 `[SectionName]Props`（例如：`InvoiceListProps`）
- 针对回调 props 添加 JSDoc 注释以解释其调用时机
- **如果存在全局数据模型 (Data Shape)，实体名称应与之匹配**

## 第 5 步：告知用户与后续步骤

在创建完两个文件后，告知用户：

“我已经为 **[模块标题]** 创建了两个文件：

1. `product/sections/[section-id]/data.json` - 包含 [X] 条记录的示例数据
2. `product/sections/[section-id]/types.ts` - 用于类型安全的 TypeScript 接口

包含的类型有：
- `[实体]` - 主要数据类型
- `[模块名称]Props` - 组件的 Props 接口（包含针对 [操作列表] 的回调）

请查看这些文件并告诉我是否需要任何调整。准备就绪后，运行 `/design-screen` 来为此模块创建界面设计 (Design Screen)。”

## 重要注意事项

- 生成真实、可信的示例数据 —— 不要使用 "Lorem ipsum" 或 "Test 123"
- 为主要实体提供 5-10 条示例记录（足以显示真实的列表效果）
- 包含边界情况：空数组、长文本、不同的状态
- 保持字段名称清晰且对 TypeScript 友好 (camelCase)
- 数据模型 (Data Shape) 应直接映射到规范的用户流程
- 始终在生成 data.json 的同时生成 types.ts
- 回调 props 应涵盖规范中提到的所有操作
- **使用全局数据模型 (Data Shape) 中的实体名称以保持各模块的一致性**
- 不要展示草案等待批准 —— 立即生成文件并让用户随后审核
- 如果用户在审核后要求更改，请立即更新文件
