import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cairo = Cairo({ variable: "--font-ar", subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: "Mohammed Humaidhah — IT Student & Full-Stack Developer",
  description:
    "Interactive portfolio of Mohammed Abdullah Hussein Humaidhah — Yemeni IT student at UIN Salatiga, Indonesia. Next.js, Flutter, Python, IoT and cybersecurity.",
  openGraph: {
    title: "Mohammed Humaidhah — IT Student & Full-Stack Developer",
    description: "Projects, skills and journey of a Yemeni IT student in Indonesia.",
    images: ["/mohammed-humaidhah.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060a13",
  width: "device-width",
  initialScale: 1,
};

// Runs before hydration so the saved theme never flashes.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t||"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
