/**
 * 用户相关 Mock Handlers
 */

import { http, HttpResponse } from 'msw';
import { API_BASE } from '../config';
import { delay, createSuccessResponse, createPageResponse, getCurrentUserId } from '../utils';
import { mockUsers, mockUserStats } from '../data/users';
import type { User } from '../../types/api';

export const userHandlers = [
  // 根据 ID 获取用户信息
  http.get(`${API_BASE}/users/:id`, async ({ params }) => {
    await delay();
    const { id } = params;
    const user = mockUsers.find(u => u.id === Number(id));

    if (user) {
      // 合并统计数据
      const userWithStats = {
        ...user,
        knowledgeCount: mockUserStats[user.id]?.knowledgeCount || 0,
        followerCount: mockUserStats[user.id]?.followerCount || 0,
        followingCount: mockUserStats[user.id]?.followingCount || 0,
      };
      return HttpResponse.json(createSuccessResponse(userWithStats));
    }

    return HttpResponse.json(
      { success: false, message: '用户不存在', data: null },
      { status: 404 }
    );
  }),

  // 获取用户统计信息
  http.get(`${API_BASE}/users/:id/stats`, async ({ params }) => {
    await delay();
    const { id } = params;
    const stats = mockUserStats[Number(id)];
    return HttpResponse.json(createSuccessResponse(stats));
  }),

  // 获取当前用户统计
  http.get(`${API_BASE}/users/me/stats`, async ({ request }) => {
    await delay();
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }
    
    return HttpResponse.json(createSuccessResponse(mockUserStats[currentUserId]));
  }),

  // 更新用户信息
  http.put(`${API_BASE}/users/me`, async ({ request }) => {
    await delay();
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }
    
    const data = (await request.json()) as Record<string, unknown>;
    const currentUser = mockUsers.find(u => u.id === currentUserId);
    
    if (!currentUser) {
      return HttpResponse.json(
        { success: false, message: '用户不存在', data: null },
        { status: 404 }
      );
    }
    
    const user = { ...currentUser, ...data, updatedAt: new Date().toISOString() };
    return HttpResponse.json(createSuccessResponse(user));
  }),

  // 管理员更新用户信息
  http.put(`${API_BASE}/users/:id`, async ({ params, request }) => {
    await delay();
    const { id } = params;
    const data = (await request.json()) as Partial<User>;
    const userIndex = mockUsers.findIndex(u => u.id === Number(id));
    
    if (userIndex !== -1) {
      // 更新用户数据
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      // 合并统计数据
      const updatedUser = {
        ...mockUsers[userIndex],
        knowledgeCount: mockUserStats[mockUsers[userIndex].id]?.knowledgeCount || 0,
        followerCount: mockUserStats[mockUsers[userIndex].id]?.followerCount || 0,
        followingCount: mockUserStats[mockUsers[userIndex].id]?.followingCount || 0,
      };
      
      return HttpResponse.json(createSuccessResponse(updatedUser));
    }

    return HttpResponse.json(
      { success: false, message: '用户不存在', data: null },
      { status: 404 }
    );
  }),

  // 修改密码
  http.put(`${API_BASE}/users/me/password`, async () => {
    await delay();
    return HttpResponse.json(createSuccessResponse({ success: true }));
  }),

  // 搜索用户
  http.get(`${API_BASE}/users/search`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword') || '';
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const filtered = mockUsers.filter(
      u =>
        u.username.toLowerCase().includes(keyword.toLowerCase()) ||
        u.fullName.toLowerCase().includes(keyword.toLowerCase())
    );

    // 合并用户数据和统计数据
    const filteredWithStats = filtered.map(user => ({
      ...user,
      knowledgeCount: mockUserStats[user.id]?.knowledgeCount || 0,
      followerCount: mockUserStats[user.id]?.followerCount || 0,
      followingCount: mockUserStats[user.id]?.followingCount || 0,
    }));

    const pageData = createPageResponse(filteredWithStats, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取所有用户
  http.get(`${API_BASE}/users`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    // 合并用户数据和统计数据
    const usersWithStats = mockUsers.map(user => ({
      ...user,
      knowledgeCount: mockUserStats[user.id]?.knowledgeCount || 0,
      followerCount: mockUserStats[user.id]?.followerCount || 0,
      followingCount: mockUserStats[user.id]?.followingCount || 0,
    }));

    const pageData = createPageResponse(usersWithStats, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 根据用户名获取用户
  http.get(`${API_BASE}/users/username/:username`, async ({ params }) => {
    await delay();
    const { username } = params;
    const user = mockUsers.find(u => u.username === username);

    if (user) {
      // 合并统计数据
      const userWithStats = {
        ...user,
        knowledgeCount: mockUserStats[user.id]?.knowledgeCount || 0,
        followerCount: mockUserStats[user.id]?.followerCount || 0,
        followingCount: mockUserStats[user.id]?.followingCount || 0,
      };
      return HttpResponse.json(createSuccessResponse(userWithStats));
    }

    return HttpResponse.json(
      { success: false, message: '用户不存在', data: null },
      { status: 404 }
    );
  }),
];
