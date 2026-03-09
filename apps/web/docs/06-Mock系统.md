# 06 - Mock 系统

> MSW (Mock Service Worker) 完整指南

## 📋 目录

- [Mock 系统概述](#mock-系统概述)
- [MSW 工作原理](#msw-工作原理)
- [配置和初始化](#配置和初始化)
- [Mock 数据管理](#mock-数据管理)
- [Handler 编写](#handler-编写)
- [工具函数](#工具函数)
- [调试和测试](#调试和测试)
- [最佳实践](#最佳实践)

## Mock 系统概述

### 什么是 Mock 系统？

Mock 系统是一个模拟后端 API 的解决方案，允许前端开发者在没有真实后端的情况下进行开发和测试。

### 为什么使用 MSW？

**传统 Mock 方案的问题**
```typescript
// ❌ 传统方案：修改业务代码
const fetchData = async () => {
  if (process.env.NODE_ENV === 'development') {
    return mockData; // 侵入业务逻辑
  }
  return fetch('/api/data');
};
```

**MSW 的优势**
```typescript
// ✅ MSW 方案：拦截网络请求
const fetchData = async () => {
  return fetch('/api/data'); // 业务代码不变
};
// MSW 在 Service Worker 层拦截请求
```

**核心优势**
- ✅ 不侵入业务代码
- ✅ 真实的网络请求行为
- ✅ 支持浏览器和 Node.js
- ✅ 易于维护和扩展
- ✅ 与生产环境行为一致

### 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                        应用层                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  组件     │  │  Hooks   │  │  服务层   │                  │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘                  │
│        │             │             │                         │
│        └─────────────┴─────────────┘                         │
│                      │                                       │
│                      ↓                                       │
│              fetch('/api/xxx')                               │
└─────────────────────────────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                   Service Worker 层                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MSW Service Worker                                  │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  1. 拦截请求                                    │ │   │
│  │  │  2. 匹配 Handler                                │ │   │
│  │  │  3. 执行 Mock 逻辑                              │ │   │
│  │  │  4. 返回 Mock 响应                              │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    Mock 数据层                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ 用户数据  │  │ 知识数据  │  │ 区块链数据 │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## MSW 工作原理

### 请求拦截流程

```
1. 应用发起请求
   fetch('/api/auth/login', { method: 'POST', body: ... })
                    ↓
2. Service Worker 拦截
   self.addEventListener('fetch', (event) => { ... })
                    ↓
3. MSW 匹配 Handler
   http.post('/api/auth/login', handler)
                    ↓
4. 执行 Handler 逻辑
   - 解析请求参数
   - 验证数据
   - 查询 Mock 数据
   - 构造响应
                    ↓
5. 返回 Mock 响应
   HttpResponse.json({ success: true, data: ... })
                    ↓
6. 应用接收响应
   const data = await response.json()
```

### Service Worker 生命周期

```typescript
// 1. 注册 Service Worker
navigator.serviceWorker.register('/mockServiceWorker.js')

// 2. 安装
self.addEventListener('install', (event) => {
  console.log('[MSW] Installing Service Worker');
  self.skipWaiting(); // 立即激活
});

// 3. 激活
self.addEventListener('activate', (event) => {
  console.log('[MSW] Activating Service Worker');
  event.waitUntil(clients.claim()); // 立即控制页面
});

// 4. 拦截请求
self.addEventListener('fetch', (event) => {
  // MSW 在这里拦截和处理请求
});
```

## 配置和初始化

### 目录结构

```
src/mock/
├── config.ts              # Mock 配置
├── index.ts               # Mock 入口
├── data/                  # Mock 数据源
│   ├── users.ts           # 用户数据
│   ├── knowledge.ts       # 知识数据
│   ├── categories.ts      # 分类数据
│   ├── blockchain.ts      # 区块链数据
│   └── ...                # 其他数据
├── handlers/              # Mock Handlers
│   ├── index.ts           # Handlers 入口
│   ├── auth.ts            # 认证 Handler
│   ├── user.ts            # 用户 Handler
│   ├── knowledge.ts       # 知识 Handler
│   └── ...                # 其他 Handlers
├── errors/                # 错误定义
│   └── index.ts           # 错误码
└── utils/                 # 工具函数
    ├── response.ts        # 响应构造器
    ├── delay.ts           # 延迟模拟
    ├── auth.ts            # 认证工具
    ├── validation.ts      # 参数验证
    └── shareCode.ts       # 分享码生成
```

### 配置文件

```typescript
// src/mock/config.ts

// API 基础路径
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// 模拟网络延迟时间 (ms)
export const MOCK_DELAY = 100;

// 是否启用 Mock
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// 环境判断
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isBrowser = typeof window !== 'undefined';
```

### 初始化流程

**1. Mock 入口文件**

```typescript
// src/mock/index.ts
import { USE_MOCK, isBrowser } from './config';

export const initMock = async () => {
  // 检查是否启用 Mock
  if (!USE_MOCK) {
    console.log('🌐 使用真实后端服务');
    return;
  }

  // 检查是否在浏览器环境
  if (!isBrowser) {
    console.log('⚠️ Mock 服务仅在浏览器环境中运行');
    return;
  }

  console.log('🎭 Mock 服务已启用');

  // 动态导入 handlers
  const { setupMockServer } = await import('./handlers');
  await setupMockServer();
};

export { USE_MOCK };
export * from './config';
export * from './errors';
export * from './utils';
```

**2. Handlers 入口文件**

```typescript
// src/mock/handlers/index.ts
import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth';
import { userHandlers } from './user';
import { knowledgeHandlers } from './knowledge';
// ... 导入其他 handlers

// 合并所有 handlers
export const handlers = [
  ...authHandlers,
  ...adminHandlers,      // 管理员接口优先
  ...followHandlers,     // 关注接口优先（避免被 /users/:id 拦截）
  ...userHandlers,
  ...knowledgeHandlers,
  ...categoryHandlers,
  ...commentHandlers,
  ...notificationHandlers,
  ...interactionHandlers,
  ...searchHandlers,
  ...blockchainHandlers,
  ...recommendationHandlers,
  ...communityHandlers,
  ...ticketHandlers,
  ...activityHandlers,
];

// 设置 Mock Server
export const setupMockServer = async () => {
  const worker = setupWorker(...handlers);

  await worker.start({
    onUnhandledRequest: 'bypass', // 未匹配的请求放行
    quiet: false,                 // 显示日志
  });

  console.log('[MSW] Mock Service Worker 已启动');
  console.log('[MSW] 已注册', handlers.length, '个 Handlers');
  
  return worker;
};
```

**3. MockProvider 组件**

```typescript
// components/providers/MockProvider.tsx
'use client';

import { useEffect, useState } from 'react';
import { useIntlayer } from 'next-intlayer';

// 全局标记，确保 MSW 只初始化一次
let mswInitialized = false;
let mswPromise: Promise<void> | null = null;

export function MockProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
  const content = useIntlayer('mock-provider');

  useEffect(() => {
    const initMockService = async () => {
      if (!useMock) {
        setIsReady(true);
        return;
      }

      // 如果已经初始化过，直接返回
      if (mswInitialized) {
        setIsReady(true);
        return;
      }

      // 如果正在初始化，等待完成
      if (mswPromise) {
        await mswPromise;
        setIsReady(true);
        return;
      }

      // 开始初始化
      mswPromise = (async () => {
        try {
          const { initMock } = await import('@/mock');
          await initMock();
          mswInitialized = true;
          console.log('[MockProvider] MSW 初始化完成');
        } catch (error) {
          console.error('[MockProvider] MSW 初始化失败:', error);
        }
      })();

      await mswPromise;
      setIsReady(true);
    };

    initMockService();
  }, [useMock]);

  // 在 Mock 服务初始化完成前显示加载状态
  if (!isReady && useMock) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{content.loading.value}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
```

**4. 在布局中使用**

```typescript
// app/[locale]/layout.tsx
import { MockProvider } from '@/components/providers/MockProvider';

export default function LocaleLayout({ children, params }) {
  return (
    <IntlayerClientProvider locale={params.locale}>
      <AuthProvider>
        <MockProvider>
          {children}
        </MockProvider>
      </AuthProvider>
    </IntlayerClientProvider>
  );
}
```


## Mock 数据管理

### 数据文件结构

**用户数据**

```typescript
// src/mock/data/users.ts
import type { User, UserStats } from '@/types/api';

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'ozemyn@icloud.com',
    fullName: '系统管理员',
    avatarUrl: '/avatars/zzm.jpeg',
    school: 'EduChain 平台',
    level: 10,
    bio: '平台管理员，负责系统维护和内容审核',
    role: 'ADMIN',
    status: 1,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 2,
    username: 'xiaoming',
    email: 'ozemyn@icloud.com',
    fullName: '小铭',
    avatarUrl: '/avatars/zzm.jpeg',
    school: '清华大学',
    level: 8,
    bio: '计算机科学与技术专业，热爱编程和分享',
    role: 'LEARNER',
    status: 1,
    createdAt: '2025-12-15T08:30:00Z',
    updatedAt: '2026-02-05T09:15:00Z',
  },
  // ... 更多用户
];

// 用户统计数据
export const mockUserStats: Record<number, UserStats> = {
  1: {
    userId: 1,
    knowledgeCount: 50,
    likeCount: 1200,
    favoriteCount: 800,
    followerCount: 500,
    followingCount: 100,
    viewCount: 50000,
  },
  // ... 更多统计
};
```

**知识数据**

```typescript
// src/mock/data/knowledge.ts
import type { KnowledgeItem, KnowledgeStats } from '@/types/api';

// 生成内容哈希
const generateContentHash = (id: number): string => {
  const hashBase = `knowledge_${id}_content`;
  const hash = Array.from(hashBase)
    .reduce((acc, char) => acc + char.charCodeAt(0), id * 1000)
    .toString(16)
    .padStart(64, '0')
    .substring(0, 64);
  return `0x${hash}`;
};

export const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: 1,
    title: 'React Hooks 完全指南',
    content: '# React Hooks 介绍\n\nReact Hooks 是 React 16.8 引入的新特性...',
    type: 'TEXT',
    categoryId: 11,
    tags: 'React,Hooks,前端',
    uploaderId: 2,
    uploaderName: '小铭',
    uploaderAvatar: '/avatars/zzm.jpeg',
    status: 1,
    shareCode: 'EK2a3b4c',
    contentHash: generateContentHash(1),
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-01T14:30:00Z',
  },
  // ... 更多知识
];

// 知识统计数据
export const mockKnowledgeStats: Record<number, KnowledgeStats> = {
  1: {
    knowledgeId: 1,
    viewCount: 4511,
    likeCount: 263,
    favoriteCount: 174,
    commentCount: 57,
    shareCount: 89,
    score: 92.5,
  },
  // ... 更多统计
};
```

**分类数据**

```typescript
// src/mock/data/categories.ts
import type { Category } from '@/types/api';

export const mockCategories: Category[] = [
  // 根分类
  {
    id: 1,
    name: '前端开发',
    description: '前端相关技术',
    parentId: undefined,
    sortOrder: 1,
    createdAt: '2024-01-01T00:00:00Z',
    knowledgeCount: 156,
  },
  // 子分类
  {
    id: 11,
    name: 'React',
    description: 'React 框架',
    parentId: 1,
    sortOrder: 1,
    createdAt: '2024-01-01T00:00:00Z',
    knowledgeCount: 58,
  },
  // ... 更多分类
];

// 构建分类树
export const buildCategoryTree = (categories: Category[]): Category[] => {
  const categoryMap = new Map<number, Category>();
  const rootCategories: Category[] = [];

  // 创建映射
  categories.forEach(cat => {
    categoryMap.set(cat.id, { ...cat, children: [] });
  });

  // 构建树结构
  categories.forEach(cat => {
    const category = categoryMap.get(cat.id)!;
    if (cat.parentId) {
      const parent = categoryMap.get(cat.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(category);
      }
    } else {
      rootCategories.push(category);
    }
  });

  return rootCategories;
};

export const mockCategoryTree = buildCategoryTree(mockCategories);
```

### 数据关联

**用户和知识的关联**

```typescript
// 获取用户的知识列表
const userKnowledge = mockKnowledgeItems.filter(
  k => k.uploaderId === userId
);

// 获取知识的作者信息
const author = mockUsers.find(u => u.id === knowledge.uploaderId);
```

**知识和统计的关联**

```typescript
// 获取知识及其统计信息
const knowledgeWithStats = mockKnowledgeItems.map(item => ({
  ...item,
  stats: mockKnowledgeStats[item.id],
}));
```

### 数据修改

**添加新数据**

```typescript
// 添加新用户
const newUser = {
  id: mockUsers.length + 1,
  username: 'newuser',
  email: 'newuser@example.com',
  // ... 其他字段
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
mockUsers.push(newUser);
```

**更新数据**

```typescript
// 更新用户信息
const userIndex = mockUsers.findIndex(u => u.id === userId);
if (userIndex !== -1) {
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
}
```

**删除数据**

```typescript
// 删除知识
const index = mockKnowledgeItems.findIndex(k => k.id === knowledgeId);
if (index !== -1) {
  mockKnowledgeItems.splice(index, 1);
}
```

## Handler 编写

### Handler 基础结构

```typescript
// src/mock/handlers/auth.ts
import { http, HttpResponse } from 'msw';
import { API_BASE } from '../config';
import { delay, createSuccessResponse, getCurrentUserId } from '../utils';
import { createErrorResponse } from '../errors';
import { mockUsers } from '../data/users';

export const authHandlers = [
  // Handler 定义
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    // 1. 模拟网络延迟
    await delay();
    
    // 2. 解析请求体
    const body = await request.json() as {
      usernameOrEmail: string;
      password: string;
    };
    
    // 3. 业务逻辑
    const user = mockUsers.find(
      u => (u.username === body.usernameOrEmail || 
            u.email === body.usernameOrEmail) && 
           body.password
    );
    
    // 4. 返回响应
    if (user) {
      return HttpResponse.json(
        createSuccessResponse({
          accessToken: `mock_access_token_${user.id}`,
          refreshToken: `mock_refresh_token_${user.id}`,
          user,
          expiresIn: 3600,
        })
      );
    }
    
    return HttpResponse.json(
      createErrorResponse('INVALID_CREDENTIALS'),
      { status: 401 }
    );
  }),
];
```

### HTTP 方法

**GET 请求**

```typescript
// 获取用户列表
http.get(`${API_BASE}/users`, async ({ request }) => {
  await delay();
  
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 0;
  const size = Number(url.searchParams.get('size')) || 10;
  
  const pageData = createPageResponse(mockUsers, page, size);
  return HttpResponse.json(createSuccessResponse(pageData));
});

// 获取单个用户
http.get(`${API_BASE}/users/:id`, async ({ params }) => {
  await delay();
  
  const { id } = params;
  const user = mockUsers.find(u => u.id === Number(id));
  
  if (user) {
    return HttpResponse.json(createSuccessResponse(user));
  }
  
  return HttpResponse.json(
    createErrorResponse('NOT_FOUND', '用户不存在'),
    { status: 404 }
  );
});
```

**POST 请求**

```typescript
// 创建知识
http.post(`${API_BASE}/knowledge`, async ({ request }) => {
  await delay();
  
  // 获取当前用户
  const currentUserId = getCurrentUserId(request);
  if (!currentUserId) {
    return HttpResponse.json(
      createErrorResponse('UNAUTHORIZED'),
      { status: 401 }
    );
  }
  
  const data = await request.json();
  const currentUser = mockUsers.find(u => u.id === currentUserId);
  
  const newKnowledge = {
    id: mockKnowledgeItems.length + 1,
    ...data,
    uploaderId: currentUserId,
    uploaderName: currentUser.fullName,
    uploaderAvatar: currentUser.avatarUrl,
    status: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockKnowledgeItems.push(newKnowledge);
  
  return HttpResponse.json(
    createSuccessResponse(newKnowledge),
    { status: 201 }
  );
});
```

**PUT 请求**

```typescript
// 更新知识
http.put(`${API_BASE}/knowledge/:id`, async ({ params, request }) => {
  await delay();
  
  const { id } = params;
  const data = await request.json();
  
  const index = mockKnowledgeItems.findIndex(k => k.id === Number(id));
  
  if (index !== -1) {
    mockKnowledgeItems[index] = {
      ...mockKnowledgeItems[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(createSuccessResponse(mockKnowledgeItems[index]));
  }
  
  return HttpResponse.json(
    createErrorResponse('NOT_FOUND'),
    { status: 404 }
  );
});
```

**DELETE 请求**

```typescript
// 删除知识
http.delete(`${API_BASE}/knowledge/:id`, async ({ params }) => {
  await delay();
  
  const { id } = params;
  const index = mockKnowledgeItems.findIndex(k => k.id === Number(id));
  
  if (index !== -1) {
    mockKnowledgeItems.splice(index, 1);
    return HttpResponse.json(createSuccessResponse(null));
  }
  
  return HttpResponse.json(
    createErrorResponse('NOT_FOUND'),
    { status: 404 }
  );
});
```

### 路由匹配

**精确匹配**

```typescript
// 只匹配 /api/users
http.get(`${API_BASE}/users`, handler);
```

**路径参数**

```typescript
// 匹配 /api/users/1, /api/users/2 等
http.get(`${API_BASE}/users/:id`, handler);

// 多个参数
http.get(`${API_BASE}/knowledge/:id/comments/:commentId`, handler);
```

**通配符**

```typescript
// 匹配 /api/users/* 下的所有路径
http.get(`${API_BASE}/users/*`, handler);
```

**正则表达式**

```typescript
// 匹配数字 ID
http.get(/\/api\/users\/\d+/, handler);
```

### 路由优先级

**重要**: Handler 的顺序很重要！更具体的路由应该放在前面。

```typescript
export const handlers = [
  // ✅ 正确：具体路由在前
  ...followHandlers,     // /users/follow/*
  ...userHandlers,       // /users/:id
  
  // ❌ 错误：通用路由在前会拦截具体路由
  // ...userHandlers,    // /users/:id 会拦截 /users/follow/*
  // ...followHandlers,  // 永远不会被匹配
];
```

### 请求处理

**解析请求头**

```typescript
http.post(`${API_BASE}/auth/login`, async ({ request }) => {
  // 获取 Authorization 头
  const authHeader = request.headers.get('Authorization');
  
  // 获取 Content-Type
  const contentType = request.headers.get('Content-Type');
  
  // 获取自定义头
  const customHeader = request.headers.get('X-Custom-Header');
});
```

**解析请求体**

```typescript
// JSON 请求体
const body = await request.json();

// FormData 请求体
const formData = await request.formData();
const file = formData.get('file');

// 文本请求体
const text = await request.text();
```

**解析查询参数**

```typescript
http.get(`${API_BASE}/knowledge`, async ({ request }) => {
  const url = new URL(request.url);
  
  // 获取单个参数
  const page = url.searchParams.get('page');
  const size = url.searchParams.get('size');
  
  // 获取所有参数
  const params = Object.fromEntries(url.searchParams);
});
```

### 响应构造

**成功响应**

```typescript
// 简单响应
return HttpResponse.json(
  createSuccessResponse(data)
);

// 带状态码
return HttpResponse.json(
  createSuccessResponse(data),
  { status: 201 }
);

// 带响应头
return HttpResponse.json(
  createSuccessResponse(data),
  {
    status: 200,
    headers: {
      'X-Total-Count': '100',
      'X-Page': '1',
    },
  }
);
```

**错误响应**

```typescript
// 使用错误码
return HttpResponse.json(
  createErrorResponse('INVALID_CREDENTIALS'),
  { status: 401 }
);

// 自定义错误消息
return HttpResponse.json(
  createErrorResponse('VALIDATION_ERROR', '用户名格式不正确'),
  { status: 400 }
);
```

**文件下载**

```typescript
http.get(`${API_BASE}/files/:id/download`, async ({ params }) => {
  const fileContent = 'File content here';
  
  return new Response(fileContent, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="file_${params.id}.txt"`,
    },
  });
});
```

## 工具函数

### 响应构造器

```typescript
// src/mock/utils/response.ts
import type { ApiResponse, PageResponse } from '@/types/api';

/**
 * 创建成功响应
 */
export const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  message: '操作成功',
  data,
  timestamp: new Date().toISOString(),
});

/**
 * 创建分页响应（与 Spring Data Page 格式一致）
 */
export const createPageResponse = <T>(
  items: T[],
  page: number = 0,
  size: number = 10
): PageResponse<T> => {
  const start = page * size;
  const end = start + size;
  const content = items.slice(start, end);

  return {
    content,
    totalElements: items.length,
    totalPages: Math.ceil(items.length / size),
    size,
    number: page,
    first: page === 0,
    last: end >= items.length,
    empty: items.length === 0,
    numberOfElements: content.length,
    pageable: {
      sort: { sorted: false, unsorted: true, empty: true },
      pageNumber: page,
      pageSize: size,
      offset: start,
      paged: true,
      unpaged: false,
    },
    sort: { sorted: false, unsorted: true, empty: true },
  };
};
```

### 延迟模拟

```typescript
// src/mock/utils/delay.ts
import { MOCK_DELAY } from '../config';

/**
 * 延迟函数，模拟网络延迟
 */
export const delay = (ms: number = MOCK_DELAY): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 随机延迟，模拟真实网络波动
 */
export const randomDelay = (min: number = 100, max: number = 500): Promise<void> => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
};
```

### 认证工具

```typescript
// src/mock/utils/auth.ts

/**
 * 从 Mock Token 中提取用户 ID
 * Mock token 格式: mock_access_token_{userId}
 */
export function getUserIdFromToken(token: string | null): number | null {
  if (!token) return null;
  
  // 移除 "Bearer " 前缀
  const actualToken = token.startsWith('Bearer ') 
    ? token.substring(7) 
    : token;
  
  // Mock token 格式: mock_access_token_{userId}
  if (actualToken.startsWith('mock_access_token_')) {
    const userId = actualToken.replace('mock_access_token_', '');
    const parsedId = parseInt(userId, 10);
    return isNaN(parsedId) ? null : parsedId;
  }
  
  return null;
}

/**
 * 从请求中获取当前用户 ID
 */
export function getCurrentUserId(request: Request): number | null {
  const authHeader = request.headers.get('Authorization');
  return getUserIdFromToken(authHeader);
}

/**
 * 检查请求是否已认证
 */
export function isAuthenticated(request: Request): boolean {
  return getCurrentUserId(request) !== null;
}
```

### 参数验证

```typescript
// src/mock/utils/validation.ts
import { createErrorResponse } from '../errors';

/**
 * 验证必填参数
 */
export const validateRequired = (
  params: Record<string, unknown>,
  requiredFields: string[]
) => {
  for (const field of requiredFields) {
    if (
      params[field] === undefined ||
      params[field] === null ||
      params[field] === ''
    ) {
      return createErrorResponse('MISSING_PARAMETER', `参数 ${field} 不能为空`);
    }
  }
  return null;
};

/**
 * 验证邮箱格式
 */
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return createErrorResponse('VALIDATION_ERROR', '邮箱格式不正确');
  }
  return null;
};

/**
 * 验证用户名格式
 */
export const validateUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return createErrorResponse(
      'VALIDATION_ERROR', 
      '用户名只能包含字母、数字和下划线，长度3-20个字符'
    );
  }
  return null;
};

/**
 * 组合验证器
 */
export const validate = (...validators: ((() => unknown) | null)[]) => {
  for (const validator of validators) {
    if (validator) {
      const result = typeof validator === 'function' ? validator() : validator;
      if (result) {
        return result;
      }
    }
  }
  return null;
};
```

### 分享码生成

```typescript
// src/mock/utils/shareCode.ts

// Base58 字符集
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const PREFIX = 'EK';

/**
 * 将数字编码为 Base58 字符串
 */
function encodeBase58(num: number): string {
  if (num === 0) return ALPHABET[0];

  let result = '';
  while (num > 0) {
    result = ALPHABET[num % ALPHABET.length] + result;
    num = Math.floor(num / ALPHABET.length);
  }
  return result;
}

/**
 * 为 Mock 数据生成分享码
 */
export function generateMockShareCode(id: number): string {
  const timestamp = 1704067200000; // 2024-01-01
  const combined = id * 1000 + (timestamp % 1000);
  const encoded = encodeBase58(combined);
  return PREFIX + encoded;
}

/**
 * 验证分享码格式
 */
export function isValidMockShareCode(shareCode: string): boolean {
  if (!shareCode) return false;

  // 支持草稿分享码
  if (shareCode.startsWith('DRAFT')) {
    const encoded = shareCode.substring('DRAFT'.length);
    if (encoded.length === 0) return false;
    return encoded.split('').every(char => ALPHABET.includes(char));
  }

  // 支持正常分享码
  if (shareCode.startsWith(PREFIX)) {
    const encoded = shareCode.substring(PREFIX.length);
    if (encoded.length === 0) return false;
    return encoded.split('').every(char => ALPHABET.includes(char));
  }

  return false;
}
```

### 错误定义

```typescript
// src/mock/errors/index.ts

export const ERROR_CODES = {
  // 认证错误
  INVALID_CREDENTIALS: '用户名或密码错误',
  UNAUTHORIZED: '请先登录',
  FORBIDDEN: '权限不足',
  
  // 数据错误
  NOT_FOUND: '请求的资源不存在',
  DUPLICATE_ENTRY: '数据已存在，不能重复添加',
  
  // 参数错误
  MISSING_PARAMETER: '缺少必要参数',
  PARAMETER_TYPE_ERROR: '参数类型错误',
  VALIDATION_ERROR: '输入信息有误，请检查后重试',
  
  // 系统错误
  INTERNAL_ERROR: '系统内部错误，请稍后重试',
};

/**
 * 根据错误码获取错误信息
 */
export const getErrorMessage = (code: string): string => {
  return ERROR_CODES[code as keyof typeof ERROR_CODES] || '发生了未知错误';
};

/**
 * 创建错误响应
 */
export const createErrorResponse = (code: string, customMessage?: string) => ({
  success: false,
  code,
  message: customMessage || getErrorMessage(code),
  data: null,
  timestamp: new Date().toISOString(),
});
```

## 调试和测试

### 启用调试日志

```typescript
// src/mock/handlers/index.ts
export const setupMockServer = async () => {
  const worker = setupWorker(...handlers);

  await worker.start({
    onUnhandledRequest: 'warn',  // 警告未处理的请求
    quiet: false,                 // 显示所有日志
  });

  // 监听请求事件
  worker.events.on('request:start', ({ request }) => {
    console.log('[MSW] Request:', request.method, request.url);
  });

  worker.events.on('response:mocked', ({ response }) => {
    console.log('[MSW] Response:', response.status);
  });

  return worker;
};
```

### 查看 Mock 数据

```typescript
// 在浏览器 Console 中
import { mockUsers } from '@/mock/data/users';
console.table(mockUsers);

import { mockKnowledgeItems } from '@/mock/data/knowledge';
console.table(mockKnowledgeItems);
```

### 测试 Handler

```typescript
// 手动测试 Handler
const testLogin = async () => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usernameOrEmail: 'admin',
      password: 'admin123',
    }),
  });
  
  const data = await response.json();
  console.log('Login response:', data);
};

