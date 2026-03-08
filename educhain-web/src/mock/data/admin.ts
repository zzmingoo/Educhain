/**
 * 管理员仪表板 Mock 数据
 */

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

export interface AdminActivity {
  id: number;
  title: string;
  time: string;
  type: 'user' | 'content' | 'system' | 'blockchain';
  userId?: number;
  username?: string;
}

export interface SystemStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  message?: string;
}

// 管理员统计数据
export const mockAdminStats: AdminStats = {
  totalUsers: 5678,
  activeUsers: 3421,
  totalKnowledge: 1234,
  pendingReview: 23,
  totalViews: 98765,
  todayViews: 1543,
  blockchainCerts: 456,
  todayCerts: 12,
};

// 最近活动
export const mockAdminActivities: AdminActivity[] = [
  {
    id: 1,
    title: '新用户注册: zhangsan@example.com',
    time: '2分钟前',
    type: 'user',
    userId: 2,
    username: 'zhangsan',
  },
  {
    id: 2,
    title: '知识审核通过: "区块链技术入门"',
    time: '15分钟前',
    type: 'content',
  },
  {
    id: 3,
    title: '系统备份完成',
    time: '1小时前',
    type: 'system',
  },
  {
    id: 4,
    title: '新增区块链存证',
    time: '2小时前',
    type: 'blockchain',
  },
  {
    id: 5,
    title: '用户 lisi 发布新知识',
    time: '3小时前',
    type: 'content',
    userId: 3,
    username: 'lisi',
  },
  {
    id: 6,
    title: '新用户注册: wangwu@example.com',
    time: '4小时前',
    type: 'user',
    userId: 4,
    username: 'wangwu',
  },
  {
    id: 7,
    title: '数据库优化完成',
    time: '5小时前',
    type: 'system',
  },
  {
    id: 8,
    title: '知识审核通过: "React Hooks 详解"',
    time: '6小时前',
    type: 'content',
  },
  {
    id: 9,
    title: '新增区块链存证',
    time: '7小时前',
    type: 'blockchain',
  },
  {
    id: 10,
    title: '用户 zhaoliu 更新个人资料',
    time: '8小时前',
    type: 'user',
    userId: 5,
    username: 'zhaoliu',
  },
];

// 系统状态
export const mockSystemStatus: SystemStatus[] = [
  {
    name: '数据库',
    status: 'healthy',
    message: '运行正常',
  },
  {
    name: '区块链',
    status: 'healthy',
    message: '运行正常',
  },
  {
    name: '存储',
    status: 'healthy',
    message: '运行正常',
  },
  {
    name: 'API服务',
    status: 'healthy',
    message: '运行正常',
  },
];

// 数据趋势（最近90天）
export interface TrendData {
  date: string;
  users: number;
  knowledge: number;
  views: number;
}

// 生成趋势数据的辅助函数
const generateTrendData = (): TrendData[] => {
  const data: TrendData[] = [];
  const today = new Date('2026-03-08');
  
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // 基础值随时间增长
    const baseUsers = 50 + Math.floor((89 - i) * 1.5);
    const baseKnowledge = 20 + Math.floor((89 - i) * 0.8);
    const baseViews = 3000 + Math.floor((89 - i) * 100);
    
    // 添加随机波动（周末数据会低一些）
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendFactor = isWeekend ? 0.7 : 1;
    
    // 添加一些随机性
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    data.push({
      date: dateStr,
      users: Math.floor(baseUsers * weekendFactor * randomFactor),
      knowledge: Math.floor(baseKnowledge * weekendFactor * randomFactor),
      views: Math.floor(baseViews * weekendFactor * randomFactor),
    });
  }
  
  return data;
};

export const mockTrendData: TrendData[] = generateTrendData();

// 系统设置数据
export interface SystemSettings {
  // 基本设置
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  
  // 用户设置
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  defaultUserRole: 'LEARNER' | 'ADMIN';
  maxUploadSize: number; // MB
  
  // 内容设置
  enableContentReview: boolean;
  autoPublish: boolean;
  allowComments: boolean;
  allowAnonymousComments: boolean;
  
  // 区块链设置
  enableBlockchain: boolean;
  blockchainNetwork: string;
  contractAddress: string;
  gasLimit: number;
  
  // 邮件设置
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpSecure: boolean;
  
  // 安全设置
  enableTwoFactor: boolean;
  sessionTimeout: number; // 分钟
  maxLoginAttempts: number;
  passwordMinLength: number;
  
  // 性能设置
  cacheEnabled: boolean;
  cacheDuration: number; // 秒
  enableCDN: boolean;
  cdnUrl: string;
}

export const mockSystemSettings: SystemSettings = {
  // 基本设置
  siteName: 'EduChain',
  siteDescription: '基于区块链的教育知识共享平台',
  siteUrl: 'https://educhain.example.com',
  adminEmail: 'admin@educhain.com',
  
  // 用户设置
  allowRegistration: true,
  requireEmailVerification: true,
  defaultUserRole: 'LEARNER',
  maxUploadSize: 10,
  
  // 内容设置
  enableContentReview: true,
  autoPublish: false,
  allowComments: true,
  allowAnonymousComments: false,
  
  // 区块链设置
  enableBlockchain: true,
  blockchainNetwork: 'Ethereum Mainnet',
  contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  gasLimit: 300000,
  
  // 邮件设置
  smtpHost: 'smtp.gmail.com',
  smtpPort: 587,
  smtpUser: 'noreply@educhain.com',
  smtpPassword: '********',
  smtpSecure: true,
  
  // 安全设置
  enableTwoFactor: false,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  passwordMinLength: 8,
  
  // 性能设置
  cacheEnabled: true,
  cacheDuration: 3600,
  enableCDN: false,
  cdnUrl: '',
};
