import { type Dictionary, t } from 'intlayer';

const adminCategoriesContent = {
  key: 'admin-categories',
  content: {
    title: t({
      'zh-CN': '分类管理',
      en: 'Category Management',
    }),
    subtitle: t({
      'zh-CN': '管理知识分类和层级结构',
      en: 'Manage knowledge categories and hierarchy',
    }),
    searchPlaceholder: t({
      'zh-CN': '搜索分类名称...',
      en: 'Search category name...',
    }),
    totalCategories: t({
      'zh-CN': '总分类数',
      en: 'Total Categories',
    }),
    rootCategories: t({
      'zh-CN': '根分类',
      en: 'Root Categories',
    }),
    subCategories: t({
      'zh-CN': '子分类',
      en: 'Sub Categories',
    }),
    // 表格列
    name: t({
      'zh-CN': '分类名称',
      en: 'Name',
    }),
    description: t({
      'zh-CN': '描述',
      en: 'Description',
    }),
    parent: t({
      'zh-CN': '父分类',
      en: 'Parent',
    }),
    knowledgeCount: t({
      'zh-CN': '内容数量',
      en: 'Content Count',
    }),
    sortOrder: t({
      'zh-CN': '排序',
      en: 'Sort Order',
    }),
    createdAt: t({
      'zh-CN': '创建时间',
      en: 'Created At',
    }),
    actions: t({
      'zh-CN': '操作',
      en: 'Actions',
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
    delete: t({
      'zh-CN': '删除',
      en: 'Delete',
    }),
    addSub: t({
      'zh-CN': '添加子分类',
      en: 'Add Sub',
    }),
    // 筛选
    allCategories: t({
      'zh-CN': '全部分类',
      en: 'All Categories',
    }),
    rootOnly: t({
      'zh-CN': '仅根分类',
      en: 'Root Only',
    }),
    subOnly: t({
      'zh-CN': '仅子分类',
      en: 'Sub Only',
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
    categories: t({
      'zh-CN': '个分类',
      en: 'categories',
    }),
    // 空状态
    noCategories: t({
      'zh-CN': '暂无分类',
      en: 'No categories found',
    }),
    noResults: t({
      'zh-CN': '未找到匹配的分类',
      en: 'No matching categories found',
    }),
    // 加载
    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
    // 其他
    rootCategory: t({
      'zh-CN': '根分类',
      en: 'Root',
    }),
  },
} satisfies Dictionary;

export default adminCategoriesContent;
