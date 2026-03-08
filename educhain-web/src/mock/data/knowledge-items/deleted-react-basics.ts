import type { KnowledgeItem } from '@/types/api';

export const deletedReactBasics: KnowledgeItem = {
  id: 201,
  title: 'React 基础教程（已删除）',
  content: '# React 基础\n\n这个内容已被删除...',
  categoryId: 1,
  categoryName: '前端开发',
  uploaderId: 2,
  uploaderName: '小铭',
  shareCode: 'DEL001',
  tags: 'React,前端,教程',
  status: -2, // -2 表示已删除
  createdAt: '2026-02-15T10:00:00Z',
  updatedAt: '2026-03-01T14:30:00Z',
};
