/**
 * 通知 Mock 数据
 * 包含 35 条通知数据
 */

import type { Notification } from '../../types/api';

// 扩展通知类型，添加 senderId 用于动态关联
export interface NotificationWithSender extends Notification {
  senderId?: number; // 发送者用户ID（点赞、评论、关注的发起者）
}

export const mockNotifications: NotificationWithSender[] = [
  {
    id: 1,
    userId: 2,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《React Hooks 完全指南》',
    relatedId: 1,
    isRead: false,
    createdAt: '2026-01-05T09:30:00Z',
    senderId: 3, // 李四
  },
  {
    id: 2,
    userId: 2,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《React Hooks 完全指南》',
    relatedId: 1,
    isRead: false,
    createdAt: '2026-01-05T09:15:00Z',
    senderId: 4, // 王五
  },
  {
    id: 3,
    userId: 2,
    type: 'FOLLOW',
    title: '新的关注者',
    content: '关注了你',
    relatedId: 6,
    isRead: false,
    createdAt: '2026-01-05T08:45:00Z',
    senderId: 6, // 孙七
  },
  {
    id: 4,
    userId: 2,
    type: 'SYSTEM',
    title: '系统通知',
    content: '你的文章《React Hooks 完全指南》已通过审核',
    relatedId: 1,
    isRead: true,
    createdAt: '2026-01-04T18:00:00Z',
  },
  {
    id: 5,
    userId: 3,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《MySQL 性能优化技巧》',
    relatedId: 3,
    isRead: false,
    createdAt: '2026-01-05T08:30:00Z',
    senderId: 2, // 张三
  },
  {
    id: 6,
    userId: 3,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《MySQL 性能优化技巧》',
    relatedId: 3,
    isRead: false,
    createdAt: '2026-01-05T07:50:00Z',
    senderId: 23, // 李四二
  },
  {
    id: 7,
    userId: 4,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《Vue 3 Composition API 深入理解》',
    relatedId: 4,
    isRead: true,
    createdAt: '2026-01-04T20:00:00Z',
    senderId: 5, // 赵六
  },
  {
    id: 8,
    userId: 4,
    type: 'FOLLOW',
    title: '新的关注者',
    content: '关注了你',
    relatedId: 7,
    isRead: true,
    createdAt: '2026-01-04T19:30:00Z',
    senderId: 7, // 周八
  },
  {
    id: 9,
    userId: 5,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《Spring Boot 微服务架构实践》',
    relatedId: 2,
    isRead: false,
    createdAt: '2026-01-05T07:00:00Z',
    senderId: 10, // 陈一
  },
  {
    id: 10,
    userId: 5,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《Spring Boot 微服务架构实践》',
    relatedId: 2,
    isRead: false,
    createdAt: '2026-01-05T06:30:00Z',
    senderId: 9, // 吴九
  },
  {
    id: 11,
    userId: 6,
    type: 'SYSTEM',
    title: '系统通知',
    content: '你的账号已升级到 6 级，解锁更多功能',
    isRead: true,
    createdAt: '2026-01-04T15:00:00Z',
  },
  {
    id: 12,
    userId: 7,
    type: 'COMMENT',
    title: '新的评论',
    content: '回复了你的评论',
    relatedId: 12,
    isRead: false,
    createdAt: '2026-01-05T06:00:00Z',
    senderId: 6, // 高六
  },
  {
    id: 13,
    userId: 8,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的评论',
    relatedId: 6,
    isRead: false,
    createdAt: '2026-01-05T05:30:00Z',
    senderId: 10, // 郑十
  },
  {
    id: 14,
    userId: 9,
    type: 'FOLLOW',
    title: '新的关注者',
    content: '关注了你',
    relatedId: 4,
    isRead: true,
    createdAt: '2026-01-04T14:00:00Z',
    senderId: 4, // 王五
  },
  {
    id: 15,
    userId: 10,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《Docker 容器化部署完整教程》',
    relatedId: 5,
    isRead: false,
    createdAt: '2026-01-05T05:00:00Z',
    senderId: 6, // 吴六
  },
  {
    id: 16,
    userId: 10,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《Kubernetes 集群管理指南》',
    relatedId: 10,
    isRead: false,
    createdAt: '2026-01-05T04:30:00Z',
    senderId: 10, // 陈一
  },
  {
    id: 17,
    userId: 11,
    type: 'SYSTEM',
    title: '系统通知',
    content: '平台将于明天凌晨 2:00-4:00 进行系统维护',
    isRead: true,
    createdAt: '2026-01-04T12:00:00Z',
  },
  {
    id: 18,
    userId: 15,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《Python 机器学习入门》',
    relatedId: 6,
    isRead: false,
    createdAt: '2026-01-05T04:00:00Z',
    senderId: 24, // 褚一
  },
  {
    id: 19,
    userId: 15,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《深度学习神经网络入门》',
    relatedId: 12,
    isRead: false,
    createdAt: '2026-01-05T03:30:00Z',
    senderId: 10, // 陈十
  },
  {
    id: 20,
    userId: 15,
    type: 'FOLLOW',
    title: '新的关注者',
    content: '关注了你',
    relatedId: 28,
    isRead: true,
    createdAt: '2026-01-04T10:00:00Z',
    senderId: 28, // 冯九
  },
  {
    id: 21,
    userId: 2,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《React Hooks 完全指南》',
    relatedId: 1,
    isRead: true,
    createdAt: '2026-01-03T22:00:00Z',
    senderId: 7, // 郭七
  },
  {
    id: 22,
    userId: 3,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《MySQL 性能优化技巧》',
    relatedId: 3,
    isRead: true,
    createdAt: '2026-01-03T20:00:00Z',
    senderId: 8, // 谭八
  },
  {
    id: 23,
    userId: 4,
    type: 'SYSTEM',
    title: '成就解锁',
    content: '恭喜你解锁成就：知识分享者（发布 10 篇文章）',
    isRead: true,
    createdAt: '2026-01-03T18:00:00Z',
  },
  {
    id: 24,
    userId: 5,
    type: 'FOLLOW',
    title: '新的关注者',
    content: '关注了你',
    relatedId: 18,
    isRead: true,
    createdAt: '2026-01-03T16:00:00Z',
    senderId: 18, // 曹九
  },
  {
    id: 25,
    userId: 6,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的评论',
    relatedId: 22,
    isRead: true,
    createdAt: '2026-01-03T14:00:00Z',
    senderId: 10, // 严十
  },
  {
    id: 26,
    userId: 7,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《Django REST Framework 实战》',
    relatedId: 17,
    isRead: true,
    createdAt: '2026-01-03T12:00:00Z',
    senderId: 11, // 陆一
  },
  {
    id: 27,
    userId: 8,
    type: 'SYSTEM',
    title: '系统通知',
    content: '你的文章《算法竞赛入门》获得了本周热门推荐',
    isRead: true,
    createdAt: '2026-01-03T10:00:00Z',
  },
  {
    id: 28,
    userId: 9,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《Flutter 跨平台开发实战》',
    relatedId: 7,
    isRead: true,
    createdAt: '2026-01-03T08:00:00Z',
    senderId: 12, // 钱二
  },
  {
    id: 29,
    userId: 10,
    type: 'FOLLOW',
    title: '新的关注者',
    content: '关注了你',
    relatedId: 22,
    isRead: true,
    createdAt: '2026-01-02T22:00:00Z',
    senderId: 22, // 孙三
  },
  {
    id: 30,
    userId: 11,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《网络安全渗透测试基础》',
    relatedId: 22,
    isRead: true,
    createdAt: '2026-01-02T20:00:00Z',
    senderId: 23, // 李四二
  },
  {
    id: 31,
    userId: 13,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《区块链智能合约开发》',
    relatedId: 20,
    isRead: false,
    createdAt: '2026-01-05T03:00:00Z',
    senderId: 8, // 王八
  },
  {
    id: 32,
    userId: 16,
    type: 'COMMENT',
    title: '新的评论',
    content: '评论了你的文章《Unity 游戏开发基础》',
    relatedId: 28,
    isRead: false,
    createdAt: '2026-01-05T02:30:00Z',
    senderId: 28, // 冯九
  },
  {
    id: 33,
    userId: 23,
    type: 'SYSTEM',
    title: '系统通知',
    content: '你的文章《Redis 缓存设计模式》已被收录到精选专栏',
    relatedId: 8,
    isRead: false,
    createdAt: '2026-01-05T02:00:00Z',
  },
  {
    id: 34,
    userId: 25,
    type: 'FOLLOW',
    title: '新的关注者',
    content: '关注了你',
    relatedId: 24,
    isRead: false,
    createdAt: '2026-01-05T01:30:00Z',
    senderId: 24, // 周五
  },
  {
    id: 35,
    userId: 30,
    type: 'LIKE',
    title: '新的点赞',
    content: '赞了你的文章《自然语言处理 NLP 基础》',
    relatedId: 19,
    isRead: false,
    createdAt: '2026-01-05T01:00:00Z',
    senderId: 6, // 高六
  },
];
