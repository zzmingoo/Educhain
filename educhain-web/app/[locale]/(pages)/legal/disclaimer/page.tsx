'use client';

import { useIntlayer } from 'next-intlayer';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../legal.css';

export default function DisclaimerPage() {
  const content = useIntlayer('legal');
  const disclaimer = content.disclaimer;

  return (
    <>
      <Navbar />
      <div className="legal-page motion-fade-in">
        <div className="legal-content">
          {/* 页面头部 */}
          <header className="legal-header motion-slide-in-up">
            <h1><span className="text-gradient-pink">{disclaimer.title.value}</span></h1>
            {disclaimer.subtitle && <p className="legal-header-subtitle">{disclaimer.subtitle.value}</p>}
            <p className="legal-header-meta">{content.lastUpdated.value}</p>
          </header>

          <main className="legal-main">
            <article className="legal-card glass-light motion-slide-in-up motion-delay-100">
              {/* 警告框 */}
              <div className="legal-alert warning">
                <span className="legal-alert-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{ width: '24px', height: '24px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </span>
                <div className="legal-alert-content">
                  <p><strong>{disclaimer.importantNotice.value}</strong> {disclaimer.intro.value}</p>
                </div>
              </div>

              <div className="legal-divider" />

              {/* 各章节 */}
              {disclaimer.sections.map((section, index) => (
                <section key={index}>
                  <h3>{section.title.value}</h3>
                  <p>{section.content.value}</p>
                </section>
              ))}

              <div className="legal-divider" />

              {/* 页脚声明 */}
              <div className="legal-footer">
                <p>{disclaimer.footer.value}</p>
              </div>
            </article>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
