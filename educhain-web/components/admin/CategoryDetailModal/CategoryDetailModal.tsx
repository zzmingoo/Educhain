'use client';

import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import type { Category } from '../../../src/types/api';
import './CategoryDetailModal.css';

interface CategoryDetailModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  mode?: 'view' | 'edit';
  onSave?: (category: Category) => void;
  allCategories?: Category[]; // 用于选择父分类
}

export default function CategoryDetailModal({ 
  category, 
  isOpen, 
  onClose, 
  mode = 'view',
  onSave,
  allCategories = []
}: CategoryDetailModalProps) {
  const content = useIntlayer('category-detail-modal');
  const [isEditMode, setIsEditMode] = useState(mode === 'edit');
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 初始化编辑数据
  useEffect(() => {
    if (category) {
      setEditedCategory({ ...category });
    }
    setIsEditMode(mode === 'edit');
  }, [category, mode]);

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  if (!isOpen || !category || !editedCategory) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleClose = () => {
    setIsEditMode(false);
    setEditedCategory(category);
    onClose();
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedCategory({ ...category });
  };

  const handleSave = async () => {
    if (!editedCategory || !onSave) return;
    
    setIsSaving(true);
    try {
      await onSave(editedCategory);
      setIsEditMode(false);
      onClose();
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof Category, value: string | number | null | undefined) => {
    if (editedCategory) {
      setEditedCategory({ ...editedCategory, [field]: value });
    }
  };

  // 获取父分类名称
  const getParentCategoryName = (parentId: number | undefined) => {
    if (!parentId) return content.noParent?.value || content.noParent || '无（根分类）';
    const parent = allCategories.find(c => c.id === parentId);
    return parent?.name || '-';
  };

  // 可选择的父分类（排除自己和自己的子分类）
  const availableParentCategories = allCategories.filter(c => c.id !== category.id);

  return (
    <div className="category-modal-overlay" onClick={handleClose}>
      <div className="category-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button className="category-modal-close" onClick={handleClose} aria-label="关闭">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 头部 */}
        <div className="category-modal-header">
          <h2 className="category-modal-title">
            {isEditMode 
              ? (content.editTitle?.value || content.editTitle || '编辑分类')
              : (content.viewTitle?.value || content.viewTitle || '分类详情')
            }
          </h2>
        </div>

        {/* 主体 */}
        <div className="category-modal-body">
          {/* 基本信息 */}
          <div className="category-info-section">
            <h3 className="category-section-title">
              {content.basicInfo?.value || content.basicInfo || '基本信息'}
            </h3>
            
            <div className="category-form-group">
              <label className="category-form-label">
                {content.categoryName?.value || content.categoryName || '分类名称'}
              </label>
              {isEditMode ? (
                <input
                  type="text"
                  className="category-form-input"
                  value={editedCategory.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder={String(content.namePlaceholder?.value || content.namePlaceholder || '请输入分类名称')}
                />
              ) : (
                <div className="category-form-value">{category.name}</div>
              )}
            </div>

            <div className="category-form-group">
              <label className="category-form-label">
                {content.description?.value || content.description || '分类描述'}
              </label>
              {isEditMode ? (
                <textarea
                  className="category-form-textarea"
                  value={editedCategory.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder={String(content.descriptionPlaceholder?.value || content.descriptionPlaceholder || '请输入分类描述')}
                  rows={3}
                />
              ) : (
                <div className="category-form-value">{category.description || '-'}</div>
              )}
            </div>

            <div className="category-form-group">
              <label className="category-form-label">
                {content.parentCategory?.value || content.parentCategory || '父分类'}
              </label>
              {isEditMode ? (
                <select
                  className="category-form-select"
                  value={editedCategory.parentId || ''}
                  onChange={(e) => updateField('parentId', e.target.value ? Number(e.target.value) : undefined)}
                >
                  <option value="">{content.noParent?.value || content.noParent || '无（根分类）'}</option>
                  {availableParentCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              ) : (
                <div className="category-form-value">{getParentCategoryName(category.parentId)}</div>
              )}
            </div>

            <div className="category-form-group">
              <label className="category-form-label">
                {content.sortOrder?.value || content.sortOrder || '排序'}
              </label>
              {isEditMode ? (
                <input
                  type="number"
                  className="category-form-input"
                  value={editedCategory.sortOrder}
                  onChange={(e) => updateField('sortOrder', Number(e.target.value))}
                  min="0"
                />
              ) : (
                <div className="category-form-value">{category.sortOrder}</div>
              )}
            </div>
          </div>

          {/* 统计信息 */}
          <div className="category-info-section">
            <h3 className="category-section-title">
              {content.statistics?.value || content.statistics || '统计信息'}
            </h3>
            <div className="category-stats-grid">
              <div className="category-stat-item">
                <div className="category-stat-value">{category.knowledgeCount || 0}</div>
                <div className="category-stat-label">
                  {content.knowledgeCount?.value || content.knowledgeCount || '知识数量'}
                </div>
              </div>
            </div>
          </div>

          {/* 时间信息 */}
          <div className="category-info-section">
            <h3 className="category-section-title">
              {content.timeInfo?.value || content.timeInfo || '时间信息'}
            </h3>
            
            <div className="category-form-group">
              <label className="category-form-label">
                {content.createdAt?.value || content.createdAt || '创建时间'}
              </label>
              <div className="category-form-value">{formatDate(category.createdAt)}</div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="category-modal-footer">
          {isEditMode ? (
            <>
              <button 
                className="category-modal-btn category-modal-btn-secondary" 
                onClick={handleCancel} 
                disabled={isSaving}
              >
                {content.cancel?.value || content.cancel || '取消'}
              </button>
              <button 
                className="category-modal-btn category-modal-btn-primary" 
                onClick={handleSave} 
                disabled={isSaving}
              >
                {isSaving 
                  ? (content.saving?.value || content.saving || '保存中...') 
                  : (content.save?.value || content.save || '保存')
                }
              </button>
            </>
          ) : (
            <>
              <button 
                className="category-modal-btn category-modal-btn-secondary" 
                onClick={handleClose}
              >
                {content.close?.value || content.close || '关闭'}
              </button>
              <button 
                className="category-modal-btn category-modal-btn-primary" 
                onClick={handleEdit}
              >
                {content.edit?.value || content.edit || '编辑分类'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
