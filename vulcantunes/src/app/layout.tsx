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
  initialScale: 1
}

export const metadata: Metadata = {
  metadataBase: new URL("https://vulcantunes.com"),
  title: {
    template: '%s | VulcanTunes',
    default: 'VulcanTunes',
  },
  description: "The place to buy innovative audio connectivity options for the Kawasaki Vulcan motorcycle",
  applicationName: "VulcanTunes",
  authors: [{ name: "Lucas Schultz", url: "https://wyomingschultz.com/resume/"}],
  generator: "Next.js",
  keywords: ["Kawasaki Vulcan", "motorcycle audio", "bluetooth motorcycle", "motorcycle connectivity", "Vulcan accessories"],
  robots: "index, follow",
  icons: "/schultz-creations.jpg",
  openGraph: {
    type: "website",
    url: "https://vulcantunes.com",
    title: "VulcanTunes",
    description: "The place to buy innovative audio connectivity options for the Kawasaki Vulcan motorcycle",
    siteName: "VulcanTunes",
    image: "/images/VulcanTunes.png",
    locale: "en_US",
  },

};

//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     siteName: "VulcanTunes",
//     title: "VulcanTunes",
//     description: "The place to buy innovative audio connectivity options for the Kawasaki Vulcan motorcycle",
//   },


// Additional metadata fields that would be valuable but require specific information:
//
//     manifest: Web app manifest URL
// themeColor: Brand color for browser UI
// openGraph.images: OG images for social sharing
// verification: Google Search Console and other verification tokens
// alternates: Alternative language versions if site is multilingual
// category: Business category
// creator: Company/developer name
// publisher: Publishing entity name


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
