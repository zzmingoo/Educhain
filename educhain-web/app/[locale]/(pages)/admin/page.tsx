'use client';

import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../src/contexts/auth-context';
import AdminNavbar from '../../../../components/admin/AdminNavbar/AdminNavbar';
import {
  getAdminStats,
  getAdminActivities,
  getSystemStatus,
  type AdminStats,
  type AdminActivity,
  type SystemStatus,
} from '../../../../src/services/admin';
import './page.css';

export default function AdminDashboard() {
  const content = useIntlayer('admin-dashboard');
  const { user } = useAuth();

  // 状态管理
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsRes, activitiesRes, statusRes] = await Promise.all([
          getAdminStats(),
          getAdminActivities(10),
          getSystemStatus(),
        ]);

        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }
        if (activitiesRes.success && activitiesRes.data) {
          setActivities(activitiesRes.data);
        }
        if (statusRes.success && statusRes.data) {
          setSystemStatus(statusRes.data);
        }
      } catch (error) {
        console.error('加载管理员数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 统计卡片配置
  const statsCards = stats ? [
    {
      label: content.stats.totalUsers?.value || '总用户数',
      value: stats.totalUsers.toLocaleString(),
      change: `活跃 ${stats.activeUsers.toLocaleString()}`,
      positive: true,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    },
    {
      label: content.stats.totalKnowledge?.value || '知识条目',
      value: stats.totalKnowledge.toLocaleString(),
      change: `${stats.pendingReview} 待审核`,
      positive: true,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    },
    {
      label: content.stats.totalViews?.value || '总浏览量',
      value: stats.totalViews.toLocaleString(),
      change: `今日 ${stats.todayViews.toLocaleString()}`,
      positive: true,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
      label: content.stats.blockchainCerts?.value || '区块链存证',
      value: stats.blockchainCerts.toLocaleString(),
      change: `今日 +${stats.todayCerts}`,
      positive: true,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    },
  ] : [];

  const quickActions = [
    {
      label: content.quickActions.userManagement?.value || '用户管理',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      color: '#3b82f6',
    },
    {
      label: content.quickActions.contentReview?.value || '内容审核',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#10b981',
    },
    {
      label: content.quickActions.categoryManagement?.value || '分类管理',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
      color: '#ec4899',
    },
    {
      label: content.quickActions.systemSettings?.value || '系统设置',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: '#f59e0b',
    },
    {
      label: content.quickActions.viewLogs?.value || '查看日志',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      color: '#8b5cf6',
    },
    {
      label: content.quickActions.blockchainMonitor?.value || '区块链监控',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      color: '#06b6d4',
    },
  ];

  // 加载状态
  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="admin-dashboard">
          <div className="admin-content">
            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgb(var(--color-text-secondary))' }}>
              加载中...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      
      <div className="admin-dashboard motion-fade-in">
        <div className="admin-content">
          {/* 欢迎区域 */}
          <section className="welcome-section motion-slide-in-up">
            <h1 className="welcome-title">
              {content.welcome?.value || '欢迎回来'}, {user?.username || 'Admin'}
            </h1>
            <p className="welcome-subtitle">
              {content.subtitle?.value || '系统概览与数据统计'}
            </p>
          </section>

          {/* 统计卡片 */}
          <section className="stats-grid">
            {statsCards.map((stat, index) => (
              <div 
                key={index}
                className="stat-card glass-light motion-hover-lift motion-slide-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="stat-icon" style={{ background: stat.gradient }}>
                  {stat.icon}
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-change ${stat.positive ? 'positive' : 'neutral'}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </section>

          {/* 快速操作 */}
          <section className="quick-actions-section motion-slide-in-up">
            <h2 className="section-title">
              {content.quickActions.title?.value || '快速操作'}
            </h2>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <div 
                  key={index}
                  className="action-card glass-light motion-hover-lift"
                >
                  <div 
                    className="action-icon"
                    style={{ background: `${action.color}15`, color: action.color }}
                  >
                    {action.icon}
                  </div>
                  <span className="action-text">{action.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 内容区域 */}
          <div className="content-grid motion-slide-in-up">
            {/* 最近活动 */}
            <section className="activity-section glass-light">
              <div className="activity-header">
                <h2 className="section-title">
                  {content.recentActivity.title?.value || '最近活动'}
                </h2>
                <span className="view-all-link">
                  {content.recentActivity.viewAll?.value || '查看全部'}
                </span>
              </div>
              <div className="activity-list">
                {activities.length > 0 ? activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                )) : (
                  <div className="no-activity">
                    {content.recentActivity.noActivity?.value || '暂无活动记录'}
                  </div>
                )}
              </div>
            </section>

            {/* 系统状态 */}
            <section className="status-section glass-light">
              <h2 className="section-title">
                {content.systemStatus.title?.value || '系统状态'}
              </h2>
              <div className="status-list">
                {systemStatus.length > 0 ? systemStatus.map((item, index) => (
                  <div key={index} className="status-item">
                    <span className="status-name">{item.name}</span>
                    <span className={`status-badge ${item.status}`}>
                      {item.status === 'healthy' 
                        ? content.systemStatus.healthy?.value || '运行正常'
                        : item.status === 'warning'
                        ? content.systemStatus.warning?.value || '需要注意'
                        : content.systemStatus.error?.value || '存在问题'
                      }
                    </span>
                  </div>
                )) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'rgb(var(--color-text-tertiary))' }}>
                    暂无状态信息
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
