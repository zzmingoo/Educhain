import { type Dictionary, t } from 'intlayer';

const adminDashboardContent = {
  key: 'admin-dashboard',
  content: {
    // 页面标题
    title: t({
      'zh-CN': '管理仪表板',
      en: 'Admin Dashboard',
    }),
    subtitle: t({
      'zh-CN': '系统概览与数据统计',
      en: 'System Overview & Statistics',
    }),
    welcome: t({
      'zh-CN': '欢迎回来',
      en: 'Welcome back',
    }),

    // 统计卡片
    stats: {
      totalUsers: t({
        'zh-CN': '总用户数',
        en: 'Total Users',
      }),
      activeUsers: t({
        'zh-CN': '活跃用户',
        en: 'Active Users',
      }),
      totalKnowledge: t({
        'zh-CN': '知识条目',
        en: 'Knowledge Items',
      }),
      pendingReview: t({
        'zh-CN': '待审核',
        en: 'Pending Review',
      }),
      totalViews: t({
        'zh-CN': '总浏览量',
        en: 'Total Views',
      }),
      todayViews: t({
        'zh-CN': '今日浏览',
        en: 'Today Views',
      }),
      blockchainCerts: t({
        'zh-CN': '区块链存证',
        en: 'Blockchain Certificates',
      }),
      todayCerts: t({
        'zh-CN': '今日新增',
        en: 'Today Added',
      }),
    },

    // 快速操作
    quickActions: {
      title: t({
        'zh-CN': '快速操作',
        en: 'Quick Actions',
      }),
      userManagement: t({
        'zh-CN': '用户管理',
        en: 'User Management',
      }),
      contentReview: t({
        'zh-CN': '内容审核',
        en: 'Content Review',
      }),
      categoryManagement: t({
        'zh-CN': '分类管理',
        en: 'Category Management',
      }),
      systemSettings: t({
        'zh-CN': '系统设置',
        en: 'System Settings',
      }),
      viewLogs: t({
        'zh-CN': '查看日志',
        en: 'View Logs',
      }),
      blockchainMonitor: t({
        'zh-CN': '区块链监控',
        en: 'Blockchain Monitor',
      }),
    },

    // 最近活动
    recentActivity: {
      title: t({
        'zh-CN': '最近活动',
        en: 'Recent Activity',
      }),
      viewAll: t({
        'zh-CN': '查看全部',
        en: 'View All',
      }),
      noActivity: t({
        'zh-CN': '暂无活动记录',
        en: 'No recent activity',
      }),
    },

    // 系统状态
    systemStatus: {
      title: t({
        'zh-CN': '系统状态',
        en: 'System Status',
      }),
      healthy: t({
        'zh-CN': '运行正常',
        en: 'Healthy',
      }),
      warning: t({
        'zh-CN': '需要注意',
        en: 'Warning',
      }),
      error: t({
        'zh-CN': '存在问题',
        en: 'Error',
      }),
      database: t({
        'zh-CN': '数据库',
        en: 'Database',
      }),
      blockchain: t({
        'zh-CN': '区块链',
        en: 'Blockchain',
      }),
      storage: t({
        'zh-CN': '存储',
        en: 'Storage',
      }),
      api: t({
        'zh-CN': 'API服务',
        en: 'API Service',
      }),
    },

    // 数据趋势
    trends: {
      title: t({
        'zh-CN': '数据趋势',
        en: 'Data Trends',
      }),
      days7: t({
        'zh-CN': '7天',
        en: '7 Days',
      }),
      days30: t({
        'zh-CN': '30天',
        en: '30 Days',
      }),
      days90: t({
        'zh-CN': '90天',
        en: '90 Days',
      }),
      userGrowth: t({
        'zh-CN': '用户增长',
        en: 'User Growth',
      }),
      knowledgePublished: t({
        'zh-CN': '知识发布',
        en: 'Knowledge Published',
      }),
      viewsGrowth: t({
        'zh-CN': '浏览量',
        en: 'Views',
      }),
      noData: t({
        'zh-CN': '暂无趋势数据',
        en: 'No trend data available',
      }),
    },

    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
  },
} satisfies Dictionary;

export default adminDashboardContent;
