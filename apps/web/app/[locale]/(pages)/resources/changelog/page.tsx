'use client';

import { useState } from 'react';
import { useIntlayer } from 'next-intlayer';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../resources.css';

export default function ChangelogPage() {
  const content = useIntlayer('resources');
  const changelog = content.changelog;
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`已订阅: ${email}`);
    setEmail('');
  };

  return (
    <>
      <Navbar />
      <div className="resources-page motion-fade-in">
        <div className="resources-content">
          {/* 页面头部 */}
          <header className="resources-header motion-slide-in-up">
            <h1><span className="text-gradient-pink">{changelog.title.value}</span></h1>
            {changelog.subtitle && <p className="resources-header-subtitle">{changelog.subtitle.value}</p>}
            <p className="resources-header-desc">{changelog.description.value}</p>
          </header>

          <main className="resources-main">
            {/* 版本列表 */}
            <div className="changelog-list">
              {changelog.versions.map((version, index) => {
                const versionType = version.type.value as 'major' | 'minor' | 'patch';
                return (
                  <article 
                    key={index} 
                    className="changelog-item glass-light motion-slide-in-up" 
                    style={{ animationDelay: `${100 + index * 100}ms` }}
                  >
                    <div className="changelog-version">
                      <h3>v{version.version.value}</h3>
                      <span className="changelog-date">{version.date.value}</span>
                      <span className={`changelog-tag ${versionType}`}>
                        {changelog.versionLabels[versionType].value}
                      </span>
                    </div>
                    <ul className="changelog-changes">
                      {version.changes.map((change, cIndex) => {
                        const changeType = change.type.value as 'new' | 'improved' | 'fixed';
                        return (
                          <li key={cIndex}>
                            <span className={`change-type ${changeType}`}>
                              {changelog.typeLabels[changeType].value}
                            </span>
                            {change.text.value}
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })}
            </div>

            {/* 订阅更新 */}
            <section className="resources-card glass-medium motion-slide-in-up motion-delay-500" style={{ textAlign: 'center' }}>
              <h2>{changelog.subscribe.title.value}</h2>
              <p>{changelog.subscribe.description.value}</p>
              <form onSubmit={handleSubscribe} className="subscribe-form">
                <input
                  type="email"
                  placeholder={changelog.subscribe.placeholder.value}
                  className="subscribe-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="subscribe-button motion-hover-lift">
                  {changelog.subscribe.button.value}
                </button>
              </form>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
