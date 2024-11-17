import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./ui/globals.css";

const geistSans = localFont({
  src: "./ui/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
    { media: "(prefers-color-scheme: light)", color: "white" }
  ],
}

const siteConfig = {
  title: 'VulcanTunes',
  description: "The place to buy innovative audio connectivity options for the Kawasaki Vulcan motorcycle",
  url: "https://vulcantunes.com",
  iconUrl: "/vulcantunes-icon.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  applicationName: siteConfig.title,
  generator: "Next.js",
  keywords: ["Kawasaki Vulcan", "motorcycle audio", "bluetooth motorcycle", "motorcycle connectivity", "Vulcan accessories"],
  robots: "index, follow",
  icons: "/vulcantunes-icon.png",
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [{
      url: siteConfig.iconUrl,
      alt: "VulcanTunes.com logo - Your ride just got better",
    }],
    locale: "en_US",
  },
  category: "business",
  creator: "Lucas Schultz: https://wyomingschultz.com/resume/",
  publisher: siteConfig.title,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
