import type { ReactNode } from 'react';
import type { Metadata, Viewport } from "next";
import "./ui/globals.css";
import ClientSessionProvider from '@/src/app/ui/layout/client-session-provider';
import { ThemeProvider } from 'next-themes';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
    { media: "(prefers-color-scheme: light)", color: "white" }
  ],
  colorScheme: "light dark"
} satisfies Viewport

const siteConfig = {
  title: 'VulcanTunes',
  description: "The place to buy innovative audio connectivity options for the Kawasaki Vulcan motorcycle",
  url: "https://vulcantunes.com",
  iconUrl: "/vulcantunes-icon.png",
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  applicationName: siteConfig.title,
  generator: "Next.js",
  keywords: ["Kawasaki Vulcan", "motorcycle audio", "bluetooth motorcycle", "motorcycle connectivity", "Vulcan accessories"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: siteConfig.iconUrl,
    apple: siteConfig.iconUrl,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [{
      url: siteConfig.iconUrl,
      alt: "VulcanTunes.com logo - Your ride just got better",
      width: 1200,
      height: 630,
    }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: siteConfig.iconUrl,
  },
  category: "business",
  creator: "Lucas Schultz: https://wyomingschultz.com/resume/",
  publisher: siteConfig.title,
} satisfies Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClientSessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClientSessionProvider>
  );
}