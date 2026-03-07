# 原子设计 (Design Tokens)

你正在协助用户为他们的产品选择颜色和排版字体。这些原子 (Tokens) 将应用于所有界面设计 (Design Screen) 和容器 (Shell) 中保持一致使用。

## 第 1 步：检查先决条件

首先，确认产品概览是否存在：

阅读 `/product/product-overview.md` 以了解产品是什么。

如果它不存在：

“在定义设计系统之前，你需要先建立产品愿景。请先运行 `/product-vision`。”

如果缺少先决条件，请停止操作。

## 第 2 步：解释流程

“让我们为 **[产品名称]** 定义视觉识别系统。

我将协助你选择：
1. **颜色** — 主强调色、辅助强调色以及中性色板
2. **排版** — 用于标题、正文和代码的字体

这些将一致地应用于你所有的界面设计 (Design Screen) 和容器 (Shell)。

你目前有任何心仪的品牌颜色或字体吗？或者需要我提供一些建议？”

等待用户回复。

## 第 3 步：选择颜色

协助用户从 Tailwind 的内置色板中进行选择。根据其产品类型提供选项：

“在颜色方面，我们将从 Tailwind 的色阶中挑选，以便它们能与你的界面设计 (Design Screen) 完美融合。

**主色 (Primary color)**（核心强调色、按钮、链接）：
常用选择：`blue`, `indigo`, `violet`, `emerald`, `teal`, `amber`, `rose`, `lime`

**辅助色 (Secondary color)**（补充强调色、标签、高亮）：
应与你的主色相协调 —— 通常是不同的色调或中性色的变体。

**中性色 (Neutral color)**（背景、文本、边框）：
选项：`slate`（冷灰）, `gray`（纯灰）, `zinc`（略带微暖）, `neutral`（中性）, `stone`（暖灰）

基于 [产品名称]，我建议：
- **主色：** [建议] — [为何适合]
- **辅助色：** [建议] — [为何协调]
- **中性色：** [建议] — [为何有效]

你的产品感觉适合哪种？”

如果用户不确定，使用 AskUserQuestion 收集他们的偏好：

- “你追求什么样的风格？专业的、有趣的、现代的、还是极简的？”
- “有任何你绝对想避开的颜色吗？”
- “亮色模式、暗色模式，还是两者兼有？”

## 第 4 步：选择排版字体

协助用户选择 Google Fonts：

“在排版方面，我们将使用 Google Fonts 以便于 Web 集成。

**标题字体 (Heading font)**（标题、模块页眉）：
流行选择：`DM Sans`, `Inter`, `Poppins`, `Manrope`, `Space Grotesk`, `Outfit`

**正文字体 (Body font)**（段落、UI 文本）：
通常与标题相同，或者选择：`Inter`, `Source Sans 3`, `Nunito Sans`, `Open Sans`

**等宽字体 (Mono font)**（代码、技术内容）：
选项：`IBM Plex Mono`, `JetBrains Mono`, `Fira Code`, `Source Code Pro`

我为 [产品名称] 提供的建议：
- **标题：** [建议] — [原因]
- **正文：** [建议] — [原因]
- **等宽：** [建议] — [原因]

你更偏好哪种？”

## 第 5 步：展示最终选择

在用户做出决定后：

“这是你的原子设计 (Design Tokens)：

**颜色：**
- 主色：`[颜色]`
- 辅助色：`[颜色]`
- 中性色：`[颜色]`

**排版字体：**
- 标题：[字体名称]
- 正文：[字体名称]
- 等宽：[字体名称]

看起来满意吗？准备好保存了吗？”

## 第 6 步：创建文件

获得批准后，创建两个文件：

**文件 1：** `/product/design-system/colors.json`
```json
{
  "primary": "[颜色]",
  "secondary": "[颜色]",
  "neutral": "[颜色]"
}
```

**文件 2：** `/product/design-system/typography.json`
```json
{
  "heading": "[字体名称]",
  "body": "[字体名称]",
  "mono": "[字体名称]"
}
```

## 第 7 步：确认完成

告知用户：

“我已经保存了你的原子设计 (Design Tokens)：
- `/product/design-system/colors.json`
- `/product/design-system/typography.json`

**你的色板：**
- 主色：`[颜色]` — 用于按钮、链接、核心操作
- 辅助色：`[颜色]` — 用于标签、高亮、辅助元素
- 中性色：`[颜色]` — 用于背景、文本、边框

**你的字体：**
- 标题使用 [标题字体]
- 正文使用 [正文字体]
- 代码使用 [等宽字体]

这些将在为你模块创建界面设计 (Design Screen) 时使用。

下一步：运行 `/design-shell` 来设计应用程序的导航和布局。”

---

## 参考：Tailwind 色板

可用颜色（每种都有 50-950 的色阶）：
- **暖色调：** `red`, `orange`, `amber`, `yellow`, `lime`
- **冷色调：** `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`
- **紫色调：** `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`
- **中性色：** `slate`, `gray`, `zinc`, `neutral`, `stone`

## 参考：流行的 Google 字体配对

- **现代且洁净：** DM Sans + DM Sans + IBM Plex Mono
- **专业风格：** Inter + Inter + JetBrains Mono
- **亲和友好：** Nunito Sans + Nunito Sans + Fira Code
- **大胆且现代：** Space Grotesk + Inter + Source Code Pro
- **编辑器风格：** Playfair Display + Source Sans 3 + IBM Plex Mono
- **技术领先感：** JetBrains Mono + Inter + JetBrains Mono

---

## 重要注意事项

- 颜色必须使用 Tailwind 色板名称（而非十六进制代码）
- 字体必须使用确切的 Google Fonts 名称
- 建议应根据产品类型因地制宜
- 等宽字体是可选的，但对于任何包含代码/技术内容的产品，强烈建议使用
- 原子设计 (Design Tokens) 仅适用于界面设计 (Design Screen) —— Design OS 应用程序保持其自身的审美风格
