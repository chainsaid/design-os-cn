# 容器设计 (Shell Design)

你正在协助用户进行容器设计 (Shell Design) —— 即包装所有模块的持久导航和布局。这是一个界面设计 (Design Screen)，而非实施代码。

## 第 1 步：检查先决条件

首先，确认以下先决条件是否存在：

1. 阅读 `/product/product-overview.md` — 产品名称和描述
2. 阅读 `/product/product-roadmap.md` — 用于导航的模块
3. 检查 `/product/design-system/colors.json` 和 `/product/design-system/typography.json` 是否存在

如果缺少概览或路线图：

“在进行容器设计 (Shell Design) 之前，你需要先定义产品和模块。请运行：
1. `/product-vision` — 定义你的产品
2. `/product-roadmap` — 定义你的模块”

如果缺少概览或路线图，请停止操作。

如果缺少原子设计 (Design Tokens)，显示警告但继续进行：

“注意：原子设计 (Design Tokens) 尚未定义。我将继续使用默认样式，但你可能希望先运行 `/design-tokens` 以确保颜色和排版的一致性。”

## 第 2 步：分析产品结构

审查路线图模块并展示导航选项：

“我正在为 **[产品名称]** 进行容器设计 (Shell Design)。根据你的路线图，你有 [N] 个模块：

1. **[模块 1]** — [描述]
2. **[模块 2]** — [描述]
3. **[模块 3]** — [描述]

让我们来决定容器布局。常用模式包括：

**A. 侧边栏导航 (Sidebar Navigation)** — 左侧垂直导航，右侧内容区
   最适合：模块较多、仪表板类工具、管理面板
**B. 顶部导航 (Top Navigation)** — 顶部水平导航，下方内容区
   最适合：较简单的应用、营销类产品、模块较少
**C. 极简页眉 (Minimal Header)** — 仅有 Logo + 用户菜单，通过其他方式访问模块
   最适合：单一用途工具、向导式流程

哪种模式最适合 **[产品名称]**？”

等待用户回复。

## 第 3 步：收集设计细节

使用 AskUserQuestion 进行澄清：

- “用户菜单（头像、退出登录）应该出现在哪里？”
- “你希望侧边栏在移动端是可折叠的，还是变成汉堡菜单？”
- “导航中还有其他项吗？（例如设置、帮助等）”
- “应用加载时的‘首页’或默认视图应该是什么？”

## 第 4 步：展示容器规范 (Shell Specification)

在了解其偏好后：

“这是 **[产品名称]** 的容器设计 (Shell Design)：

**布局模式：** [侧边栏/顶部导航/极简]

**导航结构：**
- [导航项 1] → [模块]
- [导航项 2] → [模块]
- [导航项 3] → [模块]
- [额外项，如设置、帮助]

**用户菜单：**
- 位置：[右上角 / 侧边栏底部]
- 内容：头像、用户名、退出登录

**响应式行为：**
- 桌面端：[外观展示]
- 移动端：[适配方式]

这符合你的设想吗？”

不断迭代直到用户批准。

创建 `/product/shell/spec.md`：

```markdown
# 容器规范 (Shell Specification)

## 概览
[容器设计及其目的的描述]

## 导航结构
- [导航项 1] → [模块 1]
- [导航项 2] → [模块 2]
- [导航项 3] → [模块 3]
- [任何额外的导航项]

## 用户菜单
[用户菜单位置和内容的描述]

## 布局模式
[布局描述 —— 侧边栏、顶部导航等]

## 响应式行为
- **桌面端:** [行为]
- **平板端:** [行为]
- **移动端:** [行为]

## 设计备注
[任何额外的设计决策或备注]
```

## 第 6 步：创建容器组件

在 `src/shell/components/` 下创建容器组件：

### AppShell.tsx
接受子组件并提供布局结构的主容器包装组件。

```tsx
interface AppShellProps {
  children: React.ReactNode
  navigationItems: Array<{ label: string; href: string; isActive?: boolean }>
  user?: { name: string; avatarUrl?: string }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}
```

### MainNav.tsx
导航组件（根据选择的模式，可能是侧边栏或顶部导航）。

### UserMenu.tsx
带有头像和下拉菜单的用户菜单。

### index.ts
导出所有组件。

**组件要求：**
- 所有数据和回调均使用 props（可移植）
- 如果存在原子设计 (Design Tokens)，请应用它们（颜色、字体）
- 使用 `dark:` 变体支持亮色和暗色模式
- 具备移动端响应式能力
- 使用 Tailwind CSS 进行样式处理
- 使用 lucide-react 作为图标库

## 第 7 步：创建容器预览 (Shell Preview)

创建 `src/shell/ShellPreview.tsx` —— 用于在 Design OS 中查看容器 (Shell) 的预览包装器：

```tsx
import data from '@/../product/sections/[first-section]/data.json' // 如果存在
import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    { label: '[模块 1]', href: '/section-1', isActive: true },
    { label: '[模块 2]', href: '/section-2' },
    { label: '[模块 3]', href: '/section-3' },
  ]

  const user = {
    name: '李明',
    avatarUrl: undefined,
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('导航至:', href)}
      onLogout={() => console.log('退出登录')}
    >
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">内容区域</h1>
        <p className="text-stone-600 dark:text-stone-400">
          模块内容将在此处渲染。
        </p>
      </div>
    </AppShell>
  )
}
```

## 第 8 步：应用原子设计 (Design Tokens)

如果存在原子设计 (Design Tokens)，请将其应用于容器组件：

**颜色：**
- 阅读 `/product/design-system/colors.json`
- 将主色用于激活的导航项、核心强调处
- 将辅助色用于悬停状态、微妙的高亮
- 将中性色用于背景、边框、文本

**排版：**
- 阅读 `/product/design-system/typography.json`
- 将标题字体应用于导航项和标题
- 将正文字体应用于其他文本
- 在预览中包含 Google Fonts 导入

## 第 9 步：确认完成

告知用户：

“我已经为 **[产品名称]** 完成了容器设计 (Shell Design)：

**创建的文件：**
- `/product/shell/spec.md` — 容器规范
- `src/shell/components/AppShell.tsx` — 主容器包装器
- `src/shell/components/MainNav.tsx` — 导航组件
- `src/shell/components/UserMenu.tsx` — 用户菜单组件
- `src/shell/components/index.ts` — 组件导出
- `src/shell/ShellPreview.tsx` — 预览包装器

**容器功能：**
- [布局模式] 布局
- 涵盖所有 [N] 个模块的导航
- 带有头像和退出的用户菜单
- 移动端响应式设计
- 支持亮色/暗色模式

**重要提示：** 请重启开发服务器以查看更改。

当你通过 `/design-screen` 设计模块界面时，它们将在此容器 (Shell) 中渲染，展示完整的应用体验。

后续：运行 `/shape-section` 开始设计你的第一个模块。”

---

## 重要注意事项

- 容器 (Shell) 是一项界面设计 (Design Screen) —— 它演示了容器导航和布局的设计
- 组件基于 props且可移植至用户的代码库
- 预览包装器仅供 Design OS 使用 —— 不会导出
- 如果有原子设计 (Design Tokens)，请应用它们以保持风格一致
- 保持容器专注于导航框架 —— 不要包含身份验证 UI
- 模块界面设计 (Design Screen) 将渲染在容器的内容区域内
