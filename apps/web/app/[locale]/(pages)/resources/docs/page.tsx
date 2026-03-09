'use client';

import { useIntlayer } from 'next-intlayer';
import { useLocale } from 'next-intlayer';
import Link from 'next/link';
import { getLocalizedUrl } from '../../../../../src/lib/i18n-utils';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../resources.css';

export default function DocsPage() {
  const content = useIntlayer('resources');
  const docs = content.docs;
  const { locale } = useLocale();

  // SVG 图标
  const quickStartIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );

  const apiIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  );

  const sdkIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );

  const changelogIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  );

  const iconColors = [
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #10b981, #059669)',
  ];

  return (
    <>
      <Navbar />
      <div className="resources-page motion-fade-in">
        <div className="resources-content">
          {/* 页面头部 */}
          <header className="resources-header motion-slide-in-up">
            <h1><span className="text-gradient-pink">{docs.title.value}</span></h1>
            {docs.subtitle && <p className="resources-header-subtitle">{docs.subtitle.value}</p>}
            <p className="resources-header-desc">{docs.description.value}</p>
          </header>

          <main className="resources-main">
            {/* 快速链接 */}
            <div className="quick-links motion-slide-in-up motion-delay-100">
              <a href="#quickstart" className="quick-link glass-light motion-hover-lift">
                <div className="quick-link-icon" style={{ background: iconColors[0] }}>
                  {quickStartIcon}
                </div>
                <div>
                  <h4>{docs.quickStart.title.value}</h4>
                  <p>{docs.quickStart.description.value}</p>
                </div>
              </a>
              <Link href={getLocalizedUrl('/resources/api-docs', locale)} className="quick-link glass-light motion-hover-lift">
                <div className="quick-link-icon" style={{ background: iconColors[1] }}>
                  {apiIcon}
                </div>
                <div>
                  <h4>{docs.apiReference.title.value}</h4>
                  <p>{docs.apiReference.description.value}</p>
                </div>
              </Link>
              <a href="#sdk" className="quick-link glass-light motion-hover-lift">
                <div className="quick-link-icon" style={{ background: iconColors[2] }}>
                  {sdkIcon}
                </div>
                <div>
                  <h4>{docs.sdks.title.value}</h4>
                  <p>{docs.sdks.description.value}</p>
                </div>
              </a>
            </div>

            {/* 文档导航 */}
            <div className="docs-nav motion-slide-in-up motion-delay-200">
              <aside className="docs-sidebar">
                <nav className="docs-menu glass-light" style={{ padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-xl)' }}>
                  {docs.sections.map((section, sIndex) => (
                    <div key={sIndex} className="docs-menu-section">
                      <h3>{section.title.value}</h3>
                      {section.items.map((item, iIndex) => (
                        <a key={iIndex} href={item.href.value} className="docs-menu-item">
                          {item.title.value}
                        </a>
                      ))}
                    </div>
                  ))}
                </nav>
              </aside>

              <div className="docs-body">
                {/* 快速开始 */}
                <section id="quickstart" className="resources-card glass-light">
                  <h2>{docs.quickStart.title.value}</h2>
                  <p>{docs.quickStart.description.value}</p>
                  
                  <h3>{docs.installSdk.value}</h3>
                  <div className="code-block">
                    <pre><code>{docs.codeExample.value}</code></pre>
                  </div>
                </section>

                {/* 更多文档内容 */}
                <section className="resources-card glass-light">
                  <h2>{docs.nextSteps.title.value}</h2>
                  <p>{docs.nextSteps.description.value}</p>
                  <div className="quick-links" style={{ marginTop: 'var(--spacing-xl)' }}>
                    <Link href={getLocalizedUrl('/resources/api-docs', locale)} className="quick-link glass-light motion-hover-lift">
                      <div className="quick-link-icon" style={{ background: iconColors[1] }}>
                        {apiIcon}
                      </div>
                      <div>
                        <h4>{docs.apiDocs.title.value}</h4>
                        <p>{docs.apiDocs.description.value}</p>
                      </div>
                    </Link>
                    <Link href={getLocalizedUrl('/resources/changelog', locale)} className="quick-link glass-light motion-hover-lift">
                      <div className="quick-link-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                        {changelogIcon}
                      </div>
                      <div>
                        <h4>{docs.changelogLink.title.value}</h4>
                        <p>{docs.changelogLink.description.value}</p>
                      </div>
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
