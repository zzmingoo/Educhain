/**
 * 活动动态相关 Mock Handlers
 */

import { http, HttpResponse } from 'msw';
import { API_BASE } from '../config';
import { delay, createSuccessResponse, createPageResponse } from '../utils';
import { mockActivities } from '../data/activities';
import { mockUsers } from '../data/users';

export const activityHandlers = [
  // 获取用户活动列表
  http.get(`${API_BASE}/activities/user/:userId`, async ({ params, request }) => {
    await delay();
    const { userId } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const userActivities = mockActivities.filter(a => a.userId === Number(userId));
    
    const activitiesWithUser = userActivities.map(activity => {
      const user = mockUsers.find(u => u.id === activity.userId);
      return {
        ...activity,
        username: user?.username,
        userAvatar: user?.avatarUrl,
        user,
      };
    });
    
    const pageData = createPageResponse(activitiesWithUser, page, size);
    
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取关注用户的活动列表
  http.get(`${API_BASE}/activities/following`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const activitiesWithUser = mockActivities.map(activity => {
      const user = mockUsers.find(u => u.id === activity.userId);
      return {
        ...activity,
        username: user?.username,
        userAvatar: user?.avatarUrl,
        user,
      };
    });
    
    const pageData = createPageResponse(activitiesWithUser, page, size);
    
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

    const activitiesWithUser = activities.map(activity => {
      const user = mockUsers.find(u => u.id === activity.userId);
      return {
        ...activity,
        username: user?.username,
        userAvatar: user?.avatarUrl,
        user,
      };
    });

    const pageData = createPageResponse(activitiesWithUser, page, size);
    
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

    const user = mockUsers.find(u => u.id === activity.userId);
    const activityWithUser = {
      ...activity,
      username: user?.username,
      userAvatar: user?.avatarUrl,
      user,
    };

    return HttpResponse.json(createSuccessResponse(activityWithUser));
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
