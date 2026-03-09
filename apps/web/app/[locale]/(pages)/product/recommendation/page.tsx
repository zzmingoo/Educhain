'use client';

import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../product.css';

export default function RecommendationPage() {
  const content = useIntlayer('product');
  const recommendation = content.recommendation;
  const { locale } = useLocale();
  const router = useRouter();

  const handleTryNow = () => {
    router.push(`/${locale}/login`);
  };

  // SVG图标配置
  const featureIcons = [
    // 智能学习
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>,
    // 多维分析
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>,
    // 个性化展示
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>,
    // 实时更新
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>,
    // 协同过滤
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>,
    // 学习路径
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>,
  ];

  const iconColors = [
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #3b82f6, #2563eb)',
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
  ];

  return (
    <>
      <Navbar />
      <div className="product-page motion-fade-in">
        {/* 页面头部 */}
        <header className="product-header motion-slide-in-up">
          <h1><span className="text-gradient-pink">{recommendation.title.value}</span></h1>
          {recommendation.subtitle && <p className="product-header-subtitle">{recommendation.subtitle.value}</p>}
          <p className="product-header-desc">{recommendation.description.value}</p>
        </header>

        <main className="product-main">
          {/* 统计数据 */}
          {recommendation.stats && (
            <div className="product-highlights">
              <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-100">
                <div className="product-highlight-value">8,000+</div>
                <div className="product-highlight-label">{recommendation.stats.users.value}</div>
              </div>
              <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-150">
                <div className="product-highlight-value">92%+</div>
                <div className="product-highlight-label">{recommendation.stats.accuracy.value}</div>
              </div>
              <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-200">
                <div className="product-highlight-value">+45%</div>
                <div className="product-highlight-label">{recommendation.stats.engagement.value}</div>
              </div>
            </div>
          )}

          {/* 核心特性 */}
          <section className="product-card glass-light motion-slide-in-up motion-delay-250">
            <h2>{recommendation.coreFeatures.value}</h2>
            <div className="product-features">
              {recommendation.features.map((feature, index) => (
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

          {/* 工作原理 */}
          {recommendation.howItWorks && (
            <section className="product-how-it-works motion-slide-in-up motion-delay-550">
              <h2>{recommendation.howItWorks.title.value}</h2>
              {recommendation.howItWorks.description && (
                <p className="product-how-it-works-description">{recommendation.howItWorks.description.value}</p>
              )}
              <div className="product-steps-grid">
                {recommendation.howItWorks.steps.map((step, index) => (
                  <div key={index} className="product-step-card glass-light motion-hover-lift" style={{ animationDelay: `${600 + index * 50}ms` }}>
                    <div className="product-step-number">{step.step}</div>
                    <div className="product-step-title">{step.title.value}</div>
                    <p className="product-step-description">{step.description.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="product-cta glass-medium motion-slide-in-up motion-delay-800">
            <h2>{recommendation.cta.title.value}</h2>
            <p>{recommendation.cta.description.value}</p>
            <button onClick={handleTryNow} className="product-cta-btn motion-hover-lift">
              {recommendation.cta.button.value}
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