testLogin();
```

### 验证响应格式

```typescript
// 检查响应是否符合 ApiResponse 格式
const validateResponse = (response: any) => {
  console.assert(typeof response.success === 'boolean', 'success 应该是 boolean');
  console.assert(typeof response.message === 'string', 'message 应该是 string');
  console.assert('data' in response, '应该包含 data 字段');
  console.assert(typeof response.timestamp === 'string', 'timestamp 应该是 string');
};
```

### 性能测试

```typescript
// 测试 Mock 响应时间
const testPerformance = async () => {
  const start = performance.now();
  
  await fetch('/api/knowledge');
  
  const end = performance.now();
  console.log('Response time:', end - start, 'ms');
};
```

## 最佳实践

### 1. 保持数据一致性

```typescript
// ✅ 推荐：使用关联数据
const knowledge = mockKnowledgeItems.find(k => k.id === 1);
const author = mockUsers.find(u => u.id === knowledge.uploaderId);

// ❌ 避免：硬编码数据
const author = { id: 2, username: 'xiaoming' }; // 可能与实际数据不一致
```

### 2. 模拟真实场景

```typescript
// ✅ 推荐：添加网络延迟
await delay();

// ✅ 推荐：模拟错误情况
if (Math.random() < 0.1) {
  return HttpResponse.json(
    createErrorResponse('INTERNAL_ERROR'),
    { status: 500 }
  );
}

