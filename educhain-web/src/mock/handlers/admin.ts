/**
 * 管理员相关 Mock Handlers
 */

import { http, HttpResponse } from 'msw';
import { API_BASE } from '../config';
import { delay } from '../utils/delay';
import { createSuccessResponse } from '../utils/response';
import {
  mockAdminStats,
  mockAdminActivities,
  mockSystemStatus,
  mockTrendData,
  mockSystemSettings,
} from '../data/admin';
import { mockUsers } from '../data/users';

export const adminHandlers = [
  // 获取管理员统计数据
  http.get(`${API_BASE}/admin/stats`, async () => {
    await delay();
    return HttpResponse.json(createSuccessResponse(mockAdminStats));
  }),

  // 获取最近活动
  http.get(`${API_BASE}/admin/activities`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit')) || 10;
    const activities = mockAdminActivities.slice(0, limit).map(activity => {
      if (activity.userId) {
        const user = mockUsers.find(u => u.id === activity.userId);
        const username = user?.username || '未知用户';
        const email = user?.email || '';
        
        // 根据活动类型动态生成完整的 title
        let fullTitle = activity.title;
        if (activity.type === 'user') {
          if (activity.title === '新用户注册') {
            fullTitle = `新用户注册: ${email}`;
          } else if (activity.title === '更新个人资料') {
            fullTitle = `用户 ${username} 更新个人资料`;
          }
        } else if (activity.type === 'content' && activity.title === '发布新知识') {
          fullTitle = `用户 ${username} 发布新知识`;
        }
        
        return {
          ...activity,
          title: fullTitle,
          username,
        };
      }
      return activity;
    });
    return HttpResponse.json(createSuccessResponse(activities));
  }),

  // 获取系统状态
  http.get(`${API_BASE}/admin/system-status`, async () => {
    await delay();
    return HttpResponse.json(createSuccessResponse(mockSystemStatus));
  }),

  // 获取数据趋势
  http.get(`${API_BASE}/admin/trends`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const days = Number(url.searchParams.get('days')) || 7;
    const trends = mockTrendData.slice(-days);
    return HttpResponse.json(createSuccessResponse(trends));
  }),

  // 获取系统设置
  http.get(`${API_BASE}/admin/settings`, async () => {
    await delay();
    return HttpResponse.json(createSuccessResponse(mockSystemSettings));
  }),

  // 更新系统设置
  http.put(`${API_BASE}/admin/settings`, async ({ request }) => {
    await delay();
    const data = (await request.json()) as Partial<typeof mockSystemSettings>;
    const updatedSettings = { ...mockSystemSettings, ...data };
    return HttpResponse.json(createSuccessResponse(updatedSettings));
  }),
];
