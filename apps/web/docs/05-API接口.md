# 05 - API 接口

> 服务层接口与 Mock Handlers 完整对应关系

## 📋 目录

- [接口概述](#接口概述)
- [认证接口](#认证接口)
- [用户接口](#用户接口)
- [知识接口](#知识接口)
- [分类接口](#分类接口)
- [评论接口](#评论接口)
- [互动接口](#互动接口)
- [搜索接口](#搜索接口)
- [区块链接口](#区块链接口)
- [管理员接口](#管理员接口)

## 接口概述

### API 基础信息

**Base URL**
- Mock 模式: `/api`
- 真实后端: `http://localhost:8080/api` (可配置)

**请求格式**
- Content-Type: `application/json`
- Authorization: `Bearer {token}`

**响应格式**

```typescript
interface ApiResponse<T> {
  success: boolean;      // 是否成功
  message: string;       // 响应消息
  data: T | null;        // 响应数据
  timestamp: string;     // 时间戳
  code?: string;         // 错误码（失败时）
}
```

**分页响应**

```typescript
interface PageResponse<T> {
  content: T[];          // 数据列表
  totalElements: number; // 总数据量
  totalPages: number;    // 总页数
  size: number;          // 每页大小
  number: number;        // 当前页码
  first: boolean;        // 是否第一页
  last: boolean;         // 是否最后一页
  empty: boolean;        // 是否为空
}
```

### 服务层与 Mock 对应关系

| 服务层文件 | Mock Handler 文件 | 说明 |
|-----------|------------------|------|
| `auth.ts` | `handlers/auth.ts` | 认证服务 |
| `user.ts` | `handlers/user.ts` + `handlers/follow.ts` | 用户服务 |
| `knowledge.ts` | `handlers/knowledge.ts` | 知识服务 |
| `category.ts` | `handlers/category.ts` | 分类服务 |
| `interaction.ts` | `handlers/interaction.ts` | 互动服务 |
| `search.ts` | `handlers/search.ts` | 搜索服务 |
| `blockchain.ts` | `handlers/blockchain.ts` | 区块链服务 |
| `admin.ts` | `handlers/admin.ts` | 管理员服务 |


## 认证接口

### 用户登录

**接口信息**
- 路径: `POST /auth/login`
- 权限: 公开
- 服务层: `authService.login()`
- Mock Handler: `handlers/auth.ts` - `authHandlers[0]`

**请求参数**

```typescript
interface LoginRequest {
  usernameOrEmail: string;  // 用户名或邮箱
  password: string;         // 密码
}
```

**请求示例**

```typescript
import { authService } from '@/services/auth';

const login = async () => {
  try {
    const response = await authService.login({
      usernameOrEmail: 'admin',
      password: 'admin123',
    });
    
    console.log('登录成功:', response.data);
    // {
    //   user: { id: 1, username: 'admin', ... },
    //   accessToken: 'mock_access_token_1',
    //   refreshToken: 'mock_refresh_token_1',
    //   expiresIn: 3600
    // }
  } catch (error) {
    console.error('登录失败:', error);
  }
};
```

**响应数据**

```typescript
interface LoginResponse {
  user: User;              // 用户信息
  accessToken: string;     // 访问令牌
  refreshToken: string;    // 刷新令牌
  expiresIn: number;       // 过期时间（秒）
}

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  school?: string;
  level: number;
  bio?: string;
  role: 'ADMIN' | 'LEARNER';
  status: number;
  createdAt: string;
  updatedAt: string;
}
```

**Mock 实现**

```typescript
// src/mock/handlers/auth.ts
http.post(`${API_BASE}/auth/login`, async ({ request }) => {
  await delay();
  const body = await request.json() as LoginRequest;
  
  const user = mockUsers.find(
    u => (u.username === body.usernameOrEmail || 
          u.email === body.usernameOrEmail) && 
         body.password
  );
  
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
});
```

**错误码**
- `INVALID_CREDENTIALS`: 用户名或密码错误
- `VALIDATION_ERROR`: 参数验证失败

### 用户注册

**接口信息**
- 路径: `POST /auth/register`
- 权限: 公开
- 服务层: `authService.register()`
- Mock Handler: `handlers/auth.ts` - `authHandlers[1]`

**请求参数**

```typescript
interface RegisterRequest {
  username: string;     // 用户名（3-20字符，字母数字下划线）
  email: string;        // 邮箱
  password: string;     // 密码（至少6字符）
  fullName: string;     // 姓名
  school?: string;      // 学校（可选）
}
```

**请求示例**

```typescript
const register = async () => {
  try {
    const response = await authService.register({
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123',
      fullName: '新用户',
      school: '清华大学',
    });
    
    console.log('注册成功:', response.data);
  } catch (error) {
    console.error('注册失败:', error);
  }
};
```

**响应数据**

```typescript
// 返回新创建的用户信息
User
```

**Mock 实现**

```typescript
http.post(`${API_BASE}/auth/register`, async ({ request }) => {
  await delay();
  const userData = await request.json() as RegisterRequest;
  
  // 参数验证
  const validationError = validate(
    () => validateRequired(userData, ['username', 'email', 'password', 'fullName']),
    () => validateUsername(userData.username),
    () => validateEmail(userData.email),
    () => validateStringLength(userData.password, '密码', 6, 50)
  );
  
  if (validationError) {
    return HttpResponse.json(validationError, { status: 400 });
  }
  
  // 检查重复
  const existingUser = mockUsers.find(
    u => u.username === userData.username || u.email === userData.email
  );
  
  if (existingUser) {
    return HttpResponse.json(
      createErrorResponse('DUPLICATE_ENTRY', 
        existingUser.username === userData.username 
          ? '用户名已存在' 
          : '邮箱已存在'
      ),
      { status: 400 }
    );
  }
  
  // 创建新用户
  const newUser = {
    id: mockUsers.length + 1,
    ...userData,
    level: 1,
    role: 'LEARNER' as const,
    status: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockUsers.push(newUser);
  return HttpResponse.json(createSuccessResponse(newUser), { status: 201 });
});
```

**错误码**
- `MISSING_PARAMETER`: 缺少必要参数
- `VALIDATION_ERROR`: 参数格式错误
- `DUPLICATE_ENTRY`: 用户名或邮箱已存在

### 刷新 Token

**接口信息**
- 路径: `POST /auth/refresh`
- 权限: 需要 refreshToken
- 服务层: `authService.refreshToken()`
- Mock Handler: `handlers/auth.ts` - `authHandlers[3]`

**请求参数**

```typescript
interface RefreshTokenRequest {
  refreshToken: string;  // 刷新令牌
}
```

**请求示例**

```typescript
const refreshToken = async () => {
  const refreshToken = token.getRefreshToken();
  
  try {
    const response = await authService.refreshToken(refreshToken);
    
    // 保存新的 Token
    token.setTokens(
      response.data.accessToken,
      response.data.refreshToken
    );
    
    console.log('Token 刷新成功');
  } catch (error) {
    console.error('Token 刷新失败:', error);
    // 跳转到登录页
    router.push('/login');
  }
};
```

**响应数据**

```typescript
interface RefreshTokenResponse {
  accessToken: string;   // 新的访问令牌
  refreshToken: string;  // 新的刷新令牌
  expiresIn: number;     // 过期时间（秒）
}
```

**Mock 实现**

```typescript
http.post(`${API_BASE}/auth/refresh`, async ({ request }) => {
  await delay();
  const body = await request.json() as RefreshTokenRequest;
  
  if (body.refreshToken) {
    return HttpResponse.json(
      createSuccessResponse({
        accessToken: 'mock_new_access_token',
        refreshToken: 'mock_new_refresh_token',
        expiresIn: 3600,
      })
    );
  }
  
  return HttpResponse.json(
    createErrorResponse('UNAUTHORIZED'),
    { status: 401 }
  );
});
```

### 获取当前用户信息

**接口信息**
- 路径: `GET /users/me`
- 权限: 需要登录
- 服务层: `authService.getCurrentUser()`
- Mock Handler: `handlers/auth.ts` - `authHandlers[2]`

**请求示例**

```typescript
const getCurrentUser = async () => {
  try {
    const response = await authService.getCurrentUser();
    console.log('当前用户:', response.data);
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};
```

**响应数据**

```typescript
User  // 当前登录用户的完整信息
```

**Mock 实现**

```typescript
http.get(`${API_BASE}/users/me`, async ({ request }) => {
  await delay();
  const currentUserId = getCurrentUserId(request);
  
  if (!currentUserId) {
    return HttpResponse.json(
      createErrorResponse('UNAUTHORIZED'),
      { status: 401 }
    );
  }
  
  const user = mockUsers.find(u => u.id === currentUserId);
  
  if (!user) {
    return HttpResponse.json(
      createErrorResponse('NOT_FOUND'),
      { status: 404 }
    );
  }
  
  return HttpResponse.json(createSuccessResponse(user));
});
```

### 用户登出

**接口信息**
- 路径: `POST /auth/logout`
- 权限: 需要登录
- 服务层: `authService.logout()`
- Mock Handler: `handlers/auth.ts` - `authHandlers[4]`

**请求参数**

```typescript
interface LogoutRequest {
  userId: number;  // 用户 ID
}
```

**请求示例**

```typescript
const logout = async () => {
  try {
    await authService.logout(user.id);
    
    // 清除本地 Token
    token.clearAuth();
    
    // 跳转到登录页
    router.push('/login');
  } catch (error) {
    console.error('登出失败:', error);
  }
};
```

**响应数据**

```typescript
{
  message: string;  // "登出成功"
}
```

### 检查用户名可用性

**接口信息**
- 路径: `GET /auth/check-username`
- 权限: 公开
- 服务层: `authService.checkUsername()`
- Mock Handler: `handlers/auth.ts` - `authHandlers[5]`

**请求参数**

```typescript
{
  username: string;  // 要检查的用户名
}
```

**请求示例**

```typescript
const checkUsername = async (username: string) => {
  try {
    const response = await authService.checkUsername(username);
    
    if (response.data) {
      console.log('用户名可用');
    } else {
      console.log('用户名已被使用');
    }
  } catch (error) {
    console.error('检查失败:', error);
  }
};
```

**响应数据**

```typescript
boolean  // true: 可用, false: 已被使用
```

### 检查邮箱可用性

**接口信息**
- 路径: `GET /auth/check-email`
- 权限: 公开
- 服务层: `authService.checkEmail()`
- Mock Handler: `handlers/auth.ts` - `authHandlers[6]`

**请求参数**

```typescript
{
  email: string;  // 要检查的邮箱
}
```

**请求示例**

```typescript
const checkEmail = async (email: string) => {
  try {
    const response = await authService.checkEmail(email);
    
    if (response.data) {
      console.log('邮箱可用');
    } else {
      console.log('邮箱已被使用');
    }
  } catch (error) {
    console.error('检查失败:', error);
  }
};
```

**响应数据**

```typescript
boolean  // true: 可用, false: 已被使用
```


## 用户接口

### 获取用户信息

**接口信息**
- 路径: `GET /users/:id`
- 权限: 公开
- 服务层: `userService.getUserById()`
- Mock Handler: `handlers/user.ts` - `userHandlers[0]`

**请求参数**

```typescript
{
  id: number;  // 用户 ID（路径参数）
}
```

**请求示例**

```typescript
const getUserInfo = async (userId: number) => {
  try {
    const response = await userService.getUserById(userId);
    console.log('用户信息:', response.data);
    // {
    //   id: 2,
    //   username: 'xiaoming',
    //   fullName: '小铭',
    //   knowledgeCount: 45,
    //   followerCount: 320,
    //   followingCount: 150,
    //   ...
    // }
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface UserWithStats extends User {
  knowledgeCount: number;   // 知识数量
  followerCount: number;    // 粉丝数
  followingCount: number;   // 关注数
}
```

**Mock 实现**

```typescript
http.get(`${API_BASE}/users/:id`, async ({ params }) => {
  await delay();
  const { id } = params;
  const user = mockUsers.find(u => u.id === Number(id));
  
  if (user) {
    const userWithStats = {
      ...user,
      knowledgeCount: mockUserStats[user.id]?.knowledgeCount || 0,
      followerCount: mockUserStats[user.id]?.followerCount || 0,
      followingCount: mockUserStats[user.id]?.followingCount || 0,
    };
    return HttpResponse.json(createSuccessResponse(userWithStats));
  }
  
  return HttpResponse.json(
    createErrorResponse('NOT_FOUND', '用户不存在'),
    { status: 404 }
  );
});
```

### 获取用户统计信息

**接口信息**
- 路径: `GET /users/:id/stats`
- 权限: 公开
- 服务层: `userService.getUserStats()`
- Mock Handler: `handlers/user.ts` - `userHandlers[1]`

**请求示例**

```typescript
const getUserStats = async (userId: number) => {
  try {
    const response = await userService.getUserStats(userId);
    console.log('用户统计:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface UserStats {
  userId: number;
  knowledgeCount: number;   // 知识数量
  likeCount: number;        // 获赞数
  favoriteCount: number;    // 被收藏数
  followerCount: number;    // 粉丝数
  followingCount: number;   // 关注数
  viewCount: number;        // 浏览量
}
```

### 更新用户信息

**接口信息**
- 路径: `PUT /users/me`
- 权限: 需要登录
- 服务层: `userService.updateProfile()`
- Mock Handler: `handlers/user.ts` - `userHandlers[3]`

**请求参数**

```typescript
interface UpdateProfileRequest {
  fullName?: string;    // 姓名
  avatarUrl?: string;   // 头像 URL
  school?: string;      // 学校
  bio?: string;         // 个人简介
}
```

**请求示例**

```typescript
const updateProfile = async () => {
  try {
    const response = await userService.updateProfile({
      fullName: '新名字',
      bio: '这是我的新简介',
    });
    
    console.log('更新成功:', response.data);
  } catch (error) {
    console.error('更新失败:', error);
  }
};
```

**响应数据**

```typescript
User  // 更新后的用户信息
```

### 修改密码

**接口信息**
- 路径: `PUT /users/me/password`
- 权限: 需要登录
- 服务层: `userService.changePassword()`
- Mock Handler: `handlers/user.ts` - `userHandlers[4]`

**请求参数**

```typescript
interface ChangePasswordRequest {
  currentPassword: string;   // 当前密码
  newPassword: string;       // 新密码
  confirmPassword: string;   // 确认密码
}
```

**请求示例**

```typescript
const changePassword = async () => {
  try {
    await userService.changePassword({
      currentPassword: 'oldpass123',
      newPassword: 'newpass123',
      confirmPassword: 'newpass123',
    });
    
    console.log('密码修改成功');
  } catch (error) {
    console.error('修改失败:', error);
  }
};
```

**响应数据**

```typescript
{
  success: boolean;  // true
}
```

### 搜索用户

**接口信息**
- 路径: `GET /users/search`
- 权限: 公开
- 服务层: `userService.searchUsers()`
- Mock Handler: `handlers/user.ts` - `userHandlers[5]`

**请求参数**

```typescript
{
  keyword: string;   // 搜索关键词
  page?: number;     // 页码（默认 0）
  size?: number;     // 每页大小（默认 10）
}
```

**请求示例**

```typescript
const searchUsers = async (keyword: string) => {
  try {
    const response = await userService.searchUsers(keyword, {
      page: 0,
      size: 10,
    });
    
    console.log('搜索结果:', response.data);
  } catch (error) {
    console.error('搜索失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<UserWithStats>
```

### 获取所有用户（管理员）

**接口信息**
- 路径: `GET /users`
- 权限: 管理员
- 服务层: `userService.getAllUsers()`
- Mock Handler: `handlers/user.ts` - `userHandlers[6]`

**请求参数**

```typescript
{
  page?: number;     // 页码（默认 0）
  size?: number;     // 每页大小（默认 10）
}
```

**请求示例**

```typescript
const getAllUsers = async () => {
  try {
    const response = await userService.getAllUsers({
      page: 0,
      size: 20,
    });
    
    console.log('用户列表:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<UserWithStats>
```

### 根据用户名获取用户

**接口信息**
- 路径: `GET /users/username/:username`
- 权限: 公开
- 服务层: `userService.getUserByUsername()`
- Mock Handler: `handlers/user.ts` - `userHandlers[7]`

**请求参数**

```typescript
{
  username: string;  // 用户名（路径参数）
}
```

**请求示例**

```typescript
const getUserByUsername = async (username: string) => {
  try {
    const response = await userService.getUserByUsername(username);
    console.log('用户信息:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
UserWithStats
```

## 知识接口

### 获取知识列表

**接口信息**
- 路径: `GET /knowledge`
- 权限: 公开
- 服务层: `knowledgeService.getKnowledgeList()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[2]`

**请求参数**

```typescript
{
  page?: number;        // 页码（默认 0）
  size?: number;        // 每页大小（默认 10）
  categoryId?: number;  // 分类 ID（可选）
  type?: string;        // 内容类型（可选）
  status?: number;      // 状态（可选，默认只显示已发布）
  keyword?: string;     // 关键词（可选）
}
```

**请求示例**

```typescript
const getKnowledgeList = async () => {
  try {
    const response = await knowledgeService.getKnowledgeList({
      page: 0,
      size: 10,
      categoryId: 11,  // React 分类
    });
    
    console.log('知识列表:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface KnowledgeItemWithStats extends KnowledgeItem {
  stats: KnowledgeStats;
}

interface KnowledgeItem {
  id: number;
  title: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'PDF' | 'LINK';
  mediaUrls?: string[];
  linkUrl?: string;
  categoryId: number;
  tags?: string;
  uploaderId: number;
  uploaderName: string;
  uploaderAvatar?: string;
  status: number;  // 0: 草稿, 1: 已发布, -1: 已删除
  shareCode: string;
  contentHash: string;
  createdAt: string;
  updatedAt: string;
}

interface KnowledgeStats {
  knowledgeId: number;
  viewCount: number;      // 浏览量
  likeCount: number;      // 点赞数
  favoriteCount: number;  // 收藏数
  commentCount: number;   // 评论数
  shareCount: number;     // 分享数
  score: number;          // 评分
}

PageResponse<KnowledgeItemWithStats>
```

### 通过分享码获取知识详情

**接口信息**
- 路径: `GET /knowledge/share/:shareCode`
- 权限: 公开
- 服务层: `knowledgeService.getKnowledgeByShareCode()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[3]`

**请求参数**

```typescript
{
  shareCode: string;  // 分享码（路径参数）
}
```

**请求示例**

```typescript
const getKnowledgeByShareCode = async (shareCode: string) => {
  try {
    const response = await knowledgeService.getKnowledgeByShareCode(shareCode);
    console.log('知识详情:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
KnowledgeItemWithStats
```

### 通过 ID 获取知识详情

**接口信息**
- 路径: `GET /knowledge/:id`
- 权限: 公开
- 服务层: `knowledgeService.getKnowledgeById()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[4]`

**请求参数**

```typescript
{
  id: number;  // 知识 ID（路径参数）
}
```

**请求示例**

```typescript
const getKnowledgeById = async (id: number) => {
  try {
    const response = await knowledgeService.getKnowledgeById(id);
    console.log('知识详情:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
KnowledgeItemWithStats
```

### 创建知识

**接口信息**
- 路径: `POST /knowledge`
- 权限: 需要登录
- 服务层: `knowledgeService.createKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[5]`

**请求参数**

```typescript
interface CreateKnowledgeRequest {
  title: string;           // 标题
  content: string;         // 内容
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'PDF' | 'LINK';
  mediaUrls?: string[];    // 媒体 URL 列表
  linkUrl?: string;        // 链接 URL
  categoryId: number;      // 分类 ID
  tags?: string;           // 标签（逗号分隔）
}
```

**请求示例**

```typescript
const createKnowledge = async () => {
  try {
    const response = await knowledgeService.createKnowledge({
      title: 'React Hooks 完全指南',
      content: '# React Hooks 介绍\n\n...',
      type: 'TEXT',
      categoryId: 11,
      tags: 'React,Hooks,前端',
    });
    
    console.log('创建成功:', response.data);
  } catch (error) {
    console.error('创建失败:', error);
  }
};
```

**响应数据**

```typescript
KnowledgeItem  // 新创建的知识
```

### 更新知识

**接口信息**
- 路径: `PUT /knowledge/:id`
- 权限: 需要登录（仅作者或管理员）
- 服务层: `knowledgeService.updateKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[6]`

**请求参数**

```typescript
{
  id: number;  // 知识 ID（路径参数）
  ...UpdateKnowledgeRequest  // 更新字段（同创建接口，所有字段可选）
}
```

**请求示例**

```typescript
const updateKnowledge = async (id: number) => {
  try {
    const response = await knowledgeService.updateKnowledge(id, {
      title: '新标题',
      content: '更新后的内容',
    });
    
    console.log('更新成功:', response.data);
  } catch (error) {
    console.error('更新失败:', error);
  }
};
```

**响应数据**

```typescript
KnowledgeItem  // 更新后的知识
```

### 删除知识

**接口信息**
- 路径: `DELETE /knowledge/:id`
- 权限: 需要登录（仅作者或管理员）
- 服务层: `knowledgeService.deleteKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[7]`

**请求参数**

```typescript
{
  id: number;  // 知识 ID（路径参数）
}
```

**请求示例**

```typescript
const deleteKnowledge = async (id: number) => {
  try {
    await knowledgeService.deleteKnowledge(id);
    console.log('删除成功');
  } catch (error) {
    console.error('删除失败:', error);
  }
};
```

**响应数据**

```typescript
null
```

### 保存草稿

**接口信息**
- 路径: `POST /knowledge/drafts`
- 权限: 需要登录
- 服务层: `knowledgeService.saveDraft()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[1]`

**请求参数**

```typescript
CreateKnowledgeRequest  // 同创建知识接口
```

**请求示例**

```typescript
const saveDraft = async () => {
  try {
    const response = await knowledgeService.saveDraft({
      title: '草稿标题',
      content: '草稿内容',
      type: 'TEXT',
      categoryId: 11,
    });
    
    console.log('草稿保存成功:', response.data);
  } catch (error) {
    console.error('保存失败:', error);
  }
};
```

**响应数据**

```typescript
KnowledgeItem  // status 为 0（草稿状态）
```

### 获取用户草稿

**接口信息**
- 路径: `GET /knowledge/drafts`
- 权限: 需要登录
- 服务层: `knowledgeService.getUserDrafts()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[0]`

**请求参数**

```typescript
{
  page?: number;     // 页码（默认 0）
  size?: number;     // 每页大小（默认 10）
}
```

**请求示例**

```typescript
const getUserDrafts = async () => {
  try {
    const response = await knowledgeService.getUserDrafts({
      page: 0,
      size: 10,
    });
    
    console.log('草稿列表:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>
```

### 发布草稿

**接口信息**
- 路径: `POST /knowledge/:id/publish`
- 权限: 需要登录（仅作者）
- 服务层: `knowledgeService.publishDraft()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[34]`

**请求参数**

```typescript
{
  id: number;  // 草稿 ID（路径参数）
}
```

**请求示例**

```typescript
const publishDraft = async (id: number) => {
  try {
    const response = await knowledgeService.publishDraft(id);
    console.log('发布成功:', response.data);
  } catch (error) {
    console.error('发布失败:', error);
  }
};
```

**响应数据**

```typescript
KnowledgeItem  // status 更新为 1（已发布）
```

### 搜索知识

**接口信息**
- 路径: `GET /knowledge/search`
- 权限: 公开
- 服务层: `knowledgeService.searchKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[24]`

**请求参数**

```typescript
{
  keyword: string;   // 搜索关键词
  page?: number;     // 页码（默认 0）
  size?: number;     // 每页大小（默认 10）
  sort?: string;     // 排序方式：TIME, POPULARITY, RELEVANCE
}
```

**请求示例**

```typescript
const searchKnowledge = async (keyword: string) => {
  try {
    const response = await knowledgeService.searchKnowledge(keyword, {
      page: 0,
      size: 10,
      sort: 'RELEVANCE',
    });
    
    console.log('搜索结果:', response.data);
  } catch (error) {
    console.error('搜索失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>
```

### 高级搜索

**接口信息**
- 路径: `POST /knowledge/advanced-search`
- 权限: 公开
- 服务层: `knowledgeService.advancedSearch()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[25]`

**请求参数**

```typescript
interface AdvancedSearchRequest {
  keyword?: string;      // 关键词
  categoryId?: number;   // 分类 ID
  type?: string;         // 内容类型
  tags?: string[];       // 标签列表
  page?: number;         // 页码
  size?: number;         // 每页大小
  sort?: string;         // 排序方式
}
```

**请求示例**

```typescript
const advancedSearch = async () => {
  try {
    const response = await knowledgeService.advancedSearch({
      keyword: 'React',
      categoryId: 11,
      tags: ['Hooks', '前端'],
      sort: 'POPULARITY',
    }, {
      page: 0,
      size: 10,
    });
    
    console.log('搜索结果:', response.data);
  } catch (error) {
    console.error('搜索失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>
```

### 获取热门内容

**接口信息**
- 路径: `GET /knowledge/popular`
- 权限: 公开
- 服务层: `knowledgeService.getPopularKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[8]`

**请求示例**

```typescript
const getPopularKnowledge = async () => {
  try {
    const response = await knowledgeService.getPopularKnowledge({
      page: 0,
      size: 10,
    });
    
    console.log('热门内容:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>  // 按浏览量排序
```

### 获取最新内容

**接口信息**
- 路径: `GET /knowledge/latest`
- 权限: 公开
- 服务层: `knowledgeService.getLatestKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[9]`

**请求示例**

```typescript
const getLatestKnowledge = async () => {
  try {
    const response = await knowledgeService.getLatestKnowledge({
      page: 0,
      size: 10,
    });
    
    console.log('最新内容:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>  // 按创建时间排序
```

### 获取推荐内容

**接口信息**
- 路径: `GET /knowledge/recommended`
- 权限: 公开
- 服务层: `knowledgeService.getRecommendedKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[32]`

**请求示例**

```typescript
const getRecommendedKnowledge = async () => {
  try {
    const response = await knowledgeService.getRecommendedKnowledge({
      page: 0,
      size: 10,
    });
    
    console.log('推荐内容:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>
```

### 获取相关内容

**接口信息**
- 路径: `GET /knowledge/:id/related`
- 权限: 公开
- 服务层: `knowledgeService.getRelatedKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[13]`

**请求参数**

```typescript
{
  id: number;      // 知识 ID（路径参数）
  limit?: number;  // 返回数量（默认 10）
}
```

**请求示例**

```typescript
const getRelatedKnowledge = async (id: number) => {
  try {
    const response = await knowledgeService.getRelatedKnowledge(id, 10);
    console.log('相关内容:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
KnowledgeItemWithStats[]  // 同分类的其他内容
```

### 获取用户的知识内容

**接口信息**
- 路径: `GET /knowledge/user/:userId`
- 权限: 公开
- 服务层: `knowledgeService.getKnowledgeByUser()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[10]`

**请求参数**

```typescript
{
  userId: number;    // 用户 ID（路径参数）
  page?: number;     // 页码
  size?: number;     // 每页大小
}
```

**请求示例**

```typescript
const getUserKnowledge = async (userId: number) => {
  try {
    const response = await knowledgeService.getKnowledgeByUser(userId, {
      page: 0,
      size: 10,
    });
    
    console.log('用户知识:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>
```

### 获取分类下的知识内容

**接口信息**
- 路径: `GET /knowledge/category/:categoryId`
- 权限: 公开
- 服务层: `knowledgeService.getKnowledgeByCategory()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[11]`

**请求参数**

```typescript
{
  categoryId: number;  // 分类 ID（路径参数）
  page?: number;       // 页码
  size?: number;       // 每页大小
}
```

**请求示例**

```typescript
const getCategoryKnowledge = async (categoryId: number) => {
  try {
    const response = await knowledgeService.getKnowledgeByCategory(categoryId, {
      page: 0,
      size: 10,
    });
    
    console.log('分类知识:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>
```

### 根据标签获取知识内容

**接口信息**
- 路径: `GET /knowledge/tag/:tag`
- 权限: 公开
- 服务层: `knowledgeService.getKnowledgeByTag()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[31]`

**请求参数**

```typescript
{
  tag: string;       // 标签（路径参数）
  page?: number;     // 页码
  size?: number;     // 每页大小
}
```

**请求示例**

```typescript
const getKnowledgeByTag = async (tag: string) => {
  try {
    const response = await knowledgeService.getKnowledgeByTag(tag, {
      page: 0,
      size: 10,
    });
    
    console.log('标签知识:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
PageResponse<KnowledgeItemWithStats>
```

### 批量删除知识

**接口信息**
- 路径: `POST /knowledge/batch-delete`
- 权限: 需要登录（管理员）
- 服务层: `knowledgeService.batchDeleteKnowledge()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[26]`

**请求参数**

```typescript
number[]  // 知识 ID 列表
```

**请求示例**

```typescript
const batchDelete = async (ids: number[]) => {
  try {
    const response = await knowledgeService.batchDeleteKnowledge(ids);
    console.log('删除成功:', response.data.deletedCount, '条');
  } catch (error) {
    console.error('删除失败:', error);
  }
};
```

**响应数据**

```typescript
{
  deletedCount: number;  // 删除数量
}
```

### 批量更新状态

**接口信息**
- 路径: `POST /knowledge/batch-update-status`
- 权限: 需要登录（管理员）
- 服务层: `knowledgeService.batchUpdateStatus()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[35]`

**请求参数**

```typescript
{
  ids: number[];     // 知识 ID 列表
  status: number;    // 新状态
}
```

**请求示例**

```typescript
const batchUpdateStatus = async (ids: number[], status: number) => {
  try {
    const response = await knowledgeService.batchUpdateStatus(ids, status);
    console.log('更新成功:', response.data.updatedCount, '条');
  } catch (error) {
    console.error('更新失败:', error);
  }
};
```

**响应数据**

```typescript
{
  updatedCount: number;  // 更新数量
}
```

### 获取知识内容统计

**接口信息**
- 路径: `GET /knowledge/stats`
- 权限: 公开
- 服务层: `knowledgeService.getKnowledgeStats()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[36]`

**请求示例**

```typescript
const getKnowledgeStats = async () => {
  try {
    const response = await knowledgeService.getKnowledgeStats();
    console.log('知识统计:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface KnowledgeStatsResponse {
  totalKnowledge: number;   // 总知识数
  totalViews: number;       // 总浏览量
  totalLikes: number;       // 总点赞数
  totalComments: number;    // 总评论数
  todayCreated: number;     // 今日新增
}
```

### 获取用户知识内容统计

**接口信息**
- 路径: `GET /knowledge/user-stats/:userId`
- 权限: 公开
- 服务层: `knowledgeService.getUserKnowledgeStats()`
- Mock Handler: `handlers/knowledge.ts` - `knowledgeHandlers[37]`

**请求参数**

```typescript
{
  userId: number;  // 用户 ID（路径参数）
}
```

**请求示例**

```typescript
const getUserKnowledgeStats = async (userId: number) => {
  try {
    const response = await knowledgeService.getUserKnowledgeStats(userId);
    console.log('用户知识统计:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface UserKnowledgeStats {
  userId: number;
  totalKnowledge: number;   // 总知识数
  totalViews: number;       // 总浏览量
  totalLikes: number;       // 总点赞数
  totalComments: number;    // 总评论数
  averageScore: number;     // 平均评分
}
```

## 区块链接口

### 获取区块链概览

**接口信息**
- 路径: `GET /blockchain/overview`
- 权限: 公开
- 服务层: `blockchainService.getOverview()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[0]`

**请求示例**

```typescript
const getBlockchainOverview = async () => {
  try {
    const response = await blockchainService.getOverview();
    console.log('区块链概览:', response.data);
    // {
    //   totalBlocks: 10,
    //   totalTransactions: 15,
    //   totalCertificates: 15,
    //   latestBlock: { ... },
    //   networkStatus: 'healthy'
    // }
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface BlockchainOverview {
  totalBlocks: number;           // 总区块数
  totalTransactions: number;     // 总交易数
  totalCertificates: number;     // 总证书数
  latestBlock: Block;            // 最新区块
  networkStatus: string;         // 网络状态
}

interface Block {
  index: number;                 // 区块索引
  timestamp: string;             // 时间戳
  transactions: Transaction[];   // 交易列表
  previousHash: string;          // 前一个区块哈希
  hash: string;                  // 当前区块哈希
  nonce: number;                 // 随机数
  difficulty: number;            // 难度
}

interface Transaction {
  id: string;                    // 交易 ID
  knowledgeId: number;           // 知识 ID
  knowledgeTitle: string;        // 知识标题
  userId: number;                // 用户 ID
  userName: string;              // 用户名
  contentHash: string;           // 内容哈希
  timestamp: string;             // 时间戳
  type: string;                  // 交易类型
}
```

### 获取区块列表

**接口信息**
- 路径: `GET /blockchain/blocks`
- 权限: 公开
- 服务层: `blockchainService.getBlocks()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[1]`

**请求参数**

```typescript
{
  page?: number;     // 页码（默认 0）
  size?: number;     // 每页大小（默认 10）
}
```

**请求示例**

```typescript
const getBlocks = async () => {
  try {
    const response = await blockchainService.getBlocks({
      page: 0,
      size: 10,
    });
    
    console.log('区块列表:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface BlockListResponse {
  content: Block[];          // 区块列表
  totalElements: number;     // 总数量
  totalPages: number;        // 总页数
  currentPage: number;       // 当前页码
}
```

### 获取区块详情

**接口信息**
- 路径: `GET /blockchain/blocks/:index`
- 权限: 公开
- 服务层: `blockchainService.getBlock()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[2]`

**请求参数**

```typescript
{
  index: number;  // 区块索引（路径参数）
}
```

**请求示例**

```typescript
const getBlockDetail = async (index: number) => {
  try {
    const response = await blockchainService.getBlock(index);
    console.log('区块详情:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
Block  // 完整的区块信息
```

### 获取交易详情

**接口信息**
- 路径: `GET /blockchain/transactions/:id`
- 权限: 公开
- 服务层: `blockchainService.getTransaction()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[3]`

**请求参数**

```typescript
{
  id: string;  // 交易 ID（路径参数）
}
```

**请求示例**

```typescript
const getTransactionDetail = async (id: string) => {
  try {
    const response = await blockchainService.getTransaction(id);
    console.log('交易详情:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface TransactionDetail extends Transaction {
  blockIndex: number;        // 所在区块索引
  status: string;            // 交易状态
}
```

### 根据知识 ID 获取证书信息

**接口信息**
- 路径: `GET /blockchain/certificates/knowledge/:id`
- 权限: 公开
- 服务层: `blockchainService.getCertificateByKnowledge()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[4]`

**请求参数**

```typescript
{
  id: number;  // 知识 ID（路径参数）
}
```

**请求示例**

```typescript
const getCertificate = async (knowledgeId: number) => {
  try {
    const response = await blockchainService.getCertificateByKnowledge(knowledgeId);
    
    if (response.data) {
      console.log('证书信息:', response.data);
    } else {
      console.log('该知识尚未存证');
    }
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface CertificateInfo {
  certificate_id: string;        // 证书 ID
  knowledge_id: number;          // 知识 ID
  block_index: number;           // 区块索引
  block_hash: string;            // 区块哈希
  content_hash: string;          // 内容哈希
  timestamp: string;             // 时间戳
  has_certificate: boolean;      // 是否有证书
  pdf_url?: string;              // PDF 下载地址
  qr_code_url?: string;          // 二维码地址
  verification_url?: string;     // 验证地址
  created_at: string;            // 创建时间
}

CertificateInfo | null  // 如果没有证书返回 null
```

### 验证证书

**接口信息**
- 路径: `GET /blockchain/certificates/:id/verify`
- 权限: 公开
- 服务层: `blockchainService.verifyCertificate()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[5]`

**请求参数**

```typescript
{
  id: string;  // 证书 ID（路径参数）
}
```

**请求示例**

```typescript
const verifyCertificate = async (certificateId: string) => {
  try {
    const response = await blockchainService.verifyCertificate(certificateId);
    
    if (response.data.is_valid) {
      console.log('证书有效');
      console.log('证书信息:', response.data.certificate);
    } else {
      console.log('证书无效:', response.data.message);
    }
  } catch (error) {
    console.error('验证失败:', error);
  }
};
```

**响应数据**

```typescript
interface CertificateVerifyResult {
  is_valid: boolean;             // 是否有效
  certificate?: CertificateInfo; // 证书信息（有效时）
  message?: string;              // 消息（无效时）
  verified_at: string;           // 验证时间
}
```

### 创建证书

**接口信息**
- 路径: `POST /blockchain/certificates`
- 权限: 需要登录
- 服务层: `blockchainService.createCertificate()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[6]`

**请求参数**

```typescript
interface CreateCertificateRequest {
  knowledge_id: number;      // 知识 ID
  knowledge_title: string;   // 知识标题
  user_id: number;           // 用户 ID
  user_name: string;         // 用户名
}
```

**请求示例**

```typescript
const createCertificate = async (knowledgeId: number) => {
  try {
    const response = await blockchainService.createCertificate({
      knowledge_id: knowledgeId,
      knowledge_title: '知识标题',
      user_id: currentUser.id,
      user_name: currentUser.fullName,
    });
    
    console.log('证书创建成功:', response.data);
  } catch (error) {
    console.error('创建失败:', error);
  }
};
```

**响应数据**

```typescript
CertificateInfo  // 新创建的证书信息
```

### 下载证书

**接口信息**
- 路径: `GET /blockchain/certificates/:id/download`
- 权限: 公开
- 服务层: `blockchainService.downloadCertificate()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[7]`

**请求参数**

```typescript
{
  id: string;  // 证书 ID（路径参数）
}
```

**请求示例**

```typescript
const downloadCertificate = async (certificateId: string) => {
  try {
    await blockchainService.downloadCertificate(certificateId);
    console.log('证书下载成功');
  } catch (error) {
    console.error('下载失败:', error);
  }
};
```

**响应数据**

```typescript
// 直接下载文件，无 JSON 响应
// 文件名: EduChain_Certificate_{certificateId}.txt
```

### 区块链搜索

**接口信息**
- 路径: `GET /blockchain/search`
- 权限: 公开
- 服务层: `blockchainService.search()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[8]`

**请求参数**

```typescript
{
  q: string;            // 搜索关键词
  searchType?: string;  // 搜索类型：block, transaction, knowledge
  keyword?: string;     // 关键词（同 q）
}
```

**请求示例**

```typescript
const searchBlockchain = async (keyword: string) => {
  try {
    const response = await blockchainService.search(keyword, 'block');
    
    if (response.data.type === 'block') {
      console.log('找到区块:', response.data.data);
    } else if (response.data.type === 'transaction') {
      console.log('找到交易:', response.data.data);
    } else {
      console.log('未找到结果');
    }
  } catch (error) {
    console.error('搜索失败:', error);
  }
};
```

**响应数据**

```typescript
interface SearchResult {
  type: 'block' | 'transaction' | 'none';  // 结果类型
  data: Block | Transaction | null;        // 结果数据
}
```

### 验证区块链

**接口信息**
- 路径: `GET /blockchain/validate`
- 权限: 公开
- 服务层: `blockchainService.validateChain()`
- Mock Handler: `handlers/blockchain.ts` - `blockchainHandlers[9]`

**请求示例**

```typescript
const validateBlockchain = async () => {
  try {
    const response = await blockchainService.validateChain();
    
    if (response.data.valid) {
      console.log('区块链有效');
    } else {
      console.log('区块链无效');
    }
  } catch (error) {
    console.error('验证失败:', error);
  }
};
```

**响应数据**

```typescript
{
  valid: boolean;  // 是否有效
}
```

## 管理员接口

### 获取管理员统计数据

**接口信息**
- 路径: `GET /admin/stats`
- 权限: 管理员
- 服务层: `getAdminStats()`
- Mock Handler: `handlers/admin.ts` - `adminHandlers[0]`

**请求示例**

```typescript
const getAdminStats = async () => {
  try {
    const response = await getAdminStats();
    console.log('统计数据:', response.data);
    // {
    //   totalUsers: 30,
    //   activeUsers: 25,
    //   totalKnowledge: 15,
    //   pendingReview: 3,
    //   totalViews: 50000,
    //   todayViews: 1200,
    //   blockchainCerts: 15,
    //   todayCerts: 2
    // }
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface AdminStats {
  totalUsers: number;        // 总用户数
  activeUsers: number;       // 活跃用户数
  totalKnowledge: number;    // 总知识数
  pendingReview: number;     // 待审核数
  totalViews: number;        // 总浏览量
  todayViews: number;        // 今日浏览量
  blockchainCerts: number;   // 区块链证书数
  todayCerts: number;        // 今日证书数
}
```

### 获取最近活动

**接口信息**
- 路径: `GET /admin/activities`
- 权限: 管理员
- 服务层: `getAdminActivities()`
- Mock Handler: `handlers/admin.ts` - `adminHandlers[1]`

**请求参数**

```typescript
{
  limit?: number;  // 返回数量（默认 10）
}
```

**请求示例**

```typescript
const getActivities = async () => {
  try {
    const response = await getAdminActivities(20);
    console.log('最近活动:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface AdminActivity {
  id: number;
  title: string;                                    // 活动标题
  time: string;                                     // 时间
  type: 'user' | 'content' | 'system' | 'blockchain';  // 类型
  userId?: number;                                  // 用户 ID
  username?: string;                                // 用户名
}

AdminActivity[]
```

### 获取系统状态

**接口信息**
- 路径: `GET /admin/system-status`
- 权限: 管理员
- 服务层: `getSystemStatus()`
- Mock Handler: `handlers/admin.ts` - `adminHandlers[2]`

**请求示例**

```typescript
const getSystemStatus = async () => {
  try {
    const response = await getSystemStatus();
    console.log('系统状态:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface SystemStatus {
  name: string;                              // 服务名称
  status: 'healthy' | 'warning' | 'error';   // 状态
  message?: string;                          // 消息
}

SystemStatus[]  // 各个服务的状态列表
```

### 获取数据趋势

**接口信息**
- 路径: `GET /admin/trends`
- 权限: 管理员
- 服务层: `getTrends()`
- Mock Handler: `handlers/admin.ts` - `adminHandlers[3]`

**请求参数**

```typescript
{
  days?: number;  // 天数（默认 7）
}
```

**请求示例**

```typescript
const getTrends = async () => {
  try {
    const response = await getTrends(30);
    console.log('数据趋势:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface TrendData {
  date: string;       // 日期
  users: number;      // 用户数
  knowledge: number;  // 知识数
  views: number;      // 浏览量
}

TrendData[]
```

### 获取系统设置

**接口信息**
- 路径: `GET /admin/settings`
- 权限: 管理员
- 服务层: `getSystemSettings()`
- Mock Handler: `handlers/admin.ts` - `adminHandlers[4]`

**请求示例**

```typescript
const getSettings = async () => {
  try {
    const response = await getSystemSettings();
    console.log('系统设置:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface SystemSettings {
  // 站点设置
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  
  // 用户设置
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  defaultUserRole: string;
  maxUploadSize: number;
  
  // 内容设置
  enableContentReview: boolean;
  autoPublish: boolean;
  allowComments: boolean;
  allowAnonymousComments: boolean;
  
  // 区块链设置
  enableBlockchain: boolean;
  blockchainNetwork: string;
  contractAddress: string;
  gasLimit: number;
  
  // 邮件设置
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpSecure: boolean;
  
  // 安全设置
  enableTwoFactor: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  
  // 缓存设置
  cacheEnabled: boolean;
  cacheDuration: number;
  enableCDN: boolean;
  cdnUrl: string;
}
```

### 更新系统设置

**接口信息**
- 路径: `PUT /admin/settings`
- 权限: 管理员
- 服务层: `updateSystemSettings()`
- Mock Handler: `handlers/admin.ts` - `adminHandlers[5]`

**请求参数**

```typescript
Partial<SystemSettings>  // 要更新的设置（所有字段可选）
```

**请求示例**

```typescript
const updateSettings = async () => {
  try {
    const response = await updateSystemSettings({
      siteName: '新站点名称',
      allowRegistration: false,
      enableBlockchain: true,
    });
    
    console.log('更新成功:', response.data);
  } catch (error) {
    console.error('更新失败:', error);
  }
};
```

**响应数据**

```typescript
SystemSettings  // 更新后的完整设置
```

## 互动接口

### 点赞

**接口信息**
- 路径: `POST /interactions/like`
- 权限: 需要登录
- 服务层: `interactionService.like()`
- Mock Handler: `handlers/interaction.ts`

**请求参数**

```typescript
{
  knowledgeId: number;  // 知识 ID
}
```

**请求示例**

```typescript
const likeKnowledge = async (knowledgeId: number) => {
  try {
    await interactionService.like(knowledgeId);
    console.log('点赞成功');
  } catch (error) {
    console.error('点赞失败:', error);
  }
};
```

### 取消点赞

**接口信息**
- 路径: `DELETE /interactions/like`
- 权限: 需要登录
- 服务层: `interactionService.unlike()`

**请求参数**

```typescript
{
  knowledgeId: number;  // 知识 ID
}
```

### 收藏

**接口信息**
- 路径: `POST /interactions/favorite`
- 权限: 需要登录
- 服务层: `interactionService.favorite()`

**请求参数**

```typescript
{
  knowledgeId: number;  // 知识 ID
}
```

### 取消收藏

**接口信息**
- 路径: `DELETE /interactions/favorite`
- 权限: 需要登录
- 服务层: `interactionService.unfavorite()`

**请求参数**

```typescript
{
  knowledgeId: number;  // 知识 ID
}
```

### 检查互动状态

**接口信息**
- 路径: `GET /interactions/status/:knowledgeId`
- 权限: 需要登录
- 服务层: `interactionService.getInteractionStatus()`

**请求示例**

```typescript
const checkStatus = async (knowledgeId: number) => {
  try {
    const response = await interactionService.getInteractionStatus(knowledgeId);
    console.log('互动状态:', response.data);
    // { isLiked: true, isFavorited: false }
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
{
  isLiked: boolean;      // 是否已点赞
  isFavorited: boolean;  // 是否已收藏
}
```

## 关注接口

### 关注用户

**接口信息**
- 路径: `POST /users/follow`
- 权限: 需要登录
- 服务层: `followService.followUser()`
- Mock Handler: `handlers/follow.ts`

**请求参数**

```typescript
{
  userId: number;  // 要关注的用户 ID
}
```

**请求示例**

```typescript
const followUser = async (userId: number) => {
  try {
    await followService.followUser(userId);
    console.log('关注成功');
  } catch (error) {
    console.error('关注失败:', error);
  }
};
```

### 取消关注

**接口信息**
- 路径: `DELETE /users/follow`
- 权限: 需要登录
- 服务层: `followService.unfollowUser()`

**请求参数**

```typescript
{
  userId: number;  // 要取消关注的用户 ID
}
```

### 获取关注列表

**接口信息**
- 路径: `GET /users/following`
- 权限: 公开
- 服务层: `followService.getFollowing()`

**请求参数**

```typescript
{
  userId?: number;   // 用户 ID（可选，默认当前用户）
  page?: number;     // 页码
  size?: number;     // 每页大小
}
```

**响应数据**

```typescript
interface UserFollow {
  id: number;
  followerId: number;    // 关注者 ID
  followingId: number;   // 被关注者 ID
  followingUser: User;   // 被关注用户信息
  createdAt: string;
}

PageResponse<UserFollow>
```

### 获取粉丝列表

**接口信息**
- 路径: `GET /users/followers`
- 权限: 公开
- 服务层: `followService.getFollowers()`

**请求参数**

```typescript
{
  userId?: number;   // 用户 ID（可选，默认当前用户）
  page?: number;     // 页码
  size?: number;     // 每页大小
}
```

**响应数据**

```typescript
PageResponse<UserFollow>
```

### 检查关注状态

**接口信息**
- 路径: `GET /users/follow/status/:userId`
- 权限: 需要登录
- 服务层: `followService.checkFollowStatus()`

**请求示例**

```typescript
const checkFollowStatus = async (userId: number) => {
  try {
    const response = await followService.checkFollowStatus(userId);
    
    if (response.data) {
      console.log('已关注');
    } else {
      console.log('未关注');
    }
  } catch (error) {
    console.error('检查失败:', error);
  }
};
```

**响应数据**

```typescript
boolean  // true: 已关注, false: 未关注
```

## 搜索接口

### 全局搜索

**接口信息**
- 路径: `GET /search`
- 权限: 公开
- 服务层: `searchService.search()`
- Mock Handler: `handlers/search.ts`

**请求参数**

```typescript
{
  keyword: string;   // 搜索关键词
  type?: string;     // 搜索类型：all, knowledge, user
  page?: number;     // 页码
  size?: number;     // 每页大小
}
```

**请求示例**

```typescript
const search = async (keyword: string) => {
  try {
    const response = await searchService.search(keyword, {
      type: 'all',
      page: 0,
      size: 10,
    });
    
    console.log('搜索结果:', response.data);
  } catch (error) {
    console.error('搜索失败:', error);
  }
};
```

**响应数据**

```typescript
interface SearchResult {
  knowledge: PageResponse<KnowledgeItem>;  // 知识结果
  users: PageResponse<User>;               // 用户结果
  total: number;                           // 总结果数
}
```

### 获取搜索建议

**接口信息**
- 路径: `GET /search/suggestions`
- 权限: 公开
- 服务层: `searchService.getSuggestions()`

**请求参数**

```typescript
{
  keyword: string;  // 关键词
  limit?: number;   // 返回数量（默认 10）
}
```

**请求示例**

```typescript
const getSuggestions = async (keyword: string) => {
  try {
    const response = await searchService.getSuggestions(keyword, 10);
    console.log('搜索建议:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface SearchSuggestion {
  id: number;
  title: string;
  type: 'knowledge' | 'user';
}

SearchSuggestion[]
```

### 获取热门关键词

**接口信息**
- 路径: `GET /search/hot-keywords`
- 权限: 公开
- 服务层: `searchService.getHotKeywords()`

**请求参数**

```typescript
{
  limit?: number;  // 返回数量（默认 10）
}
```

**请求示例**

```typescript
const getHotKeywords = async () => {
  try {
    const response = await searchService.getHotKeywords(10);
    console.log('热门关键词:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
string[]  // 热门关键词列表
```

## 通知接口

### 获取通知列表

**接口信息**
- 路径: `GET /notifications`
- 权限: 需要登录
- 服务层: `notificationService.getNotifications()`
- Mock Handler: `handlers/notification.ts`

**请求参数**

```typescript
{
  page?: number;     // 页码
  size?: number;     // 每页大小
  isRead?: boolean;  // 是否已读（可选）
}
```

**请求示例**

```typescript
const getNotifications = async () => {
  try {
    const response = await notificationService.getNotifications({
      page: 0,
      size: 20,
      isRead: false,  // 只获取未读通知
    });
    
    console.log('通知列表:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface Notification {
  id: number;
  userId: number;
  type: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'SYSTEM';
  title: string;
  content: string;
  relatedId?: number;
  isRead: boolean;
  createdAt: string;
}

PageResponse<Notification>
```

### 标记为已读

**接口信息**
- 路径: `PUT /notifications/:id/read`
- 权限: 需要登录
- 服务层: `notificationService.markAsRead()`

**请求参数**

```typescript
{
  id: number;  // 通知 ID（路径参数）
}
```

### 标记全部为已读

**接口信息**
- 路径: `PUT /notifications/read-all`
- 权限: 需要登录
- 服务层: `notificationService.markAllAsRead()`

### 获取未读数量

**接口信息**
- 路径: `GET /notifications/unread-count`
- 权限: 需要登录
- 服务层: `notificationService.getUnreadCount()`

**响应数据**

```typescript
{
  count: number;  // 未读数量
}
```

## 分类接口

### 获取所有分类

**接口信息**
- 路径: `GET /categories`
- 权限: 公开
- 服务层: `categoryService.getAllCategories()`
- Mock Handler: `handlers/category.ts`

**请求示例**

```typescript
const getAllCategories = async () => {
  try {
    const response = await categoryService.getAllCategories();
    console.log('分类列表:', response.data);
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

**响应数据**

```typescript
interface Category {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  sortOrder: number;
  createdAt: string;
  knowledgeCount: number;
  children?: Category[];  // 子分类
}

Category[]
```

### 获取分类树

**接口信息**
- 路径: `GET /categories/tree`
- 权限: 公开
- 服务层: `categoryService.getCategoryTree()`

**响应数据**

```typescript
Category[]  // 树形结构的分类列表
```

### 获取分类详情

**接口信息**
- 路径: `GET /categories/:id`
- 权限: 公开
- 服务层: `categoryService.getCategoryById()`

**请求参数**

```typescript
{
  id: number;  // 分类 ID（路径参数）
}
```

**响应数据**

```typescript
Category
```

### 创建分类（管理员）

**接口信息**
- 路径: `POST /categories`
- 权限: 管理员
- 服务层: `categoryService.createCategory()`

**请求参数**

```typescript
{
  name: string;          // 分类名称
  description?: string;  // 描述
  parentId?: number;     // 父分类 ID
  sortOrder?: number;    // 排序
}
```

### 更新分类（管理员）

**接口信息**
- 路径: `PUT /categories/:id`
- 权限: 管理员
- 服务层: `categoryService.updateCategory()`

### 删除分类（管理员）

**接口信息**
- 路径: `DELETE /categories/:id`
- 权限: 管理员
- 服务层: `categoryService.deleteCategory()`

## 错误码说明

### 认证错误 (401)

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| `INVALID_CREDENTIALS` | 用户名或密码错误 | 检查登录信息 |
| `UNAUTHORIZED` | 未登录或 Token 过期 | 重新登录 |
| `TOKEN_EXPIRED` | Token 已过期 | 刷新 Token |

### 权限错误 (403)

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| `FORBIDDEN` | 权限不足 | 使用有权限的账号 |
| `ADMIN_REQUIRED` | 需要管理员权限 | 使用管理员账号 |

### 资源错误 (404)

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| `NOT_FOUND` | 资源不存在 | 检查资源 ID |
| `USER_NOT_FOUND` | 用户不存在 | 检查用户 ID |
| `KNOWLEDGE_NOT_FOUND` | 知识不存在 | 检查知识 ID |

### 参数错误 (400)

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| `MISSING_PARAMETER` | 缺少必要参数 | 补充缺失参数 |
| `PARAMETER_TYPE_ERROR` | 参数类型错误 | 检查参数类型 |
| `VALIDATION_ERROR` | 参数验证失败 | 检查参数格式 |
| `DUPLICATE_ENTRY` | 数据已存在 | 使用不同的数据 |

### 服务器错误 (500)

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| `INTERNAL_ERROR` | 服务器内部错误 | 稍后重试或联系管理员 |
| `DATABASE_ERROR` | 数据库错误 | 稍后重试 |

## 接口使用示例

### 完整的登录流程

```typescript
import { authService } from '@/services/auth';
import { token } from '@/lib/token';

const loginFlow = async () => {
  try {
    // 1. 登录
    const response = await authService.login({
      usernameOrEmail: 'admin',
      password: 'admin123',
    });
    
    // 2. 保存 Token
    token.setTokens(
      response.data.accessToken,
      response.data.refreshToken
    );
    
    // 3. 保存用户信息
    storage.set('user', response.data.user);
    
    // 4. 跳转到首页
    router.push('/');
    
    console.log('登录成功');
  } catch (error) {
    console.error('登录失败:', error);
    // 显示错误提示
  }
};
```

### 完整的知识创建流程

```typescript
import { knowledgeService } from '@/services/knowledge';
import { blockchainService } from '@/services/blockchain';

const createKnowledgeFlow = async () => {
  try {
    // 1. 创建知识
    const response = await knowledgeService.createKnowledge({
      title: 'React Hooks 完全指南',
      content: '# React Hooks 介绍\n\n...',
      type: 'TEXT',
      categoryId: 11,
      tags: 'React,Hooks,前端',
    });
    
    const knowledge = response.data;
    console.log('知识创建成功:', knowledge);
    
    // 2. 创建区块链证书
    const certResponse = await blockchainService.createCertificate({
      knowledge_id: knowledge.id,
      knowledge_title: knowledge.title,
      user_id: currentUser.id,
      user_name: currentUser.fullName,
    });
    
    console.log('证书创建成功:', certResponse.data);
    
    // 3. 跳转到详情页
    router.push(`/knowledge/${knowledge.shareCode}`);
  } catch (error) {
    console.error('创建失败:', error);
  }
};
```

### 完整的搜索流程

```typescript
import { searchService } from '@/services/search';
import { knowledgeService } from '@/services/knowledge';

const searchFlow = async (keyword: string) => {
  try {
    // 1. 获取搜索建议
    const suggestions = await searchService.getSuggestions(keyword, 5);
    console.log('搜索建议:', suggestions.data);
    
    // 2. 执行搜索
    const searchResult = await knowledgeService.searchKnowledge(keyword, {
      page: 0,
      size: 10,
      sort: 'RELEVANCE',
    });
    
    console.log('搜索结果:', searchResult.data);
    
    // 3. 保存搜索历史
    storage.set('searchHistory', [
      keyword,
      ...storage.get('searchHistory', []).slice(0, 9)
    ]);
  } catch (error) {
    console.error('搜索失败:', error);
  }
};
```

## 总结

本文档详细列出了 EduChain Web 前端应用的所有 API 接口，包括：

- ✅ 认证接口（7 个）
- ✅ 用户接口（8 个）
- ✅ 知识接口（20+ 个）
- ✅ 区块链接口（10 个）
- ✅ 管理员接口（6 个）
- ✅ 互动接口（5 个）
- ✅ 关注接口（5 个）
- ✅ 搜索接口（3 个）
- ✅ 通知接口（4 个）
- ✅ 分类接口（6 个）

**总计**: 70+ 个 API 接口

每个接口都包含：
- 接口信息（路径、权限、服务层、Mock Handler）
- 请求参数（类型定义）
- 请求示例（完整代码）
- 响应数据（类型定义）
- Mock 实现（部分接口）

**下一步**
- 阅读 [06-Mock系统](./06-Mock系统.md) 了解 Mock 实现细节
- 阅读 [03-开发指南](./03-开发指南.md) 学习开发规范
- 查看 [src/services/](../src/services/) 目录了解服务层实现
- 查看 [src/mock/handlers/](../src/mock/handlers/) 目录了解 Mock Handler 实现

---

**文档版本**: v2.0.0  
**最后更新**: 2026年3月9日  
**维护者**: [小铭](https://github.com/zzmingoo)  
**邮箱**: zzmingoo@gmail.com
