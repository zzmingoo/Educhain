'use client';

import { useIntlayer } from 'next-intlayer';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../company.css';

export default function AboutPage() {
  const content = useIntlayer('company');
  const about = content.about;

  // SVG图标配置 - 核心价值观
  const valueIcons = [
    // 创新驱动
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>,
    // 开放共享
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>,
    // 安全可信
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>,
    // 全球视野
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
            <h1><span className="text-gradient-pink">{about.title.value}</span></h1>
            {about.subtitle && <p className="company-header-subtitle">{about.subtitle.value}</p>}
            <p className="company-header-desc">{about.description.value}</p>
          </header>

          <main className="company-main">
            {/* 使命 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-100">
              <h2>{about.mission.title.value}</h2>
              <p>{about.mission.content.value}</p>
            </section>

            {/* 愿景 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-150">
              <h2>{about.vision.title.value}</h2>
              <p>{about.vision.content.value}</p>
            </section>

            {/* 核心价值观 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-200">
              <h2>{about.values.title.value}</h2>
              <div className="company-grid">
                {about.values.items.map((item, index) => (
                  <div key={index} className="company-grid-item glass-light motion-hover-lift" style={{ animationDelay: `${250 + index * 50}ms` }}>
                    <div className="company-grid-icon" style={{ background: iconColors[index] }}>
                      {valueIcons[index]}
                    </div>
                    <h4>{item.title.value}</h4>
                    <p>{item.description.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 核心团队 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-400">
              <h2>{about.team.title.value}</h2>
              <div className="team-grid">
                {about.team.members.map((member, index) => (
                  <div key={index} className="team-member glass-light motion-hover-lift" style={{ animationDelay: `${450 + index * 50}ms` }}>
                    <div className="team-avatar">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{ width: '48px', height: '48px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <h4>{member.name.value}</h4>
                    <p className="team-role">{member.role.value}</p>
                    <p>{member.bio.value}</p>
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
