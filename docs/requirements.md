# 系统要求 (Requirements)

## 运行 Design OS

Design OS 在你的本地机器上运行。你需要：

- **Node.js** (v18 或更高版本)
- **npm** (随 Node.js 一起安装)
- **一个 AI 编码助手** — Design OS 使用斜杠命令来引导设计流程。推荐使用 Claude Code，但你也可以在任何支持自定义命令或提示词的 AI 编码工具（如 Cursor, Windsurf, Codex 等）中调用 Design OS 命令。

---

## 安装导出的组件

当你导出设计时，你会获得生产就绪的 React 组件。你的目标产品代码库需要满足：

### 必需环境 (Required)

- **React** (v18 或更高版本)
- **Tailwind CSS** (v4) — 组件使用 Tailwind 工具类进行样式设置。

### 后端环境 (Backend)

你的后端可以是任何技术 —— Rails, Laravel, Next.js API 路由, Python, Go 等。Design OS 只负责前端设计层。
