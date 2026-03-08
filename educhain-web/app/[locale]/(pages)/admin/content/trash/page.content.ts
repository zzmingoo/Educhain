import { type Dictionary, t } from 'intlayer';

const adminTrashContent = {
  key: 'admin-trash',
  content: {
    // 页面标题
    title: t({
      'zh-CN': '回收站',
      en: 'Trash',
    }),
    subtitle: t({
      'zh-CN': '管理已删除的知识内容',
      en: 'Manage deleted knowledge content',
    }),

    // 统计
    stats: {
      total: t({
        'zh-CN': '总计',
        en: 'Total',
      }),
      items: t({
        'zh-CN': '项',
        en: 'items',
      }),
    },

    // 操作按钮
    restore: t({
      'zh-CN': '恢复',
      en: 'Restore',
    }),
    permanentDelete: t({
      'zh-CN': '彻底删除',
      en: 'Delete Permanently',
    }),
    emptyTrash: t({
      'zh-CN': '清空回收站',
      en: 'Empty Trash',
    }),
    backToContent: t({
      'zh-CN': '返回内容管理',
      en: 'Back to Content',
    }),

    // 搜索
    searchPlaceholder: t({
      'zh-CN': '搜索已删除的内容...',
      en: 'Search deleted content...',
    }),

    // 表格列
    selectAll: t({
      'zh-CN': '全选',
      en: 'Select All',
    }),
    title_column: t({
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
    deletedAt: t({
      'zh-CN': '删除时间',
      en: 'Deleted At',
    }),
    actions: t({
      'zh-CN': '操作',
      en: 'Actions',
    }),

    // 空状态
    noContent: t({
      'zh-CN': '回收站为空',
      en: 'Trash is empty',
    }),
    noContentDesc: t({
      'zh-CN': '没有已删除的内容',
      en: 'No deleted content',
    }),

    // 确认对话框
    confirmRestore: {
      title: t({
        'zh-CN': '确认恢复',
        en: 'Confirm Restore',
      }),
      message: t({
        'zh-CN': '确定要恢复这个内容吗？',
        en: 'Are you sure you want to restore this content?',
      }),
      confirm: t({
        'zh-CN': '确认恢复',
        en: 'Restore',
      }),
      cancel: t({
        'zh-CN': '取消',
        en: 'Cancel',
      }),
    },
    confirmDelete: {
      title: t({
        'zh-CN': '确认彻底删除',
        en: 'Confirm Permanent Delete',
      }),
      message: t({
        'zh-CN': '确定要彻底删除这个内容吗？此操作无法撤销！',
        en: 'Are you sure you want to permanently delete this content? This action cannot be undone!',
      }),
      confirm: t({
        'zh-CN': '彻底删除',
        en: 'Delete Permanently',
      }),
      cancel: t({
        'zh-CN': '取消',
        en: 'Cancel',
      }),
    },
    confirmEmptyTrash: {
      title: t({
        'zh-CN': '确认清空回收站',
        en: 'Confirm Empty Trash',
      }),
      message: t({
        'zh-CN': '确定要清空回收站吗？所有已删除的内容将被彻底删除，此操作无法撤销！',
        en: 'Are you sure you want to empty the trash? All deleted content will be permanently removed. This action cannot be undone!',
      }),
      confirm: t({
        'zh-CN': '清空回收站',
        en: 'Empty Trash',
      }),
      cancel: t({
        'zh-CN': '取消',
        en: 'Cancel',
      }),
    },

    // 消息提示
    messages: {
      restoreSuccess: t({
        'zh-CN': '恢复成功',
        en: 'Restored successfully',
      }),
      deleteSuccess: t({
        'zh-CN': '删除成功',
        en: 'Deleted successfully',
      }),
      emptyTrashSuccess: t({
        'zh-CN': '回收站已清空',
        en: 'Trash emptied successfully',
      }),
      selectItemsFirst: t({
        'zh-CN': '请先选择要操作的内容',
        en: 'Please select items first',
      }),
    },

    // 分页
    prevPage: t({
      'zh-CN': '上一页',
      en: 'Previous',
    }),
    nextPage: t({
      'zh-CN': '下一页',
      en: 'Next',
    }),

    // 加载状态
    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
  },
} satisfies Dictionary;

export default adminTrashContent;