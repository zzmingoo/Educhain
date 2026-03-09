'use client';

import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import RecommendationList from '../../components/RecommendationList/RecommendationList';
import { useAuth } from '../../src/contexts/auth-context';
import './Home.css';

export default function HomePage() {
  const content = useIntlayer('home');
  const { locale } = useLocale();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/${locale}/search`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const scrollToRecommendations = () => {
    const recommendationsSection = document.querySelector('.recommendations-section');
    if (recommendationsSection) {
      recommendationsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleShareKnowledge = () => {
    if (isAuthenticated) {
      router.push(`/${locale}/knowledge/create`);
    } else {
      const redirectUrl = `/${locale}/knowledge/create`;
      router.push(`/${locale}/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="home-page motion-fade-in">
        <div className="home-content">
          {/* 英雄区域 */}
          <section className="hero-section">
            <div className="hero-container">
              {/* 徽章 */}
              <div className="hero-badge glass-badge motion-scale-in">
                <span>{content.hero.badge.value}</span>
              </div>

              {/* 标题 */}
              <h1 className="hero-title motion-slide-in-up motion-delay-100">
                <span className="hero-title-main text-gradient-pink">
                  {content.hero.title.value}
                </span>
                <span className="hero-title-sub">
                  {content.hero.subtitle.value}
                </span>
              </h1>

              {/* 描述 */}
              <p className="hero-description motion-slide-in-up motion-delay-150">
                {content.hero.description.value}
              </p>

              {/* 搜索框 */}
              <div className="hero-search-wrapper motion-slide-in-up motion-delay-200">
                <div className="hero-search-container glass-medium">
                  <div className="hero-search-prefix">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={content.hero.searchPlaceholder.value}
                    className="hero-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    className="hero-search-button motion-hover-lift"
                    onClick={handleSearch}
                  >
                    <span>{content.hero.searchButton.value}</span>
                  </button>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="hero-actions motion-slide-in-up motion-delay-250">
                <button 
                  className="hero-action-btn hero-action-primary motion-hover-lift"
                  onClick={scrollToRecommendations}
                >
                  {content.hero.startLearning.value}
                </button>
                <button 
                  className="hero-action-btn hero-action-secondary motion-hover-scale"
                  onClick={handleShareKnowledge}
                >
                  {content.hero.shareKnowledge.value}
                </button>
              </div>
            </div>
          </section>

          {/* 统计数据 */}
          <section className="stats-section motion-slide-in-up motion-delay-300">
            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-card glass-light motion-hover-lift motion-slide-in-up motion-delay-350">
                  <div className="stat-value">1,234</div>
                  <div className="stat-label">{content.stats.knowledge.value}</div>
                </div>
                <div className="stat-card glass-light motion-hover-lift motion-slide-in-up motion-delay-400">
                  <div className="stat-value">5,678</div>
                  <div className="stat-label">{content.stats.users.value}</div>
                </div>
                <div className="stat-card glass-light motion-hover-lift motion-slide-in-up motion-delay-450">
                  <div className="stat-value">98,765</div>
                  <div className="stat-label">{content.stats.views.value}</div>
                </div>
              </div>
            </div>
          </section>

          {/* 功能特性 */}
          <section className="features-section">
            <div className="features-container">
              {/* 区域标题 */}
              <div className="section-header motion-slide-in-up motion-delay-500">
                <h2 className="section-title">{content.features.title.value}</h2>
                <p className="section-description">{content.features.description.value}</p>
              </div>

              {/* 功能网格 */}
              <div className="features-grid">
                {/* 知识库 */}
                <div className="feature-card glass-light motion-hover-lift motion-slide-in-up motion-delay-550">
                  <div 
                    className="feature-icon-wrapper"
                    style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <h3 className="feature-title">{content.features.knowledge.title.value}</h3>
                  <p className="feature-description">{content.features.knowledge.description.value}</p>
                  <div className="feature-arrow">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* 智能搜索 */}
                <div className="feature-card glass-light motion-hover-lift motion-slide-in-up motion-delay-600">
                  <div 
                    className="feature-icon-wrapper"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">{content.features.search.title.value}</h3>
                  <p className="feature-description">{content.features.search.description.value}</p>
                  <div className="feature-arrow">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* 个人中心 */}
                <div className="feature-card glass-light motion-hover-lift motion-slide-in-up motion-delay-650">
                  <div 
                    className="feature-icon-wrapper"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">{content.features.profile.title.value}</h3>
                  <p className="feature-description">{content.features.profile.description.value}</p>
                  <div className="feature-arrow">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* 社区交流 */}
                <div className="feature-card glass-light motion-hover-lift motion-slide-in-up motion-delay-700">
                  <div 
                    className="feature-icon-wrapper"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">{content.features.community.title.value}</h3>
                  <p className="feature-description">{content.features.community.description.value}</p>
                  <div className="feature-arrow">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 推荐内容 */}
          <section className="recommendations-section motion-slide-in-up motion-delay-750">
            <div className="recommendations-container">
              <RecommendationList
                title={content.recommendations.title.value}
                showTabs={true}
                defaultTab="trending"
                limit={8}
                compact={false}
              />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
