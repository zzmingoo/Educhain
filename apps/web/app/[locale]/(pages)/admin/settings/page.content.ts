import { type Dictionary, t } from 'intlayer';

const adminSettingsContent = {
  key: 'admin-settings',
  content: {
    title: t({
      'zh-CN': '系统设置',
      en: 'System Settings',
    }),
    subtitle: t({
      'zh-CN': '配置平台参数和功能选项',
      en: 'Configure platform parameters and features',
    }),
    
    // 分组标题
    basicSettings: t({
      'zh-CN': '基本设置',
      en: 'Basic Settings',
    }),
    userSettings: t({
      'zh-CN': '用户设置',
      en: 'User Settings',
    }),
    contentSettings: t({
      'zh-CN': '内容设置',
      en: 'Content Settings',
    }),
    blockchainSettings: t({
      'zh-CN': '区块链设置',
      en: 'Blockchain Settings',
    }),
    emailSettings: t({
      'zh-CN': '邮件设置',
      en: 'Email Settings',
    }),
    securitySettings: t({
      'zh-CN': '安全设置',
      en: 'Security Settings',
    }),
    performanceSettings: t({
      'zh-CN': '性能设置',
      en: 'Performance Settings',
    }),
    
    // 基本设置字段
    siteName: t({
      'zh-CN': '站点名称',
      en: 'Site Name',
    }),
    siteDescription: t({
      'zh-CN': '站点描述',
      en: 'Site Description',
    }),
    siteUrl: t({
      'zh-CN': '站点地址',
      en: 'Site URL',
    }),
    adminEmail: t({
      'zh-CN': '管理员邮箱',
      en: 'Admin Email',
    }),
    
    // 用户设置字段
    allowRegistration: t({
      'zh-CN': '允许用户注册',
      en: 'Allow Registration',
    }),
    requireEmailVerification: t({
      'zh-CN': '需要邮箱验证',
      en: 'Require Email Verification',
    }),
    defaultUserRole: t({
      'zh-CN': '默认用户角色',
      en: 'Default User Role',
    }),
    maxUploadSize: t({
      'zh-CN': '最大上传大小 (MB)',
      en: 'Max Upload Size (MB)',
    }),
    
    // 内容设置字段
    enableContentReview: t({
      'zh-CN': '启用内容审核',
      en: 'Enable Content Review',
    }),
    autoPublish: t({
      'zh-CN': '自动发布',
      en: 'Auto Publish',
    }),
    allowComments: t({
      'zh-CN': '允许评论',
      en: 'Allow Comments',
    }),
    allowAnonymousComments: t({
      'zh-CN': '允许匿名评论',
      en: 'Allow Anonymous Comments',
    }),
    
    // 区块链设置字段
    enableBlockchain: t({
      'zh-CN': '启用区块链',
      en: 'Enable Blockchain',
    }),
    blockchainNetwork: t({
      'zh-CN': '区块链网络',
      en: 'Blockchain Network',
    }),
    contractAddress: t({
      'zh-CN': '合约地址',
      en: 'Contract Address',
    }),
    gasLimit: t({
      'zh-CN': 'Gas 限制',
      en: 'Gas Limit',
    }),
    
    // 邮件设置字段
    smtpHost: t({
      'zh-CN': 'SMTP 主机',
      en: 'SMTP Host',
    }),
    smtpPort: t({
      'zh-CN': 'SMTP 端口',
      en: 'SMTP Port',
    }),
    smtpUser: t({
      'zh-CN': 'SMTP 用户名',
      en: 'SMTP User',
    }),
    smtpPassword: t({
      'zh-CN': 'SMTP 密码',
      en: 'SMTP Password',
    }),
    smtpSecure: t({
      'zh-CN': '使用 SSL/TLS',
      en: 'Use SSL/TLS',
    }),
    
    // 安全设置字段
    enableTwoFactor: t({
      'zh-CN': '启用双因素认证',
      en: 'Enable Two-Factor Auth',
    }),
    sessionTimeout: t({
      'zh-CN': '会话超时 (分钟)',
      en: 'Session Timeout (min)',
    }),
    maxLoginAttempts: t({
      'zh-CN': '最大登录尝试次数',
      en: 'Max Login Attempts',
    }),
    passwordMinLength: t({
      'zh-CN': '密码最小长度',
      en: 'Password Min Length',
    }),
    
    // 性能设置字段
    cacheEnabled: t({
      'zh-CN': '启用缓存',
      en: 'Enable Cache',
    }),
    cacheDuration: t({
      'zh-CN': '缓存时长 (秒)',
      en: 'Cache Duration (sec)',
    }),
    enableCDN: t({
      'zh-CN': '启用 CDN',
      en: 'Enable CDN',
    }),
    cdnUrl: t({
      'zh-CN': 'CDN 地址',
      en: 'CDN URL',
    }),
    
    // 按钮
    save: t({
      'zh-CN': '保存设置',
      en: 'Save Settings',
    }),
    reset: t({
      'zh-CN': '重置',
      en: 'Reset',
    }),
    testEmail: t({
      'zh-CN': '测试邮件',
      en: 'Test Email',
    }),
    
    // 提示信息
    saveSuccess: t({
      'zh-CN': '设置保存成功',
      en: 'Settings saved successfully',
    }),
    saveError: t({
      'zh-CN': '保存失败，请重试',
      en: 'Failed to save, please try again',
    }),
    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
    saving: t({
      'zh-CN': '保存中...',
      en: 'Saving...',
    }),
  },
} satisfies Dictionary;

export default adminSettingsContent;
