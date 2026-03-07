# 界面设计截图 (Screenshot Design Screen)

你正在协助用户为他们创建的界面设计 (Design Screen) 截取屏幕截图。该截图将保存到产品文件夹中，用于文档说明目的。

## 前提条件：检查 Playwright MCP

在继续之前，请确认你是否有权访问 Playwright MCP 工具。寻找名为 `browser_take_screenshot` 或 `mcp__playwright__browser_take_screenshot` 的工具。

如果 Playwright MCP 工具不可用，请向用户输出以下**确切**消息（逐字复制，不要修改或“纠正”它）：

---
为了捕捉截图，我需要安装 Playwright MCP 服务器。请运行：

```
claude mcp add playwright npx @playwright/mcp@latest
```

然后重启此 Claude Code 会话并再次运行 `/screenshot-design`。
---

不要替换不同的包名称或修改命令。请完全按照上面的写法输出。

如果 Playwright MCP 不可用，请不要继续执行此命令的其余部分。

## 第 1 步：确定界面设计 (Design Screen)

首先，确定要截图的界面设计 (Design Screen)。

阅读 `/product/product-roadmap.md` 以获取可用模块列表，然后检查 `src/sections/` 以查看存在哪些界面设计 (Design Screen)。

如果所有模块中只存在一个界面设计 (Design Screen)，则自动选择它。

如果存在多个界面设计 (Design Screen)，请使用 AskUserQuestion 工具询问要截取哪一个：

“你想为哪个界面设计 (Design Screen) 截屏？”

按模块分组展示可用的界面设计 (Design Screen) 选项：
- [模块名称] / [界面设计 (Design Screen) 名称]
- [模块名称] / [界面设计 (Design Screen) 名称]

## 第 2 步：启动开发服务器

你自己使用 Bash 启动开发服务器。在后台运行 `npm run dev`，以便你可以继续进行截图捕捉。

**不要**询问用户服务器是否正在运行，或者告诉他们去启动它。你必须自己启动它。

启动服务器后，等待几秒钟直到其就绪，然后再导航到界面设计 (Design Screen) 的 URL。

## 第 3 步：捕捉截图

使用 Playwright MCP 工具导航到界面设计 (Design Screen) 并捕捉截图。

界面设计 (Design Screen) URL 模式为：`http://localhost:3000/sections/[section-id]/screen-designs/[screen-design-name]`

1. 首先，使用 `browser_navigate` 前往界面设计 (Design Screen) URL。
2. 等待页面完全加载。
3. **点击导航栏中的“隐藏 (Hide)”链接**，在截图前将其隐藏。隐藏按钮具有 `data-hide-header` 属性，你可以用它来定位。
4. 使用 `browser_take_screenshot` 捕捉页面（不含导航栏）。

**截图规范：**
- 在桌面端视口宽度（建议 1280px）下捕捉。
- 使用 **全屏截图 (full page screenshot)** 以捕捉整个可滚动内容（而不仅仅是当前视口）。
- 使用 PNG 格式以获得最佳质量。

使用 `browser_take_screenshot` 时，设置 `fullPage: true` 以捕捉包括折叠线下方内容在内的整个页面。

## 第 4 步：保存截图

Playwright MCP 工具只能将截图保存到其默认输出目录（`.playwright-mcp/`）。你必须先将其保存在那里，然后将其复制到产品文件夹。

1. **首先**，运行 `browser_take_screenshot` 仅提供文件名（不含路径）：
   - 使用简单的文件名，如 `dashboard.png` 或 `invoice-list.png`。
   - 文件将保存到 `.playwright-mcp/[文件名].png`。

2. **然后**，使用 Bash 将文件复制到产品文件夹：
   ```bash
   cp .playwright-mcp/[文件名].png product/sections/[section-id]/[文件名].png
   ```

**命名规范：** `[界面设计 (Design Screen) 名称]-[变体].png`

示例：
- `invoice-list.png`（主视图）
- `invoice-list-dark.png`（暗色模式变体）
- `invoice-detail.png`
- `invoice-form-empty.png`（空状态）

如果用户想要亮色和暗色模式的截图，请两者都捕捉。

## 第 5 步：确认完成

告知用户：

“我已经将截图保存到 `product/sections/[section-id]/[文件名].png`。

该截图捕捉了 **[模块标题]** 模块的 **[界面设计 (Design Screen) 名称]** 界面。”

如果他们需要额外的截图（例如暗色模式、不同状态）：

“你还需要我捕捉其他的截图吗？例如：
- 暗色模式版本
- 移动端视口
- 不同的状态（空状态、加载中等）”

---

## 重要注意事项

- 自己启动开发服务器 —— 不要要求用户去做。
- 截图保存到 `product/sections/[section-id]/`，与 `spec.md` 和 `data.json` 放在一起。
- 使用具有描述性的文件名，指明界面设计 (Design Screen) 及任何变体（暗色模式、移动端等）。
- 为保持文档的一致性，请在一致的视口宽度下进行捕捉。
- 始终捕捉全屏截图，以包含所有可滚动内容。
- 完成后，如果你启动了开发服务器，可以将其关闭。
