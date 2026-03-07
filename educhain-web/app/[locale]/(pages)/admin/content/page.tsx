'use client';

import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLocalizedUrl } from '@/lib/i18n-utils';
import AdminNavbar from '../../../../../components/admin/AdminNavbar/AdminNavbar';
import { request } from '../../../../../src/services/api';
import type { KnowledgeItem } from '../../../../../src/types/api';
import './page.css';

interface PageData {
  content: KnowledgeItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export default function AdminContentPage() {
  const content = useIntlayer('admin-content');
  const { locale } = useLocale();
  const router = useRouter();
  
  // 状态管理
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | number>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  // 加载内容数据
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        let endpoint = '/knowledge';
        const params: Record<string, string | number> = {
          page: currentPage,
          size: pageSize,
        };

        // 如果有搜索关键词
        if (searchQuery.trim()) {
          params.keyword = searchQuery.trim();
        }

        // 如果有状态筛选
        if (statusFilter !== 'all') {
          params.status = statusFilter;
        }

        const response = await request.get<PageData>(endpoint, params);
        
        if (response.success && response.data) {
          setKnowledgeItems(response.data.content);
          setTotalItems(response.data.totalElements);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error('加载内容失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentPage, searchQuery, statusFilter]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 格式化数字
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toString();
  };

  // 统计数据
  const stats = {
    total: totalItems,
    published: knowledgeItems.filter(k => k.status === 1).length,
    pending: knowledgeItems.filter(k => k.status === 0).length,
  };

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(0);
  };

  // 处理筛选
  const handleStatusFilter = (status: 'all' | number) => {
    setStatusFilter(status);
    setCurrentPage(0);
  };

  // 获取状态文本
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return content.draft?.value || '草稿';
      case 1:
        return content.publishedStatus?.value || '已发布';
      case 2:
        return content.review?.value || '审核中';
      case -1:
        return content.rejected?.value || '已拒绝';
      default:
        return status.toString();
    }
  };

  // 获取状态样式类
  const getStatusClass = (status: number) => {
    switch (status) {
      case 1:
        return 'active';
      case 2:
        return 'learner';
      case 0:
        return 'inactive';
      case -1:
        return 'inactive';
      default:
        return '';
    }
  };

  // 分页信息
  const startIndex = currentPage * pageSize + 1;
  const endIndex = Math.min((currentPage + 1) * pageSize, totalItems);

  // 查看知识详情
  const handleViewKnowledge = (item: KnowledgeItem) => {
    // 使用分享码跳转到知识详情页
    if (item.shareCode) {
      router.push(getLocalizedUrl(`/knowledge/${item.shareCode}`, locale));
    } else {
      console.error('知识条目缺少分享码');
    }
  };

  return (
    <>
      <AdminNavbar />
      
      <div className="admin-users-page motion-fade-in">
        <div className="users-content">
          {/* 页头 */}
          <section className="users-header motion-slide-in-up">
            <h1 className="users-title">
              {content.title?.value || '内容管理'}
            </h1>
            <p className="users-subtitle">
              {content.subtitle?.value || '管理平台知识内容和审核'}
            </p>
          </section>

          {/* 统计卡片 */}
          <section className="users-stats">
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up">
              <div className="stat-label">{content.totalContent?.value || '总内容数'}</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up" style={{ animationDelay: '50ms' }}>
              <div className="stat-label">{content.published?.value || '已发布'}</div>
              <div className="stat-value">{stats.published}</div>
            </div>
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up" style={{ animationDelay: '100ms' }}>
              <div className="stat-label">{content.pending?.value || '待审核'}</div>
              <div className="stat-value">{stats.pending}</div>
            </div>
          </section>

          {/* 搜索和筛选 */}
          <section className="users-controls motion-slide-in-up">
            <div className="search-box">
              <div className="search-input-wrapper">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={String(content.searchPlaceholder?.value || '搜索标题、作者...')}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <button
                className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleStatusFilter('all')}
              >
                {content.allContent?.value || '全部内容'}
              </button>
              <button
                className={`filter-btn ${statusFilter === 1 ? 'active' : ''}`}
                onClick={() => handleStatusFilter(1)}
              >
                {content.publishedOnly?.value || '已发布'}
              </button>
              <button
                className={`filter-btn ${statusFilter === 2 ? 'active' : ''}`}
                onClick={() => handleStatusFilter(2)}
              >
                {content.pendingReview?.value || '待审核'}
              </button>
              <button
                className={`filter-btn ${statusFilter === 0 ? 'active' : ''}`}
                onClick={() => handleStatusFilter(0)}
              >
                {content.drafts?.value || '草稿'}
              </button>
            </div>
          </section>

          {/* 内容表格 */}
          {loading ? (
            <div className="loading-state">
              {content.loading?.value || '加载中...'}
            </div>
          ) : knowledgeItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <div className="empty-text">
                {searchQuery ? (content.noResults?.value || '未找到匹配的内容') : (content.noContent?.value || '暂无内容')}
              </div>
            </div>
          ) : (
            <>
              <div className="users-table-container motion-slide-in-up">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>{content.title_col?.value || '标题'}</th>
                      <th>{content.author?.value || '作者'}</th>
                      <th>{content.category?.value || '分类'}</th>
                      <th>{content.views?.value || '浏览量'}</th>
                      <th>{content.likes?.value || '点赞'}</th>
                      <th>{content.status?.value || '状态'}</th>
                      <th>{content.createdAt?.value || '创建时间'}</th>
                      <th>{content.actions?.value || '操作'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {knowledgeItems.map((item) => (
                      <tr key={item.id}>
                        <td style={{ maxWidth: '300px' }}>
                          <div style={{ 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap',
                            fontWeight: 500,
                          }}>
                            {item.title}
                          </div>
                        </td>
                        <td>{item.uploader?.fullName || item.uploaderName || '-'}</td>
                        <td>{item.category?.name || item.categoryName || '-'}</td>
                        <td>{formatNumber(item.stats?.viewCount || 0)}</td>
                        <td>{formatNumber(item.stats?.likeCount || 0)}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn"
                              onClick={() => handleViewKnowledge(item)}
                            >
                              {content.view?.value || '查看'}
                            </button>
                            {item.status === 2 && (
                              <button className="action-btn">
                                {content.approve?.value || '通过'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 分页 */}
              <div className="pagination">
                <div className="pagination-info">
                  {content.showing?.value || '显示'} {startIndex} {content.to?.value || '至'} {endIndex} {content.of?.value || '共'} {totalItems} {content.items?.value || '条内容'}
                </div>
                <div className="pagination-buttons">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                  >
                    {content.previous?.value || '上一页'}
                  </button>
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage >= totalPages - 1}
                  >
                    {content.next?.value || '下一页'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
