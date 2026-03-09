# EduChain Web 前端文档

> 基于 Next.js 16 + React 19 + Intlayer 的现代化教育知识共享平台前端应用

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE)

## 📚 文档导航

### 快速开始
- [01-项目概述](./01-项目概述.md) - 项目介绍、技术栈、核心特性
- [03-开发指南](./03-开发指南.md) - 环境搭建、开发规范、调试技巧

### 架构设计
- [02-技术架构](./02-技术架构.md) - 架构设计、目录结构、核心模块
- [06-Mock系统](./06-Mock系统.md) - Mock Service Worker 完整指南
- [07-国际化指南](./07-国际化指南.md) - Intlayer 国际化实现

### API 与组件
- [04-组件文档](./04-组件文档.md) - 组件分类、Props、使用示例
- [05-API接口](./05-API接口.md) - 服务层接口、Mock handlers 对应关系

### 部署运维
- [08-部署指南](./08-部署指南.md) - Cloudflare Pages、静态导出、环境变量

## 🎯 项目特色

### 1. 双体系架构
- **Mock 模式**：使用 MSW 拦截请求，返回模拟数据，无需后端即可开发
- **真实后端模式**：通过环境变量一键切换到真实后端 API

### 2. 现代化技术栈
- Next.js 16 App Router + React 19 Server Components
- TypeScript 5.9 严格类型检查
- Tailwind CSS 4 原子化样式
- Intlayer 国际化方案

### 3. 静态站点生成
- 完全静态导出（SSG）
- 支持 Cloudflare Pages 部署
- 无需 Node.js 运行时

### 4. 完整的功能模块
- 知识库管理（创建、编辑、版本控制）
- 区块链存证浏览器
- 用户系统（关注、通知、活动）
- 管理后台（用户、内容、分类管理）
- 搜索引擎（全文搜索、高级筛选）
- 社区互动（评论、点赞、收藏）

## 🚀 快速开始

```bash
# 安装依赖
npm install

# Mock 模式开发（推荐）
npm run dev:mock

# 真实后端模式开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📖 文档版本

- **文档版本**: v2.0.0
- **项目版本**: v1.0.0
- **开发时间**: 2025年12月 - 2026年3月
- **最后更新**: 2026年3月9日
- **维护者**: [小铭](https://github.com/zzmingoo)
- **邮箱**: zzmingoo@gmail.com
- **GitHub**: https://github.com/zzmingoo/educhain

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！请参考 [CONTRIBUTING.md](../../CONTRIBUTING.md)

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](../../LICENSE) 文件

---

**注意**: 本项目是 EduChain 的主要前端版本，采用最新的 Next.js 16 和 React 19 技术栈。如需查看旧版本文档，请访问 [apps/web-legacy/docs](../web-legacy/docs/)
