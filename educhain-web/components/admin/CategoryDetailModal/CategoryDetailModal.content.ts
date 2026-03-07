import { type Dictionary, t } from 'intlayer';

const categoryDetailModalContent = {
  key: 'category-detail-modal',
  content: {
    // 标题
    viewTitle: t({
      'zh-CN': '分类详情',
      en: 'Category Details',
    }),
    editTitle: t({
      'zh-CN': '编辑分类',
      en: 'Edit Category',
    }),
    
    // 基本信息
    basicInfo: t({
      'zh-CN': '基本信息',
      en: 'Basic Information',
    }),
    categoryName: t({
      'zh-CN': '分类名称',
      en: 'Category Name',
    }),
    description: t({
      'zh-CN': '分类描述',
      en: 'Description',
    }),
    parentCategory: t({
      'zh-CN': '父分类',
      en: 'Parent Category',
    }),
    noParent: t({
      'zh-CN': '无（根分类）',
      en: 'None (Root Category)',
    }),
    sortOrder: t({
      'zh-CN': '排序',
      en: 'Sort Order',
    }),
    
    // 统计信息
    statistics: t({
      'zh-CN': '统计信息',
      en: 'Statistics',
    }),
    knowledgeCount: t({
      'zh-CN': '知识数量',
      en: 'Knowledge Count',
    }),
    
    // 时间信息
    timeInfo: t({
      'zh-CN': '时间信息',
      en: 'Time Information',
    }),
    createdAt: t({
      'zh-CN': '创建时间',
      en: 'Created At',
    }),
    
    // 按钮
    close: t({
      'zh-CN': '关闭',
      en: 'Close',
    }),
    edit: t({
      'zh-CN': '编辑分类',
      en: 'Edit Category',
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
    
    // 提示信息
    namePlaceholder: t({
      'zh-CN': '请输入分类名称',
      en: 'Enter category name',
    }),
    descriptionPlaceholder: t({
      'zh-CN': '请输入分类描述',
      en: 'Enter category description',
    }),
  },
} satisfies Dictionary;

export default categoryDetailModalContent;