import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bwGradual.variable} font-sans antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}
