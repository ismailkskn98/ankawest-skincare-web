import localFont from "next/font/local";

const ppMori = localFont({
  src: [
    {
      path: "../../fonts/ppmori-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/ppmori-semibold.woff2",
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
      path: "../../fonts/ppeditorialold-ultralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../fonts/ppeditorialold-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pp-editorial",
  display: "swap",
  preload: true,
});

export default function SiteLayout({ children }) {
  return (
    <div className={`${ppMori.variable} ${ppEditorial.variable}`}>
      {children}
    </div>
  );
}
