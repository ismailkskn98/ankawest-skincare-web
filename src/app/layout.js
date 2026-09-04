import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { JsonLd } from "@/components/site/jsonLd";
import {
  SITE_ASSETS,
  SITE_DESCRIPTION,
  SITE_NAME,
  getSiteUrl,
  isIndexingAllowed,
} from "@/config/site";
import { buildSiteGraphSchema } from "@/lib/seo/schema";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ppMori = localFont({
  src: [
    {
      path: "../fonts/ppmori-extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/ppmori-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ppmori-semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-pp-mori",
  display: "swap",
  preload: true,
});

const canela = localFont({
  src: [
    {
      path: "../fonts/canela-font/Canela-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/canela-font/Canela-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/canela-font/Canela-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/canela-font/Canela-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-canela-face",
  display: "swap",
  preload: true,
});

const siteUrl = getSiteUrl();
const allowIndex = isIndexingAllowed();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Anka West Skincare",
    "GLUTANEX",
    "Exome",
    "Kore cilt bakımı",
    "cilt bakımı",
    "serum",
    "ampul",
    "nemlendirici",
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: allowIndex
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      }
    : {
        index: false,
        follow: false,
      },
  icons: {
    icon: [
      { url: SITE_ASSETS.faviconIco, sizes: "any" },
      { url: SITE_ASSETS.favicon48, sizes: "48x48", type: "image/png" },
      { url: SITE_ASSETS.favicon96, sizes: "96x96", type: "image/png" },
      { url: SITE_ASSETS.icon512, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: SITE_ASSETS.appleTouchIcon, sizes: "180x180", type: "image/png" }],
    shortcut: [SITE_ASSETS.faviconIco],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_ASSETS.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_ASSETS.ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "beauty",
};

const motionIntroGuardScript =
  "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.motionIntro='pending';}}catch{}";

const hideNativeScrollbarScript =
  "try{if(!location.pathname.startsWith('/admin')&&window.matchMedia('(min-width:64rem)').matches){document.documentElement.classList.add('hide-native-scrollbar');}}catch{}";

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${ppMori.variable} ${canela.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: motionIntroGuardScript }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: hideNativeScrollbarScript }}
        />
        <JsonLd data={buildSiteGraphSchema()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
