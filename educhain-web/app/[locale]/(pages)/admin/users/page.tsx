'use client';

import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import AdminNavbar from '../../../../../components/admin/AdminNavbar/AdminNavbar';
import UserDetailModal from '../../../../../components/admin/UserDetailModal/UserDetailModal';
import { request } from '../../../../../src/services/api';
import type { User } from '../../../../../src/types/api';
import './page.css';

interface PageData {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export default function AdminUsersPage() {
  const content = useIntlayer('admin-users');
  
  // 状态管理
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'ADMIN' | 'LEARNER'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active'>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const pageSize = 10;

  // 加载用户数据
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        
        let endpoint = '/users';
        const params: Record<string, string | number> = {
          page: currentPage,
          size: pageSize,
        };

        // 如果有搜索关键词，使用搜索接口
        if (searchQuery.trim()) {
          endpoint = '/users/search';
          params.keyword = searchQuery.trim();
        }

        const response = await request.get<PageData>(endpoint, params);
        
        if (response.success && response.data) {
          let filteredUsers = response.data.content;

          // 前端筛选角色
          if (roleFilter !== 'all') {
            filteredUsers = filteredUsers.filter(u => u.role === roleFilter);
          }

          // 前端筛选状态
          if (statusFilter === 'active') {
            filteredUsers = filteredUsers.filter(u => u.status === 1);
          }

          setUsers(filteredUsers);
          setTotalUsers(response.data.totalElements);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error('加载用户失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [currentPage, searchQuery, roleFilter, statusFilter]);

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
    total: totalUsers,
    active: users.filter(u => u.status === 1).length,
    newToday: users.filter(u => {
      const today = new Date().toDateString();
      const userDate = new Date(u.createdAt).toDateString();
      return today === userDate;
    }).length,
  };

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(0); // 重置到第一页
  };

  // 处理筛选
  const handleRoleFilter = (role: 'all' | 'ADMIN' | 'LEARNER') => {
    setRoleFilter(role);
    setCurrentPage(0);
  };

  const handleStatusFilter = (status: 'all' | 'active') => {
    setStatusFilter(status);
    setCurrentPage(0);
  };

  // 分页信息
  const startIndex = currentPage * pageSize + 1;
  const endIndex = Math.min((currentPage + 1) * pageSize, totalUsers);

  // 打开用户详情
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalMode('view');
    setIsModalOpen(true);
  };

  // 打开编辑用户
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedUser(null);
      setModalMode('view');
    }, 300);
  };

  // 保存用户
  const handleSaveUser = async (updatedUser: User) => {
    try {
      // 调用API更新用户
      const response = await request.put<User>(`/users/${updatedUser.id}`, updatedUser);
      
      if (response.success) {
        // 更新本地列表
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        // 重新加载数据以确保同步
        const loadResponse = await request.get<PageData>('/users', {
          page: currentPage,
          size: pageSize,
        });
        if (loadResponse.success && loadResponse.data) {
          setUsers(loadResponse.data.content);
        }
      }
    } catch (error) {
      console.error('保存用户失败:', error);
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
              {content.title?.value || '用户管理'}
            </h1>
            <p className="users-subtitle">
              {content.subtitle?.value || '管理平台用户和权限'}
            </p>
          </section>

          {/* 统计卡片 */}
          <section className="users-stats">
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up">
              <div className="stat-label">{content.totalUsers?.value || '总用户数'}</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up" style={{ animationDelay: '50ms' }}>
              <div className="stat-label">{content.activeUsers?.value || '活跃用户'}</div>
              <div className="stat-value">{stats.active}</div>
            </div>
            <div className="stat-card glass-light motion-hover-lift motion-slide-in-up" style={{ animationDelay: '100ms' }}>
              <div className="stat-label">{content.newToday?.value || '今日新增'}</div>
              <div className="stat-value">{stats.newToday}</div>
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
                  placeholder={String(content.searchPlaceholder?.value || '搜索用户名、邮箱...')}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <button
                className={`filter-btn ${roleFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleRoleFilter('all')}
              >
                {content.allUsers?.value || '全部用户'}
              </button>
              <button
                className={`filter-btn ${roleFilter === 'ADMIN' ? 'active' : ''}`}
                onClick={() => handleRoleFilter('ADMIN')}
              >
                {content.admins?.value || '管理员'}
              </button>
              <button
                className={`filter-btn ${roleFilter === 'LEARNER' ? 'active' : ''}`}
                onClick={() => handleRoleFilter('LEARNER')}
              >
                {content.learners?.value || '学习者'}
              </button>
              <button
                className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`}
                onClick={() => handleStatusFilter(statusFilter === 'active' ? 'all' : 'active')}
              >
                {content.activeOnly?.value || '仅活跃'}
              </button>
            </div>
          </section>

          {/* 用户表格 */}
          {loading ? (
            <div className="loading-state">
              {content.loading?.value || '加载中...'}
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <div className="empty-text">
                {searchQuery ? (content.noResults?.value || '未找到匹配的用户') : (content.noUsers?.value || '暂无用户')}
              </div>
            </div>
          ) : (
            <>
              <div className="users-table-container motion-slide-in-up">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>{content.avatar?.value || '头像'}</th>
                      <th>{content.username?.value || '用户名'}</th>
                      <th>{content.fullName?.value || '姓名'}</th>
                      <th>{content.email?.value || '邮箱'}</th>
                      <th>{content.school?.value || '学校'}</th>
                      <th>{content.role?.value || '角色'}</th>
                      <th>{content.level?.value || '等级'}</th>
                      <th>{content.status?.value || '状态'}</th>
                      <th>{content.createdAt?.value || '注册时间'}</th>
                      <th>{content.actions?.value || '操作'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-avatar-cell">
                            {user.avatarUrl ? (
                              <img 
                                src={user.avatarUrl} 
                                alt="" 
                                className="user-avatar-img"
                                loading="lazy"
                              />
                            ) : (
                              <div className="user-avatar-placeholder">
                                {user.fullName.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>{user.username}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.school || '-'}</td>
                        <td>
                          <span className={`role-badge ${user.role.toLowerCase()}`}>
                            {user.role === 'ADMIN' 
                              ? (content.admin?.value || '管理员')
                              : (content.learner?.value || '学习者')
                            }
                          </span>
                        </td>
                        <td>Lv.{user.level}</td>
                        <td>
                          <span className={`status-badge ${user.status === 1 ? 'active' : 'inactive'}`}>
                            {user.status === 1 
                              ? (content.active?.value || '正常')
                              : (content.inactive?.value || '禁用')
                            }
                          </span>
                        </td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn"
                              onClick={() => handleViewUser(user)}
                            >
                              {content.view?.value || '查看'}
                            </button>
                            <button 
                              className="action-btn"
                              onClick={() => handleEditUser(user)}
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
              <div className="pagination">
                <div className="pagination-info">
                  {content.showing?.value || '显示'} {startIndex} {content.to?.value || '至'} {endIndex} {content.of?.value || '共'} {totalUsers} {content.users?.value || '个用户'}
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

      {/* 用户详情弹窗 */}
      <UserDetailModal 
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        onSave={handleSaveUser}
      />
    </>
  );
}
