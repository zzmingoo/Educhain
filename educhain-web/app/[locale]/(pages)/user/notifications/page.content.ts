import { t, type Dictionary } from 'intlayer';

const notificationsPageContent = {
  key: 'notifications-page',
  content: {
    // 页面标题
    title: t({
      'zh-CN': '通知中心',
      en: 'Notifications',
    }),
    subtitle: t({
      'zh-CN': '查看您的所有通知和消息提醒',
      en: 'View all your notifications and alerts',
    }),

    // 标签
    all: t({
      'zh-CN': '全部',
      en: 'All',
    }),
    unread: t({
      'zh-CN': '未读',
      en: 'Unread',
    }),
    system: t({
      'zh-CN': '系统',
      en: 'System',
    }),
    interaction: t({
      'zh-CN': '互动',
      en: 'Interaction',
    }),

    // 操作
    markAllRead: t({
      'zh-CN': '全部已读',
      en: 'Mark All Read',
    }),
    clearAll: t({
      'zh-CN': '清空通知',
      en: 'Clear All',
    }),
    settings: t({
      'zh-CN': '设置',
      en: 'Settings',
    }),
    loading: t({
      'zh-CN': '加载中...',
      en: 'Loading...',
    }),
    batchDelete: t({
      'zh-CN': '批量删除',
      en: 'Batch Delete',
    }),
    selectAll: t({
      'zh-CN': '全选',
      en: 'Select All',
    }),
    unselectAll: t({
      'zh-CN': '取消全选',
      en: 'Unselect All',
    }),
    selected: t({
      'zh-CN': '已选择',
      en: 'Selected',
    }),
    items: t({
      'zh-CN': '项',
      en: 'items',
    }),

    // 空状态
    noNotifications: t({
      'zh-CN': '暂无通知',
      en: 'No notifications',
    }),
    noNotificationsDesc: t({
      'zh-CN': '当有新的通知时，会显示在这里',
      en: 'New notifications will appear here',
    }),

    // 时间单位
    timeUnits: {
      justNow: t({
        'zh-CN': '刚刚',
        en: 'Just now',
      }),
      minutesAgo: t({
        'zh-CN': '分钟前',
        en: 'minutes ago',
      }),
      hoursAgo: t({
        'zh-CN': '小时前',
        en: 'hours ago',
      }),
      daysAgo: t({
        'zh-CN': '天前',
        en: 'days ago',
      }),
      weeksAgo: t({
        'zh-CN': '周前',
        en: 'weeks ago',
      }),
      monthsAgo: t({
        'zh-CN': '个月前',
        en: 'months ago',
      }),
      yearsAgo: t({
        'zh-CN': '年前',
        en: 'years ago',
      }),
    },

    // 确认对话框
    confirmClearAll: {
      title: t({
        'zh-CN': '清空通知',
        en: 'Clear All Notifications',
      }),
      message: t({
        'zh-CN': '确定要清空所有通知吗？此操作不可撤销。',
        en: 'Are you sure you want to clear all notifications? This action cannot be undone.',
      }),
      confirm: t({
        'zh-CN': '确定清空',
        en: 'Clear All',
      }),
      cancel: t({
        'zh-CN': '取消',
        en: 'Cancel',
      }),
    },
    confirmBatchDelete: {
      title: t({
        'zh-CN': '批量删除',
        en: 'Batch Delete',
      }),
      message: t({
        'zh-CN': '确定要删除选中的通知吗？此操作不可撤销。',
        en: 'Are you sure you want to delete the selected notifications? This action cannot be undone.',
      }),
      confirm: t({
        'zh-CN': '确认删除',
        en: 'Confirm Delete',
      }),
      cancel: t({
        'zh-CN': '取消',
        en: 'Cancel',
      }),
    },

    // 消息
    messages: {
      markAllReadSuccess: t({
        'zh-CN': '已全部标记为已读',
        en: 'All marked as read',
      }),
      markAllReadError: t({
        'zh-CN': '标记失败，请重试',
        en: 'Failed to mark as read, please try again',
      }),
      clearAllSuccess: t({
        'zh-CN': '已清空所有通知',
        en: 'All notifications cleared',
      }),
      clearAllError: t({
        'zh-CN': '清空失败，请重试',
        en: 'Failed to clear, please try again',
      }),
      settingsSaved: t({
        'zh-CN': '设置已保存',
        en: 'Settings saved',
      }),
      selectItemsFirst: t({
        'zh-CN': '请先选择要删除的通知',
        en: 'Please select notifications to delete first',
      }),
      batchDeleteSuccess: t({
        'zh-CN': '批量删除成功',
        en: 'Batch delete successful',
      }),
    },

    // 设置对话框
    settingsDialog: {
      title: t({
        'zh-CN': '通知设置',
        en: 'Notification Settings',
      }),
      notificationTypes: t({
        'zh-CN': '通知类型',
        en: 'Notification Types',
      }),
      likeNotification: t({
        'zh-CN': '点赞通知',
        en: 'Like Notifications',
      }),
      commentNotification: t({
        'zh-CN': '评论通知',
        en: 'Comment Notifications',
      }),
      followNotification: t({
        'zh-CN': '关注通知',
        en: 'Follow Notifications',
      }),
      systemNotification: t({
        'zh-CN': '系统通知',
        en: 'System Notifications',
      }),
      deliveryMethods: t({
        'zh-CN': '接收方式',
        en: 'Delivery Methods',
      }),
      emailNotification: t({
        'zh-CN': '邮件通知',
        en: 'Email Notifications',
      }),
      pushNotification: t({
        'zh-CN': '推送通知',
        en: 'Push Notifications',
      }),
      save: t({
        'zh-CN': '保存',
        en: 'Save',
      }),
      saving: t({
        'zh-CN': '保存中...',
        en: 'Saving...',
      }),
      cancel: t({
        'zh-CN': '取消',
        en: 'Cancel',
      }),
    },

    // 无障碍
    aria: {
      notificationList: t({
        'zh-CN': '通知列表',
        en: 'Notification list',
      }),
      tabNavigation: t({
        'zh-CN': '通知类型筛选',
        en: 'Notification type filter',
      }),
      markAllReadButton: t({
        'zh-CN': '将所有通知标记为已读',
        en: 'Mark all notifications as read',
      }),
      clearAllButton: t({
        'zh-CN': '清空所有通知',
        en: 'Clear all notifications',
      }),
      unreadNotification: t({
        'zh-CN': '未读通知',
        en: 'Unread notification',
      }),
      notificationTime: t({
        'zh-CN': '通知时间',
        en: 'Notification time',
      }),
    },
  },
} satisfies Dictionary;

export default notificationsPageContent;
