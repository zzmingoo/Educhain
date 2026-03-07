import { type Dictionary, t } from 'intlayer';

const adminContentContent = {
  key: 'admin-content',
  content: {
    title: t({
      'zh-CN': '内容管理',
      en: 'Content Management',
    }),
    subtitle: t({
      'zh-CN': '管理平台知识内容和审核',
      en: 'Manage platform knowledge content and review',
    }),
    searchPlaceholder: t({
      'zh-CN': '搜索标题、作者...',
      en: 'Search title, author...',
    }),
    totalContent: t({
      'zh-CN': '总内容数',
      en: 'Total Content',
    }),
    published: t({
      'zh-CN': '已发布',
      en: 'Published',
    }),
    pending: t({
      'zh-CN': '待审核',
      en: 'Pending',
    }),
    // 表格列
    title_col: t({
      'zh-CN': '标题',
      en: 'Title',
    }),
    author: t({
      'zh-CN': '作者',
      en: 'Author',
    }),
    category: t({
      'zh-CN': '分类',
      en: 'Category',
    }),
    views: t({
      'zh-CN': '浏览量',
      en: 'Views',
    }),
    likes: t({
      'zh-CN': '点赞',
      en: 'Likes',
    }),
    status: t({
      'zh-CN': '状态',
      en: 'Status',
    }),
    createdAt: t({
      'zh-CN': '创建时间',
      en: 'Created At',
    }),
    actions: t({
      'zh-CN': '操作',
      en: 'Actions',
    }),
    // 状态
    draft: t({
      'zh-CN': '草稿',
      en: 'Draft',
    }),
    review: t({
      'zh-CN': '审核中',
      en: 'Review',
    }),
    publishedStatus: t({
      'zh-CN': '已发布',
      en: 'Published',
    }),
    rejected: t({
      'zh-CN': '已拒绝',
      en: 'Rejected',
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
    approve: t({
      'zh-CN': '通过',
      en: 'Approve',
    }),
    reject: t({
      'zh-CN': '拒绝',
      en: 'Reject',
    }),
    delete: t({
      'zh-CN': '删除',
      en: 'Delete',
    }),
    // 筛选
    allContent: t({
      'zh-CN': '全部内容',
      en: 'All Content',
    }),
    publishedOnly: t({
      'zh-CN': '已发布',
      en: 'Published',
    }),
    pendingReview: t({
      'zh-CN': '待审核',
      en: 'Pending Review',
    }),
    drafts: t({
      'zh-CN': '草稿',
      en: 'Drafts',
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
    items: t({
      'zh-CN': '条内容',
      en: 'items',
    }),
    // 空状态
    noContent: t({
      'zh-CN': '暂无内容',
      en: 'No content found',
    }),
    noResults: t({
      'zh-CN': '未找到匹配的内容',
      en: 'No matching content found',
    }),
    // 加载
    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
  },
} satisfies Dictionary;

export default adminContentContent;
