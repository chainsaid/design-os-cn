# 使用指南 (Usage)

Design OS 使用斜杠命令（slash commands）来引导你完成设计流程。每个命令都是一场对话——AI 提出问题，你提供指导，共同打造你的产品。

## 设计工作流

Design OS 遵循结构化的顺序。每一步都建立在之前的各个步骤之上。

### 阶段 1：产品规划 (Product Planning)

在进行任何界面设计 (Design Screen) 之前，先奠定基础：

1. **产品愿景 (Product Vision)** — 在一次对话流程中定义你的产品定义、模块和数据模型 (Data Shape)。
2. **原子设计 (Design Tokens)** — 选择颜色和排版字体。
3. **容器设计 (Shell Design)** — 设计导航和整体布局。

详情请参阅 [产品规划](product-planning.md) 了解每个命令的细节。

### 阶段 2：功能模块设计 (Section Design)

基础奠定后，依次处理每个模块：

1. **模块定义 (Shape the Section)** — 定义范围、要求，并生成示例数据和类型。
2. **界面设计 (Design Screen)** — 构建实际的 React 组件。
3. **捕捉截图** — 为设计存档（可选）。

对路线图中的每个模块重复此流程。

详情请参阅 [功能模块设计 (Section Design)](design-section.md) 了解每个命令的细节。

### 阶段 3：导出 (Export)

当所有模块设计完成后：

1. **导出 (Export)** — 生成完整的交付包。

详情请参阅 [导出](export.md) 了解包含的内容及其使用方法。

---

## 快速参考

| 命令 | 用途 |
|---------|---------|
| `/product-vision` | 定义产品概览、路线图模块和数据模型 (Data Shape) |
| `/design-tokens` | 进行原子设计 (Design Tokens) |
| `/design-shell` | 进行容器设计 (Shell Design) |
| `/shape-section` | 定义模块范围、要求，并生成示例数据和类型 (Section Design) |
| `/design-screen` | 创建界面设计 (Design Screen) 组件 |
| `/screenshot-design` | 捕捉截图 |
| `/export-product` | 生成完整的交付包 |
| `/product-roadmap` | 更新产品模块（初始创建后专用） |
| `/data-shape` | 更新数据模型 (Data Shape)（初始创建后专用） |
| `/sample-data` | 更新示例数据和类型（初始创建后专用） |

---

## 使用技巧

- **遵循顺序** — 每一步都建立在之前的基础上。请勿随意跳步。
- **提供细节** — 你提供的细节越多，输出的质量就越高。
- **不断迭代** — 每个命令都是一场对话。不断完善，直到你满意为止。
- **重启开发服务器** — 创建新组件后，请重启服务器以查看更改。
