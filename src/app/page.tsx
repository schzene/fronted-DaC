'use client';

import Link from 'next/link';
import { Camera, Search, Database, Sparkles, Calendar, BookOpen } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Camera,
      title: '智能识别',
      description: '上传文物图片，AI自动识别文物类别和详细信息',
    },
    {
      icon: Search,
      title: '精准匹配',
      description: '基于深度学习特征提取，实现高精度文物匹配',
    },
    {
      icon: Database,
      title: '丰富数据库',
      description: '涵盖唐三彩、壁画、玉器、金银器等多种文物类别',
    },
    {
      icon: BookOpen,
      title: '文物图鉴',
      description: '收藏文物图片，查看套系集齐情况，参与互动评论',
    },
  ];

  const categories = [
    { id: 'tang', name: '唐代', count: '20件' },
    { id: 'song', name: '宋代', count: '等待添加' },
    { id: 'yuan', name: '元代', count: '等待添加' },
    { id: 'ming', name: '明代', count: '等待添加' },
  ];

  return (
    <div className="min-h-screen heritage-pattern">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-chinese">文物识别系统</h1>
                <p className="text-sm text-gray-500">文物智能识别平台</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="glass-btn-sm px-5 py-2 text-sm">
                首页
              </Link>
              <Link href="/recognize" className="glass-btn-sm px-5 py-2 text-sm">
                开始识别
              </Link>
              <Link href="/checkin" className="glass-btn-sm px-5 py-2 text-sm flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>每日签到</span>
              </Link>
              <Link href="/gallery" className="glass-btn-sm px-5 py-2 text-sm flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>文物图鉴</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 font-chinese">
            数存古韵
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8">
            文物识别与智慧展示系统，帮助您快速识别和了解珍贵文物
          </p>
          
          <Link
            href="/recognize"
            className="glass-btn inline-flex items-center space-x-2 px-8 py-4 text-lg"
          >
            <Camera className="w-6 h-6" />
            <span>立即识别文物</span>
          </Link>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12 font-chinese">
            核心功能
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-blue-500" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 font-chinese">
                  {feature.title}
                </h4>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12 font-chinese">
            朝代
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/dynasty/${category.id}`}
                className="group"
              >
                <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer group-hover:border-blue-200 transform hover:scale-105">
                  <h4 className="text-lg font-bold mb-2 font-chinese text-gray-900 group-hover:text-blue-600 transition-colors">{category.name}</h4>
                  <p className="text-sm text-gray-400">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8 font-chinese">
            使用指南
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">1</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 font-chinese">上传图片</h4>
              <p className="text-gray-500">拍摄或选择文物照片上传</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">2</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 font-chinese">AI识别</h4>
              <p className="text-gray-500">系统自动分析识别文物</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">3</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 font-chinese">查看结果</h4>
              <p className="text-gray-500">获取详细文物信息和介绍</p>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-white rounded-2xl p-4 shadow-xl overflow-hidden">
          <video
            src="https://image.0xc0de.top/file/1775901346003_16.mp4"
            autoPlay
            loop
            playsInline
            className="w-64 h-48 object-contain rounded-xl"
          />
        </div>
      </div>
      
      <footer className="bg-gray-50 text-gray-600 py-8 mt-16 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 文物识别系统 - 文物智能识别平台
          </p>
        </div>
      </footer>
    </div>
  );
}