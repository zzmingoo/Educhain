/**
 * 活动动态相关 Mock Handlers
 */

import { http, HttpResponse } from 'msw';
import { API_BASE } from '../config';
import { delay } from '../utils/delay';
import { createSuccessResponse, createPageResponse } from '../utils/response';
import { mockActivities } from '../data/activities';

export const activityHandlers = [
  // 获取用户活动列表
  http.get(`${API_BASE}/activities/user/:userId`, async ({ params, request }) => {
    await delay();
    const { userId } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const userActivities = mockActivities.filter(a => a.userId === Number(userId));
    const pageData = createPageResponse(userActivities, page, size);
    
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取关注用户的活动列表
  http.get(`${API_BASE}/activities/following`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const pageData = createPageResponse(mockActivities, page, size);
    
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取所有活动列表
  http.get(`${API_BASE}/activities`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;
    const type = url.searchParams.get('type');

    let activities = [...mockActivities];

    if (type) {
      activities = activities.filter(a => a.type === type);
    }

    const pageData = createPageResponse(activities, page, size);
    
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取活动详情
  http.get(`${API_BASE}/activities/:id`, async ({ params }) => {
    await delay();
    const { id } = params;
    const activity = mockActivities.find(a => a.id === Number(id));

    if (!activity) {
      return HttpResponse.json(
        { success: false, message: '活动不存在', data: null },
        { status: 404 }
      );
    }

    return HttpResponse.json(createSuccessResponse(activity));
  }),

  // 获取活动统计
  http.get(`${API_BASE}/activities/stats`, async () => {
    await delay();
    
    const stats = {
      totalActivities: mockActivities.length,
      todayActivities: mockActivities.filter(
        a => new Date(a.createdAt).toDateString() === new Date().toDateString()
      ).length,
      activityTypes: {
        KNOWLEDGE_CREATED: mockActivities.filter(a => a.type === 'KNOWLEDGE_CREATED').length,
        KNOWLEDGE_LIKED: mockActivities.filter(a => a.type === 'KNOWLEDGE_LIKED').length,
        KNOWLEDGE_COMMENTED: mockActivities.filter(a => a.type === 'KNOWLEDGE_COMMENTED').length,
        KNOWLEDGE_FAVORITED: mockActivities.filter(a => a.type === 'KNOWLEDGE_FAVORITED').length,
        KNOWLEDGE_SHARED: mockActivities.filter(a => a.type === 'KNOWLEDGE_SHARED').length,
        USER_FOLLOWED: mockActivities.filter(a => a.type === 'USER_FOLLOWED').length,
        CERTIFICATE_OBTAINED: mockActivities.filter(a => a.type === 'CERTIFICATE_OBTAINED').length,
      },
    };

    return HttpResponse.json(createSuccessResponse(stats));
  }),
];
