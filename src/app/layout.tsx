import type { Metadata } from "next";
import { Manrope, Noto_Serif_SC } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoSerifSc = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kinaskolan.se"),
  title: "瑞青中文学校 | Kinaskolan",
  description:
    "斯德哥尔摩瑞青中文学校官网，提供学校简介、新闻、学生作品、汉考信息和联系方式。",
  openGraph: {
    title: "瑞青中文学校 | Kinaskolan",
    description:
      "斯德哥尔摩瑞青中文学校官网，提供学校简介、新闻、学生作品、汉考信息和联系方式。",
    images: [
      {
        url: "/original/sodralatin.jpg",
        width: 1600,
        height: 1067,
        alt: "Södra Latins Gymnasium",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "瑞青中文学校 | Kinaskolan",
    description:
      "斯德哥尔摩瑞青中文学校官网，提供学校简介、新闻、学生作品、汉考信息和联系方式。",
    images: ["/original/sodralatin.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className={`${manrope.variable} ${notoSerifSc.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