// ✅ 推荐：验证参数
const validationError = validate(
  () => validateRequired(body, ['username', 'password']),
  () => validateUsername(body.username)
);
if (validationError) {
  return HttpResponse.json(validationError, { status: 400 });
}
```

### 3. 使用 TypeScript 类型

```typescript
// ✅ 推荐：定义请求和响应类型
interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

http.post(`${API_BASE}/auth/login`, async ({ request }) => {
  const body = await request.json() as LoginRequest;
  // TypeScript 会提供类型检查和自动补全
});
```

### 4. 组织 Handler 顺序

```typescript
// ✅ 推荐：具体路由在前
export const handlers = [
  ...authHandlers,
  ...adminHandlers,      // /admin/* 优先
  ...followHandlers,     // /users/follow/* 优先
  ...userHandlers,       // /users/:id
  ...knowledgeHandlers,
];

// ❌ 避免：通用路由在前
export const handlers = [
  ...userHandlers,       // /users/:id 会拦截所有 /users/* 请求
  ...followHandlers,     // 永远不会被匹配
];
```

### 5. 错误处理

```typescript
// ✅ 推荐：统一错误处理
http.post(`${API_BASE}/knowledge`, async ({ request }) => {
  try {
    const data = await request.json();
    // 业务逻辑
    return HttpResponse.json(createSuccessResponse(result));
  } catch (error) {
    console.error('[Mock] Error:', error);
    return HttpResponse.json(
      createErrorResponse('INTERNAL_ERROR'),
      { status: 500 }
    );
  }
});
```

### 6. 数据持久化

```typescript
// ⚠️ 注意：Mock 数据在页面刷新后会重置
// 如果需要持久化，可以使用 LocalStorage

