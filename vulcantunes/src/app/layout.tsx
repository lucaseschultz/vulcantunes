import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#171717" }, { media: "(prefers-color-scheme: light)", color: "white" }],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://vulcantunes.com"),
  title: {
    template: '%s | VulcanTunes',
    default: 'VulcanTunes',
  },
  description: "The place to buy innovative audio connectivity options for the Kawasaki Vulcan motorcycle",
  applicationName: "VulcanTunes",
  generator: "Next.js",
  keywords: ["Kawasaki Vulcan", "motorcycle audio", "bluetooth motorcycle", "motorcycle connectivity", "Vulcan accessories"],
  robots: "index, follow",
  icons: "/vulcantunes-icon.png",
  openGraph: {
    type: "website",
    url: "https://vulcantunes.com",
    title: "VulcanTunes",
    description: "The place to buy innovative audio connectivity options for the Kawasaki Vulcan motorcycle",
    siteName: "VulcanTunes",
    images: [{
      url: "/images/VulcanTunes.png",
      alt: "VulcanTunes.com logo - Your ride just got better",
    }],
    locale: "en_US",
  },
  category: "business",
  creator: "Lucas Schultz: https://wyomingschultz.com/resume/",
  publisher: "VulcanTunes",
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
