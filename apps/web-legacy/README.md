# EduChain 前端 - Legacy 版本

> ⚠️ **项目状态**: 此版本已停止维护，仅作为历史参考保留

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6.0.0-0170FE?logo=antdesign)

</div>

## 📖 完整文档

详细的技术文档请查看 [docs 目录](./docs/README.md)：

| 文档 | 说明 |
|------|------|
| [项目概述](./docs/01-项目概述.md) | 项目介绍、技术栈、功能特性 |
| [技术架构](./docs/02-技术架构.md) | 架构设计、目录结构、核心模块 |
| [开发指南](./docs/03-开发指南.md) | 环境搭建、开发规范、调试技巧 |
| [组件文档](./docs/04-组件文档.md) | 组件列表、使用说明、API 文档 |
| [API 接口](./docs/05-API接口.md) | 接口列表、请求示例、数据结构 |
| [部署指南](./docs/06-部署指南.md) | 构建配置、部署流程、环境变量 |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 使用 Mock 数据
npm run dev:mock

# 构建生产版本
npm run build
```

## 📊 技术栈

- **框架**: React 19.2.0
- **构建工具**: Vite 7.2.4
- **语言**: TypeScript 5.9.3
- **UI 库**: Ant Design 6.0.0
- **路由**: React Router 7.9.6
- **HTTP 客户端**: Axios 1.13.2
- **Mock 工具**: MSW 2.12.4

## 📁 项目结构

```
apps/web-legacy/
├── docs/                   # 📚 完整文档
├── public/                 # 静态资源
├── src/
│   ├── components/        # 组件 (50+)
│   ├── pages/             # 页面 (25+)
│   ├── services/          # API 服务
│   ├── hooks/             # 自定义 Hooks
│   ├── contexts/          # Context 上下文
│   ├── mock/              # Mock 数据
│   ├── styles/            # 样式文件
│   ├── types/             # TypeScript 类型
│   └── utils/             # 工具函数
├── package.json
└── vite.config.ts
```

## ⚠️ 为什么停止维护？

在 2025年底，我们决定使用 Next.js + Intlayer 重构前端：

- ✅ **SEO 优化**: SSR/SSG 支持
- ✅ **国际化**: 完整的多语言支持
- ✅ **性能提升**: 更快的首屏加载
- ✅ **现代化**: React 19 + Next.js 15

## 🔗 新版本

新版本位于 [apps/web](../web/README.md)，采用 Next.js + Intlayer 架构，提供更好的性能和用户体验。

## 📞 联系方式

- **维护者**: [小铭](https://github.com/zzmingoo)
- **邮箱**: zzmingoo@gmail.com
- **GitHub**: https://github.com/zzmingoo/educhain

## 📄 许可证

MIT License - 详见 [LICENSE](../../LICENSE)

---

**推荐使用新版本**: [apps/web](../web/README.md)
