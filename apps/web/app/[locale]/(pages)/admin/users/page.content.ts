import { type Dictionary, t } from 'intlayer';

const adminUsersContent = {
  key: 'admin-users',
  content: {
    title: t({
      'zh-CN': '用户管理',
      en: 'User Management',
    }),
    subtitle: t({
      'zh-CN': '管理平台用户和权限',
      en: 'Manage platform users and permissions',
    }),
    searchPlaceholder: t({
      'zh-CN': '搜索用户名、邮箱...',
      en: 'Search username, email...',
    }),
    totalUsers: t({
      'zh-CN': '总用户数',
      en: 'Total Users',
    }),
    activeUsers: t({
      'zh-CN': '活跃用户',
      en: 'Active Users',
    }),
    newToday: t({
      'zh-CN': '今日新增',
      en: 'New Today',
    }),
    // 表格列
    avatar: t({
      'zh-CN': '头像',
      en: 'Avatar',
    }),
    username: t({
      'zh-CN': '用户名',
      en: 'Username',
    }),
    fullName: t({
      'zh-CN': '姓名',
      en: 'Full Name',
    }),
    email: t({
      'zh-CN': '邮箱',
      en: 'Email',
    }),
    school: t({
      'zh-CN': '学校',
      en: 'School',
    }),
    role: t({
      'zh-CN': '角色',
      en: 'Role',
    }),
    level: t({
      'zh-CN': '等级',
      en: 'Level',
    }),
    status: t({
      'zh-CN': '状态',
      en: 'Status',
    }),
    createdAt: t({
      'zh-CN': '注册时间',
      en: 'Created At',
    }),
    actions: t({
      'zh-CN': '操作',
      en: 'Actions',
    }),
    // 角色
    admin: t({
      'zh-CN': '管理员',
      en: 'Admin',
    }),
    learner: t({
      'zh-CN': '学习者',
      en: 'Learner',
    }),
    // 状态
    active: t({
      'zh-CN': '正常',
      en: 'Active',
    }),
    inactive: t({
      'zh-CN': '禁用',
      en: 'Inactive',
    }),
    // 操作按钮
    view: t({
      'zh-CN': '查看',
      en: 'View',
    }),
    edit: t({
      'zh-CN': '编辑',
      en: 'Edit',
    }),
    disable: t({
      'zh-CN': '禁用',
      en: 'Disable',
    }),
    enable: t({
      'zh-CN': '启用',
      en: 'Enable',
    }),
    // 筛选
    allUsers: t({
      'zh-CN': '全部用户',
      en: 'All Users',
    }),
    admins: t({
      'zh-CN': '管理员',
      en: 'Admins',
    }),
    learners: t({
      'zh-CN': '学习者',
      en: 'Learners',
    }),
    activeOnly: t({
      'zh-CN': '仅活跃',
      en: 'Active Only',
    }),
    // 分页
    previous: t({
      'zh-CN': '上一页',
      en: 'Previous',
    }),
    next: t({
      'zh-CN': '下一页',
      en: 'Next',
    }),
    showing: t({
      'zh-CN': '显示',
      en: 'Showing',
    }),
    to: t({
      'zh-CN': '至',
      en: 'to',
    }),
    of: t({
      'zh-CN': '共',
      en: 'of',
    }),
    users: t({
      'zh-CN': '个用户',
      en: 'users',
    }),
    // 空状态
    noUsers: t({
      'zh-CN': '暂无用户',
      en: 'No users found',
    }),
    noResults: t({
      'zh-CN': '未找到匹配的用户',
      en: 'No matching users found',
    }),
    // 加载
    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
  },
} satisfies Dictionary;

export default adminUsersContent;
