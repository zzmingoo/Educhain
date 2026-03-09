/**
 * GraphQL 基础教程 - 草稿
 */

import { generateMockShareCode } from '../../utils/shareCode';

export const draftGraphqlBasics = {
  id: 103,
  shareCode: 'DRAFT' + generateMockShareCode(103),
  title: 'GraphQL 从零开始',
  content: `# GraphQL 从零开始

## 什么是 GraphQL？

GraphQL 是一种用于 API 的查询语言，由 Facebook 开发...

## 核心概念

### Schema
定义数据结构和类型...

### Query
查询数据...

### Mutation
修改数据...

（草稿，需要添加更多示例代码）`,
  type: 'TEXT' as const,
  uploaderId: 2,
  uploaderName: '小铭',
  uploaderAvatar: '/avatars/zzm.jpeg',
  categoryId: 13,
  categoryName: 'API',
  tags: 'GraphQL,API,后端,数据查询',
  status: 0,
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  contentHash: 'draft_graphql_basics',
};
