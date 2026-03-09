import { type Dictionary, t } from 'intlayer';

const userDetailModalContent = {
  key: 'user-detail-modal',
  content: {
    // 角色
    admin: t({
      'zh-CN': '管理员',
      en: 'Admin',
    }),
    learner: t({
      'zh-CN': '学习者',
      en: 'Learner',
    }),
    
    // 基本信息
    basicInfo: t({
      'zh-CN': '基本信息',
      en: 'Basic Information',
    }),
    email: t({
      'zh-CN': '邮箱',
      en: 'Email',
    }),
    school: t({
      'zh-CN': '学校',
      en: 'School',
    }),
    level: t({
      'zh-CN': '等级',
      en: 'Level',
    }),
    status: t({
      'zh-CN': '状态',
      en: 'Status',
    }),
    active: t({
      'zh-CN': '正常',
      en: 'Active',
    }),
    inactive: t({
      'zh-CN': '禁用',
      en: 'Inactive',
    }),
    createdAt: t({
      'zh-CN': '注册时间',
      en: 'Registration Date',
    }),
    
    // 个人简介
    bio: t({
      'zh-CN': '个人简介',
      en: 'Biography',
    }),
    
    // 统计数据
    statistics: t({
      'zh-CN': '统计数据',
      en: 'Statistics',
    }),
    followers: t({
      'zh-CN': '粉丝',
      en: 'Followers',
    }),
    following: t({
      'zh-CN': '关注',
      en: 'Following',
    }),
    knowledge: t({
      'zh-CN': '知识',
      en: 'Knowledge',
    }),
    
    // 按钮
    close: t({
      'zh-CN': '关闭',
      en: 'Close',
    }),
    edit: t({
      'zh-CN': '编辑用户',
      en: 'Edit User',
    }),
    cancel: t({
      'zh-CN': '取消',
      en: 'Cancel',
    }),
    save: t({
      'zh-CN': '保存',
      en: 'Save',
    }),
    saving: t({
      'zh-CN': '保存中...',
      en: 'Saving...',
    }),
  },
} satisfies Dictionary;

export default userDetailModalContent;