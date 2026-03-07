'use client';

import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import AdminNavbar from '../../../../../components/admin/AdminNavbar/AdminNavbar';
import CategoryDetailModal from '../../../../../components/admin/CategoryDetailModal/CategoryDetailModal';
import { request } from '../../../../../src/services/api';
import type { Category } from '../../../../../src/types/api';
import './page.css';

export default function AdminCategoriesPage() {
  const content = useIntlayer('admin-categories');
  
  // 状态管理
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'root' | 'sub'>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const pageSize = 10;

  // 加载分类数据
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        
        const response = await request.get<Category[]>('/categories');
        
        if (response.success && response.data) {
          let filteredCategories = response.data;

          // 搜索筛选
          if (searchQuery.trim()) {
            filteredCategories = filteredCategories.filter(cat =>
              cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              cat.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          // 类型筛选
          if (typeFilter === 'root') {
            filteredCategories = filteredCategories.filter(cat => !cat.parentId);
          } else if (typeFilter === 'sub') {
            filteredCategories = filteredCategories.filter(cat => cat.parentId);
          }

          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error('加载分类失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [searchQuery, typeFilter]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 统计数据
  const stats = {
    total: categories.length,
    root: categories.filter(c => !c.parentId).length,
    sub: categories.filter(c => c.parentId).length,
  };

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(0);
  };

  // 处理筛选
  const handleTypeFilter = (type: 'all' | 'root' | 'sub') => {
    setTypeFilter(type);
    setCurrentPage(0);
  };

  // 获取父分类名称
  const getParentName = (parentId?: number) => {
    if (!parentId) return content.rootCategory?.value || '根分类';
    const parent = categories.find(c => c.id === parentId);
    return parent?.name || '-';
  };

  // 分页
  const totalPages = Math.ceil(categories.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, categories.length);
  const paginatedCategories = categories.slice(startIndex, endIndex);

  // 查看分类详情
  const handleViewCategory = (category: Category) => {
    setSelectedCategory(category);
    setModalMode('view');
    setIsModalOpen(true);
  };

  // 编辑分类
  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedCategory(null);
      setModalMode('view');
    }, 300);
  };

  // 保存分类
  const handleSaveCategory = async (updatedCategory: Category) => {
    try {
      // 调用API更新分类
      const response = await request.put<Category>(`/categories/${updatedCategory.id}`, updatedCategory);
      
      if (response.success) {
        // 更新本地列表
        setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
        // 重新加载数据以确保同步
        const loadResponse = await request.get<Category[]>('/categories');
        if (loadResponse.success && loadResponse.data) {
          setCategories(loadResponse.data);
        }
      }
    } catch (error) {
      console.error('保存分类失败:', error);
      throw error;
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
              {content.title?.value || '分类管理'}
            </h1>
            <p className="users-subtitle">
              {content.subtitle?.value || '管理知识分类和层级结构'}
            </p>
          </section>

          {/* 统计卡片 */}
          <section className="users-stats">
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up">
              <div className="stat-label">{content.totalCategories?.value || '总分类数'}</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up" style={{ animationDelay: '50ms' }}>
              <div className="stat-label">{content.rootCategories?.value || '根分类'}</div>
              <div className="stat-value">{stats.root}</div>
            </div>
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up" style={{ animationDelay: '100ms' }}>
              <div className="stat-label">{content.subCategories?.value || '子分类'}</div>
              <div className="stat-value">{stats.sub}</div>
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
                  placeholder={String(content.searchPlaceholder?.value || '搜索分类名称...')}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <button
                className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleTypeFilter('all')}
              >
                {content.allCategories?.value || '全部分类'}
              </button>
              <button
                className={`filter-btn ${typeFilter === 'root' ? 'active' : ''}`}
                onClick={() => handleTypeFilter('root')}
              >
                {content.rootOnly?.value || '仅根分类'}
              </button>
              <button
                className={`filter-btn ${typeFilter === 'sub' ? 'active' : ''}`}
                onClick={() => handleTypeFilter('sub')}
              >
                {content.subOnly?.value || '仅子分类'}
              </button>
            </div>
          </section>

          {/* 分类表格 */}
          {loading ? (
            <div className="loading-state">
              {content.loading?.value || '加载中...'}
            </div>
          ) : paginatedCategories.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <div className="empty-text">
                {searchQuery ? (content.noResults?.value || '未找到匹配的分类') : (content.noCategories?.value || '暂无分类')}
              </div>
            </div>
          ) : (
            <>
              <div className="users-table-container motion-slide-in-up">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>{content.name?.value || '分类名称'}</th>
                      <th>{content.description?.value || '描述'}</th>
                      <th>{content.parent?.value || '父分类'}</th>
                      <th>{content.knowledgeCount?.value || '内容数量'}</th>
                      <th>{content.sortOrder?.value || '排序'}</th>
                      <th>{content.createdAt?.value || '创建时间'}</th>
                      <th>{content.actions?.value || '操作'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCategories.map((category) => (
                      <tr key={category.id}>
                        <td>
                          <div style={{ fontWeight: 500 }}>
                            {category.name}
                          </div>
                        </td>
                        <td style={{ maxWidth: '300px' }}>
                          <div style={{ 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap',
                          }}>
                            {category.description || '-'}
                          </div>
                        </td>
                        <td>
                          <span className={`role-badge ${category.parentId ? 'learner' : 'admin'}`}>
                            {getParentName(category.parentId)}
                          </span>
                        </td>
                        <td>{category.knowledgeCount || 0}</td>
                        <td>{category.sortOrder}</td>
                        <td>{formatDate(category.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn"
                              onClick={() => handleViewCategory(category)}
                            >
                              {content.view?.value || '查看'}
                            </button>
                            <button 
                              className="action-btn"
                              onClick={() => handleEditCategory(category)}
                            >
                              {content.edit?.value || '编辑'}
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
                  <div className="pagination-info">
                    {content.showing?.value || '显示'} {startIndex + 1} {content.to?.value || '至'} {endIndex} {content.of?.value || '共'} {categories.length} {content.categories?.value || '个分类'}
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
              )}
            </>
          )}
        </div>
      </div>

      {/* 分类详情弹窗 */}
      <CategoryDetailModal 
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        onSave={handleSaveCategory}
        allCategories={categories}
      />
    </>
  );
}
