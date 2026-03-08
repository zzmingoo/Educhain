'use client';

import { useState, useEffect } from 'react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter, useParams } from 'next/navigation';
import { getLocalizedUrl } from '@/lib/i18n-utils';
import Navbar from '../../../../../../components/layout/Navbar';
import Footer from '../../../../../../components/layout/Footer';
import { knowledgeService } from '@/services';
import type { KnowledgeVersion, VersionDiff } from '@/services/knowledge';
import './page.css';

export default function KnowledgeVersionsPage() {
  const content = useIntlayer('knowledge-versions-page');
  const { locale } = useLocale();
  const router = useRouter();
  const params = useParams();
  const shareCode = params.shareCode as string;

  const [loading, setLoading] = useState(true);
  const [versions, setVersions] = useState<KnowledgeVersion[]>([]);
  const [knowledgeId, setKnowledgeId] = useState<number | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState<number[]>([]);
  
  // 模态框状态
  const [viewModal, setViewModal] = useState<{
    show: boolean;
    version: KnowledgeVersion | null;
  }>({ show: false, version: null });
  
  const [compareModal, setCompareModal] = useState<{
    show: boolean;
    diff: VersionDiff | null;
  }>({ show: false, diff: null });
  
  const [restoreDialog, setRestoreDialog] = useState<{
    show: boolean;
    versionNumber: number | null;
  }>({ show: false, versionNumber: null });
  
  const [changeSummary, setChangeSummary] = useState('');

  useEffect(() => {
    loadVersions();
  }, [shareCode]);

  const loadVersions = async () => {
    try {
      setLoading(true);
      // 先获取知识详情以获取 ID
      const detailResponse = await knowledgeService.getKnowledgeByShareCode(shareCode);
      if (detailResponse.success && detailResponse.data) {
        const id = detailResponse.data.id;
        setKnowledgeId(id);
        
        // 获取版本历史
        const versionsResponse = await knowledgeService.getVersionHistory(id, {
          page: 0,
          size: 100,
        });
        
        if (versionsResponse.success && versionsResponse.data) {
          setVersions(versionsResponse.data.content || []);
        }
      }
    } catch (error) {
      console.error('Failed to load versions:', error);
      alert(String(content.messages.loadFailed.value || content.messages.loadFailed));
    } finally {
      setLoading(false);
    }
  };

  const handleViewVersion = async (versionNumber: number) => {
    if (!knowledgeId) return;
    
    try {
      const response = await knowledgeService.getVersion(knowledgeId, versionNumber);
      if (response.success && response.data) {
        setViewModal({ show: true, version: response.data });
      }
    } catch (error) {
      console.error('Failed to load version:', error);
    }
  };

  const handleCompareToggle = () => {
    setCompareMode(!compareMode);
    setSelectedVersions([]);
  };

  const handleVersionSelect = (versionNumber: number) => {
    if (selectedVersions.includes(versionNumber)) {
      setSelectedVersions(selectedVersions.filter(v => v !== versionNumber));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, versionNumber]);
    }
  };

  const handleCompareVersions = async () => {
    if (selectedVersions.length !== 2 || !knowledgeId) {
      alert(String(content.messages.selectTwoVersions.value || content.messages.selectTwoVersions));
      return;
    }

    try {
      const [v1, v2] = selectedVersions.sort((a, b) => a - b);
      const response = await knowledgeService.compareVersions(knowledgeId, v1, v2);
      
      if (response.success && response.data) {
        setCompareModal({ show: true, diff: response.data });
      }
    } catch (error) {
      console.error('Failed to compare versions:', error);
      alert(String(content.messages.compareFailed.value || content.messages.compareFailed));
    }
  };

  const handleRestoreVersion = async () => {
    if (!knowledgeId || !restoreDialog.versionNumber) return;

    try {
      const response = await knowledgeService.restoreToVersion(
        knowledgeId,
        restoreDialog.versionNumber,
        changeSummary || undefined
      );
      
      if (response.success) {
        alert(String(content.messages.restoreSuccess.value || content.messages.restoreSuccess));
        setRestoreDialog({ show: false, versionNumber: null });
        setChangeSummary('');
        // 重新加载版本列表
        loadVersions();
      }
    } catch (error) {
      console.error('Failed to restore version:', error);
      alert(String(content.messages.restoreFailed.value || content.messages.restoreFailed));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <>
      <Navbar />

      <div className="knowledge-versions-page">
        {/* 背景装饰 */}
        <div className="versions-background">
          <div className="versions-blob versions-blob-1" />
          <div className="versions-blob versions-blob-2" />
        </div>

        {/* 页面头部 */}
        <section className="versions-hero-section">
          <div className="hero-container">
            {/* 返回按钮 */}
            <button
              onClick={() => router.push(getLocalizedUrl(`/knowledge/${shareCode}`, locale))}
              className="back-button motion-hover-scale"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {content.header.backToDetail}
            </button>

            {/* 徽章 */}
            <div className="hero-badge glass-badge motion-scale-in" style={{ marginTop: 'var(--spacing-lg)' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{content.header.badge}</span>
            </div>

            {/* 标题 */}
            <h1 className="hero-title motion-slide-in-up motion-delay-100">
              <span className="hero-title-main text-gradient-purple">
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
          </div>
        </section>

        {/* 版本列表 */}
        <div className="versions-content">
          <div className="versions-container">
            {/* 对比工具栏 */}
            {compareMode && (
              <div className="compare-toolbar glass-card motion-slide-in-up">
                <div className="compare-info">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>
                    {locale === 'zh-CN' 
                      ? `已选择 ${selectedVersions.length}/2 个版本` 
                      : `Selected ${selectedVersions.length}/2 versions`}
                  </span>
                </div>
                <div className="compare-actions">
                  <button
                    onClick={handleCompareVersions}
                    disabled={selectedVersions.length !== 2}
                    className="compare-btn primary"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    {content.actions.compareSelected}
                  </button>
                  <button onClick={handleCompareToggle} className="compare-btn secondary">
                    {content.actions.cancelCompare}
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>{content.loading}</p>
              </div>
            ) : versions.length === 0 ? (
              <div className="empty-state glass-card">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>{content.empty}</h3>
                <p>{content.emptyDescription}</p>
              </div>
            ) : (
              <div className="versions-list">
                {!compareMode && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
                    <button onClick={handleCompareToggle} className="compare-btn primary">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      {content.actions.compareVersions}
                    </button>
                  </div>
                )}

                {versions.map((version, index) => (
                  <div
                    key={version.id}
                    className={`version-item glass-card motion-slide-in-up ${
                      index === 0 ? 'current' : ''
                    } ${
                      selectedVersions.includes(version.versionNumber) ? 'selected' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* 选择框 */}
                    {compareMode && (
                      <div className="version-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedVersions.includes(version.versionNumber)}
                          onChange={() => handleVersionSelect(version.versionNumber)}
                          disabled={
                            !selectedVersions.includes(version.versionNumber) &&
                            selectedVersions.length >= 2
                          }
                        />
                      </div>
                    )}

                    {/* 版本信息 */}
                    <div className="version-info">
                      <div className="version-header">
                        <span className="version-number">
                          {content.versionList.version} {version.versionNumber}
                        </span>
                        {index === 0 && (
                          <span className="current-badge">
                            {content.versionList.currentVersion}
                          </span>
                        )}
                      </div>

                      <div className="version-meta">
                        <div className="version-meta-item">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{content.versionList.modifiedBy}: User #{version.createdBy}</span>
                        </div>
                        <div className="version-meta-item">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{formatDate(version.createdAt)}</span>
                        </div>
                      </div>

                      <p className={`version-summary ${!version.changeSummary ? 'empty' : ''}`}>
                        {version.changeSummary || content.versionList.noSummary}
                      </p>

                      {/* 版本操作 */}
                      {!compareMode && (
                        <div className="version-actions">
                          <button
                            onClick={() => handleViewVersion(version.versionNumber)}
                            className="version-action-btn view"
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {content.actions.viewVersion}
                          </button>
                          {index !== 0 && (
                            <button
                              onClick={() => setRestoreDialog({ show: true, versionNumber: version.versionNumber })}
                              className="version-action-btn restore"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              {content.actions.restoreVersion}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 版本详情模态框 */}
      {viewModal.show && viewModal.version && (
        <div className="modal-overlay" onClick={() => setViewModal({ show: false, version: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {content.versionModal.title} - {content.versionList.version} {viewModal.version.versionNumber}
              </h2>
              <button
                onClick={() => setViewModal({ show: false, version: null })}
                className="modal-close-btn"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="version-detail">
                <div className="version-detail-section">
                  <div className="version-detail-label">{content.versionModal.versionNumber}</div>
                  <div className="version-detail-value">{viewModal.version.versionNumber}</div>
                </div>
                <div className="version-detail-section">
                  <div className="version-detail-label">{content.versionList.modifiedAt}</div>
                  <div className="version-detail-value">{formatDate(viewModal.version.createdAt)}</div>
                </div>
                {viewModal.version.changeSummary && (
                  <div className="version-detail-section">
                    <div className="version-detail-label">{content.versionList.changeSummary}</div>
                    <div className="version-detail-value">{viewModal.version.changeSummary}</div>
                  </div>
                )}
                <div className="version-detail-section">
                  <div className="version-detail-label">{content.versionModal.content}</div>
                  <div className="version-detail-value">{stripHtml(viewModal.version.content)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 版本对比模态框 */}
      {compareModal.show && compareModal.diff && (
        <div className="modal-overlay" onClick={() => setCompareModal({ show: false, diff: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{content.compareModal.title}</h2>
              <button
                onClick={() => setCompareModal({ show: false, diff: null })}
                className="modal-close-btn"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="compare-header">
                <div className="compare-version-info">
                  <div className="compare-version-label">{content.compareModal.oldVersion}</div>
                  <div className="compare-version-number">
                    {content.versionList.version} {compareModal.diff.version1.versionNumber}
                  </div>
                </div>
                <div className="compare-version-info">
                  <div className="compare-version-label">{content.compareModal.newVersion}</div>
                  <div className="compare-version-number">
                    {content.versionList.version} {compareModal.diff.version2.versionNumber}
                  </div>
                </div>
              </div>

              <div className="compare-diff">
                {compareModal.diff.titleDiff && (
                  <div className="diff-section">
                    <div className="diff-section-title">{content.compareModal.titleDiff}</div>
                    <div className="diff-content">
                      <div className="diff-line removed">{compareModal.diff.version1.title}</div>
                      <div className="diff-line added">{compareModal.diff.version2.title}</div>
                    </div>
                  </div>
                )}

                {compareModal.diff.contentDiff && (
                  <div className="diff-section">
                    <div className="diff-section-title">{content.compareModal.contentDiff}</div>
                    <div className="diff-content">
                      <div className="diff-line removed">
                        {stripHtml(compareModal.diff.version1.content).substring(0, 200)}...
                      </div>
                      <div className="diff-line added">
                        {stripHtml(compareModal.diff.version2.content).substring(0, 200)}...
                      </div>
                    </div>
                  </div>
                )}

                {!compareModal.diff.titleDiff && !compareModal.diff.contentDiff && (
                  <div className="diff-section">
                    <p>{content.compareModal.noChanges}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 恢复确认对话框 */}
      {restoreDialog.show && (
        <div className="modal-overlay" onClick={() => setRestoreDialog({ show: false, versionNumber: null })}>
          <div className="modal-content restore-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{content.restoreConfirm.title}</h2>
              <button
                onClick={() => setRestoreDialog({ show: false, versionNumber: null })}
                className="modal-close-btn"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 'var(--spacing-lg)', color: 'rgb(var(--color-text-secondary))' }}>
                {content.restoreConfirm.message}
              </p>
              <div className="restore-form">
                <div className="form-group">
                  <label className="form-label">{content.restoreConfirm.summaryLabel}</label>
                  <input
                    type="text"
                    value={changeSummary}
                    onChange={(e) => setChangeSummary(e.target.value)}
                    placeholder={String(content.restoreConfirm.summaryPlaceholder.value || content.restoreConfirm.summaryPlaceholder)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="dialog-actions">
                <button
                  onClick={() => {
                    setRestoreDialog({ show: false, versionNumber: null });
                    setChangeSummary('');
                  }}
                  className="dialog-btn cancel"
                >
                  {content.restoreConfirm.cancel}
                </button>
                <button onClick={handleRestoreVersion} className="dialog-btn confirm">
                  {content.restoreConfirm.confirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
