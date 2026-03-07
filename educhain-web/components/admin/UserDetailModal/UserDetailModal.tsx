'use client';

import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import type { User } from '../../../src/types/api';
import './UserDetailModal.css';

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  mode?: 'view' | 'edit';
  onSave?: (user: User) => void;
}

export default function UserDetailModal({ 
  user, 
  isOpen, 
  onClose, 
  mode = 'view',
  onSave 
}: UserDetailModalProps) {
  const content = useIntlayer('user-detail-modal');
  const [isEditMode, setIsEditMode] = useState(mode === 'edit');
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 初始化编辑数据
  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
    setIsEditMode(mode === 'edit');
  }, [user, mode]);

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

  if (!isOpen || !user || !editedUser) return null;

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
    setEditedUser(user);
    onClose();
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    if (!editedUser || !onSave) return;
    
    setIsSaving(true);
    try {
      await onSave(editedUser);
      setIsEditMode(false);
      onClose();
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof User, value: string | number) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button className="modal-close" onClick={handleClose} aria-label="关闭">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 用户头像和基本信息 */}
        <div className="modal-header">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.fullName} className="modal-avatar" />
          ) : (
            <div className="modal-avatar-placeholder">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="modal-header-info">
            <h2 className="modal-title">{user.fullName}</h2>
            <p className="modal-username">@{user.username}</p>
          </div>
          <span className={`role-badge ${user.role.toLowerCase()}`}>
            {user.role === 'ADMIN' 
              ? (content.admin?.value || content.admin || '管理员')
              : (content.learner?.value || content.learner || '学习者')
            }
          </span>
        </div>

        {/* 详细信息 */}
        <div className="modal-body">
          <div className="info-section">
            <h3 className="section-title">
              {content.basicInfo?.value || content.basicInfo || '基本信息'}
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">
                  {content.email?.value || content.email || '邮箱'}
                </span>
                {isEditMode ? (
                  <input
                    type="email"
                    className="info-input"
                    value={editedUser.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                ) : (
                  <span className="info-value">{user.email}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">
                  {content.school?.value || content.school || '学校'}
                </span>
                {isEditMode ? (
                  <input
                    type="text"
                    className="info-input"
                    value={editedUser.school || ''}
                    onChange={(e) => updateField('school', e.target.value)}
                    placeholder="请输入学校"
                  />
                ) : (
                  <span className="info-value">{user.school || '-'}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">
                  {content.level?.value || content.level || '等级'}
                </span>
                {isEditMode ? (
                  <input
                    type="number"
                    className="info-input"
                    value={editedUser.level}
                    onChange={(e) => updateField('level', Number(e.target.value))}
                    min="1"
                    max="10"
                  />
                ) : (
                  <span className="info-value">Lv.{user.level}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">
                  {content.status?.value || content.status || '状态'}
                </span>
                {isEditMode ? (
                  <select
                    className="info-select"
                    value={editedUser.status}
                    onChange={(e) => updateField('status', Number(e.target.value))}
                  >
                    <option value={1}>{content.active?.value || content.active || '正常'}</option>
                    <option value={0}>{content.inactive?.value || content.inactive || '禁用'}</option>
                  </select>
                ) : (
                  <span className={`status-badge ${user.status === 1 ? 'active' : 'inactive'}`}>
                    {user.status === 1 
                      ? (content.active?.value || content.active || '正常')
                      : (content.inactive?.value || content.inactive || '禁用')
                    }
                  </span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">
                  {content.createdAt?.value || content.createdAt || '注册时间'}
                </span>
                <span className="info-value">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3 className="section-title">
              {content.bio?.value || content.bio || '个人简介'}
            </h3>
            {isEditMode ? (
              <textarea
                className="bio-textarea"
                value={editedUser.bio || ''}
                onChange={(e) => updateField('bio', e.target.value)}
                placeholder="请输入个人简介"
                rows={4}
              />
            ) : user.bio ? (
              <p className="bio-text">{user.bio}</p>
            ) : (
              <p className="bio-text" style={{ color: 'var(--color-text-tertiary)' }}>暂无个人简介</p>
            )}
          </div>

          <div className="info-section">
            <h3 className="section-title">
              {content.statistics?.value || content.statistics || '统计数据'}
            </h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{user.followerCount || 0}</div>
                <div className="stat-label">
                  {content.followers?.value || content.followers || '粉丝'}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.followingCount || 0}</div>
                <div className="stat-label">
                  {content.following?.value || content.following || '关注'}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.knowledgeCount || 0}</div>
                <div className="stat-label">
                  {content.knowledge?.value || content.knowledge || '知识'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="modal-footer">
          {isEditMode ? (
            <>
              <button className="modal-btn modal-btn-secondary" onClick={handleCancel} disabled={isSaving}>
                {content.cancel?.value || content.cancel || '取消'}
              </button>
              <button className="modal-btn modal-btn-primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (content.saving?.value || content.saving || '保存中...') : (content.save?.value || content.save || '保存')}
              </button>
            </>
          ) : (
            <>
              <button className="modal-btn modal-btn-secondary" onClick={handleClose}>
                {content.close?.value || content.close || '关闭'}
              </button>
              <button className="modal-btn modal-btn-primary" onClick={handleEdit}>
                {content.edit?.value || content.edit || '编辑用户'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
