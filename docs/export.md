# 导出 (Export)

当你完成设计后，可以导出实施代理（AI 编码代理或团队）构建产品所需的一切。

## 何时导出

当满足以下条件时，你已准备好导出：

- 已定义产品愿景 (Product Vision) 和路线图 (Product Roadmap)。
- 至少有一个模块拥有界面设计 (Design Screen)。
- 你对设计方向感到满意。

你可以在任何时间点导出 —— 不必等到“完全完成”。导出将生成你当前设计的快照。随着后续添加更多模块，你可以随时再次导出。

---

## 运行导出

```
/export-product
```

该导出命令会：

1. **检查先决条件** — 验证必需文件是否存在。
2. **收集所有设计资源** — 组件、类型、数据、原子设计 (Design Tokens)。
3. **生成实施指令** — 包括拿来即用的提示词（Prompts）。
4. **生成测试指令** — 为每个模块提供测试驱动开发（TDD）规范。
5. **创建导出包** — 生成完整的 `product-plan/` 目录。
6. **创建 Zip 文件** — 生成 `product-plan.zip` 以便下载。

---

## 包含内容

### 拿来即用的提示词 (Prompts)

```
product-plan/prompts/
├── one-shot-prompt.md     # 全量实施演示提示词
└── section-prompt.md      # 模块化实施的提示词模板
```

这些是预先写好的提示词，你可以直接复制并粘贴到你的编码代理中。它们会引用指令文件，并引导你的代理在实施前审查设计并提出澄清性问题。

### 实施指南 (Instructions)

```
product-plan/
├── product-overview.md              # 产品摘要（始终提供）
└── instructions/
    ├── one-shot-instructions.md     # 合并的所有里程碑指南
    └── incremental/                 # 按里程碑划分的实施指南
        ├── 01-shell.md              # 原子设计 (Design Tokens) + 容器 (Shell)
        ├── 02-[section-id].md        # 每个模块一个 (如 02-invoices.md)
        └── ...
```

**product-overview.md** 提供了关于完整产品的背景信息 —— 请在任何实施会话中始终携带它。

**one-shot-instructions.md** 将所有里程碑合并为一个文档。搭配 `one-shot-prompt.md` 进行全量实施。

**里程碑式指令 (Incremental instructions)** 将工作分解为多个里程碑。搭配 `section-prompt.md` 进行循序渐进的实施。

### 设计系统 (Design System)

```
product-plan/design-system/
├── tokens.css           # CSS 自定义变量 (Properties)
├── tailwind-colors.md   # Tailwind 配置指南
└── fonts.md             # Google Fonts 设置
```

### 数据模型 (Data Shape)

```
product-plan/data-shapes/
├── README.md            # UI 数据契约概览
└── overview.ts          # 合并的类型引用（包含所有模块）
```

### 容器组件 (Shell Components)

```
product-plan/shell/
├── README.md            # 设计意图
├── components/
│   ├── AppShell.tsx     # 主布局包装器
│   ├── MainNav.tsx      # 导航
│   ├── UserMenu.tsx     # 用户菜单
│   └── index.ts         # 导出索引
└── screenshot.png       # 视觉参考（如果已截图）
```

### 模块组件 (Section Components)

针对每个模块：

```
product-plan/sections/[section-id]/
├── README.md            # 功能概览、用户流程
├── tests.md             # UI 行为测试规范
├── components/
│   ├── [Component].tsx  # 可导出组件
│   └── index.ts         # 导出索引
├── types.ts             # TypeScript 接口
├── sample-data.json     # 测试数据
└── screenshot.png       # 视觉参考（如果已截图）
```

### 测试指令 (Test Instructions)

每个模块都包含一个 `tests.md` 文件，提供了框架无关的测试编写指令：

- **用户流程测试** — 核心交互的成功和失败路径。
- **空状态测试** — 验证无记录时的 UI。
- **组件交互测试** — 需要验证的具体 UI 元素和行为。

这些指令描述了**测试什么**，而不是**如何测试** —— 你的编码代理会将其适配到你的测试框架（如 Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit 等）。

---

## 关于组件

导出的组件具有以下特点：

- **基于 Props** — 通过 props 接收数据和回调，严禁直接从组件内部导入数据。
- **可移植** — 适用于任何 React 环境，无 Design OS 依赖。
- **完整性** — 完整的样式、响应式设计、支持暗色模式。
- **生产级** — 并非单纯的原型或视觉稿，而是可生产使用的代码。

```tsx
// 组件期望数据和回调作为 props 传入
<InvoiceList
  invoices={data}
  onView={(id) => navigate(`/invoices/${id}`)}
  onEdit={(id) => navigate(`/invoices/${id}/edit`)}
  onDelete={(id) => confirmDelete(id)}
  onCreate={() => navigate('/invoices/new')}
/>
```

你的实施代理的任务是：
- 将回调连接到路由和 API 调用。
- 用后端真实数据替换示例数据。
- 实现适当的错误处理和加载状态。
- 实现无记录时的空状态（针对新用户、删除记录后等场景）。
- 构建组件所需的后端 API。
- 根据提供的测试指令编写测试（TDD 方式）。

---

## 使用导出包

详情请参阅 [在代码库中实施](codebase-implementation.md)，了解如何将你的设计在实际代码库中落地的详细指导。
