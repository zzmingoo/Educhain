'use client';

import { useIntlayer } from 'next-intlayer';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../company.css';

export default function CareersPage() {
  const content = useIntlayer('company');
  const careers = content.careers;

  // SVG图标配置 - 为什么加入
  const whyIcons = [
    // 快速成长
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>,
    // 创新文化
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>,
    // 优厚福利
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>,
    // 社会价值
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>,
  ];

  const iconColors = [
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #3b82f6, #2563eb)',
  ];

  return (
    <>
      <Navbar />
      <div className="company-page motion-fade-in">
        <div className="company-content">
          {/* 页面头部 */}
          <header className="company-header motion-slide-in-up">
            <h1><span className="text-gradient-pink">{careers.title.value}</span></h1>
            {careers.subtitle && <p className="company-header-subtitle">{careers.subtitle.value}</p>}
            <p className="company-header-desc">{careers.description.value}</p>
          </header>

          <main className="company-main">
            {/* 为什么加入 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-100">
              <h2>{careers.why.title.value}</h2>
              <div className="company-grid">
                {careers.why.items.map((item, index) => (
                  <div key={index} className="company-grid-item glass-light motion-hover-lift" style={{ animationDelay: `${150 + index * 50}ms` }}>
                    <div className="company-grid-icon" style={{ background: iconColors[index] }}>
                      {whyIcons[index]}
                    </div>
                    <h4>{item.title.value}</h4>
                    <p>{item.description.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 开放职位 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-300">
              <h2>{careers.positions.title.value}</h2>
              <div className="job-list">
                {careers.positions.jobs.map((job, index) => (
                  <div key={index} className="job-card glass-light motion-hover-lift" style={{ animationDelay: `${350 + index * 50}ms` }}>
                    <div className="job-info">
                      <h4>{job.title.value}</h4>
                      <div className="job-meta">
                        <span className="job-tag">{job.department.value}</span>
                        <span className="job-tag">{job.location.value}</span>
                        <span className="job-tag">{job.type.value}</span>
                      </div>
                    </div>
                    <button className="job-apply motion-hover-lift">
                      {careers.positions.apply.value}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
