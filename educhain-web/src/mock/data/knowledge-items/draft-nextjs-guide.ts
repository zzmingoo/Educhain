/**
 * Next.js 入门指南 - 草稿
 */

import { generateMockShareCode } from '../../utils/shareCode';

export const draftNextjsGuide = {
  id: 101,
  shareCode: 'DRAFT' + generateMockShareCode(101),
  title: 'Next.js 14 完整入门指南',
  content: `# Next.js 14 完整入门指南

## 简介

Next.js 是一个基于 React 的全栈框架，提供了服务端渲染、静态生成、API 路由等强大功能...

## 核心特性

### 1. App Router
新的 App Router 提供了更强大的路由功能...

### 2. Server Components
React Server Components 让你可以在服务端渲染组件...

（草稿内容待完善）`,
  type: 'TEXT' as const,
  uploaderId: 2,
  uploaderName: '小铭',
  uploaderAvatar: '/avatars/zzm.jpeg',
  categoryId: 11,
  categoryName: 'React',
  tags: 'Next.js,React,SSR,前端框架',
  status: 0, // 草稿状态
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  contentHash: 'draft_nextjs_guide',
};
