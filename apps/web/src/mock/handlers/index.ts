/**
 * Mock Handlers 统一导出 & MSW 初始化
 */

import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth';
import { userHandlers } from './user';
import { knowledgeHandlers } from './knowledge';
import { categoryHandlers } from './category';
import { commentHandlers } from './comment';
import { notificationHandlers } from './notification';
import { interactionHandlers } from './interaction';
import { followHandlers } from './follow';
import { searchHandlers } from './search';
import { blockchainHandlers } from './blockchain';
import { recommendationHandlers } from './recommendation';
import { communityHandlers } from './community';
import { ticketHandlers } from './ticket';
import { activityHandlers } from './activity';
import { adminHandlers } from './admin';

// 合并所有 handlers
// 注意：更具体的路由应该放在前面，避免被通配符路由拦截
export const handlers = [
  ...authHandlers,
  ...adminHandlers, // 管理员相关接口
  ...followHandlers, // 必须在 userHandlers 之前，避免被 /users/:id 拦截
  ...userHandlers,
  ...knowledgeHandlers,
  ...categoryHandlers,
  ...commentHandlers,
  ...notificationHandlers,
  ...interactionHandlers,
  ...searchHandlers,
  ...blockchainHandlers,
  ...recommendationHandlers,
  ...communityHandlers,
  ...ticketHandlers,
  ...activityHandlers,
];

// 设置 Mock Server
export const setupMockServer = async () => {
  const worker = setupWorker(...handlers);

  await worker.start({
    onUnhandledRequest: 'bypass',
  });

  console.log('[MSW] Mock Service Worker 已启动');
  return worker;
};

// 导出各模块 handlers
export {
  authHandlers,
  adminHandlers,
  userHandlers,
  knowledgeHandlers,
  categoryHandlers,
  commentHandlers,
  notificationHandlers,
  interactionHandlers,
  followHandlers,
  searchHandlers,
  blockchainHandlers,
  recommendationHandlers,
  communityHandlers,
  ticketHandlers,
  activityHandlers,
};
