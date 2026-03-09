/**
 * 知识内容相关 Mock Handlers
 */

import { http, HttpResponse } from 'msw';
import { API_BASE } from '../config';
import { delay, createSuccessResponse, createPageResponse, getCurrentUserId } from '../utils';
import { isValidMockShareCode } from '../utils/shareCode';
import { mockKnowledgeItems, mockKnowledgeStats } from '../data/knowledge';
import { mockUsers } from '../data/users';

export const knowledgeHandlers = [
  // 获取用户草稿 - 必须在 /knowledge 之前
  http.get(`${API_BASE}/knowledge/drafts`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    // 从 JWT token 中解析当前用户 ID
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }

    const drafts = mockKnowledgeItems
      .filter(k => k.status === 0 && k.uploaderId === currentUserId)
      .map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }));

    const pageData = createPageResponse(drafts, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 保存草稿 - 必须在 /knowledge POST 之前
  http.post(`${API_BASE}/knowledge/drafts`, async ({ request }) => {
    await delay();
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }
    
    const currentUser = mockUsers.find(u => u.id === currentUserId);
    if (!currentUser) {
      return HttpResponse.json(
        { success: false, message: '用户不存在', data: null },
        { status: 404 }
      );
    }
    
    const data = (await request.json()) as Record<string, unknown>;
    const draft = {
      id: mockKnowledgeItems.length + 1,
      ...data,
      uploaderId: currentUserId,
      uploaderName: currentUser.fullName,
      uploaderAvatar: currentUser.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`,
      status: 0, // 草稿状态
      shareCode: `DRAFT${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockKnowledgeItems.push(draft as (typeof mockKnowledgeItems)[0]);
    return HttpResponse.json(createSuccessResponse(draft), { status: 201 });
  }),

  // 获取知识列表
  http.get(`${API_BASE}/knowledge`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;
    const categoryId = url.searchParams.get('categoryId');
    const status = url.searchParams.get('status');
    const keyword = url.searchParams.get('keyword');

    let items = [...mockKnowledgeItems];

    // 默认只显示已发布的内容（status === 1），除非明确指定了 status 参数
    if (status !== null && status !== undefined) {
      items = items.filter(item => item.status === Number(status));
    } else {
      items = items.filter(item => item.status === 1);
    }

    // 分类过滤
    if (categoryId) {
      items = items.filter(item => item.categoryId === Number(categoryId));
    }

    // 关键词搜索
    if (keyword) {
      const searchText = keyword.toLowerCase();
      items = items.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(searchText);
        const contentMatch = item.content?.toLowerCase().includes(searchText);
        const authorMatch = item.uploaderName?.toLowerCase().includes(searchText);
        return titleMatch || contentMatch || authorMatch;
      });
    }

    items = items.map(item => ({
      ...item,
      stats: mockKnowledgeStats[item.id],
    }));

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 通过分享码获取知识详情
  http.get(`${API_BASE}/knowledge/share/:shareCode`, async ({ params }) => {
    await delay();
    const { shareCode } = params;

    if (!isValidMockShareCode(shareCode as string)) {
      return HttpResponse.json(
        { success: false, message: '无效的分享码格式', data: null },
        { status: 400 }
      );
    }

    const knowledge = mockKnowledgeItems.find(k => k.shareCode === shareCode);

    if (knowledge) {
      return HttpResponse.json(
        createSuccessResponse({
          ...knowledge,
          stats: mockKnowledgeStats[knowledge.id],
        })
      );
    }

    return HttpResponse.json(
      { success: false, message: '内容不存在', data: null },
      { status: 404 }
    );
  }),

  // 通过 ID 获取知识详情
  http.get(`${API_BASE}/knowledge/:id`, async ({ params }) => {
    await delay();
    const { id } = params;
    const knowledge = mockKnowledgeItems.find(k => k.id === Number(id));

    if (knowledge) {
      return HttpResponse.json(
        createSuccessResponse({
          ...knowledge,
          stats: mockKnowledgeStats[knowledge.id],
        })
      );
    }

    return HttpResponse.json(
      { success: false, message: '内容不存在', data: null },
      { status: 404 }
    );
  }),

  // 创建知识
  http.post(`${API_BASE}/knowledge`, async ({ request }) => {
    await delay();
    const currentUserId = getCurrentUserId(request);
    
    if (!currentUserId) {
      return HttpResponse.json(
        { success: false, message: '未授权，请先登录', data: null },
        { status: 401 }
      );
    }
    
    const currentUser = mockUsers.find(u => u.id === currentUserId);
    if (!currentUser) {
      return HttpResponse.json(
        { success: false, message: '用户不存在', data: null },
        { status: 404 }
      );
    }
    
    const data = (await request.json()) as Record<string, unknown>;
    const newKnowledge = {
      id: mockKnowledgeItems.length + 1,
      ...data,
      uploaderId: currentUserId,
      uploaderName: currentUser.fullName,
      uploaderAvatar: currentUser.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`,
      status: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockKnowledgeItems.push(newKnowledge as (typeof mockKnowledgeItems)[0]);
    return HttpResponse.json(createSuccessResponse(newKnowledge), { status: 201 });
  }),

  // 更新知识
  http.put(`${API_BASE}/knowledge/:id`, async ({ params, request }) => {
    await delay();
    const { id } = params;
    const data = (await request.json()) as Record<string, unknown>;
    const index = mockKnowledgeItems.findIndex(k => k.id === Number(id));

    if (index !== -1) {
      mockKnowledgeItems[index] = {
        ...mockKnowledgeItems[index],
        ...data,
        updatedAt: new Date().toISOString(),
      } as (typeof mockKnowledgeItems)[0];
      return HttpResponse.json(createSuccessResponse(mockKnowledgeItems[index]));
    }

    return HttpResponse.json(
      { success: false, message: '内容不存在', data: null },
      { status: 404 }
    );
  }),

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
      { success: false, message: '内容不存在', data: null },
      { status: 404 }
    );
  }),

  // 获取热门内容
  http.get(`${API_BASE}/knowledge/popular`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const items = [...mockKnowledgeItems]
      .filter(item => item.status === 1) // 只显示已发布的内容
      .map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }))
      .sort((a, b) => (b.stats?.viewCount || 0) - (a.stats?.viewCount || 0));

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取最新内容
  http.get(`${API_BASE}/knowledge/latest`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const items = [...mockKnowledgeItems]
      .filter(item => item.status === 1) // 只显示已发布的内容
      .map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取用户的知识内容
  http.get(`${API_BASE}/knowledge/user/:userId`, async ({ params, request }) => {
    await delay();
    const { userId } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const items = mockKnowledgeItems
      .filter(k => k.uploaderId === Number(userId))
      .map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }));

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取分类下的知识内容
  http.get(`${API_BASE}/knowledge/category/:categoryId`, async ({ params, request }) => {
    await delay();
    const { categoryId } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const items = mockKnowledgeItems
      .filter(k => k.categoryId === Number(categoryId))
      .map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }));

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取相关内容
  http.get(`${API_BASE}/knowledge/:id/related`, async ({ params, request }) => {
    await delay();
    const { id } = params;
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit')) || 10;

    const currentItem = mockKnowledgeItems.find(k => k.id === Number(id));
    const items = mockKnowledgeItems
      .filter(k => k.id !== Number(id) && k.categoryId === currentItem?.categoryId)
      .slice(0, limit)
      .map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }));

    return HttpResponse.json(createSuccessResponse(items));
  }),

  // 搜索知识
  http.get(`${API_BASE}/knowledge/search`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword') || '';
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;
    const sort = url.searchParams.get('sort') || 'TIME';

    // 搜索逻辑：匹配标题、内容、标签
    let items = mockKnowledgeItems.filter(item => {
      // 只显示已发布的内容
      if (item.status !== 1) {
        return false;
      }

      const searchText = keyword.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(searchText);
      const contentMatch = item.content?.toLowerCase().includes(searchText);
      const tagsMatch = item.tags?.toLowerCase().includes(searchText);
      
      return titleMatch || contentMatch || tagsMatch;
    }).map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }));

    // 排序
    if (sort === 'TIME') {
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'POPULARITY') {
      items.sort((a, b) => (b.stats?.viewCount || 0) - (a.stats?.viewCount || 0));
    } else if (sort === 'RELEVANCE') {
      // 相关性排序：标题匹配权重最高
      items.sort((a, b) => {
        const searchText = keyword.toLowerCase();
        const aScore = (a.title.toLowerCase().includes(searchText) ? 10 : 0) +
                      (a.content?.toLowerCase().includes(searchText) ? 5 : 0) +
                      (a.tags?.toLowerCase().includes(searchText) ? 3 : 0);
        const bScore = (b.title.toLowerCase().includes(searchText) ? 10 : 0) +
                      (b.content?.toLowerCase().includes(searchText) ? 5 : 0) +
                      (b.tags?.toLowerCase().includes(searchText) ? 3 : 0);
        return bScore - aScore;
      });
    }

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 高级搜索（支持多条件组合）
  http.post(`${API_BASE}/knowledge/advanced-search`, async ({ request }) => {
    await delay();
    const body = await request.json() as {
      keyword?: string;
      categoryId?: number;
      type?: string;
      tags?: string[];
      page?: number;
      size?: number;
      sort?: string;
    };

    const {
      keyword = '',
      categoryId,
      type,
      tags = [],
      page = 0,
      size = 10,
      sort = 'TIME',
    } = body;

    // 多条件筛选
    let items = mockKnowledgeItems.filter(item => {
      // 默认只显示已发布的内容（status === 1）
      if (item.status !== 1) {
        return false;
      }

      // 关键词匹配（标题、内容、标签）
      let keywordMatch = true;
      if (keyword) {
        const searchText = keyword.toLowerCase();
        keywordMatch = 
          item.title.toLowerCase().includes(searchText) ||
          item.content?.toLowerCase().includes(searchText) ||
          item.tags?.toLowerCase().includes(searchText);
      }

      // 分类匹配
      let categoryMatch = true;
      if (categoryId) {
        categoryMatch = item.categoryId === categoryId;
      }

      // 类型匹配
      let typeMatch = true;
      if (type) {
        typeMatch = item.type === type;
      }

      // 标签匹配（只要包含任一标签即可）
      let tagsMatch = true;
      if (tags.length > 0) {
        const itemTags = item.tags?.toLowerCase() || '';
        tagsMatch = tags.some(tag => itemTags.includes(tag.toLowerCase()));
      }

      return keywordMatch && categoryMatch && typeMatch && tagsMatch;
    }).map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }));

    // 排序
    if (sort === 'TIME') {
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'POPULARITY') {
      items.sort((a, b) => (b.stats?.viewCount || 0) - (a.stats?.viewCount || 0));
    } else if (sort === 'RELEVANCE') {
      // 相关性排序：标题匹配权重最高
      items.sort((a, b) => {
        const searchText = keyword.toLowerCase();
        const aScore = (a.title.toLowerCase().includes(searchText) ? 10 : 0) +
                      (a.content?.toLowerCase().includes(searchText) ? 5 : 0) +
                      (a.tags?.toLowerCase().includes(searchText) ? 3 : 0);
        const bScore = (b.title.toLowerCase().includes(searchText) ? 10 : 0) +
                      (b.content?.toLowerCase().includes(searchText) ? 5 : 0) +
                      (b.tags?.toLowerCase().includes(searchText) ? 3 : 0);
        return bScore - aScore;
      });
    }

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 批量删除知识
  http.post(`${API_BASE}/knowledge/batch-delete`, async ({ request }) => {
    await delay();
    const ids = (await request.json()) as number[];
    
    for (let i = mockKnowledgeItems.length - 1; i >= 0; i--) {
      if (ids.includes(mockKnowledgeItems[i].id)) {
        mockKnowledgeItems.splice(i, 1);
      }
    }
    
    return HttpResponse.json(createSuccessResponse({ deletedCount: ids.length }));
  }),

  // 恢复知识
  http.put(`${API_BASE}/knowledge/:id/restore`, async ({ params }) => {
    await delay();
    const { id } = params;
    const knowledge = mockKnowledgeItems.find(k => k.id === Number(id));

    if (knowledge) {
      knowledge.status = 1;
      knowledge.updatedAt = new Date().toISOString();
      return HttpResponse.json(createSuccessResponse(knowledge));
    }

    return HttpResponse.json(
      { success: false, message: '内容不存在', data: null },
      { status: 404 }
    );
  }),

  // 根据标签获取知识内容
  http.get(`${API_BASE}/knowledge/tag/:tag`, async ({ params, request }) => {
    await delay();
    const { tag } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const items = mockKnowledgeItems
      .filter(k => k.tags?.toLowerCase().includes((tag as string).toLowerCase()))
      .map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }));

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取推荐内容
  http.get(`${API_BASE}/knowledge/recommended`, async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const items = [...mockKnowledgeItems]
      .filter(item => item.status === 1) // 只显示已发布的内容
      .map(item => ({ ...item, stats: mockKnowledgeStats[item.id] }))
      .sort((a, b) => (b.stats?.viewCount || 0) - (a.stats?.viewCount || 0))
      .slice(0, 20);

    const pageData = createPageResponse(items, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取版本历史
  http.get(`${API_BASE}/knowledge/:id/versions`, async ({ params, request }) => {
    await delay();
    const { id } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const versions = [
      {
        id: 1,
        knowledgeId: Number(id),
        versionNumber: 1,
        title: '初始版本',
        content: '这是初始版本的内容',
        changeSummary: '创建文档',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 2,
      },
      {
        id: 2,
        knowledgeId: Number(id),
        versionNumber: 2,
        title: '更新版本',
        content: '这是更新后的内容',
        changeSummary: '修正错别字',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 2,
      },
    ];

    const pageData = createPageResponse(versions, page, size);
    return HttpResponse.json(createSuccessResponse(pageData));
  }),

  // 获取指定版本
  http.get(`${API_BASE}/knowledge/:id/versions/:versionNumber`, async ({ params }) => {
    await delay();
    const { id, versionNumber } = params;
    
    const version = {
      id: Number(versionNumber),
      knowledgeId: Number(id),
      versionNumber: Number(versionNumber),
      title: `版本 ${versionNumber}`,
      content: `这是版本 ${versionNumber} 的内容`,
      changeSummary: `版本 ${versionNumber} 的变更`,
      createdAt: new Date().toISOString(),
      createdBy: 2,
    };

    return HttpResponse.json(createSuccessResponse(version));
  }),

  // 恢复到指定版本
  http.post(`${API_BASE}/knowledge/:id/restore-version`, async ({ params, request }) => {
    await delay();
    const { id } = params;
    const url = new URL(request.url);
    const versionNumber = url.searchParams.get('versionNumber');
    const changeSummary = url.searchParams.get('changeSummary');

    const knowledge = mockKnowledgeItems.find(k => k.id === Number(id));

    if (knowledge) {
      knowledge.updatedAt = new Date().toISOString();
      return HttpResponse.json(createSuccessResponse({
        ...knowledge,
        restoredVersion: Number(versionNumber),
        changeSummary: changeSummary || `恢复到版本 ${versionNumber}`,
      }));
    }

    return HttpResponse.json(
      { success: false, message: '内容不存在', data: null },
      { status: 404 }
    );
  }),

  // 比较版本差异
  http.get(`${API_BASE}/knowledge/:id/compare-versions`, async ({ params, request }) => {
    await delay();
    const { id } = params;
    const url = new URL(request.url);
    const version1 = Number(url.searchParams.get('version1'));
    const version2 = Number(url.searchParams.get('version2'));

    const diff = {
      version1: {
        id: version1,
        knowledgeId: Number(id),
        versionNumber: version1,
        title: `版本 ${version1}`,
        content: `这是版本 ${version1} 的内容`,
        createdAt: new Date().toISOString(),
        createdBy: 2,
      },
      version2: {
        id: version2,
        knowledgeId: Number(id),
        versionNumber: version2,
        title: `版本 ${version2}`,
        content: `这是版本 ${version2} 的内容`,
        createdAt: new Date().toISOString(),
        createdBy: 2,
      },
      titleDiff: '标题未变更',
      contentDiff: '内容有变更',
    };

    return HttpResponse.json(createSuccessResponse(diff));
  }),

  // 发布草稿
  http.post(`${API_BASE}/knowledge/:id/publish`, async ({ params }) => {
    await delay();
    const { id } = params;
    const knowledge = mockKnowledgeItems.find(k => k.id === Number(id));

    if (knowledge) {
      knowledge.status = 1; // 发布状态
      knowledge.updatedAt = new Date().toISOString();
      // 生成分享码（如果还没有）
      if (!knowledge.shareCode || knowledge.shareCode.startsWith('DRAFT')) {
        knowledge.shareCode = `SHARE${Date.now()}`;
      }
      return HttpResponse.json(createSuccessResponse(knowledge));
    }

    return HttpResponse.json(
      { success: false, message: '草稿不存在', data: null },
      { status: 404 }
    );
  }),

  // 批量更新状态
  http.post(`${API_BASE}/knowledge/batch-update-status`, async ({ request }) => {
    await delay();
    const { ids, status } = (await request.json()) as { ids: number[]; status: number };

    let updatedCount = 0;
    mockKnowledgeItems.forEach(item => {
      if (ids.includes(item.id)) {
        item.status = status;
        item.updatedAt = new Date().toISOString();
        updatedCount++;
      }
    });

    return HttpResponse.json(createSuccessResponse({ updatedCount }));
  }),

  // 获取知识内容统计
  http.get(`${API_BASE}/knowledge/stats`, async () => {
    await delay();
    const stats = {
      totalKnowledge: mockKnowledgeItems.length,
      totalViews: Object.values(mockKnowledgeStats).reduce((sum, s) => sum + (s.viewCount || 0), 0),
      totalLikes: Object.values(mockKnowledgeStats).reduce((sum, s) => sum + (s.likeCount || 0), 0),
      totalComments: Object.values(mockKnowledgeStats).reduce((sum, s) => sum + (s.commentCount || 0), 0),
      todayCreated: Math.floor(Math.random() * 10) + 5,
    };
    return HttpResponse.json(createSuccessResponse(stats));
  }),

  // 获取用户知识内容统计
  http.get(`${API_BASE}/knowledge/user-stats/:userId`, async ({ params }) => {
    await delay();
    const { userId } = params;
    const userKnowledge = mockKnowledgeItems.filter(k => k.uploaderId === Number(userId));
    
    const stats = {
      userId: Number(userId),
      totalKnowledge: userKnowledge.length,
      totalViews: userKnowledge.reduce((sum, k) => sum + (mockKnowledgeStats[k.id]?.viewCount || 0), 0),
      totalLikes: userKnowledge.reduce((sum, k) => sum + (mockKnowledgeStats[k.id]?.likeCount || 0), 0),
      totalComments: userKnowledge.reduce((sum, k) => sum + (mockKnowledgeStats[k.id]?.commentCount || 0), 0),
      averageScore: 4.5,
    };
    
    return HttpResponse.json(createSuccessResponse(stats));
  }),
];
