'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, BookOpen } from 'lucide-react';
import { getCategoryDetail, ArtifactListItem, CategoryInfo } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-dc.0xc0de.top:34859';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const dynastyId = params.dynasty as string;
  const categoryId = params.category as string;

  const [category, setCategory] = useState<(CategoryInfo & { dynasty_name: string; artifacts: ArtifactListItem[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getCategoryDetail(categoryId);
        if (res.code === 0) {
          setCategory(res.data);
        } else {
          setError('文物类别不存在');
        }
      } catch {
        setError('加载失败，请检查后端服务是否启动');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen heritage-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen heritage-pattern flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{error || '文物类别不存在'}</h1>
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
              {category.dynasty_name}{category.name}文物共 {category.artifacts.length} 件
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
                  href={`/dynasty/${dynastyId}/${categoryId}/${Number(artifact.id)}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200 transform hover:scale-105 h-full">
                    <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center overflow-hidden">
                      {artifact.image ? (
                        <img
                          src={`${API_BASE_URL}${artifact.image}`}
                          alt={artifact.name}
                          className="w-full h-full object-contain bg-gray-50"
                        />
                      ) : (
                        <span className="text-6xl text-blue-200">🏺</span>
                      )}
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
