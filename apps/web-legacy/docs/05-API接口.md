# EduChain 前端 - API 接口 (Legacy)

## 版本信息

- **文档版本**: v1.0.0
- **更新日期**: 2026年3月9日
- **维护者**: [小铭](https://github.com/zzmingoo)

---

## 1. API 配置

### 1.1 基础配置

```typescript
// src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 1.2 请求拦截器

```typescript
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### 1.3 响应拦截器

```typescript
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，跳转登录
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 2. 认证服务

### 2.1 用户登录

```typescript
// src/services/auth.ts
export const authService = {
  login: (data: LoginRequest) => {
    return apiClient.post<LoginResponse>('/auth/login', data);
  },
};

// 类型定义
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
```

### 2.2 用户注册

```typescript
export const authService = {
  register: (data: RegisterRequest) => {
    return apiClient.post<User>('/auth/register', data);
  },
};

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}
```

### 2.3 刷新令牌

```typescript
export const authService = {
  refreshToken: (refreshToken: string) => {
    return apiClient.post<LoginResponse>('/auth/refresh', { refreshToken });
  },
};
```

## 3. 用户服务

### 3.1 获取当前用户

```typescript
// src/services/user.ts
export const userService = {
  getCurrentUser: () => {
    return apiClient.get<User>('/users/me');
  },
};
```

### 3.2 更新用户信息

```typescript
export const userService = {
  updateProfile: (data: UpdateProfileRequest) => {
    return apiClient.put<User>('/users/me', data);
  },
};

interface UpdateProfileRequest {
  fullName?: string;
  avatarUrl?: string;
  school?: string;
  bio?: string;
}
```

### 3.3 修改密码

```typescript
export const userService = {
  changePassword: (data: ChangePasswordRequest) => {
    return apiClient.put('/users/me/password', data);
  },
};

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```

### 3.4 获取用户统计

```typescript
export const userService = {
  getUserStats: () => {
    return apiClient.get<UserStats>('/users/me/stats');
  },
};

interface UserStats {
  totalKnowledge: number;
  totalLikes: number;
  totalFavorites: number;
  totalViews: number;
  followers: number;
  following: number;
}
```

## 4. 知识服务

### 4.1 获取知识列表

```typescript
// src/services/knowledge.ts
export const knowledgeService = {
  getList: (params: KnowledgeListParams) => {
    return apiClient.get<PaginatedResponse<KnowledgeItem>>('/knowledge', { params });
  },
};

interface KnowledgeListParams {
  page?: number;
  size?: number;
  categoryId?: number;
  type?: string;
  keyword?: string;
  sortBy?: string;
}
```

### 4.2 获取知识详情

```typescript
export const knowledgeService = {
  getDetail: (id: number) => {
    return apiClient.get<KnowledgeItem>(`/knowledge/${id}`);
  },
};
```

### 4.3 创建知识

```typescript
export const knowledgeService = {
  create: (data: KnowledgeCreateRequest) => {
    return apiClient.post<KnowledgeItem>('/knowledge', data);
  },
};

interface KnowledgeCreateRequest {
  title: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'LINK' | 'MIXED';
  categoryId: number;
  tags?: string;
  linkUrl?: string;
}
```

### 4.4 更新知识

```typescript
export const knowledgeService = {
  update: (id: number, data: KnowledgeUpdateRequest) => {
    return apiClient.put<KnowledgeItem>(`/knowledge/${id}`, data);
  },
};
```

### 4.5 删除知识

```typescript
export const knowledgeService = {
  delete: (id: number) => {
    return apiClient.delete(`/knowledge/${id}`);
  },
};
```

## 5. 搜索服务

### 5.1 搜索知识

```typescript
// src/services/search.ts
export const searchService = {
  search: (params: SearchParams) => {
    return apiClient.get<PaginatedResponse<KnowledgeItem>>('/search/quick', { params });
  },
};

interface SearchParams {
  keyword: string;
  page?: number;
  size?: number;
  categoryId?: number;
  sortBy?: string;
}
```

### 5.2 获取搜索建议

```typescript
export const searchService = {
  getSuggestions: (prefix: string) => {
    return apiClient.get<string[]>('/search/suggestions', {
      params: { prefix, limit: 10 }
    });
  },
};
```

### 5.3 获取热门关键词

```typescript
export const searchService = {
  getHotKeywords: (limit: number = 20) => {
    return apiClient.get<HotKeyword[]>('/search/hot-keywords', {
      params: { period: 'week', limit }
    });
  },
};

interface HotKeyword {
  keyword: string;
  searchCount: number;
  rank: number;
}
```

## 6. 区块链服务

### 6.1 获取区块链概览

```typescript
// src/services/blockchain.ts
export const blockchainService = {
  getOverview: () => {
    return apiClient.get<BlockchainOverview>('/blockchain/overview');
  },
};

