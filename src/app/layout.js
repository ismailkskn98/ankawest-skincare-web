import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
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

const ppEditorial = localFont({
  src: [
    {
      path: "../fonts/ppeditorialold-ultralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/ppeditorialold-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-editorial",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: {
    default: "Anka West Skincare",
    template: "%s | Anka West Skincare",
  },
  description:
    "Anka West Skincare ürünleri ve marka içerikleri için resmi web sitesi.",
  robots: {
    index: false,
    follow: false,
  },
};

const motionIntroGuardScript =
  "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.motionIntro='pending';}}catch{}";

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${ppMori.variable} ${ppEditorial.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: motionIntroGuardScript }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
