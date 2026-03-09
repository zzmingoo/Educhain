'use client';

import Link from 'next/link';
import { useIntlayer, useLocale } from 'next-intlayer';
import { getLocalizedUrl } from '@/lib/i18n-utils';
import './Footer.css';

export default function Footer() {
  const content = useIntlayer('footer');
  const { locale } = useLocale();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: content.links.knowledge.value, path: '/product/knowledge' },
      { label: content.links.search.value, path: '/product/search' },
      { label: content.links.recommendations.value, path: '/product/recommendation' },
      { label: content.links.community.value, path: '/product/community' },
    ],
    company: [
      { label: content.links.about.value, path: '/company/about' },
      { label: content.links.contact.value, path: '/company/contact' },
      { label: content.links.careers.value, path: '/company/careers' },
      { label: content.links.partners.value, path: '/company/partners' },
    ],
    resources: [
      { label: content.links.help.value, path: '/resources/help' },
      { label: content.links.docs.value, path: '/resources/docs' },
      { label: content.links.api.value, path: '/resources/api-docs' },
      { label: content.links.changelog.value, path: '/resources/changelog' },
    ],
    legal: [
      { label: content.links.terms.value, path: '/legal/terms' },
      { label: content.links.privacy.value, path: '/legal/privacy' },
      { label: content.links.copyright.value, path: '/legal/copyright' },
      { label: content.links.disclaimer.value, path: '/legal/disclaimer' },
    ],
  };

  const socialLinks = [
    { icon: 'github', label: 'GitHub', url: 'https://github.com/zzmingoo/educhain' },
    { icon: 'twitter', label: 'Twitter', url: 'https://twitter.com/zzmingoo' },
    { icon: 'qq', label: 'QQ: 2622085435', url: 'tencent://message/?uin=2622085435&Site=&Menu=yes', copyText: '2622085435' },
    { icon: 'mail', label: '邮箱', url: 'mailto:ozemyn@icloud.com' },
  ];

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case 'github':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'qq':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 1.39-2.988 1.39-2.988 0 2.032.968 5.279 2.968 5.279 0 0-.766-1.216-.766-2.063 0-1.186 1.07-2.799 1.07-2.799s1.001 3.744 5.17 3.744c4.169 0 5.17-3.744 5.17-3.744s1.07 1.613 1.07 2.799c0 .847-.766 2.063-.766 2.063 2 0 2.968-3.247 2.968-5.279 0 0 .85 3.053 1.39 2.988.252-.03.583-1.39-.438-4.673z"/>
          </svg>
        );
      case 'mail':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* 主要内容区 */}
        <div className="footer-main">
          {/* 品牌信息 */}
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="logo-text">{content.brand.name.value}</span>
            </div>
            <p className="brand-description">{content.brand.description.value}</p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  title={social.label}
                  onClick={(e) => {
                    if (social.copyText) {
                      e.preventDefault();
                      navigator.clipboard.writeText(social.copyText).then(() => {
                        alert(`QQ号 ${social.copyText} 已复制到剪贴板`);
                      });
                    }
                  }}
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* 链接区域 */}
          <div className="footer-links">
            <div className="footer-section">
              <h3 className="section-title">{content.sections.product.value}</h3>
              <ul className="link-list">
                {footerLinks.product.map((link) => (
                  <li key={link.path}>
                    <Link href={getLocalizedUrl(link.path, locale)} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="section-title">{content.sections.company.value}</h3>
              <ul className="link-list">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link href={getLocalizedUrl(link.path, locale)} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="section-title">{content.sections.resources.value}</h3>
              <ul className="link-list">
                {footerLinks.resources.map((link) => (
                  <li key={link.path}>
                    <Link href={getLocalizedUrl(link.path, locale)} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="section-title">{content.sections.legal.value}</h3>
              <ul className="link-list">
                {footerLinks.legal.map((link) => (
                  <li key={link.path}>
                    <Link href={getLocalizedUrl(link.path, locale)} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="footer-bottom">
          <div className="copyright">
            <span>© {currentYear} EduChain. All rights reserved.</span>
            <span className="divider">|</span>
            <span className="made-with">
              Made with <span className="heart">❤️</span> by EduChain Team
            </span>
          </div>
          <div className="footer-meta">
            <span>{content.icp.value}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
