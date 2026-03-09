'use client';

import { useIntlayer } from 'next-intlayer';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../company.css';

export default function PartnersPage() {
  const content = useIntlayer('company');
  const partners = content.partners;

  // SVG图标配置 - 合作类型
  const partnerTypeIcons = [
    // 教育机构
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>,
    // 企业合作
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>,
    // 技术伙伴
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>,
    // 内容创作者
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>,
  ];

  const iconColors = [
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
  ];

  return (
    <>
      <Navbar />
      <div className="company-page motion-fade-in">
        <div className="company-content">
          {/* 页面头部 */}
          <header className="company-header motion-slide-in-up">
            <h1><span className="text-gradient-pink">{partners.title.value}</span></h1>
            {partners.subtitle && <p className="company-header-subtitle">{partners.subtitle.value}</p>}
            <p className="company-header-desc">{partners.description.value}</p>
          </header>

          <main className="company-main">
            {/* 合作类型 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-100">
              <h2>{partners.types.title.value}</h2>
              <div className="company-grid">
                {partners.types.items.map((item, index) => (
                  <div key={index} className="company-grid-item glass-light motion-hover-lift" style={{ animationDelay: `${150 + index * 50}ms` }}>
                    <div className="company-grid-icon" style={{ background: iconColors[index] }}>
                      {partnerTypeIcons[index]}
                    </div>
                    <h4>{item.title.value}</h4>
                    <p>{item.description.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 合作伙伴展示 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-300">
              <h2>{partners.featured.title.value}</h2>
              <div className="partner-grid">
                {partners.featured.partners.map((partner, index) => (
                  <div key={index} className="partner-card glass-light motion-hover-lift" style={{ animationDelay: `${350 + index * 50}ms` }}>
                    <div className="partner-logo">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{ width: '40px', height: '40px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                      </svg>
                    </div>
                    <h4>{partner.name.value}</h4>
                    <p>{partner.type.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 成为合作伙伴 */}
            <section className="company-cta glass-medium motion-slide-in-up motion-delay-500">
              <h2>{partners.cta.title.value}</h2>
              <p>{partners.cta.description.value}</p>
              <a
                href={`mailto:${partners.cta.email}`}
                className="company-cta-btn motion-hover-lift"
              >
                {partners.cta.button.value}
              </a>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
