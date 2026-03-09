/**
 * 通知相关 Mock Handlers
 */

import { http, HttpResponse } from 'msw';
import { API_BASE } from '../config';
import { delay, createSuccessResponse, createPageResponse, getCurrentUserId } from '../utils';
import { mockNotifications } from '../data/notifications';
import { mockUsers } from '../data/users';

export const notificationHandlers = [
  // 获取通知列表
  http.get(`${API_BASE}/notifications`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;
    const type = url.searchParams.get('type');
    const isRead = url.searchParams.get('isRead');

    // 从 JWT token 中解析当前用户 ID
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }

    // 先按用户过滤 - 只返回当前用户的通知
    let items = mockNotifications.filter(n => n.userId === currentUserId);

    // 类型筛选 - 统一使用大写
    if (type) {
      const upperType = type.toUpperCase();
      if (upperType === 'INTERACTION') {
        // 互动类型包含：点赞、评论、关注
        items = items.filter(n => ['LIKE', 'COMMENT', 'FOLLOW'].includes(n.type));
      } else if (upperType === 'SYSTEM') {
        items = items.filter(n => n.type === 'SYSTEM');
      } else {
        items = items.filter(n => n.type === upperType);
      }
    }

    // 已读状态筛选
    if (isRead !== null) {
      items = items.filter(n => n.isRead === (isRead === 'true'));
    }

    // 动态添加发送者信息
    const itemsWithSender = items.map(notification => {
      if (notification.senderId) {
        const sender = mockUsers.find(u => u.id === notification.senderId);
        if (sender) {
          return {
            ...notification,
            senderName: sender.fullName,
            senderAvatar: sender.avatarUrl,
            // 动态生成完整的通知内容
            content: `${sender.fullName} ${notification.content}`,
          };
        }
      }
      return notification;
    });

    const pageData = createPageResponse(itemsWithSender, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取未读通知数量
  http.get(`${API_BASE}/notifications/unread/count`, async ({ request }) => {
    await delay();
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }
    
    const unreadCount = mockNotifications.filter(n => n.userId === currentUserId && !n.isRead).length;
    return HttpResponse.json(createSuccessResponse({ unreadCount }));
  }),

  // 获取通知统计
  http.get(`${API_BASE}/notifications/stats`, async ({ request }) => {
    await delay();
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }
    
    const userNotifications = mockNotifications.filter(n => n.userId === currentUserId);
    const totalNotifications = userNotifications.length;
    const unreadCount = userNotifications.filter(n => !n.isRead).length;

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
  http.put(`${API_BASE}/notifications/read-all`, async ({ request }) => {
    await delay();
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }
    
    // 只标记当前用户的通知为已读
    mockNotifications.forEach(n => {
      if (n.userId === currentUserId) {
        n.isRead = true;
      }
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
  http.delete(`${API_BASE}/notifications/clear-all`, async ({ request }) => {
    await delay();
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }
    
    // 只删除当前用户的通知
    for (let i = mockNotifications.length - 1; i >= 0; i--) {
      if (mockNotifications[i].userId === currentUserId) {
        mockNotifications.splice(i, 1);
      }
    }
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
