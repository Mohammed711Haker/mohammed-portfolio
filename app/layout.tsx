import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cairo = Cairo({ variable: "--font-ar", subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Mohammed Abdullah Hussein Humaidhah" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, alt: "Mohammed Humaidhah" }],
    locale: "en_US",
    alternateLocale: ["ar"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#060a13",
  width: "device-width",
  initialScale: 1,
};

/*
 * Runs before first paint:
 *  - applies the saved theme (no theme flash)
 *  - applies the saved / browser language and direction, and hides the page
 *    until React has rendered that language (no LTR→RTL flash). A timeout
 *    un-hides the page even if JavaScript fails later.
 *  - decides whether to show the boot intro (once per tab, never with reduced motion)
 */
const bootScript = `(function(){var d=document.documentElement;
try{d.setAttribute("data-theme",localStorage.getItem("theme")||"dark")}catch(e){d.setAttribute("data-theme","dark")}
try{var l=localStorage.getItem("lang");if(l!=="ar"&&l!=="en"){l=(navigator.language||"").slice(0,2)==="ar"?"ar":"en"}
if(l==="ar"){d.lang="ar";d.dir="rtl";d.setAttribute("data-lpend","ar");setTimeout(function(){d.removeAttribute("data-lpend")},2500)}}catch(e){}
try{var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!rm&&!sessionStorage.getItem("booted"))d.setAttribute("data-boot","1")}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
