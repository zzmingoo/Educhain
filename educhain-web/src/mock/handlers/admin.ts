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
    const activities = mockAdminActivities.slice(0, limit);
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
