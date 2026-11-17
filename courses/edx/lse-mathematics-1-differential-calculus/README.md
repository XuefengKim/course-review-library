# Mathematics 1 Part 1: Differential Calculus

- 平台／提供方：edX / London School of Economics and Political Science（LSE）。
- 课程标识：`course-v1:LSE+LSEMT105a+3T2023`。
- 来源：[课程主页](https://learning.edx.org/course/course-v1:LSE+LSEMT105a+3T2023/home)。访问原课程需要相应账号权限。
- 整理日期：2026-11-16。用户已完成课程。

## 文件入口

| 文件 | 用途 |
|---|---|
| [复习题库.html](materials/复习题库.html) | 下载后双击离线使用；章节筛选、随机抽题、折叠思路与答案、草稿和熟悉度记录 |
| [微积分公式手册.md](materials/微积分公式手册.md) | 五个课程主题的公式、适用条件、判别表与易错点 |
| [原题与思路.txt](materials/原题与思路.txt) | 可搜索的原题与中文提示，公式使用 LaTeX |
| [复习题库.json](materials/复习题库.json) | 整理后的结构化题库，便于后续制卡 |
| [课程原始题库.json](materials/课程原始题库.json) | 原始提取、来源和已判正确的作答记录，含答案 |
| [使用说明](materials/使用说明.txt) | 使用与跨电脑记录导入导出说明 |
| [检查说明](materials/检查说明.txt) | 已验证事项与视觉检查限制 |

## 收录范围

完整覆盖 5 章 Let’s Practise、5 章 Let’s Assess 和期末 Assess Your Knowledge 的 11 个页面：76 个独立题目块（包含分题），整理为 44 组。另有 12 张补充概念卡，明确标为非 edX 原题。

文字材料仅有 8 页摘录：集合定义、集合活动题、5 章提纲与课程总结。其余章节正文、活动与视频例题未全量收录；没有下载视频或字幕，没有建立提醒。

参考答案来自课程已判正确的作答记录，中文解题思路为另行整理。未将长篇官方解析作为主要交付；原始提取保留了早期已展开的部分解析。

## 重新生成与检查

生成与检查需要 Node.js 24.15+（24.x）或 26+，以及 npm；直接打开已生成的 HTML 不需要这些工具。在本目录运行：

```sh
cd tools
npm ci
npm run build
npm test
```

修改 `tools/hints.json` 更新中文思路，修改 `tools/page.html` 更新页面；课程原始数据位于 `materials/课程原始题库.json`。构建不需要访问 edX，不包含登录凭证。

公式转换及离线交互逻辑已检查；真实浏览器视觉布局尚未实测。以后补内容应直接更新原文件，并同步范围说明。
