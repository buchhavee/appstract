import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CookieConsent from "@/components/ui/CookieConsent";
import { SpeedInsights } from "@vercel/speed-insights/next";

const bwGradual = localFont({
  src: [
    {
      path: "../public/fonts/BwGradualDEMO-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/BwGradualDEMO-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BwGradualDEMO-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BwGradualDEMO-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BwGradualDEMO-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-bw-gradual",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Appstract - Shared Shopping Experience",
  description: "Designed for shopping together. A native, real-time co-shopping experience embedded directly in your webshop.",
  keywords: ["shared shopping", "co-shopping", "ecommerce", "collaborative commerce"],
  authors: [{ name: "Appstract" }],
  metadataBase: new URL("https://appstract.vercel.app"),
  openGraph: {
    title: "Appstract - Shared Shopping Experience",
    description: "A native, real-time co-shopping experience embedded directly in your webshop.",
    url: "https://appstract.vercel.app",
    siteName: "Appstract",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Appstract - Shared Shopping Experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appstract - Shared Shopping Experience",
    description: "A native, real-time co-shopping experience embedded directly in your webshop.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo/logo-icon.svg",
    apple: "/images/logo/logo-icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Appstract",
  },
  other: {
    "theme-color": "#6D5EFC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bwGradual.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <CookieConsent />
        <SpeedInsights />
      </body>
    </html>
  );
}
