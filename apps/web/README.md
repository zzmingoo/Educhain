# EduChain Web 前端应用

> 基于 Next.js 16 + React 19 + Intlayer 的现代化教育知识共享平台

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE)

## ✨ 特性

- 🚀 **Next.js 16 App Router** - 最新的 Next.js 架构
- ⚛️ **React 19** - 最新的 React 特性
- 📘 **TypeScript** - 完整的类型安全
- 🎨 **Tailwind CSS 4** - 现代化的样式方案
- 🌍 **Intlayer 国际化** - 类型安全的多语言支持
- 🎭 **MSW Mock 系统** - 完整的 Mock 数据支持
- 📦 **静态站点生成** - 支持 CDN 部署
- ⛓️ **区块链集成** - 内容存证和验证

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

访问 http://localhost:3000

## 📖 文档

完整文档请查看 [docs/](./docs/) 目录：

- [项目概述](./docs/01-项目概述.md) - 项目介绍、技术栈、核心特性
- [技术架构](./docs/02-技术架构.md) - 架构设计、目录结构、核心模块
- [开发指南](./docs/03-开发指南.md) - 环境搭建、开发规范、调试技巧
- [组件文档](./docs/04-组件文档.md) - 组件分类、Props、使用示例
- [API接口](./docs/05-API接口.md) - 服务层接口、Mock handlers 对应关系
- [Mock系统](./docs/06-Mock系统.md) - MSW 完整指南
- [国际化指南](./docs/07-国际化指南.md) - Intlayer 使用说明
- [部署指南](./docs/08-部署指南.md) - Cloudflare Pages 部署

## 🎯 核心功能

### 知识库系统
- 多种内容类型支持（文本、图片、视频、PDF、链接）
- Markdown 编辑器
- 草稿保存和发布
- 版本历史和回滚
- 分类和标签管理

### 区块链浏览器
- 区块链概览
- 区块和交易查询
- 证书验证和下载
- 内容存证

### 用户系统
- 用户注册和登录
- 个人资料管理
- 关注和粉丝
- 通知中心
- 活动记录

### 搜索系统
- 全文搜索
- 高级筛选
- 搜索建议
- 热门关键词

### 管理后台
- 用户管理
- 内容审核
- 分类管理
- 系统设置
- 数据统计

## 🛠️ 技术栈

### 核心框架
- **Next.js 16.1.1** - React 框架
- **React 19.2.1** - UI 库
- **TypeScript 5.9.3** - 类型系统

### UI 与样式
- **Tailwind CSS 4** - 原子化 CSS
- **React Markdown** - Markdown 渲染

### 国际化
- **Intlayer** - 类型安全的国际化方案

### Mock 系统
- **MSW 2.12.7** - Mock Service Worker

### 工具库
- **Fuse.js** - 模糊搜索

## 📁 项目结构

```
apps/web/
├── app/                    # Next.js App Router
│   ├── [locale]/           # 国际化路由
│   │   ├── (pages)/        # 页面组
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 首页
│   └── globals.css         # 全局样式
├── components/             # React 组件
│   ├── admin/              # 管理后台组件
│   ├── blockchain/         # 区块链组件
│   ├── common/             # 通用组件
│   ├── knowledge/          # 知识库组件
│   ├── layout/             # 布局组件
│   └── providers/          # Provider 组件
├── src/                    # 源代码
│   ├── config/             # 配置文件
│   ├── contexts/           # React Context
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具函数
│   ├── mock/               # Mock 系统
│   │   ├── data/           # Mock 数据
│   │   ├── handlers/       # Mock Handlers
│   │   ├── errors/         # 错误定义
│   │   └── utils/          # Mock 工具
│   ├── services/           # 服务层
│   └── types/              # TypeScript 类型
├── public/                 # 静态资源
├── docs/                   # 项目文档
├── next.config.ts          # Next.js 配置
├── intlayer.config.ts      # Intlayer 配置
├── tailwind.config.ts      # Tailwind 配置
└── package.json            # 项目依赖
```

## 🔧 环境变量

创建 `.env.local` 文件：

```bash
# API 配置
NEXT_PUBLIC_API_BASE_URL=/api

# Mock 模式开关
NEXT_PUBLIC_USE_MOCK=true
```

## 📝 开发规范

### Git 提交规范

```bash
feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建/工具相关
```

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用 PascalCase 命名
- 文件使用 camelCase 命名

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

详见 [CONTRIBUTING.md](../../CONTRIBUTING.md)

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](../../LICENSE) 文件

## 👥 维护者

- **小铭** - [GitHub](https://github.com/zzmingoo)
- **邮箱**: zzmingoo@gmail.com

## 🔗 相关链接

- [项目主页](https://github.com/zzmingoo/educhain)
- [在线演示](https://educhain.cc)
- [问题反馈](https://github.com/zzmingoo/educhain/issues)
- [更新日志](../../CHANGELOG.md)

## 📊 项目信息

- **开发时间**: 2025年12月 - 2026年3月
- **当前版本**: v1.0.0
- **文档版本**: v2.0.0
- **最后更新**: 2026年3月9日

---

**注意**: 本项目是 EduChain 的主要前端版本。如需查看旧版本，请访问 [apps/web-legacy](../web-legacy/)
