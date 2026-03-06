'use client';

import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../product.css';

export default function CommunityPage() {
  const content = useIntlayer('product');
  const community = content.community;
  const { locale } = useLocale();
  const router = useRouter();

  const handleJoinCommunity = () => {
    router.push(`/${locale}/community`);
  };

  // SVG图标配置
  const featureIcons = [
    // 实时讨论
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>,
    // 学习小组
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>,
    // 问答专区
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>,
    // 成就系统
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
    </svg>,
    // 排行榜
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
    </svg>,
    // 关注系统
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>,
  ];

  const iconColors = [
    'linear-gradient(135deg, #3b82f6, #2563eb)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
  ];

  return (
    <>
      <Navbar />
      <div className="product-page motion-fade-in">
        {/* 页面头部 */}
        <header className="product-header motion-slide-in-up">
          <h1><span className="text-gradient-pink">{community.title.value}</span></h1>
          {community.subtitle && <p className="product-header-subtitle">{community.subtitle.value}</p>}
          <p className="product-header-desc">{community.description.value}</p>
        </header>

        <main className="product-main">
          {/* 数据亮点 */}
          <div className="product-highlights">
            <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-100">
              <div className="product-highlight-value">50,000+</div>
              <div className="product-highlight-label">{community.stats.users.value}</div>
            </div>
            <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-150">
              <div className="product-highlight-value">10,000+</div>
              <div className="product-highlight-label">{community.stats.discussions.value}</div>
            </div>
            <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-200">
              <div className="product-highlight-value">100,000+</div>
              <div className="product-highlight-label">{community.stats.answers.value}</div>
            </div>
          </div>

          {/* 核心特性 */}
          <section className="product-card glass-light motion-slide-in-up motion-delay-250">
            <h2>{community.communityFeatures.value}</h2>
            <div className="product-features">
              {community.features.map((feature, index) => (
                <div key={index} className="product-feature glass-light motion-hover-lift" style={{ animationDelay: `${300 + index * 50}ms` }}>
                  <div className="product-feature-icon" style={{ background: iconColors[index] }}>
                    {featureIcons[index]}
                  </div>
                  <h4>{feature.title.value}</h4>
                  <p>{feature.description.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 社区价值 */}
          {community.benefits && (
            <section className="product-benefits motion-slide-in-up motion-delay-550">
              <h2>{community.benefits.title.value}</h2>
              {community.benefits.description && (
                <p className="product-benefits-description">{community.benefits.description.value}</p>
              )}
              <div className="product-benefits-grid">
                {community.benefits.items.map((item, index) => (
                  <div key={index} className="product-benefit-card glass-light motion-hover-lift" style={{ animationDelay: `${600 + index * 50}ms` }}>
                    <h3>{item.title.value}</h3>
                    <p>{item.description.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="product-cta glass-medium motion-slide-in-up motion-delay-750">
            <h2>{community.cta.title.value}</h2>
            <p>{community.cta.description.value}</p>
            <button onClick={handleJoinCommunity} className="product-cta-btn motion-hover-lift">
              {community.cta.button.value}
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
