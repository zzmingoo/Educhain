'use client';

import { useIntlayer } from 'next-intlayer';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../legal.css';

export default function CopyrightPage() {
  const content = useIntlayer('legal');
  const copyright = content.copyright;

  return (
    <>
      <Navbar />
      <div className="legal-page motion-fade-in">
        <div className="legal-content">
          {/* 页面头部 */}
          <header className="legal-header motion-slide-in-up">
            <h1><span className="text-gradient-pink">{copyright.title.value}</span></h1>
            {copyright.subtitle && <p className="legal-header-subtitle">{copyright.subtitle.value}</p>}
            <p className="legal-header-meta">{content.lastUpdated.value}</p>
          </header>

          <main className="legal-main">
            <article className="legal-card glass-light motion-slide-in-up motion-delay-100">
              {/* 引言 */}
              <h2>{copyright.title.value}</h2>
              <p>{copyright.intro.value}</p>

              <div className="legal-divider" />

              {/* 各章节 */}
              {copyright.sections.map((section, index) => (
                <section key={index}>
                  <h3>{section.title.value}</h3>
                  <p>{section.content.value}</p>
                </section>
              ))}

              <div className="legal-divider" />

              {/* 联系信息 */}
              <div className="legal-contact">
                <h4>{copyright.contact.title.value}</h4>
                <div className="legal-contact-item">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>{copyright.contact.email}</span>
                </div>
                <div className="legal-contact-item">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{copyright.contact.phone}</span>
                </div>
              </div>

              {/* 页脚声明 */}
              <div className="legal-footer">
                <p>© 2026 EduChain. All rights reserved.</p>
              </div>
            </article>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