// 保存数据
const saveToStorage = () => {
  localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
};

// 加载数据
const loadFromStorage = () => {
  const data = localStorage.getItem('mockUsers');
  if (data) {
    mockUsers.splice(0, mockUsers.length, ...JSON.parse(data));
  }
};
```

### 7. 环境隔离

```typescript
// ✅ 推荐：使用环境变量控制
if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
  // Mock 模式
} else {
  // 真实后端模式
}

// ✅ 推荐：提供清晰的日志
console.log(USE_MOCK ? '🎭 Mock 模式' : '🌐 真实后端模式');
```


## 常见场景示例

### 场景 1: 分页列表

```typescript
http.get(`${API_BASE}/knowledge`, async ({ request }) => {
  await delay();
  
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 0;
  const size = Number(url.searchParams.get('size')) || 10;
  const categoryId = url.searchParams.get('categoryId');
  const keyword = url.searchParams.get('keyword');
  
  // 筛选数据
  let items = [...mockKnowledgeItems];
  
  if (categoryId) {
    items = items.filter(item => item.categoryId === Number(categoryId));
  }
  
  if (keyword) {
    const searchText = keyword.toLowerCase();
    items = items.filter(item =>
      item.title.toLowerCase().includes(searchText) ||
      item.content?.toLowerCase().includes(searchText)
    );
  }
  
  // 分页
  const pageData = createPageResponse(items, page, size);
  return HttpResponse.json(createSuccessResponse(pageData));
});
```

### 场景 2: 文件上传

```typescript
http.post(`${API_BASE}/files/upload`, async ({ request }) => {
  await delay(500); // 模拟上传时间
  
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return HttpResponse.json(
      createErrorResponse('MISSING_PARAMETER', '请选择文件'),
      { status: 400 }
    );
  }
  
  // 模拟文件上传
  const fileUrl = `/uploads/${Date.now()}_${file.name}`;
  
  return HttpResponse.json(
    createSuccessResponse({
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    })
  );
});
```

### 场景 3: 搜索建议

```typescript
http.get(`${API_BASE}/search/suggestions`, async ({ request }) => {
  await delay(50); // 快速响应
  
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword') || '';
  
  if (keyword.length < 2) {
    return HttpResponse.json(createSuccessResponse([]));
  }
  
  // 模糊搜索
  const suggestions = mockKnowledgeItems
    .filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()))
    .slice(0, 10)
    .map(item => ({
      id: item.id,
      title: item.title,
      type: 'knowledge',
    }));
  
  return HttpResponse.json(createSuccessResponse(suggestions));
});
```

### 场景 4: 批量操作

```typescript
http.post(`${API_BASE}/knowledge/batch-delete`, async ({ request }) => {
  await delay();
  
  const ids = await request.json() as number[];
  
  if (!Array.isArray(ids) || ids.length === 0) {
    return HttpResponse.json(
      createErrorResponse('PARAMETER_TYPE_ERROR', 'ids 必须是非空数组'),
      { status: 400 }
    );
  }
  
  // 批量删除
  let deletedCount = 0;
  for (let i = mockKnowledgeItems.length - 1; i >= 0; i--) {
    if (ids.includes(mockKnowledgeItems[i].id)) {
      mockKnowledgeItems.splice(i, 1);
      deletedCount++;
    }
  }
  
  return HttpResponse.json(
    createSuccessResponse({ deletedCount })
  );
});
```

### 场景 5: WebSocket 模拟

```typescript
// 注意：MSW 不直接支持 WebSocket
// 可以使用轮询模拟实时更新

