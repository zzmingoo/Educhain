'use client';

import { useState, useEffect } from 'react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useParams, useRouter } from 'next/navigation';
import { getLocalizedUrl } from '@/lib/i18n-utils';
import { InteractionButtons, CommentList } from '../../../../../components/knowledge';
import { BlockchainCertInfo } from '../../../../../components/blockchain';
import { MarkdownRenderer } from '../../../../../components/MarkdownRenderer';
import { useAuth } from '@/contexts/auth-context';
import { knowledgeService, commentService, interactionService } from '@/services';
import type { KnowledgeItem } from '@/types';

export default function KnowledgeDetailClient() {
  const content = useIntlayer('knowledge-detail-page');
  const { locale } = useLocale();
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const shareCode = params.shareCode as string;
  const [loading, setLoading] = useState(true);
  const [knowledge, setKnowledge] = useState<KnowledgeItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (shareCode) {
      loadKnowledge();
    }
  }, [shareCode]);

  const loadKnowledge = async () => {
    try {
      setLoading(true);
      const response = await knowledgeService.getKnowledgeByShareCode(shareCode);
      if (response.success && response.data) {
        setKnowledge(response.data);
      }
    } catch (error) {
      console.error('Failed to load knowledge:', error);
    } finally {
      setLoading(false);
    }
  };

  // 处理编辑
  const handleEdit = () => {
    if (knowledge) {
      router.push(getLocalizedUrl(`/knowledge/edit/${knowledge.shareCode}`, locale));
    }
  };

  // 处理删除
  const handleDelete = async () => {
    if (!knowledge) return;
    
    try {
      setDeleting(true);
      const response = await knowledgeService.deleteKnowledge(knowledge.id);
      if (response.success) {
        router.push(getLocalizedUrl('/knowledge', locale));
      }
    } catch (error) {
      console.error('Failed to delete knowledge:', error);
      alert(content.deleteError);
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  // 处理分享
  const handleShare = () => {
    if (!knowledge) return;
    
    const shareUrl = `${window.location.origin}${getLocalizedUrl(`/knowledge/${knowledge.shareCode}`, locale)}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert(content.shareCopied || 'Link copied to clipboard!');
    } else {
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert(content.shareCopied || 'Link copied to clipboard!');
    }
  };

  // 检查是否是作者
  const isAuthor = user && knowledge && user.id === knowledge.uploaderId;

  if (loading) {
    return (
      <div className="detail-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>{content.loading}</p>
        </div>
      </div>
    );
  }

  if (!knowledge) {
    return (
      <div className="detail-container">
        <div className="empty-state glass-card">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3>{content.notFound}</h3>
          <p>{content.notFoundDescription}</p>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    const colors = {
      TEXT: { bg: 'rgba(59, 130, 246, 0.1)', color: 'rgb(59, 130, 246)' },
      IMAGE: { bg: 'rgba(34, 197, 94, 0.1)', color: 'rgb(34, 197, 94)' },
      VIDEO: { bg: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)' },
      PDF: { bg: 'rgba(251, 146, 60, 0.1)', color: 'rgb(251, 146, 60)' },
      LINK: { bg: 'rgba(168, 85, 247, 0.1)', color: 'rgb(168, 85, 247)' },
    };
    return colors[type as keyof typeof colors] || colors.TEXT;
  };

  const typeStyle = getTypeColor(knowledge.type || 'TEXT');

  return (
    <div className="detail-container container">
      <div className="knowledge-content-card glass-card motion-slide-in-up">
        {/* 头部信息 */}
        <div className="knowledge-header motion-fade-in motion-delay-100">
          <h1 className="knowledge-title">{knowledge.title}</h1>

          <div className="knowledge-meta">
            <div className="author-section">
              <div className="author-avatar">
                {knowledge.uploaderAvatar ? (
                  <img src={knowledge.uploaderAvatar} alt={knowledge.uploaderName || 'User'} />
                ) : (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="author-info">
                <div className="author-name">
                  {knowledge.uploaderName || `User ${knowledge.uploaderId}`}
                </div>
                <div className="publish-time">
                  {new Date(knowledge.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="knowledge-tags">
              <span
                className="type-badge"
                style={{ background: typeStyle.bg, color: typeStyle.color }}
              >
                {knowledge.type}
              </span>
              {knowledge.categoryName && (
                <span className="tag">{knowledge.categoryName}</span>
              )}
              {knowledge.tags &&
                knowledge.tags.split(',').map((tag) => (
                  <span key={tag.trim()} className="tag">
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* 内容 */}
        <MarkdownRenderer content={knowledge.content} className="knowledge-content motion-fade-in motion-delay-150" />

        {/* 区块链存证信息 */}
        <div className="blockchain-cert-section motion-fade-in motion-delay-200">
          <BlockchainCertInfo
            knowledgeId={knowledge.id}
            knowledgeTitle={knowledge.title}
            userId={knowledge.uploaderId}
            userName={knowledge.uploaderName || `User ${knowledge.uploaderId}`}
          />
        </div>

        {/* 交互区域 */}
        <div className="knowledge-interactions motion-fade-in motion-delay-250">
          <div className="stats-section">
            <div className="stat-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{knowledge.stats?.viewCount || 0} {content.views}</span>
            </div>
          </div>

          <div className="interaction-buttons-wrapper">
            <InteractionButtons
              initialStats={{
                likeCount: knowledge.stats?.likeCount || 0,
                favoriteCount: knowledge.stats?.favoriteCount || 0,
                commentCount: knowledge.stats?.commentCount || 0,
              }}
              size="large"
            />

            {/* 作者操作按钮 */}
            {isAuthor && (
              <>
                <button onClick={handleEdit} className="action-btn edit-btn glass-button motion-hover-lift">
                  <span>{content.edit || 'Edit'}</span>
                </button>
                <button 
                  onClick={() => router.push(getLocalizedUrl(`/knowledge/${knowledge.shareCode}/versions`, locale))} 
                  className="action-btn version-btn glass-button motion-hover-lift"
                >
                  <span>{content.versionHistory || 'Version History'}</span>
                </button>
                <button onClick={() => setShowDeleteDialog(true)} className="action-btn delete-btn glass-button motion-hover-lift">
                  <span>{content.delete}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteDialog && (
        <div className="dialog-overlay" onClick={() => !deleting && setShowDeleteDialog(false)}>
          <div className="dialog-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>{content.deleteConfirmTitle}</h3>
            </div>
            <div className="dialog-body">
              <p>{content.deleteConfirmMessage}</p>
            </div>
            <div className="dialog-footer">
              <button 
                onClick={() => setShowDeleteDialog(false)} 
                className="dialog-btn cancel-btn glass-button"
                disabled={deleting}
              >
                {content.cancel}
              </button>
              <button 
                onClick={handleDelete} 
                className="dialog-btn confirm-btn glass-button"
                disabled={deleting}
              >
                {deleting ? content.deleting : content.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 评论区域 */}
      <div className="knowledge-comments-section motion-fade-in motion-delay-300">
        <CommentList
          knowledgeId={knowledge.id}
          onLoadComments={async (knowledgeId) => {
            try {
              const response = await commentService.getComments(knowledgeId);
              if (response.success && response.data) {
                const comments = response.data.content || [];
                return comments.map(comment => ({
                  id: comment.id,
                  content: comment.content,
                  userId: comment.userId,
                  userName: comment.user?.username || `User ${comment.userId}`,
                  userAvatar: comment.user?.avatarUrl,
                  createdAt: comment.createdAt,
                  likeCount: 0,
                  isLiked: false,
                  parentId: comment.parentId,
                }));
              }
              return [];
            } catch (error) {
              console.error('Failed to load comments:', error);
              return [];
            }
          }}
          onAddComment={async (knowledgeId, content, parentId) => {
            try {
              const response = await commentService.createComment({
                knowledgeId,
                content,
                parentId,
              });
              
              if (response.success && response.data) {
                const comment = response.data;
                return {
                  id: comment.id,
                  content: comment.content,
                  userId: comment.userId,
                  userName: comment.user?.username || user?.username || 'Anonymous',
                  userAvatar: comment.user?.avatarUrl || user?.avatarUrl,
                  createdAt: comment.createdAt,
                  likeCount: 0,
                  isLiked: false,
                  parentId: comment.parentId,
                };
              }
              
              throw new Error('Failed to create comment');
            } catch (error) {
              console.error('Failed to add comment:', error);
              throw error;
            }
          }}
          onLikeComment={async (commentId) => {
            try {
              await interactionService.like(commentId);
            } catch (error) {
              console.error('Failed to like comment:', error);
            }
          }}
          onDeleteComment={async (commentId) => {
            try {
              await commentService.deleteComment(commentId);
            } catch (error) {
              console.error('Failed to delete comment:', error);
              throw error;
            }
          }}
        />
      </div>
    </div>
  );
}
