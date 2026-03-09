'use client';

import { useState, useEffect } from 'react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { getLocalizedUrl } from '@/lib/i18n-utils';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import { knowledgeService } from '@/services';
import type { KnowledgeItem } from '@/types';
import './page.css';

export default function UserDraftsPage() {
  const content = useIntlayer('user-drafts-page');
  const { locale } = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<KnowledgeItem[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean;
    type: 'delete' | 'publish';
    draftId: number | null;
  }>({
    show: false,
    type: 'delete',
    draftId: null,
  });

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      setLoading(true);
      const response = await knowledgeService.getUserDrafts({
        page: 0,
        size: 100,
      });

      if (response.success && response.data) {
        setDrafts(response.data.content || []);
      }
    } catch (error) {
      console.error('Failed to load drafts:', error);
      alert(String(content.messages.loadFailed.value || content.messages.loadFailed));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    router.push(getLocalizedUrl('/knowledge/create', locale));
  };

  const handleEdit = (draft: KnowledgeItem) => {
    if (draft.shareCode) {
      router.push(getLocalizedUrl(`/knowledge/edit/${draft.shareCode}`, locale));
    }
  };

  const handlePublish = async (draftId: number) => {
    try {
      const response = await knowledgeService.publishDraft(draftId);
      
      if (response.success && response.data) {
        alert(String(content.messages.publishSuccess.value || content.messages.publishSuccess));
        // 发布成功后跳转到详情页
        if (response.data.shareCode) {
          router.push(getLocalizedUrl(`/knowledge/${response.data.shareCode}`, locale));
        } else {
          // 如果没有 shareCode，重新加载草稿列表
          loadDrafts();
        }
      }
    } catch (error) {
      console.error('Failed to publish draft:', error);
      alert(String(content.messages.publishFailed.value || content.messages.publishFailed));
    } finally {
      setConfirmDialog({ show: false, type: 'delete', draftId: null });
    }
  };

  const handleDelete = async (draftId: number) => {
    try {
      const response = await knowledgeService.deleteKnowledge(draftId);
      
      if (response.success) {
        alert(String(content.messages.deleteSuccess.value || content.messages.deleteSuccess));
        // 从列表中移除已删除的草稿
        setDrafts(drafts.filter(draft => draft.id !== draftId));
      }
    } catch (error) {
      console.error('Failed to delete draft:', error);
      alert(String(content.messages.deleteFailed.value || content.messages.deleteFailed));
    } finally {
      setConfirmDialog({ show: false, type: 'delete', draftId: null });
    }
  };

  const showConfirmDialog = (type: 'delete' | 'publish', draftId: number) => {
    setConfirmDialog({ show: true, type, draftId });
  };

  const handleConfirm = () => {
    if (confirmDialog.draftId) {
      if (confirmDialog.type === 'delete') {
        handleDelete(confirmDialog.draftId);
      } else {
        handlePublish(confirmDialog.draftId);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return locale === 'zh-CN' ? `${minutes}分钟前` : `${minutes}m ago`;
      }
      return locale === 'zh-CN' ? `${hours}小时前` : `${hours}h ago`;
    } else if (days === 1) {
      return locale === 'zh-CN' ? '昨天' : 'Yesterday';
    } else if (days < 7) {
      return locale === 'zh-CN' ? `${days}天前` : `${days}d ago`;
    } else {
      return date.toLocaleDateString(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <>
      <Navbar />

      <div className="user-drafts-page">
        {/* 背景装饰 */}
        <div className="drafts-background">
          <div className="drafts-blob drafts-blob-1" />
          <div className="drafts-blob drafts-blob-2" />
        </div>

        {/* 页面头部 */}
        <section className="drafts-hero-section">
          <div className="hero-container">
            {/* 徽章 */}
            <div className="hero-badge glass-badge motion-scale-in">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{content.header.badge}</span>
            </div>

            {/* 标题 */}
            <h1 className="hero-title motion-slide-in-up motion-delay-100">
              <span className="hero-title-main text-gradient-orange">
                {content.header.title}
              </span>
              <span className="hero-title-sub">
                {content.header.subtitle}
              </span>
            </h1>

            {/* 描述 */}
            <p className="hero-description motion-slide-in-up motion-delay-150">
              {content.header.description}
            </p>

            {/* 创建按钮 */}
            <div className="hero-action motion-slide-in-up motion-delay-200">
              <button onClick={handleCreateNew} className="create-draft-btn motion-hover-lift">
                {content.actions.createNew}
              </button>
            </div>
          </div>
        </section>

        {/* 草稿列表 */}
        <div className="drafts-content">
          <div className="drafts-container">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>{content.loading}</p>
              </div>
            ) : drafts.length === 0 ? (
              <div className="empty-state glass-card">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3>{content.empty}</h3>
                <p>{content.emptyDescription}</p>
              </div>
            ) : (
              <div className="drafts-grid">
                {drafts.map((draft, index) => (
                  <div
                    key={draft.id}
                    className="draft-card glass-card motion-slide-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* 草稿头部 */}
                    <div className="draft-header">
                      <div className="draft-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <div className="draft-meta">
                        <div className="draft-time">
                          {content.draftCard.lastEdited} {formatDate(draft.updatedAt || draft.createdAt)}
                        </div>
                        <div className="draft-badge">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {content.draftCard.autoSaved}
                        </div>
                      </div>
                    </div>

                    {/* 草稿内容 */}
                    <div className="draft-content" onClick={() => handleEdit(draft)}>
                      <h3 className={`draft-title ${!draft.title?.trim() ? 'untitled' : ''}`}>
                        {draft.title?.trim() || content.draftCard.untitled}
                      </h3>
                      <p className={`draft-preview ${!draft.content?.trim() ? 'empty' : ''}`}>
                        {draft.content?.trim() ? stripHtml(draft.content) : content.draftCard.noContent}
                      </p>
                    </div>

                    {/* 草稿操作 */}
                    <div className="draft-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(draft);
                        }}
                        className="draft-action-btn secondary"
                      >
                        {content.actions.editDraft}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showConfirmDialog('publish', draft.id);
                        }}
                        className="draft-action-btn primary"
                      >
                        {content.actions.publishDraft}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showConfirmDialog('delete', draft.id);
                        }}
                        className="draft-action-btn danger"
                      >
                        {content.actions.deleteDraft}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 确认对话框 */}
      {confirmDialog.show && (
        <div className="confirm-dialog-overlay" onClick={() => setConfirmDialog({ show: false, type: 'delete', draftId: null })}>
          <div className="confirm-dialog glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <div className={`dialog-icon ${confirmDialog.type === 'delete' ? 'danger' : 'warning'}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {confirmDialog.type === 'delete' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>
              <h3 className="dialog-title">
                {confirmDialog.type === 'delete' ? content.deleteConfirm.title : content.publishConfirm.title}
              </h3>
            </div>
            <p className="dialog-message">
              {confirmDialog.type === 'delete' ? content.deleteConfirm.message : content.publishConfirm.message}
            </p>
            <div className="dialog-actions">
              <button
                onClick={() => setConfirmDialog({ show: false, type: 'delete', draftId: null })}
                className="dialog-btn cancel"
              >
                {content.actions.cancelDelete}
              </button>
              <button
                onClick={handleConfirm}
                className="dialog-btn confirm"
              >
                {confirmDialog.type === 'delete' ? content.actions.confirmDelete : content.actions.publishDraft}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
