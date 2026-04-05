import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '文物识别系统 - 唐代文物智能识别',
  description: '基于深度学习的唐代文物智能识别系统，支持唐三彩、壁画、玉器、金银器等多种文物类别的识别',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
