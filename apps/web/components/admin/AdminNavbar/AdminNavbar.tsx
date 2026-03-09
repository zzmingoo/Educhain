'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useIntlayer, useLocale } from 'next-intlayer';
import { getLocalizedUrl } from '@/lib/i18n-utils';
import { useRouter, usePathname } from 'next/navigation';
import { LocaleSwitcher } from '../../LocaleSwitcher/LocaleSwitcher';
import { ThemeSwitcher } from '../../ThemeSwitcher/ThemeSwitcher';
import { useAuth } from '../../../src/contexts/auth-context';
import './AdminNavbar.css';

export default function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const content = useIntlayer('admin-navbar');
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // 检查链接是否激活
  const isLinkActive = useCallback((path: string) => {
    if (!pathname) return false;
    
    // 标准化路径，移除尾部斜杠
    const normalizedPathname = pathname.endsWith('/') && pathname !== '/' 
      ? pathname.slice(0, -1) 
      : pathname;
    
    if (path === '/admin') {
      // 仪表盘匹配：精确匹配 /admin 或 /locale/admin
      return normalizedPathname === `/${locale}/admin` || normalizedPathname === '/admin';
    }
    
    // 其他页面：检查是否以该路径开头
    return normalizedPathname === `/${locale}${path}` || 
           normalizedPathname.startsWith(`/${locale}${path}/`);
  }, [pathname, locale]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击外部关闭搜索
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // 搜索处理
  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    // 管理员搜索逻辑
    console.log('Admin search:', query);
    setSearchOpen(false);
    setSearchQuery('');
  }, []);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  }, [searchQuery, handleSearch]);

  // 点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    router.push(getLocalizedUrl('/', locale));
  };

  // 管理员导航链接
  const navLinks = [
    { key: 'dashboard', label: content.dashboard.value, path: '/admin' },
    { key: 'users', label: content.users.value, path: '/admin/users' },
    { key: 'content', label: content.content.value, path: '/admin/content' },
    { key: 'categories', label: content.categories.value, path: '/admin/categories' },
    { key: 'settings', label: content.settings.value, path: '/admin/settings' },
  ];

  return (
    <>
      <nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label={String(content.mainNavigation?.value || 'Admin navigation')}
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="navbar-container">
          {/* 左侧区域：Logo + 搜索 */}
          <div className="navbar-left">
            <Link href={getLocalizedUrl('/admin', locale)} className="navbar-logo">
              <span className="navbar-logo-text">
                <span className="logo-edu">Edu</span>
                <span className="logo-chain">Chain</span>
              </span>
            </Link>

            {/* 导航栏搜索框 */}
            <div 
              className="navbar-search desktop-only" 
              ref={searchRef}
              role="search"
              aria-label={String(content.searchLabel?.value || 'Search')}
            >
              <div className={`navbar-search-wrapper ${searchOpen ? 'focused' : ''}`}>
                <svg 
                  className="navbar-search-icon" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder={String(content.searchPlaceholder?.value || '搜索...')}
                  className="navbar-search-input"
                  aria-label={String(content.searchPlaceholder?.value || '搜索')}
                  aria-expanded={searchOpen}
                  aria-controls="search-suggestions"
                  aria-autocomplete="list"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="navbar-search-clear"
                    aria-label={String(content.clearSearch?.value || 'Clear search')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 中间导航链接 - 绝对居中 */}
          <div className="navbar-nav desktop-only" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={getLocalizedUrl(link.path, locale)}
                className={`navbar-link ${isLinkActive(link.path) ? 'active' : ''}`}
                role="menuitem"
                aria-current={isLinkActive(link.path) ? 'page' : undefined}
                itemProp="url"
              >
                <span itemProp="name">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <div className="desktop-only">
              <ThemeSwitcher />
            </div>

            <div className="desktop-only">
              <LocaleSwitcher />
            </div>

            {user && (
              <>
                <div className="user-menu-container">
                  {/* 桌面端用户按钮 */}
                  <button 
                    className="navbar-user-btn desktop-only"
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      if (!userMenuOpen) {
                        setMobileMenuOpen(false);
                      }
                    }}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="menu"
                    aria-label={String(content.userMenu?.value || 'User menu')}
                  >
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt="" 
                        className="user-avatar"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div 
                      className={`user-avatar-placeholder ${user.avatarUrl ? 'hidden' : ''}`}
                      aria-hidden="true"
                    >
                      {(user.fullName || user.username).charAt(0).toUpperCase()}
                    </div>
                    <span className="user-name">{user.fullName || user.username}</span>
                  </button>

                  {/* 移动端用户按钮 - 点击后变成关闭按钮 */}
                  <button
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      if (!userMenuOpen) {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="navbar-mobile-btn navbar-user-mobile-btn mobile-only"
                    aria-expanded={userMenuOpen}
                    aria-controls="user-mobile-menu"
                    aria-label={userMenuOpen 
                      ? String(content.closeMenu?.value || 'Close menu') 
                      : String(content.userMenu?.value || 'User menu')
                    }
                  >
                    {userMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <>
                        {user.avatarUrl ? (
                          <img 
                            src={user.avatarUrl} 
                            alt="" 
                            className="user-avatar-mobile"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div 
                          className={`user-avatar-placeholder-mobile ${user.avatarUrl ? 'hidden' : ''}`}
                          aria-hidden="true"
                        >
                          {(user.fullName || user.username).charAt(0).toUpperCase()}
                        </div>
                      </>
                    )}
                  </button>
                  
                  {userMenuOpen && (
                    <>
                      {/* 桌面端下拉菜单 */}
                      <div className="user-dropdown desktop-only" role="menu" aria-label={String(content.userMenu?.value || 'User menu')}>
                        <Link 
                          href={getLocalizedUrl('/user/profile', locale)} 
                          className="dropdown-item"
                          onClick={() => setUserMenuOpen(false)}
                          role="menuitem"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {content.profile.value}
                        </Link>
                        <div className="dropdown-divider" role="separator"></div>
                        <button className="dropdown-item logout-item" onClick={handleLogout} role="menuitem">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          {content.logout.value}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {/* 汉堡菜单按钮 */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) {
                  setUserMenuOpen(false);
                }
              }}
              className="navbar-mobile-btn mobile-only"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen 
                ? String(content.closeMenu?.value || 'Close menu') 
                : String(content.openMenu?.value || 'Open menu')
              }
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 移动端用户菜单 - 与汉堡菜单完全相同的样式 */}
      {userMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay mobile-only"
            onClick={() => setUserMenuOpen(false)}
            aria-hidden="true"
          />
          
          <div 
            id="user-mobile-menu"
            className="mobile-menu-container mobile-only"
            role="dialog"
            aria-modal="true"
            aria-label={String(content.userMenu?.value || 'User menu')}
          >
            <div className="mobile-menu-content">
              <nav className="mobile-nav-section" role="navigation">
                <div className="mobile-nav-list">
                  <Link 
                    href={getLocalizedUrl('/user/profile', locale)} 
                    className="mobile-nav-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {content.profile.value}
                  </Link>
                </div>
              </nav>

              <div className="mobile-actions-section">
                <button 
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  {content.logout.value}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 移动端汉堡菜单 */}
      {mobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay mobile-only"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          <div 
            id="mobile-menu"
            className="mobile-menu-container mobile-only"
            role="dialog"
            aria-modal="true"
            aria-label={String(content.mobileMenu?.value || 'Mobile menu')}
          >
            <div className="mobile-menu-content">
              <nav className="mobile-nav-section" role="navigation" aria-label={String(content.mobileNavigation?.value || 'Mobile navigation')}>
                <div className="mobile-nav-list">
                  {navLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={getLocalizedUrl(link.path, locale)}
                      className={`mobile-nav-item ${isLinkActive(link.path) ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isLinkActive(link.path) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="mobile-actions-section">
                <div className="mobile-settings-row">
                  <div className="mobile-settings-controls">
                    <ThemeSwitcher />
                    <LocaleSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