// 模拟通知轮询
http.get(`${API_BASE}/notifications/poll`, async ({ request }) => {
  await delay();
  
  const currentUserId = getCurrentUserId(request);
  if (!currentUserId) {
    return HttpResponse.json(
      createErrorResponse('UNAUTHORIZED'),
      { status: 401 }
    );
  }
  
  // 获取未读通知
  const notifications = mockNotifications
    .filter(n => n.userId === currentUserId && !n.isRead)
    .slice(0, 5);
  
  return HttpResponse.json(createSuccessResponse(notifications));
});
```

## 与真实后端对比

### Mock 模式

**优点**
- ✅ 无需后端即可开发
- ✅ 快速迭代和测试
- ✅ 可控的测试数据
- ✅ 离线开发
- ✅ 演示和展示

**缺点**
- ❌ 数据不持久化
- ❌ 无法测试真实性能
- ❌ 需要维护 Mock 数据
- ❌ 可能与真实后端不一致

### 真实后端模式

**优点**
- ✅ 真实的数据和性能
- ✅ 完整的业务逻辑
- ✅ 数据持久化
- ✅ 真实的错误场景

**缺点**
- ❌ 依赖后端服务
- ❌ 需要网络连接
- ❌ 开发效率较低
- ❌ 测试数据难以控制

### 切换建议

**开发阶段**
- 前端独立开发：使用 Mock 模式
- 联调测试：使用真实后端模式
- 功能演示：使用 Mock 模式

**测试阶段**
- 单元测试：使用 Mock 模式
- 集成测试：使用真实后端模式
- E2E 测试：使用真实后端模式

**生产环境**
- 始终使用真实后端模式

## 故障排查

### 问题 1: Mock 服务未启动

**症状**: 请求直接发送到真实后端，或返回 404

**原因**:
- 环境变量未设置
- Service Worker 未注册
- Handler 路径不匹配

**解决方案**:

```bash
# 1. 检查环境变量
echo $NEXT_PUBLIC_USE_MOCK  # 应该是 true

