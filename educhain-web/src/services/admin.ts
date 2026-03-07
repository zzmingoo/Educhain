/**
 * 管理员相关 API 服务
 */

import { request } from './api';
import type { ApiResponse } from '@/types/api';

// 管理员统计数据类型
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalKnowledge: number;
  pendingReview: number;
  totalViews: number;
  todayViews: number;
  blockchainCerts: number;
  todayCerts: number;
}

// 活动记录类型
export interface AdminActivity {
  id: number;
  title: string;
  time: string;
  type: 'user' | 'content' | 'system' | 'blockchain';
  userId?: number;
  username?: string;
}

// 系统状态类型
export interface SystemStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  message?: string;
}

// 数据趋势类型
export interface TrendData {
  date: string;
  users: number;
  knowledge: number;
  views: number;
}

/**
 * 获取管理员统计数据
 */
export const getAdminStats = (): Promise<ApiResponse<AdminStats>> => {
  return request.get<AdminStats>('/admin/stats');
};

/**
 * 获取最近活动
 * @param limit 返回数量限制
 */
export const getAdminActivities = (limit = 10): Promise<ApiResponse<AdminActivity[]>> => {
  return request.get<AdminActivity[]>('/admin/activities', { limit });
};

/**
 * 获取系统状态
 */
export const getSystemStatus = (): Promise<ApiResponse<SystemStatus[]>> => {
  return request.get<SystemStatus[]>('/admin/system-status');
};

/**
 * 获取数据趋势
 * @param days 天数（默认7天）
 */
export const getTrends = (days = 7): Promise<ApiResponse<TrendData[]>> => {
  return request.get<TrendData[]>('/admin/trends', { days });
};

// 系统设置类型
export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  defaultUserRole: string;
  maxUploadSize: number;
  enableContentReview: boolean;
  autoPublish: boolean;
  allowComments: boolean;
  allowAnonymousComments: boolean;
  enableBlockchain: boolean;
  blockchainNetwork: string;
  contractAddress: string;
  gasLimit: number;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpSecure: boolean;
  enableTwoFactor: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  cacheEnabled: boolean;
  cacheDuration: number;
  enableCDN: boolean;
  cdnUrl: string;
}

/**
 * 获取系统设置
 */
export const getSystemSettings = (): Promise<ApiResponse<SystemSettings>> => {
  return request.get<SystemSettings>('/admin/settings');
};

/**
 * 更新系统设置
 */
export const updateSystemSettings = (settings: Partial<SystemSettings>): Promise<ApiResponse<SystemSettings>> => {
  return request.put<SystemSettings>('/admin/settings', settings);
};
