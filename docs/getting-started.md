# 快速开始

本指南将帮助你在 Design OS 中完成第一个产品的规划与设计。

## 1. 安装与运行

首先，克隆本仓库并在本地启动开发服务器：

```bash
git clone https://github.com/chainsaid/design-os-cn.git
cd design-os
npm install
npm run dev
```

在浏览器中打开 `http://localhost:3000` 即可查看项目。

## 2. 启动 Claude Code

Design OS 是为了与 **Claude Code** 配合使用而设计的。在项目根目录下，启动会话：

```bash
claude
```

## 3. 设置代理指令 (Agent Directives)

为了获得最佳体验，请确保 Claude 遵循 Design OS 专用的代理指令。这些指令位于 `agents.md` 中。你可以直接告诉它：

“请阅读项目根目录下的 `agents.md`。”

## 4. 开启规划流程

现在你已经准备好使用斜杠命令开始设计你的产品了。建议按以下顺序操作：

1. **`/product-vision`** (Product Vision) — 这是最重要的第一步。通过对话告诉 AI 你要构建什么。
2. **`/design-tokens`** — 进行原子设计 (Design Tokens)。
3. **`/design-shell`** — 进行容器设计 (Shell Design)。
4. **针对你的首个功能模块 (Section Design)：**
   - 运行 `/shape-section`
   - 运行 `/design-screen`
5. **`/export-product`** (Export) — 获取为你 implementation agent 准备的交付包。

## 5. 提示 Tips

- **保持对话**：Design OS 的核心是一场你与 AI 之间的对话。
- **重启服务器**：当你让 AI 创建新模块或界面 (Design Screen) 时，可能需要重启 `npm run dev` 才能在浏览器中看到新路由。
- **查阅文档**：如需具体步骤的详细信息，请查看 [产品规划](product-planning.md) 和 [功能模块设计](design-section.md) 指南。
