'use client';

import { useIntlayer } from 'next-intlayer';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../legal.css';

export default function PrivacyPage() {
  const content = useIntlayer('legal');
  const privacy = content.privacy;

  return (
    <>
      <Navbar />
      <div className="legal-page motion-fade-in">
        <div className="legal-content">
          {/* 页面头部 */}
          <header className="legal-header motion-slide-in-up">
            <h1><span className="text-gradient-pink">{privacy.title.value}</span></h1>
            {privacy.subtitle && <p className="legal-header-subtitle">{privacy.subtitle.value}</p>}
            <p className="legal-header-meta">{content.lastUpdated.value}</p>
          </header>

          <main className="legal-main">
            <article className="legal-card glass-light motion-slide-in-up motion-delay-100">
              {/* 引言 */}
              <h2>{privacy.title.value}</h2>
              <p>{privacy.intro.value}</p>

              <div className="legal-divider" />

              {/* 各章节 */}
              {privacy.sections.map((section, index) => (
                <section key={index}>
                  <h3>{section.title.value}</h3>
                  <p>{section.content.value}</p>
                </section>
              ))}

              <div className="legal-divider" />

              {/* 页脚声明 */}
              <div className="legal-footer">
                <p>{privacy.footer.value}</p>
              </div>
            </article>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
