'use client';

import { useState, useEffect } from 'react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { getLocalizedUrl } from '@/lib/i18n-utils';
import './BlockchainCertInfo.css';

interface BlockchainCertInfoProps {
  knowledgeId: number;
  knowledgeTitle: string;
  userId: number;
  userName: string;
}

interface CertificateInfo {
  certificate_id: string;
  block_index: number;
  timestamp: string;
  content_hash: string;
  transaction_hash: string;
}

/**
 * 区块链存证信息组件
 * 在知识详情页侧边栏显示存证状态
 */
export const BlockchainCertInfo: React.FC<BlockchainCertInfoProps> = ({
  knowledgeId,
  knowledgeTitle,
  userId,
  userName,
}) => {
  const content = useIntlayer('blockchain-cert-info');
  const { locale } = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [certInfo, setCertInfo] = useState<CertificateInfo | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadCertificateInfo();
  }, [knowledgeId]);

  const loadCertificateInfo = async () => {
    try {
      setLoading(true);
      // 调用实际API获取证书信息
      const response = await fetch(`/api/blockchain/certificates/knowledge/${knowledgeId}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // 将证书数据转换为组件需要的格式
          const cert = result.data;
          setCertInfo({
            certificate_id: cert.certificate_id,
            block_index: cert.block_index,
            timestamp: cert.timestamp,
            content_hash: cert.content_hash,
            transaction_hash: '', // 证书数据中没有这个字段，留空
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading certificate info:', error);
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      setGenerating(true);
      // 调用实际API创建证书
      const response = await fetch('/api/blockchain/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          knowledge_id: knowledgeId,
          knowledge_title: knowledgeTitle,
          user_id: userId,
          user_name: userName,
        }),
      });
      
      if (response.ok) {
        await loadCertificateInfo();
      }
      setGenerating(false);
    } catch (error) {
      console.error('Error generating certificate:', error);
      setGenerating(false);
    }
  };

  const handleViewDetails = () => {
    // 使用知识ID跳转到交易详情页，添加语言前缀
    // Mock API 支持通过知识ID查找交易
    router.push(getLocalizedUrl(`/blockchain/transaction/${knowledgeId}`, locale));
  };

  const handleDownloadCertificate = async () => {
    if (!certInfo) return;
    
    try {
      // 调用实际API下载证书
      const response = await fetch(`/api/blockchain/certificates/${certInfo.certificate_id}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `EduChain_Certificate_${certInfo.certificate_id}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };

  // 加载状态
  if (loading) {
    return (
      <div className="blockchain-cert-card glass-card">
        <div className="cert-header">
          <svg className="cert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h3 className="cert-title">{content.title}</h3>
        </div>
        <div className="cert-loading">
          <div className="loading-spinner"></div>
          <span>{content.loading}</span>
        </div>
      </div>
    );
  }

  // 未存证状态
  if (!certInfo) {
    return (
      <div className="blockchain-cert-card glass-card">
        <div className="cert-header">
          <svg className="cert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h3 className="cert-title">{content.title}</h3>
        </div>
        <div className="cert-status not-certified">
          <div className="status-icon-wrapper">
            <svg className="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="status-content">
            <div className="status-label">{content.notCertified}</div>
            <div className="status-desc">{content.notCertifiedDesc}</div>
          </div>
          <button
            onClick={handleGenerateCertificate}
            disabled={generating}
            className="cert-action-btn glass-button motion-hover-lift"
          >
            {generating ? (
              <>
                <div className="btn-spinner"></div>
                {content.generating}
              </>
            ) : (
              <>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {content.generateBtn}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // 已存证状态
  return (
    <div className="blockchain-cert-card glass-card certified">
      <div className="cert-header">
        <svg className="cert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h3 className="cert-title">{content.title}</h3>
        <span className="cert-badge">{content.certified}</span>
      </div>

      <div className="cert-status certified">
        <div className="status-icon-wrapper">
          <svg className="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="status-content">
          <div className="status-label">{content.certifiedComplete}</div>
          <div className="status-desc">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(certInfo.timestamp).toLocaleDateString()}
          </div>
          <div className="status-block">
            {content.blockNumber} #{certInfo.block_index}
          </div>
        </div>
      </div>

      <div className="cert-actions">
        <button
          onClick={handleViewDetails}
          className="cert-action-btn glass-button motion-hover-lift"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {content.viewDetails}
        </button>
        <button
          onClick={handleDownloadCertificate}
          className="cert-action-btn glass-button motion-hover-lift secondary"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {content.download}
        </button>
      </div>

      <div className="cert-notice">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>{content.notice}</span>
      </div>
    </div>
  );
};
