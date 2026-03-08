/**
 * Tailwind CSS 实用技巧 - 草稿
 */

import { generateMockShareCode } from '../../utils/shareCode';

export const draftTailwindTips = {
  id: 102,
  shareCode: 'DRAFT' + generateMockShareCode(102),
  title: 'Tailwind CSS 实用技巧集合',
  content: `# Tailwind CSS 实用技巧集合

## 响应式设计

使用 Tailwind 的响应式前缀可以轻松实现响应式布局：

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  响应式容器
</div>
\`\`\`

## 自定义配置

在 tailwind.config.js 中可以自定义主题...

（待补充更多内容）`,
  type: 'TEXT' as const,
  uploaderId: 2,
  uploaderName: '张三',
  uploaderAvatar: '/avatars/zzm.jpeg',
  categoryId: 12,
  categoryName: 'CSS',
  tags: 'Tailwind CSS,CSS,前端,样式',
  status: 0,
  createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  contentHash: 'draft_tailwind_tips',
};