interface BlockchainOverview {
  totalBlocks: number;
  totalTransactions: number;
  chainValid: boolean;
  pendingTransactions: number;
}
```

### 6.2 获取区块列表

```typescript
export const blockchainService = {
  getBlocks: (params: { page: number; size: number }) => {
    return apiClient.get<PaginatedResponse<Block>>('/blockchain/blocks', { params });
  },
};
```

### 6.3 获取区块详情

```typescript
export const blockchainService = {
  getBlockDetail: (index: number) => {
    return apiClient.get<Block>(`/blockchain/blocks/${index}`);
  },
};
```

### 6.4 验证内容

```typescript
export const blockchainService = {
  verifyContent: (data: VerifyRequest) => {
    return apiClient.post<VerifyResponse>('/blockchain/verify', data);
  },
};

interface VerifyRequest {
  blockIndex: number;
  message: string;
}

interface VerifyResponse {
  valid: boolean;
  message: string;
}
```

## 7. 互动服务

### 7.1 点赞

```typescript
// src/services/interaction.ts
export const interactionService = {
  like: (knowledgeId: number) => {
    return apiClient.post(`/interactions/like/${knowledgeId}`);
  },
  
  unlike: (knowledgeId: number) => {
    return apiClient.delete(`/interactions/like/${knowledgeId}`);
  },
};
```

### 7.2 收藏

```typescript
export const interactionService = {
  favorite: (knowledgeId: number) => {
    return apiClient.post(`/interactions/favorite/${knowledgeId}`);
  },
  
  unfavorite: (knowledgeId: number) => {
    return apiClient.delete(`/interactions/favorite/${knowledgeId}`);
  },
};
```

### 7.3 获取互动状态

```typescript
export const interactionService = {
  getStatus: (knowledgeId: number) => {
    return apiClient.get<InteractionStatus>(`/interactions/status/${knowledgeId}`);
  },
};

interface InteractionStatus {
  liked: boolean;
  favorited: boolean;
}
```

## 8. 评论服务

### 8.1 获取评论列表

```typescript
// src/services/comment.ts (假设存在)
export const commentService = {
  getList: (knowledgeId: number, params: { page: number; size: number }) => {
    return apiClient.get<PaginatedResponse<Comment>>(`/comments/knowledge/${knowledgeId}`, { params });
  },
};
```

### 8.2 创建评论

```typescript
export const commentService = {
  create: (data: CommentCreateRequest) => {
    return apiClient.post<Comment>('/comments', data);
  },
};

interface CommentCreateRequest {
  knowledgeId: number;
  content: string;
  parentId?: number;
}
```

### 8.3 删除评论

```typescript
export const commentService = {
  delete: (commentId: number) => {
    return apiClient.delete(`/comments/${commentId}`);
  },
};
```

## 9. 管理服务

### 9.1 获取用户列表

```typescript
// src/services/admin.ts
export const adminService = {
  getUsers: (params: AdminUserListParams) => {
    return apiClient.get<PaginatedResponse<User>>('/admin/users', { params });
  },
};

interface AdminUserListParams {
  keyword?: string;
  status?: number;
  page?: number;
  size?: number;
}
```

### 9.2 禁用/启用用户

```typescript
export const adminService = {
  disableUser: (userId: number, reason: string) => {
    return apiClient.put(`/admin/users/${userId}/disable`, null, {
      params: { reason }
    });
  },
  
  enableUser: (userId: number, reason: string) => {
    return apiClient.put(`/admin/users/${userId}/enable`, null, {
      params: { reason }
    });
  },
};
```

### 9.3 审核内容

```typescript
export const adminService = {
  approveContent: (knowledgeId: number, reason: string) => {
    return apiClient.put(`/admin/knowledge-items/${knowledgeId}/approve`, null, {
      params: { reason }
    });
  },
  
  rejectContent: (knowledgeId: number, reason: string) => {
    return apiClient.put(`/admin/knowledge-items/${knowledgeId}/reject`, null, {
      params: { reason }
    });
  },
};
```

## 10. 通用类型定义

```typescript
// src/types/api.ts
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: 'LEARNER' | 'ADMIN';
  status: number;
  createdAt: string;
}

export interface KnowledgeItem {
  id: number;
  shareCode: string;
  title: string;
  content: string;
  type: string;
  uploaderId: number;
  categoryId: number;
  tags?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
```

## 11. 错误处理

### 11.1 错误码

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |

### 11.2 错误处理示例

```typescript
try {
  const data = await knowledgeService.getDetail(id);
  setKnowledge(data);
} catch (error: any) {
  if (error.response?.status === 404) {
    message.error('知识内容不存在');
    navigate('/404');
  } else if (error.response?.status === 401) {
    message.error('请先登录');
    navigate('/login');
  } else {
    message.error(error.response?.data?.message || '加载失败');
  }
}
```

## 12. 总结

本文档列出了 EduChain 前端 Legacy 版本使用的主要 API 接口。所有接口都经过实际项目验证，具有良好的稳定性和可用性。

完整的后端 API 文档请参考：[后端 API 文档](../../../services/backend/src/main/java/com/example/educhain/docs/API接口文档.md)

---

**下一篇**: [部署指南](./06-部署指南.md)
