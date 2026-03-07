'use client';

import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import AdminNavbar from '../../../../../components/admin/AdminNavbar/AdminNavbar';
import { 
  getSystemSettings, 
  updateSystemSettings,
  type SystemSettings 
} from '../../../../../src/services/admin';
import './page.css';

export default function AdminSettingsPage() {
  const content = useIntlayer('admin-settings');
  
  // 状态管理
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 加载设置
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await getSystemSettings();
        if (response.success && response.data) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error('加载设置失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // 更新设置字段
  const updateField = (field: keyof SystemSettings, value: string | number | boolean) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
  };

  // 保存设置
  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      const response = await updateSystemSettings(settings);
      if (response.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('保存设置失败:', error);
    } finally {
      setSaving(false);
    }
  };

  // 重置设置
  const handleReset = async () => {
    try {
      setLoading(true);
      const response = await getSystemSettings();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('重置设置失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !settings) {
    return (
      <>
        <AdminNavbar />
        <div className="admin-settings-page">
          <div className="settings-content">
            <div className="loading-state">
              {content.loading?.value || '加载中...'}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      
      <div className="admin-settings-page motion-fade-in">
        <div className="settings-content">
          {/* 页头 */}
          <section className="settings-header motion-slide-in-up">
            <h1 className="settings-title">
              {content.title?.value || '系统设置'}
            </h1>
            <p className="settings-subtitle">
              {content.subtitle?.value || '配置平台参数和功能选项'}
            </p>
          </section>

          {/* 设置网格 */}
          <div className="settings-grid">
            {/* 基本设置 */}
            <div className="setting-card glass-light motion-slide-in-up">
              <h2 className="card-title">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {content.basicSettings?.value || '基本设置'}
              </h2>
              
              <div className="form-group">
                <label className="form-label">{content.siteName?.value || '站点名称'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.siteName}
                  onChange={(e) => updateField('siteName', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.siteDescription?.value || '站点描述'}</label>
                <textarea
                  className="form-input form-textarea"
                  value={settings.siteDescription}
                  onChange={(e) => updateField('siteDescription', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.siteUrl?.value || '站点地址'}</label>
                <input
                  type="url"
                  className="form-input"
                  value={settings.siteUrl}
                  onChange={(e) => updateField('siteUrl', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.adminEmail?.value || '管理员邮箱'}</label>
                <input
                  type="email"
                  className="form-input"
                  value={settings.adminEmail}
                  onChange={(e) => updateField('adminEmail', e.target.value)}
                />
              </div>
            </div>

            {/* 用户设置 */}
            <div className="setting-card glass-light motion-slide-in-up" style={{ animationDelay: '50ms' }}>
              <h2 className="card-title">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {content.userSettings?.value || '用户设置'}
              </h2>

              <div className="switch-group">
                <span className="switch-label">{content.allowRegistration?.value || '允许用户注册'}</span>
                <div 
                  className={`switch ${settings.allowRegistration ? 'active' : ''}`}
                  onClick={() => updateField('allowRegistration', !settings.allowRegistration)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="switch-group">
                <span className="switch-label">{content.requireEmailVerification?.value || '需要邮箱验证'}</span>
                <div 
                  className={`switch ${settings.requireEmailVerification ? 'active' : ''}`}
                  onClick={() => updateField('requireEmailVerification', !settings.requireEmailVerification)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{content.maxUploadSize?.value || '最大上传大小 (MB)'}</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.maxUploadSize}
                  onChange={(e) => updateField('maxUploadSize', Number(e.target.value))}
                />
              </div>
            </div>

            {/* 内容设置 */}
            <div className="setting-card glass-light motion-slide-in-up" style={{ animationDelay: '100ms' }}>
              <h2 className="card-title">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {content.contentSettings?.value || '内容设置'}
              </h2>

              <div className="switch-group">
                <span className="switch-label">{content.enableContentReview?.value || '启用内容审核'}</span>
                <div 
                  className={`switch ${settings.enableContentReview ? 'active' : ''}`}
                  onClick={() => updateField('enableContentReview', !settings.enableContentReview)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="switch-group">
                <span className="switch-label">{content.autoPublish?.value || '自动发布'}</span>
                <div 
                  className={`switch ${settings.autoPublish ? 'active' : ''}`}
                  onClick={() => updateField('autoPublish', !settings.autoPublish)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="switch-group">
                <span className="switch-label">{content.allowComments?.value || '允许评论'}</span>
                <div 
                  className={`switch ${settings.allowComments ? 'active' : ''}`}
                  onClick={() => updateField('allowComments', !settings.allowComments)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="switch-group">
                <span className="switch-label">{content.allowAnonymousComments?.value || '允许匿名评论'}</span>
                <div 
                  className={`switch ${settings.allowAnonymousComments ? 'active' : ''}`}
                  onClick={() => updateField('allowAnonymousComments', !settings.allowAnonymousComments)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>
            </div>

            {/* 区块链设置 */}
            <div className="setting-card glass-light motion-slide-in-up" style={{ animationDelay: '150ms' }}>
              <h2 className="card-title">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {content.blockchainSettings?.value || '区块链设置'}
              </h2>

              <div className="switch-group">
                <span className="switch-label">{content.enableBlockchain?.value || '启用区块链'}</span>
                <div 
                  className={`switch ${settings.enableBlockchain ? 'active' : ''}`}
                  onClick={() => updateField('enableBlockchain', !settings.enableBlockchain)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{content.blockchainNetwork?.value || '区块链网络'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.blockchainNetwork}
                  onChange={(e) => updateField('blockchainNetwork', e.target.value)}
                  disabled={!settings.enableBlockchain}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.contractAddress?.value || '合约地址'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.contractAddress}
                  onChange={(e) => updateField('contractAddress', e.target.value)}
                  disabled={!settings.enableBlockchain}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.gasLimit?.value || 'Gas 限制'}</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.gasLimit}
                  onChange={(e) => updateField('gasLimit', Number(e.target.value))}
                  disabled={!settings.enableBlockchain}
                />
              </div>
            </div>

            {/* 邮件设置 */}
            <div className="setting-card glass-light motion-slide-in-up" style={{ animationDelay: '200ms' }}>
              <h2 className="card-title">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {content.emailSettings?.value || '邮件设置'}
              </h2>

              <div className="form-group">
                <label className="form-label">{content.smtpHost?.value || 'SMTP 主机'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.smtpHost}
                  onChange={(e) => updateField('smtpHost', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.smtpPort?.value || 'SMTP 端口'}</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.smtpPort}
                  onChange={(e) => updateField('smtpPort', Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.smtpUser?.value || 'SMTP 用户名'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.smtpUser}
                  onChange={(e) => updateField('smtpUser', e.target.value)}
                />
              </div>

              <div className="switch-group">
                <span className="switch-label">{content.smtpSecure?.value || '使用 SSL/TLS'}</span>
                <div 
                  className={`switch ${settings.smtpSecure ? 'active' : ''}`}
                  onClick={() => updateField('smtpSecure', !settings.smtpSecure)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>
            </div>

            {/* 安全设置 */}
            <div className="setting-card glass-light motion-slide-in-up" style={{ animationDelay: '250ms' }}>
              <h2 className="card-title">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {content.securitySettings?.value || '安全设置'}
              </h2>

              <div className="switch-group">
                <span className="switch-label">{content.enableTwoFactor?.value || '启用双因素认证'}</span>
                <div 
                  className={`switch ${settings.enableTwoFactor ? 'active' : ''}`}
                  onClick={() => updateField('enableTwoFactor', !settings.enableTwoFactor)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{content.sessionTimeout?.value || '会话超时 (分钟)'}</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.sessionTimeout}
                  onChange={(e) => updateField('sessionTimeout', Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.maxLoginAttempts?.value || '最大登录尝试次数'}</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => updateField('maxLoginAttempts', Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.passwordMinLength?.value || '密码最小长度'}</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.passwordMinLength}
                  onChange={(e) => updateField('passwordMinLength', Number(e.target.value))}
                />
              </div>
            </div>

            {/* 性能设置 */}
            <div className="setting-card glass-light motion-slide-in-up" style={{ animationDelay: '300ms' }}>
              <h2 className="card-title">
                <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {content.performanceSettings?.value || '性能设置'}
              </h2>

              <div className="switch-group">
                <span className="switch-label">{content.cacheEnabled?.value || '启用缓存'}</span>
                <div 
                  className={`switch ${settings.cacheEnabled ? 'active' : ''}`}
                  onClick={() => updateField('cacheEnabled', !settings.cacheEnabled)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{content.cacheDuration?.value || '缓存时长 (秒)'}</label>
                <input
                  type="number"
                  className="form-input"
                  value={settings.cacheDuration}
                  onChange={(e) => updateField('cacheDuration', Number(e.target.value))}
                  disabled={!settings.cacheEnabled}
                />
              </div>

              <div className="switch-group">
                <span className="switch-label">{content.enableCDN?.value || '启用 CDN'}</span>
                <div 
                  className={`switch ${settings.enableCDN ? 'active' : ''}`}
                  onClick={() => updateField('enableCDN', !settings.enableCDN)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{content.cdnUrl?.value || 'CDN 地址'}</label>
                <input
                  type="url"
                  className="form-input"
                  value={settings.cdnUrl}
                  onChange={(e) => updateField('cdnUrl', e.target.value)}
                  disabled={!settings.enableCDN}
                  placeholder="https://cdn.example.com"
                />
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="settings-actions">
            <button 
              className="action-btn action-btn-secondary"
              onClick={handleReset}
              disabled={saving}
            >
              {content.reset?.value || '重置'}
            </button>
            <button 
              className="action-btn action-btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (content.saving?.value || '保存中...') : (content.save?.value || '保存设置')}
            </button>
          </div>

          {/* 成功提示 */}
          {showSuccess && (
            <div className="success-message">
              ✓ {content.saveSuccess?.value || '设置保存成功'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
