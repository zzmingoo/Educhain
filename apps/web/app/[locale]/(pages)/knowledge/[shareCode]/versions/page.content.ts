import { t, type DeclarationContent } from 'intlayer';

const knowledgeVersionsContent = {
  key: 'knowledge-versions-page',
  content: {
    // 页面头部
    header: {
      badge: t({
        'zh-CN': '版本管理',
        en: 'Version Control',
      }),
      title: t({
        'zh-CN': '版本历史',
        en: 'Version History',
      }),
      subtitle: t({
        'zh-CN': '追踪每一次修改',
        en: 'Track Every Change',
      }),
      description: t({
        'zh-CN': '查看知识内容的完整修改历史，对比不同版本的差异，或恢复到任意历史版本。',
        en: 'View complete modification history, compare differences between versions, or restore to any historical version.',
      }),
      backToDetail: t({
        'zh-CN': '返回详情',
        en: 'Back to Detail',
      }),
    },
    // 版本列表
    versionList: {
      currentVersion: t({
        'zh-CN': '当前版本',
        en: 'Current Version',
      }),
      version: t({
        'zh-CN': '版本',
        en: 'Version',
      }),
      modifiedBy: t({
        'zh-CN': '修改人',
        en: 'Modified By',
      }),
      modifiedAt: t({
        'zh-CN': '修改时间',
        en: 'Modified At',
      }),
      changeSummary: t({
        'zh-CN': '变更摘要',
        en: 'Change Summary',
      }),
      noSummary: t({
        'zh-CN': '无变更说明',
        en: 'No change summary',
      }),
    },
    // 操作按钮
    actions: {
      viewVersion: t({
        'zh-CN': '查看',
        en: 'View',
      }),
      compareVersions: t({
        'zh-CN': '对比',
        en: 'Compare',
      }),
      restoreVersion: t({
        'zh-CN': '恢复',
        en: 'Restore',
      }),
      selectToCompare: t({
        'zh-CN': '选择对比',
        en: 'Select to Compare',
      }),
      cancelCompare: t({
        'zh-CN': '取消对比',
        en: 'Cancel Compare',
      }),
      compareSelected: t({
        'zh-CN': '对比选中版本',
        en: 'Compare Selected',
      }),
    },
    // 版本详情模态框
    versionModal: {
      title: t({
        'zh-CN': '版本详情',
        en: 'Version Details',
      }),
      close: t({
        'zh-CN': '关闭',
        en: 'Close',
      }),
      versionNumber: t({
        'zh-CN': '版本号',
        en: 'Version Number',
      }),
      content: t({
        'zh-CN': '内容',
        en: 'Content',
      }),
    },
    // 版本对比模态框
    compareModal: {
      title: t({
        'zh-CN': '版本对比',
        en: 'Version Comparison',
      }),
      close: t({
        'zh-CN': '关闭',
        en: 'Close',
      }),
      oldVersion: t({
        'zh-CN': '旧版本',
        en: 'Old Version',
      }),
      newVersion: t({
        'zh-CN': '新版本',
        en: 'New Version',
      }),
      titleDiff: t({
        'zh-CN': '标题变更',
        en: 'Title Changes',
      }),
      contentDiff: t({
        'zh-CN': '内容变更',
        en: 'Content Changes',
      }),
      noChanges: t({
        'zh-CN': '无变更',
        en: 'No Changes',
      }),
      added: t({
        'zh-CN': '新增',
        en: 'Added',
      }),
      removed: t({
        'zh-CN': '删除',
        en: 'Removed',
      }),
      modified: t({
        'zh-CN': '修改',
        en: 'Modified',
      }),
    },
    // 恢复确认对话框
    restoreConfirm: {
      title: t({
        'zh-CN': '恢复版本',
        en: 'Restore Version',
      }),
      message: t({
        'zh-CN': '确定要恢复到此版本吗？当前内容将被替换，但会保存为新版本。',
        en: 'Are you sure you want to restore to this version? Current content will be replaced but saved as a new version.',
      }),
      summaryLabel: t({
        'zh-CN': '变更说明（可选）',
        en: 'Change Summary (Optional)',
      }),
      summaryPlaceholder: t({
        'zh-CN': '例如：恢复到版本 3，修复了格式问题',
        en: 'e.g., Restored to version 3, fixed formatting issues',
      }),
      cancel: t({
        'zh-CN': '取消',
        en: 'Cancel',
      }),
      confirm: t({
        'zh-CN': '确认恢复',
        en: 'Confirm Restore',
      }),
    },
    // 状态
    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
    empty: t({
      'zh-CN': '暂无版本历史',
      en: 'No Version History',
    }),
    emptyDescription: t({
      'zh-CN': '此知识内容还没有版本历史记录。',
      en: 'This knowledge has no version history yet.',
    }),
    // 提示消息
    messages: {
      restoreSuccess: t({
        'zh-CN': '恢复成功！',
        en: 'Restored successfully!',
      }),
      restoreFailed: t({
        'zh-CN': '恢复失败，请重试',
        en: 'Failed to restore, please try again',
      }),
      loadFailed: t({
        'zh-CN': '加载失败，请刷新页面',
        en: 'Failed to load, please refresh the page',
      }),
      selectTwoVersions: t({
        'zh-CN': '请选择两个版本进行对比',
        en: 'Please select two versions to compare',
      }),
      compareFailed: t({
        'zh-CN': '对比失败，请重试',
        en: 'Failed to compare, please try again',
      }),
    },
  },
} satisfies DeclarationContent;

export default knowledgeVersionsContent;