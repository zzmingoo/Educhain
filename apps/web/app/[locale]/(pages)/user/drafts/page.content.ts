import { t, type DeclarationContent } from 'intlayer';

const userDraftsContent = {
  key: 'user-drafts-page',
  content: {
    // 页面头部
    header: {
      badge: t({
        'zh-CN': '草稿箱',
        en: 'Draft Box',
      }),
      title: t({
        'zh-CN': '我的草稿',
        en: 'My Drafts',
      }),
      subtitle: t({
        'zh-CN': '继续完成你的创作',
        en: 'Continue Your Creation',
      }),
      description: t({
        'zh-CN': '这里保存了你未发布的知识内容，随时可以继续编辑或发布。',
        en: 'Your unpublished knowledge is saved here, ready to edit or publish anytime.',
      }),
    },
    // 操作按钮
    actions: {
      createNew: t({
        'zh-CN': '创建新草稿',
        en: 'Create New Draft',
      }),
      editDraft: t({
        'zh-CN': '继续编辑',
        en: 'Continue Editing',
      }),
      publishDraft: t({
        'zh-CN': '发布',
        en: 'Publish',
      }),
      deleteDraft: t({
        'zh-CN': '删除',
        en: 'Delete',
      }),
      confirmDelete: t({
        'zh-CN': '确认删除',
        en: 'Confirm Delete',
      }),
      cancelDelete: t({
        'zh-CN': '取消',
        en: 'Cancel',
      }),
    },
    // 草稿卡片
    draftCard: {
      lastEdited: t({
        'zh-CN': '最后编辑',
        en: 'Last Edited',
      }),
      created: t({
        'zh-CN': '创建于',
        en: 'Created',
      }),
      autoSaved: t({
        'zh-CN': '自动保存',
        en: 'Auto Saved',
      }),
      untitled: t({
        'zh-CN': '无标题草稿',
        en: 'Untitled Draft',
      }),
      noContent: t({
        'zh-CN': '暂无内容...',
        en: 'No content yet...',
      }),
    },
    // 状态
    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
    empty: t({
      'zh-CN': '暂无草稿',
      en: 'No Drafts',
    }),
    emptyDescription: t({
      'zh-CN': '你还没有保存任何草稿，开始创作你的第一个知识吧！',
      en: 'You haven\'t saved any drafts yet. Start creating your first knowledge!',
    }),
    // 确认对话框
    deleteConfirm: {
      title: t({
        'zh-CN': '删除草稿',
        en: 'Delete Draft',
      }),
      message: t({
        'zh-CN': '确定要删除这个草稿吗？此操作无法撤销。',
        en: 'Are you sure you want to delete this draft? This action cannot be undone.',
      }),
    },
    publishConfirm: {
      title: t({
        'zh-CN': '发布草稿',
        en: 'Publish Draft',
      }),
      message: t({
        'zh-CN': '确定要发布这个草稿吗？发布后将对所有用户可见。',
        en: 'Are you sure you want to publish this draft? It will be visible to all users.',
      }),
    },
    // 提示消息
    messages: {
      publishSuccess: t({
        'zh-CN': '发布成功！',
        en: 'Published successfully!',
      }),
      publishFailed: t({
        'zh-CN': '发布失败，请重试',
        en: 'Failed to publish, please try again',
      }),
      deleteSuccess: t({
        'zh-CN': '删除成功',
        en: 'Deleted successfully',
      }),
      deleteFailed: t({
        'zh-CN': '删除失败，请重试',
        en: 'Failed to delete, please try again',
      }),
      loadFailed: t({
        'zh-CN': '加载失败，请刷新页面',
        en: 'Failed to load, please refresh the page',
      }),
    },
  },
} satisfies DeclarationContent;

export default userDraftsContent;
