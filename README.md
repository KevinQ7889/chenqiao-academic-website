# 陈巧老师个人学术网站

这是陈巧老师的个人学术主页，内容依据长沙理工大学经济与管理学院公开资料整理。

## 当前展示内容

- 个人简介与任职信息
- 资本市场会计与审计、信息披露监管、公司治理、反倾销会计
- 六篇代表性学术论文
- 主持和参与的科研项目
- 工作经历、研究生指导与学术服务
- 两个公开邮箱与学院联系方式
- 简历 PDF 下载、明暗主题和手机适配

## 本地预览

在当前目录运行：

    npm start

然后打开 http://127.0.0.1:4173 。

## 后续补充资料

未在公开资料中找到或暂未确认的内容没有擅自编造。可以直接在 index.html 中补充：

- 任教课程与教学成果
- 获奖、荣誉和人才项目
- 更多论文、著作或会议报告
- 招生名额、研究计划与课题组信息
- 个人主页、Google Scholar、ORCID 等链接
- 更完整的个人简历

HTML 中已经留有注释，例如：

    <!-- 如后续补充任教课程、获奖或学术兼职，可在下方继续添加经历卡片。 -->

## 主要文件

- index.html：页面内容
- styles.css：视觉样式和响应式布局
- script.js：主题切换、论文筛选、邮箱复制和滚动效果
- server.js：本地预览服务器
- assets/chen-qiao.jpg：学院主页公开照片
- assets/Chen-Qiao-CV.pdf：当前为占位简历，可后续替换
- assets/favicon.svg：网站图标
- CNAME：GitHub Pages 自定义域名
- .github/workflows/pages.yml：自动部署流程
- robots.txt 与 sitemap.xml：搜索引擎配置
- DNS-CONFIG.md：DNSPod 与 GitHub Pages 配置清单

## 发布到 GitHub Pages

目标仓库：https://github.com/KevinQ7889/chenqiao-academic-website

网站已经包含自动部署流程：.github/workflows/pages.yml。

    git add .
    git commit -m "Add custom domain deployment"
    git push -u origin main

推送后，在仓库 Settings -> Pages 的 Source 中选择 GitHub Actions。

## 自定义域名

公开网址目标：https://www.chenqiao.net

- CNAME 文件已经设置为 www.chenqiao.net
- 自动部署流程会连同 CNAME、robots.txt 和 sitemap.xml 一起发布
- DNSPod 的完整记录和 GitHub 操作步骤见 DNS-CONFIG.md

## 资料更新

学院主页的“更新日期”为 2024 年 10 月。后续如页面资料变化，请同步更新论文、项目和联系方式。