# 2. 重新生成 Service Worker
npx msw init public/ --save

# 3. 清除浏览器缓存
# Chrome: DevTools -> Application -> Clear storage

# 4. 检查 Handler 路径
console.log('API_BASE:', API_BASE);
console.log('Request URL:', request.url);
```

### 问题 2: Handler 不匹配

**症状**: 请求被放行，没有被 Mock 拦截

**原因**:
- Handler 路径错误
- Handler 顺序问题
- HTTP 方法不匹配

**解决方案**:

```typescript
// 检查 Handler 定义
http.post(`${API_BASE}/auth/login`, handler);  // 确保路径正确

// 检查 Handler 顺序
export const handlers = [
  ...specificHandlers,  // 具体路由在前
  ...generalHandlers,   // 通用路由在后
];

// 启用调试日志
worker.start({
  onUnhandledRequest: 'warn',  // 显示未匹配的请求
});
```

### 问题 3: 数据不更新

**症状**: 修改 Mock 数据后，页面显示旧数据

**原因**:
- 浏览器缓存
- Service Worker 缓存
- 数据未重新加载

**解决方案**:

```bash
# 1. 硬刷新页面
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# 2. 清除 Service Worker
# DevTools -> Application -> Service Workers -> Unregister

# 3. 重启开发服务器
npm run dev:mock
```

### 问题 4: 响应格式错误

**症状**: 前端解析响应失败

**原因**:
- 响应格式不符合 ApiResponse
- 缺少必要字段
- 类型不匹配

**解决方案**:

```typescript
// ✅ 正确：使用 createSuccessResponse
return HttpResponse.json(
  createSuccessResponse(data)
);

