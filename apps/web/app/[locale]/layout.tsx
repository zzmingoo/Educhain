import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { ErrorBoundary, MockIndicator } from "../../components/common";
import { MockProvider } from "../../components/providers";
import { AuthProvider } from "../../src/contexts/auth-context";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <IntlayerClientProvider locale={locale}>
      <html 
        lang={locale} 
        dir={getHTMLTextDir(locale)} 
        suppressHydrationWarning
        data-scroll-behavior="smooth"
      >
        <head>
          {/* Favicon and Icons */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
          <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
          
          {/* PWA Manifest */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* Theme and SEO */}
          <meta name="theme-color" content="#000000" />
          <meta name="msapplication-TileColor" content="#000000" />
          
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    var initialTheme = theme || systemTheme;
                    if (initialTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    }
                  } catch (e) {}
                })();
              `,
            }}
          />
        </head>
        <body suppressHydrationWarning>
          <AuthProvider>
            <MockProvider>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
              <MockIndicator />
            </MockProvider>
          </AuthProvider>
        </body>
      </html>
    </IntlayerClientProvider>
  );
};

export default LocaleLayout;




