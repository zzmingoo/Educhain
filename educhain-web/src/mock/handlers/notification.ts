/**
 * 通知相关 Mock Handlers
 */

import { http, HttpResponse } from 'msw';
import { API_BASE } from '../config';
import { delay } from '../utils/delay';
import { createSuccessResponse, createPageResponse } from '../utils/response';
import { mockNotifications } from '../data/notifications';

export const notificationHandlers = [
  // 获取通知列表
  http.get(`${API_BASE}/notifications`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;
    const type = url.searchParams.get('type');
    const isRead = url.searchParams.get('isRead');

    let items = [...mockNotifications];

    // 类型筛选
    if (type) {
      const upperType = type.toUpperCase();
      if (upperType === 'INTERACTION') {
        // 互动类型包含：点赞、评论、关注
        items = items.filter(n => ['LIKE', 'COMMENT', 'FOLLOW'].includes(n.type));
      } else {
        items = items.filter(n => n.type === upperType);
      }
    }

    // 已读状态筛选
    if (isRead !== null) {
      items = items.filter(n => n.isRead === (isRead === 'true'));
    }

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取未读通知数量
  http.get(`${API_BASE}/notifications/unread/count`, async () => {
    await delay();
    const unreadCount = mockNotifications.filter(n => !n.isRead).length;
    return HttpResponse.json(createSuccessResponse({ unreadCount }));
  }),

  // 获取通知统计
  http.get(`${API_BASE}/notifications/stats`, async () => {
    await delay();
    const totalNotifications = mockNotifications.length;
    const unreadCount = mockNotifications.filter(n => !n.isRead).length;
    const readCount = totalNotifications - unreadCount;

    const typeStats = mockNotifications.reduce(
      (acc, notification) => {
        acc[notification.type] = (acc[notification.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return HttpResponse.json(
      createSuccessResponse({
        totalCount: totalNotifications,
        unreadCount,
        todayCount: Math.floor(Math.random() * 10) + 5,
      })
    );
  }),

  // 标记通知为已读
  http.put(`${API_BASE}/notifications/:id/read`, async ({ params }) => {
    await delay();
    const { id } = params;
    const notification = mockNotifications.find(n => n.id === Number(id));
    if (notification) {
      notification.isRead = true;
    }
    return HttpResponse.json(createSuccessResponse(notification));
  }),

  // 标记所有通知为已读
  http.put(`${API_BASE}/notifications/read-all`, async () => {
    await delay();
    mockNotifications.forEach(n => {
      n.isRead = true;
    });
    return HttpResponse.json(createSuccessResponse({ success: true }));
  }),

  // 删除通知
  http.delete(`${API_BASE}/notifications/:id`, async ({ params }) => {
    await delay();
    const { id } = params;
    const index = mockNotifications.findIndex(n => n.id === Number(id));
    if (index !== -1) {
      mockNotifications.splice(index, 1);
    }
    return HttpResponse.json(createSuccessResponse(null));
  }),

  // 批量删除通知
  http.post(`${API_BASE}/notifications/batch-delete`, async ({ request }) => {
    await delay();
    const { ids } = (await request.json()) as { ids: number[] };
    for (let i = mockNotifications.length - 1; i >= 0; i--) {
      if (ids.includes(mockNotifications[i].id)) {
        mockNotifications.splice(i, 1);
      }
    }
    return HttpResponse.json(createSuccessResponse(null));
  }),

  // 清空所有通知
  http.delete(`${API_BASE}/notifications/clear-all`, async () => {
    await delay();
    mockNotifications.length = 0;
    return HttpResponse.json(createSuccessResponse(null));
  }),

  // 获取通知设置
  http.get(`${API_BASE}/notifications/settings`, async () => {
    await delay();
    const settings = {
      enableLikeNotifications: true,
      enableCommentNotifications: true,
      enableFollowNotifications: true,
      enableSystemNotifications: true,
      emailNotifications: false,
      pushNotifications: true,
    };
    return HttpResponse.json(createSuccessResponse(settings));
  }),

  // 更新通知设置
  http.put(`${API_BASE}/notifications/settings`, async ({ request }) => {
    await delay();
    const settings = (await request.json()) as Record<string, boolean>;
    return HttpResponse.json(createSuccessResponse(settings));
  }),
];
