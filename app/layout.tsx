import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bwGradual = localFont({
  src: [
    {
      path: "../public/fonts/BwGradualDEMO-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BwGradualDEMO-Bold.woff2",
      weight: "700",
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
      <body className={`${roboto.variable} ${bwGradual.variable} antialiased`}>{children}</body>
    </html>
  );
}
