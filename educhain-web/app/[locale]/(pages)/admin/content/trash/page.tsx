'use client';

import { useIntlayer } from 'next-intlayer';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/../components/admin/AdminNavbar/AdminNavbar';
import { ConfirmDialog } from '@/../components/common';
import { knowledgeService } from '@/services/knowledge';
import { useErrorHandler, useConfirmDialog } from '@/hooks';
import type { KnowledgeItem } from '@/types/api';
import './page.css';

export default function AdminTrashPage() {
  const content = useIntlayer('admin-trash');
  const router = useRouter();
  const { handleError, handleSuccess } = useErrorHandler();
  const { dialogState, isLoading: dialogLoading, confirm, handleConfirm, handleCancel } = useConfirmDialog();

  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // 加载已删除的内容
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const params: any = {
          page: currentPage,
          size: 20,
          status: -2, // -2 表示已删除
        };

        if (searchQuery) {
          params.keyword = searchQuery;
        }

        const response = await knowledgeService.getKnowledgeList(params);
        if (response.success && response.data) {
          setKnowledgeItems(response.data.content || []);
          setTotalPages(response.data.totalPages || 0);
          setTotalItems(response.data.totalElements || 0);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentPage, searchQuery, handleError]);

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 全选/取消全选
  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds([]);
      setIsAllSelected(false);
    } else {
      setSelectedIds(knowledgeItems.map(item => item.id));
      setIsAllSelected(true);
    }
  }, [isAllSelected, knowledgeItems]);

  // 单选
  const handleSelectItem = useCallback((id: number) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        const newIds = prev.filter(itemId => itemId !== id);
        setIsAllSelected(false);
        return newIds;
      } else {
        const newIds = [...prev, id];
        setIsAllSelected(newIds.length === knowledgeItems.length);
        return newIds;
      }
    });
  }, [knowledgeItems.length]);

  // 恢复单个内容
  const handleRestore = useCallback(async (id: number) => {
    const confirmed = await confirm({
      title: String(content.confirmRestore.title.value),
      message: String(content.confirmRestore.message.value),
      confirmText: String(content.confirmRestore.confirm.value),
      cancelText: String(content.confirmRestore.cancel.value),
      variant: 'info',
    });

    if (!confirmed) return;

    try {
      await knowledgeService.restoreKnowledge(id);
      setKnowledgeItems(prev => prev.filter(item => item.id !== id));
      setSelectedIds(prev => prev.filter(itemId => itemId !== id));
      handleSuccess(String(content.messages.restoreSuccess.value));
    } catch (error) {
      handleError(error);
    }
  }, [confirm, content, handleSuccess, handleError]);

  // 彻底删除单个内容
  const handlePermanentDelete = useCallback(async (id: number) => {
    const confirmed = await confirm({
      title: String(content.confirmDelete.title.value),
      message: String(content.confirmDelete.message.value),
      confirmText: String(content.confirmDelete.confirm.value),
      cancelText: String(content.confirmDelete.cancel.value),
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      await knowledgeService.deleteKnowledge(id);
      setKnowledgeItems(prev => prev.filter(item => item.id !== id));
      setSelectedIds(prev => prev.filter(itemId => itemId !== id));
      handleSuccess(String(content.messages.deleteSuccess.value));
    } catch (error) {
      handleError(error);
    }
  }, [confirm, content, handleSuccess, handleError]);

  // 清空回收站
  const handleEmptyTrash = useCallback(async () => {
    if (knowledgeItems.length === 0) return;

    const confirmed = await confirm({
      title: String(content.confirmEmptyTrash.title.value),
      message: String(content.confirmEmptyTrash.message.value),
      confirmText: String(content.confirmEmptyTrash.confirm.value),
      cancelText: String(content.confirmEmptyTrash.cancel.value),
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      const allIds = knowledgeItems.map(item => item.id);
      await knowledgeService.batchDeleteKnowledge(allIds);
      setKnowledgeItems([]);
      setSelectedIds([]);
      setIsAllSelected(false);
      handleSuccess(String(content.messages.emptyTrashSuccess.value));
    } catch (error) {
      handleError(error);
    }
  }, [knowledgeItems, confirm, content, handleSuccess, handleError]);

  // 搜索处理
  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(0);
  }, []);

  return (
    <>
      <AdminNavbar />
      
      <div className="admin-trash-page">
        <div className="admin-content">
          {/* 页面头部 */}
          <section className="page-header">
            <div className="header-content">
              <button 
                className="back-btn"
                onClick={() => router.push('/admin/content')}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {content.backToContent.value}
              </button>
              <div className="header-text">
                <h1 className="page-title">{content.title.value}</h1>
                <p className="page-subtitle">{content.subtitle.value}</p>
              </div>
            </div>
            <div className="header-stats">
              <span className="stat-item">
                {content.stats.total.value}: <strong>{totalItems}</strong> {content.stats.items.value}
              </span>
            </div>
          </section>

          {/* 工具栏 */}
          <section className="toolbar glass-light">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder={String(content.searchPlaceholder.value)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <button 
              className="action-btn danger"
              onClick={handleEmptyTrash}
              disabled={knowledgeItems.length === 0}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {content.emptyTrash.value}
            </button>
          </section>

          {/* 内容列表 */}
          {loading ? (
            <div className="loading-state glass-light">
              <div className="loading-spinner"></div>
              <p>{content.loading.value}</p>
            </div>
          ) : knowledgeItems.length > 0 ? (
            <section className="content-table-section glass-light">
              <div className="table-wrapper">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th className="checkbox-cell">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                          className="checkbox"
                        />
                      </th>
                      <th>{content.title_column.value}</th>
                      <th>{content.author.value}</th>
                      <th>{content.category.value}</th>
                      <th>{content.deletedAt.value}</th>
                      <th>{content.actions.value}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {knowledgeItems.map((item) => (
                      <tr key={item.id} className={selectedIds.includes(item.id) ? 'selected' : ''}>
                        <td className="checkbox-cell">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="checkbox"
                          />
                        </td>
                        <td className="title-cell">
                          <div className="title-content">
                            <span className="title-text">{item.title}</span>
                          </div>
                        </td>
                        <td>{item.uploaderName || '-'}</td>
                        <td>{item.categoryName || '-'}</td>
                        <td>{formatDate(item.updatedAt)}</td>
                        <td className="actions-cell">
                          <div className="action-buttons">
                            <button 
                              className="action-btn primary"
                              onClick={() => handleRestore(item.id)}
                            >
                              {content.restore.value}
                            </button>
                            <button 
                              className="action-btn danger"
                              onClick={() => handlePermanentDelete(item.id)}
                            >
                              {content.permanentDelete.value}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 分页 */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                  >
                    {content.prevPage.value}
                  </button>
                  <span className="page-info">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    className="page-btn"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage >= totalPages - 1}
                  >
                    {content.nextPage.value}
                  </button>
                </div>
              )}
            </section>
          ) : (
            <div className="empty-state glass-light">
              <div className="empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="empty-title">{content.noContent.value}</h3>
              <p className="empty-description">{content.noContentDesc.value}</p>
            </div>
          )}
        </div>
      </div>

      {/* 确认对话框 */}
      <ConfirmDialog
        state={dialogState}
        isLoading={dialogLoading}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
