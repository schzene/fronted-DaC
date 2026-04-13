'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Database, Sparkles, Calendar, BookOpen } from 'lucide-react';

const dynastyData: Record<string, {
  name: string;
  categories: Array<{
    id: string;
    name: string;
    count: number;
    description: string;
  }>;
}> = {
  tang: {
    name: '唐代',
    categories: [
      { id: 'TGS', name: '唐三彩', count: 7, description: '唐代三彩釉陶器，包括人物俑、动物俑等' },
      { id: 'BH', name: '壁画', count: 5, description: '唐代墓葬壁画，展现当时艺术水平' },
      { id: 'YQ', name: '玉器', count: 5, description: '精美玉器，工艺精湛' },
      { id: 'JYQ', name: '金银器', count: 5, description: '金银器皿和饰品' },
    ],
  },
  song: {
    name: '宋代',
    categories: [],
  },
  yuan: {
    name: '元代',
    categories: [],
  },
  ming: {
    name: '明代',
    categories: [],
  },
};

export default function DynastyPage() {
  const params = useParams();
  const router = useRouter();
  const dynastyId = params.dynasty as string;
  
  const dynasty = dynastyData[dynastyId];
  
  if (!dynasty) {
    return (
      <div className="min-h-screen heritage-pattern flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">朝代不存在</h1>
          <Link href="/" className="glass-btn-sm px-5 py-2 text-sm">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen heritage-pattern">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.back()}
                className="glass-btn-sm px-4 py-2 text-sm flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回</span>
              </button>
              <div className="flex items-center space-x-3">
                <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-chinese">文物识别系统</h1>
                  <p className="text-sm text-gray-500">{dynasty.name} - 文物类别</p>
                </div>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="glass-btn-sm px-5 py-2 text-sm">首页</Link>
              <Link href="/recognize" className="glass-btn-sm px-5 py-2 text-sm">开始识别</Link>
              <Link href="/gallery" className="glass-btn-sm px-5 py-2 text-sm flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>文物图鉴</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 font-chinese">{dynasty.name}文物</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              探索{dynasty.name}的珍贵文物，了解历史文化
            </p>
          </div>

          {dynasty.categories.length === 0 ? (
            <div className="text-center py-20">
              <Database className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-chinese">等待添加</h3>
              <p className="text-gray-400">该朝代的文物资料正在整理中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dynasty.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/dynasty/${dynastyId}/category/${category.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200 transform hover:scale-105 h-full">
                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-chinese">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-500 font-medium">
                        {category.count} 件文物
                      </span>
                      <span className="text-xs text-gray-400">点击查看 →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-50 text-gray-600 py-8 mt-16 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 文物识别系统 - 文物智能识别平台</p>
        </div>
      </footer>
    </div>
  );
}