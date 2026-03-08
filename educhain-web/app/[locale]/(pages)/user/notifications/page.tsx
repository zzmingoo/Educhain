'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useIntlayer } from 'next-intlayer';
import Navbar from '@/../components/layout/Navbar';
import Footer from '@/../components/layout/Footer';
import { ConfirmDialog, NotificationSkeleton } from '@/../components/common';
import { notificationService } from '@/services/notification';
import { useErrorHandler, useConfirmDialog } from '@/hooks';
import { formatRelativeTimeI18n, type RelativeTimeUnits } from '@/lib/time';
import type { Notification } from '@/types/api';
import './page.css';

type TabType = 'all' | 'unread' | 'system' | 'interaction';

export default function NotificationsPage() {
  const content = useIntlayer('notifications-page');
  const { handleError, handleSuccess } = useErrorHandler();
  const { dialogState, isLoading: dialogLoading, confirm, handleConfirm, handleCancel } = useConfirmDialog();
  
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingMarkAll, setProcessingMarkAll] = useState(false);
  const [processingClear, setProcessingClear] = useState(false);
  
  // 批量操作状态
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [processingBatchDelete, setProcessingBatchDelete] = useState(false);
  
  // 设置对话框状态
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    enableLikeNotifications: true,
    enableCommentNotifications: true,
    enableFollowNotifications: true,
    enableSystemNotifications: true,
    emailNotifications: false,
    pushNotifications: true,
  });
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  
  // 使用 ref 存储 handleError 避免依赖变化导致无限循环
  const handleErrorRef = useRef(handleError);
  handleErrorRef.current = handleError;

  // 时间单位国际化
  const timeUnits: RelativeTimeUnits = useMemo(() => ({
    justNow: String(content.timeUnits.justNow.value),
    minutesAgo: String(content.timeUnits.minutesAgo.value),
    hoursAgo: String(content.timeUnits.hoursAgo.value),
    daysAgo: String(content.timeUnits.daysAgo.value),
    weeksAgo: String(content.timeUnits.weeksAgo.value),
    monthsAgo: String(content.timeUnits.monthsAgo.value),
    yearsAgo: String(content.timeUnits.yearsAgo.value),
  }), [content.timeUnits]);

  // 获取通知列表
  useEffect(() => {
    let isMounted = true;
    
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const params: { type?: string; isRead?: boolean } = {};
        if (activeTab === 'unread') params.isRead = false;
        else if (activeTab === 'system') params.type = 'system';
        else if (activeTab === 'interaction') params.type = 'interaction';

        const response = await notificationService.getNotifications(params);
        if (isMounted && response.success && response.data) {
          setNotifications(response.data.content || []);
        }
      } catch (error) {
        if (isMounted) {
          handleErrorRef.current(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNotifications();
    
    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  // 标记全部已读
  const handleMarkAllRead = useCallback(async () => {
    setProcessingMarkAll(true);
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      handleSuccess(String(content.messages?.markAllReadSuccess?.value || content.messages?.markAllReadSuccess || '已标记全部为已读'));
    } catch (error) {
      handleError(error);
    } finally {
      setProcessingMarkAll(false);
    }
  }, [handleSuccess, handleError, content.messages]);

  // 清空所有通知
  const handleClearAll = useCallback(async () => {
    const confirmed = await confirm({
      title: String(content.confirmClearAll?.title?.value || content.confirmClearAll?.title || '确认清空'),
      message: String(content.confirmClearAll?.message?.value || content.confirmClearAll?.message || '确定要清空所有通知吗？此操作无法撤销。'),
      confirmText: String(content.confirmClearAll?.confirm?.value || content.confirmClearAll?.confirm || '确认'),
      cancelText: String(content.confirmClearAll?.cancel?.value || content.confirmClearAll?.cancel || '取消'),
      variant: 'danger',
    });
    
    if (!confirmed) return;

    setProcessingClear(true);
    try {
      await notificationService.clearAllNotifications();
      setNotifications([]);
      handleSuccess(String(content.messages?.clearAllSuccess?.value || content.messages?.clearAllSuccess || '已清空所有通知'));
    } catch (error) {
      handleError(error);
    } finally {
      setProcessingClear(false);
    }
  }, [confirm, content, handleSuccess, handleError]);

  // 打开设置对话框
  const handleOpenSettings = useCallback(async () => {
    setShowSettings(true);
    setLoadingSettings(true);
    try {
      const response = await notificationService.getNotificationSettings();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingSettings(false);
    }
  }, [handleError]);

  // 保存设置
  const handleSaveSettings = useCallback(async () => {
    setSavingSettings(true);
    try {
      await notificationService.updateNotificationSettings(settings);
      handleSuccess(String(content.messages?.settingsSaved?.value || '设置已保存'));
      setShowSettings(false);
    } catch (error) {
      handleError(error);
    } finally {
      setSavingSettings(false);
    }
  }, [settings, handleSuccess, handleError, content.messages]);

  // 切换设置项
  const toggleSetting = useCallback((key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // 全选/取消全选
  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds([]);
      setIsAllSelected(false);
    } else {
      setSelectedIds(notifications.map(n => n.id));
      setIsAllSelected(true);
    }
  }, [isAllSelected, notifications]);

  // 单选通知
  const handleSelectNotification = useCallback((id: number) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        const newIds = prev.filter(nId => nId !== id);
        setIsAllSelected(false);
        return newIds;
      } else {
        const newIds = [...prev, id];
        setIsAllSelected(newIds.length === notifications.length);
        return newIds;
      }
    });
  }, [notifications.length]);

  // 批量删除
  const handleBatchDelete = useCallback(async () => {
    if (selectedIds.length === 0) {
      alert(String(content.messages?.selectItemsFirst?.value || '请先选择要删除的通知'));
      return;
    }

    const confirmed = await confirm({
      title: String(content.confirmBatchDelete?.title?.value || '批量删除'),
      message: String(content.confirmBatchDelete?.message?.value || `确定要删除选中的 ${selectedIds.length} 条通知吗？`),
      confirmText: String(content.confirmBatchDelete?.confirm?.value || '确认删除'),
      cancelText: String(content.confirmBatchDelete?.cancel?.value || '取消'),
      variant: 'danger',
    });

    if (!confirmed) return;

    setProcessingBatchDelete(true);
    try {
      await notificationService.batchDeleteNotifications(selectedIds);
      setNotifications(prev => prev.filter(n => !selectedIds.includes(n.id)));
      setSelectedIds([]);
      setIsAllSelected(false);
      handleSuccess(String(content.messages?.batchDeleteSuccess?.value || '批量删除成功'));
    } catch (error) {
      handleError(error);
    } finally {
      setProcessingBatchDelete(false);
    }
  }, [selectedIds, confirm, content, handleSuccess, handleError, notifications]);

  // 格式化时间
  const formatTime = useCallback((dateStr: string) => {
    return formatRelativeTimeI18n(dateStr, timeUnits);
  }, [timeUnits]);

  // 获取通知图标
  const getNotificationIcon = useCallback((type: string) => {
    switch (type) {
      case 'like':
        return (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'comment':
        return (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'follow':
        return (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      default:
        return (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
    }
  }, []);

  // 未读通知数量
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  return (
    <>
      <Navbar />
      <main className="notifications-page">
        <div className="page-content-narrow">
          <header className="notifications-header">
            <h1 className="notifications-title">{content.title.value}</h1>
            <p className="notifications-subtitle">{content.subtitle.value}</p>
          </header>

          <div className="notifications-toolbar">
            <nav 
              className="notifications-tabs glass-light" 
              role="tablist"
              aria-label={String(content.aria.tabNavigation)}
            >
              <button 
                role="tab"
                aria-selected={activeTab === 'all'}
                className={`tab-button ${activeTab === 'all' ? 'active' : ''}`} 
                onClick={() => setActiveTab('all')}
              >
                {content.all.value}
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'unread'}
                className={`tab-button ${activeTab === 'unread' ? 'active' : ''}`} 
                onClick={() => setActiveTab('unread')}
              >
                {content.unread.value}
                {unreadCount > 0 && (
                  <span className="unread-badge" aria-label={`${unreadCount}`}>
                    {unreadCount}
                  </span>
                )}
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'system'}
                className={`tab-button ${activeTab === 'system' ? 'active' : ''}`} 
                onClick={() => setActiveTab('system')}
              >
                {content.system.value}
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'interaction'}
                className={`tab-button ${activeTab === 'interaction' ? 'active' : ''}`} 
                onClick={() => setActiveTab('interaction')}
              >
                {content.interaction.value}
              </button>
            </nav>

            <div className="notifications-actions">
              <button 
                className="action-btn settings" 
                onClick={handleOpenSettings}
                aria-label={String(content.settings?.value || '设置')}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{content.settings?.value || '设置'}</span>
              </button>
              <button 
                className="action-btn" 
                onClick={handleMarkAllRead}
                disabled={processingMarkAll || notifications.length === 0 || unreadCount === 0}
                aria-label={String(content.aria.markAllReadButton)}
                aria-busy={processingMarkAll}
              >
                {processingMarkAll ? (
                  <span className="loading-spinner-small" aria-hidden="true" />
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                <span>{content.markAllRead.value}</span>
              </button>
              <button 
                className="action-btn danger" 
                onClick={selectedIds.length > 0 ? handleBatchDelete : handleClearAll}
                disabled={(selectedIds.length > 0 ? processingBatchDelete : processingClear) || notifications.length === 0}
                aria-label={selectedIds.length > 0 ? String(content.batchDelete?.value || '批量删除') : String(content.aria.clearAllButton)}
                aria-busy={selectedIds.length > 0 ? processingBatchDelete : processingClear}
              >
                {(selectedIds.length > 0 ? processingBatchDelete : processingClear) ? (
                  <span className="loading-spinner-small" aria-hidden="true" />
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
                <span>
                  {selectedIds.length > 0 
                    ? `${content.batchDelete?.value || '批量删除'} (${selectedIds.length})`
                    : content.clearAll.value
                  }
                </span>
              </button>
            </div>
          </div>

          {/* 通知列表 */}
          {loading ? (
            <div className="notifications-list" role="status" aria-label={String(content.aria.notificationList)}>
              {[1, 2, 3, 4, 5].map((i) => <NotificationSkeleton key={i} />)}
            </div>
          ) : notifications.length > 0 ? (
            <>
              {/* 全选控制栏 */}
              <div className="select-all-bar glass-light">
                <label className="select-all-label">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="checkbox"
                  />
                  <span>{isAllSelected ? (content.unselectAll?.value || '取消全选') : (content.selectAll?.value || '全选')}</span>
                </label>
                {selectedIds.length > 0 && (
                  <span className="selected-count">
                    {content.selected?.value || '已选择'} <strong>{selectedIds.length}</strong> {content.items?.value || '项'}
                  </span>
                )}
              </div>

              <ul className="notifications-list" role="list" aria-label={String(content.aria.notificationList)}>
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`notification-item glass-card ${!notification.isRead ? 'unread' : ''} ${selectedIds.includes(notification.id) ? 'selected' : ''}`}
                    aria-label={!notification.isRead ? String(content.aria.unreadNotification) : undefined}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(notification.id)}
                      onChange={() => handleSelectNotification(notification.id)}
                      className="notification-checkbox"
                      onClick={(e) => e.stopPropagation()}
                    />
                    
                    {notification.senderName ? (
                      <div className="notification-avatar-placeholder" aria-hidden="true">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    ) : (
                      <div className={`notification-icon ${notification.type}`} aria-hidden="true">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                    
                    <div className="notification-content">
                      <p className="notification-text">
                        {notification.senderName && <strong>{notification.senderName}</strong>}
                        {notification.senderName ? ' ' : ''}
                        {notification.content}
                      </p>
                      <time 
                        className="notification-time" 
                        dateTime={notification.createdAt}
                        aria-label={String(content.aria.notificationTime)}
                      >
                        {formatTime(notification.createdAt)}
                      </time>
                    </div>
                    
                    <div className={`notification-type-icon ${notification.type}`} aria-hidden="true">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="notifications-empty glass-card" role="status">
              <div className="empty-icon" aria-hidden="true">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="empty-title">{content.noNotifications.value}</h3>
              <p className="empty-description">{content.noNotificationsDesc.value}</p>
            </div>
          )}
        </div>

        {/* 确认对话框 */}
        <ConfirmDialog
          state={dialogState}
          isLoading={dialogLoading}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </main>

      {/* 设置对话框 */}
      {showSettings && (
        <div className="settings-overlay" onClick={() => setShowSettings(false)}>
          <div className="settings-dialog glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="settings-header">
              <h2>{content.settingsDialog?.title?.value || '通知设置'}</h2>
              <button className="close-btn" onClick={() => setShowSettings(false)} aria-label="关闭">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {loadingSettings ? (
              <div className="settings-loading">
                <div className="loading-spinner"></div>
                <p>{content.loading?.value || '加载中...'}</p>
              </div>
            ) : (
              <>
                <div className="settings-content">
                  <div className="settings-section">
                    <h3>{content.settingsDialog?.notificationTypes?.value || '通知类型'}</h3>
                    <div className="setting-item">
                      <label>
                        <span>{content.settingsDialog?.likeNotification?.value || '点赞通知'}</span>
                        <input
                          type="checkbox"
                          checked={settings.enableLikeNotifications}
                          onChange={() => toggleSetting('enableLikeNotifications')}
                          className="toggle-switch"
                        />
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <span>{content.settingsDialog?.commentNotification?.value || '评论通知'}</span>
                        <input
                          type="checkbox"
                          checked={settings.enableCommentNotifications}
                          onChange={() => toggleSetting('enableCommentNotifications')}
                          className="toggle-switch"
                        />
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <span>{content.settingsDialog?.followNotification?.value || '关注通知'}</span>
                        <input
                          type="checkbox"
                          checked={settings.enableFollowNotifications}
                          onChange={() => toggleSetting('enableFollowNotifications')}
                          className="toggle-switch"
                        />
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <span>{content.settingsDialog?.systemNotification?.value || '系统通知'}</span>
                        <input
                          type="checkbox"
                          checked={settings.enableSystemNotifications}
                          onChange={() => toggleSetting('enableSystemNotifications')}
                          className="toggle-switch"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3>{content.settingsDialog?.deliveryMethods?.value || '接收方式'}</h3>
                    <div className="setting-item">
                      <label>
                        <span>{content.settingsDialog?.emailNotification?.value || '邮件通知'}</span>
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={() => toggleSetting('emailNotifications')}
                          className="toggle-switch"
                        />
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <span>{content.settingsDialog?.pushNotification?.value || '推送通知'}</span>
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={() => toggleSetting('pushNotifications')}
                          className="toggle-switch"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-footer">
                  <button className="settings-btn cancel" onClick={() => setShowSettings(false)}>
                    {content.settingsDialog?.cancel?.value || '取消'}
                  </button>
                  <button 
                    className="settings-btn save" 
                    onClick={handleSaveSettings}
                    disabled={savingSettings}
                  >
                    {savingSettings ? (content.settingsDialog?.saving?.value || '保存中...') : (content.settingsDialog?.save?.value || '保存')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