// ❌ 错误：直接返回数据
return HttpResponse.json(data);

// 验证响应格式
const response = createSuccessResponse(data);
console.assert('success' in response);
console.assert('message' in response);
console.assert('data' in response);
console.assert('timestamp' in response);
```

## 进阶技巧

### 1. 动态 Mock 数据

```typescript
// 根据时间生成动态数据
const generateDynamicData = () => {
  const now = new Date();
  return {
    id: Date.now(),
    title: `动态内容 ${now.toLocaleString()}`,
    createdAt: now.toISOString(),
  };
};

http.get(`${API_BASE}/dynamic`, async () => {
  await delay();
  return HttpResponse.json(
    createSuccessResponse(generateDynamicData())
  );
});
```

### 2. 条件响应

```typescript
// 根据请求参数返回不同响应
http.get(`${API_BASE}/knowledge/:id`, async ({ params, request }) => {
  await delay();
  
  const { id } = params;
  const url = new URL(request.url);
  const includeStats = url.searchParams.get('includeStats') === 'true';
  
  const knowledge = mockKnowledgeItems.find(k => k.id === Number(id));
  
  if (!knowledge) {
    return HttpResponse.json(
      createErrorResponse('NOT_FOUND'),
      { status: 404 }
    );
  }
  
  const response = includeStats
    ? { ...knowledge, stats: mockKnowledgeStats[knowledge.id] }
    : knowledge;
  
  return HttpResponse.json(createSuccessResponse(response));
});
```

### 3. 模拟网络错误

```typescript
// 随机返回错误
http.get(`${API_BASE}/unstable`, async () => {
  await delay();
  
  // 10% 概率返回 500 错误
  if (Math.random() < 0.1) {
    return HttpResponse.json(
      createErrorResponse('INTERNAL_ERROR'),
      { status: 500 }
    );
  }
  
  // 5% 概率返回 503 错误
  if (Math.random() < 0.05) {
    return HttpResponse.json(
      createErrorResponse('SERVICE_UNAVAILABLE', '服务暂时不可用'),
      { status: 503 }
    );
  }
  
  return HttpResponse.json(createSuccessResponse({ status: 'ok' }));
});
```

### 4. 请求日志

```typescript
// 记录所有请求
const requestLog: Array<{
  method: string;
  url: string;
  timestamp: string;
}> = [];

http.all('*', async ({ request }) => {
  requestLog.push({
    method: request.method,
    url: request.url,
    timestamp: new Date().toISOString(),
  });
  
  console.log('[Mock] Request log:', requestLog);
  
  // 继续处理请求
  return passthrough();
});
```

## 总结

Mock 系统是前端开发的重要工具，MSW 提供了一个优雅的解决方案：

**核心优势**
- 🎯 不侵入业务代码
- 🚀 真实的网络请求行为
- 🛠️ 易于维护和扩展
- 🔄 支持 Mock 和真实后端无缝切换

**使用建议**
- 开发阶段优先使用 Mock 模式
- 定期与真实后端联调
- 保持 Mock 数据与真实数据一致
- 编写清晰的 Handler 注释

**下一步**
- 阅读 [05-API接口](./05-API接口.md) 了解服务层接口
- 阅读 [03-开发指南](./03-开发指南.md) 学习开发规范
- 查看 [src/mock/](../src/mock/) 目录了解实现细节

---

**文档版本**: v2.0.0  
**最后更新**: 2026年3月9日  
**维护者**: [小铭](https://github.com/zzmingoo)  
**邮箱**: zzmingoo@gmail.com
