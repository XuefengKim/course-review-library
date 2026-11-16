# 课程学习与复习资料库

按课程长期保存文字资料、原题、解题思路和离线复习工具。新课程继续加入本仓库，不为每门课单独建仓。

## 课程目录

| 平台 | 课程 | 当前收录 | 入口 |
|---|---|---|---|
| edX / LSE | Mathematics 1 Part 1: Differential Calculus | 44 组原题（76 个题目块）、12 张补充概念卡、8 页文字摘录 | [课程说明](courses/edx/lse-mathematics-1-differential-calculus/README.md) |

下载或克隆仓库后，双击课程 `materials/复习题库.html` 离线练习。GitHub 文件页显示源码，不会直接运行复习页面。

## 目录约定

```text
courses/<platform>/<course-slug>/
  README.md        课程来源、收录范围、使用方式和待补项
  course.json      课程信息及入口
  materials/       最终课件、题库、文字和数据
  tools/           必要的生成脚本与依赖清单（按需）
templates/course/  下一门课的空白模板
catalog.json       可供工具读取的课程目录
```

## 加入下一门课

1. 将 `templates/course/` 复制到 `courses/<platform>/<course-slug>/`，填写真实课程信息。
2. 材料放在该课程目录内，保留来源链接、日期与收录边界。原题、官方答案和自行补充内容分别注明。
3. 更新本页课程表和 `catalog.json`，说明练习入口及未完成内容。
4. 默认不下载视频或字幕；没有明确要求时不建立提醒。

## 跨电脑使用

```sh
git clone git@github.com:XuefengKim/course-review-library.git
```

已有副本先检查本地改动，再拉取远端更新。浏览器里的草稿和熟悉度不会随 Git 自动同步，应从复习页导出记录、在另一台电脑导入。个人复习记录默认不入库。

本仓库保持私有。课程原文和题目保留其原有权利归属，仅用于个人学习；不附加开源授权、不发布 GitHub Pages。

整理日期：2026-11-16。
