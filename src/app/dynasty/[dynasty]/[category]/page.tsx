'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, BookOpen } from 'lucide-react';

const categoryData: Record<string, {
  name: string;
  dynasty: string;
  artifacts: Array<{
    id: number;
    name: string;
    description: string;
    image?: string;
  }>;
}> = {
  TGS: {
    name: '唐三彩',
    dynasty: '唐代',
    artifacts: [
      { id: 10, name: '鹦鹉莲瓣纹金碗', description: '精美的唐代金碗，鹦鹉莲瓣纹装饰', image: '/placeholder.jpg' },
      { id: 11, name: '桃形花结八瓣银高足杯', description: '唐代银器精品，桃形花结装饰', image: '/placeholder.jpg' },
      { id: 14, name: '鎏金鹦鹉纹提梁银罐', description: '唐代银罐，鎏金工艺精湛', image: '/placeholder.jpg' },
    ],
  },
  BH: {
    name: '壁画',
    dynasty: '唐代',
    artifacts: [
      { id: 20, name: '飞天壁画', description: '唐代飞天壁画，展现佛教艺术', image: '/placeholder.jpg' },
      { id: 21, name: '狩猎图壁画', description: '唐代贵族狩猎场景', image: '/placeholder.jpg' },
    ],
  },
  YQ: {
    name: '玉器',
    dynasty: '唐代',
    artifacts: [
      { id: 30, name: '白玉龙纹佩', description: '精美玉佩，龙纹雕刻', image: '/placeholder.jpg' },
    ],
  },
  JYQ: {
    name: '金银器',
    dynasty: '唐代',
    artifacts: [
      { id: 40, name: '金步摇', description: '唐代女性饰品', image: '/placeholder.jpg' },
      { id: 41, name: '银香囊', description: '唐代香具', image: '/placeholder.jpg' },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const dynastyId = params.dynasty as string;
  const categoryId = params.category as string;
  
  const category = categoryData[categoryId];
  
  if (!category) {
    return (
      <div className="min-h-screen heritage-pattern flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">文物类别不存在</h1>
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
                  <p className="text-sm text-gray-500">{category.name} - 文物列表</p>
                </div>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="glass-btn-sm px-5 py-2 text-sm">首页</Link>
              <Link href="/recognize" className="glass-btn-sm px-5 py-2 text-sm">开始识别</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 font-chinese">{category.name}</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              {category.dynasty}{category.name}文物共 {category.artifacts.length} 件
            </p>
          </div>

          {category.artifacts.length === 0 ? (
            <div className="text-center py-20">
              <Eye className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-chinese">暂无文物</h3>
              <p className="text-gray-400">该类别的文物资料正在整理中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.artifacts.map((artifact) => (
                <Link
                  key={artifact.id}
                  href={`/dynasty/${dynastyId}/category/${categoryId}/artifact/${artifact.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200 transform hover:scale-105 h-full">
                    <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                        <span className="text-6xl text-blue-200">🏺</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-chinese group-hover:text-blue-600 transition-colors">
                        {artifact.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{artifact.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-500">ID: {artifact.id}</span>
                        <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
                          查看详情 →
                        </span>
                      </div>
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