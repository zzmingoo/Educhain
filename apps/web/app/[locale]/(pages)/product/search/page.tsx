'use client';

import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../product.css';

export default function SearchPage() {
  const content = useIntlayer('product');
  const search = content.search;
  const { locale } = useLocale();
  const router = useRouter();

  const handleTrySearch = () => {
    router.push(`/${locale}/search`);
  };

  // SVG图标配置
  const featureIcons = [
    // AI 语义理解
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>,
    // 毫秒级响应
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>,
    // 精准匹配
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // 高级筛选
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>,
    // 搜索建议
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>,
    // 全文检索
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>,
  ];

  const scenarioIcons = [
    // 学习新技能
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>,
    // 解决问题
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>,
    // 深入研究
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>,
  ];

  const iconColors = [
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #3b82f6, #2563eb)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #10b981, #059669)',
  ];

  const scenarioColors = [
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  ];

  return (
    <>
      <Navbar />
      <div className="product-page motion-fade-in">
        {/* 页面头部 */}
        <header className="product-header motion-slide-in-up">
          <h1><span className="text-gradient-pink">{search.title.value}</span></h1>
          {search.subtitle && <p className="product-header-subtitle">{search.subtitle.value}</p>}
          <p className="product-header-desc">{search.description.value}</p>
        </header>

        <main className="product-main">
          {/* 统计数据 */}
          {search.stats && (
            <div className="product-highlights">
              <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-100">
                <div className="product-highlight-value">50,000+</div>
                <div className="product-highlight-label">{search.stats.searches.value}</div>
              </div>
              <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-150">
                <div className="product-highlight-value">&lt;50ms</div>
                <div className="product-highlight-label">{search.stats.speed.value}</div>
              </div>
              <div className="product-highlight glass-light motion-hover-lift motion-slide-in-up motion-delay-200">
                <div className="product-highlight-value">95%+</div>
                <div className="product-highlight-label">{search.stats.accuracy.value}</div>
              </div>
            </div>
          )}

          {/* 核心特性 */}
          <section className="product-card glass-light motion-slide-in-up motion-delay-250">
            <h2>{search.coreFeatures.value}</h2>
            <div className="product-features">
              {search.features.map((feature, index) => (
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

          {/* 使用场景 */}
          <section className="product-scenarios motion-slide-in-up motion-delay-550">
            <h2>{search.useCases.value}</h2>
            <div className="product-scenarios-grid">
              {search.scenarios.map((scenario, index) => (
                <div key={index} className="product-scenario glass-light motion-hover-lift" style={{ animationDelay: `${600 + index * 50}ms` }}>
                  <div className="product-scenario-icon" style={{ background: scenarioColors[index] }}>
                    {scenarioIcons[index]}
                  </div>
                  <div className="product-scenario-content">
                    <h4>{scenario.title.value}</h4>
                    <p>{scenario.description.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="product-cta glass-medium motion-slide-in-up motion-delay-750">
            <h2>{search.cta.title.value}</h2>
            <p>{search.cta.description.value}</p>
            <button onClick={handleTrySearch} className="product-cta-btn motion-hover-lift">
              {search.cta.button.value}
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
