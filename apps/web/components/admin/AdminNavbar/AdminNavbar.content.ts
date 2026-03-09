import { type Dictionary, t } from 'intlayer';

const adminNavbarContent = {
  key: 'admin-navbar',
  content: {
    dashboard: t({
      'zh-CN': '仪表盘',
      en: 'Dashboard',
    }),
    users: t({
      'zh-CN': '用户管理',
      en: 'Users',
    }),
    content: t({
      'zh-CN': '内容管理',
      en: 'Content',
    }),
    categories: t({
      'zh-CN': '分类管理',
      en: 'Categories',
    }),
    settings: t({
      'zh-CN': '系统设置',
      en: 'Settings',
    }),
    searchPlaceholder: t({
      'zh-CN': '搜索用户、内容...',
      en: 'Search...',
    }),
    profile: t({
      'zh-CN': '个人资料',
      en: 'Profile',
    }),
    logout: t({
      'zh-CN': '退出登录',
      en: 'Logout',
    }),
    theme: t({
      'zh-CN': '主题',
      en: 'Theme',
    }),
    // 无障碍相关
    mainNavigation: t({
      'zh-CN': '管理员导航',
      en: 'Admin navigation',
    }),
    searchLabel: t({
      'zh-CN': '搜索',
      en: 'Search',
    }),
    clearSearch: t({
      'zh-CN': '清除搜索',
      en: 'Clear search',
    }),
    searchSuggestions: t({
      'zh-CN': '搜索建议',
      en: 'Search suggestions',
    }),
    pressEnterToSearch: t({
      'zh-CN': '按 Enter 搜索',
      en: 'Press Enter to search',
    }),
    userMenu: t({
      'zh-CN': '用户菜单',
      en: 'User menu',
    }),
    openMenu: t({
      'zh-CN': '打开菜单',
      en: 'Open menu',
    }),
    closeMenu: t({
      'zh-CN': '关闭菜单',
      en: 'Close menu',
    }),
    mobileMenu: t({
      'zh-CN': '移动端菜单',
      en: 'Mobile menu',
    }),
    mobileNavigation: t({
      'zh-CN': '移动端导航',
      en: 'Mobile navigation',
    }),
  },
} satisfies Dictionary;

export default adminNavbarContent;
