'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Ruler, Gem } from 'lucide-react';
import { getArtifactDetail, ArtifactDetailFull } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dac-backend-list.vercel.app';

export default function ArtifactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const artifactId = Number(params.id as string);

  const [artifact, setArtifact] = useState<ArtifactDetailFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // 验证文物ID是否有效
        if (isNaN(artifactId) || artifactId <= 0) {
          setError('无效的文物ID');
          return;
        }
        
        const res = await getArtifactDetail(artifactId);
        if (res.code === 0) {
          setArtifact(res.data);
        } else {
          setError('文物不存在');
        }
      } catch {
        setError('加载失败，请检查后端服务是否启动');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [artifactId]);

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

  if (error || !artifact) {
    return (
      <div className="min-h-screen heritage-pattern flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{error || '文物不存在'}</h1>
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
                  <p className="text-sm text-gray-500">文物详情 - {artifact.name}</p>
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
        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-center min-h-[500px]">
              {artifact.images && artifact.images.length > 0 ? (
                <div className="w-full">
                  <div className="bg-gray-50 rounded-xl flex items-center justify-center min-h-[400px] overflow-hidden">
                    <img
                      src={`${API_BASE_URL}${artifact.images[currentImageIndex]}`}
                      alt={artifact.name}
                      className="max-w-full max-h-[400px] object-contain"
                    />
                  </div>
                  {artifact.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {artifact.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === currentImageIndex ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <img
                            src={`${API_BASE_URL}${img}`}
                            alt={`${artifact.name} ${idx + 1}`}
                            className="w-full h-full object-contain bg-gray-50"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-9xl text-blue-200">🏺</span>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 font-chinese">{artifact.name}</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="glass-btn-sm px-4 py-2 text-sm">
                    {artifact.dynasty_name}
                  </span>
                  <span className="glass-btn-sm px-4 py-2 text-sm">
                    {artifact.category_name}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">{artifact.description}</p>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                {artifact.period && (
                  <div className="flex items-start space-x-4">
                    <Calendar className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">年代</h4>
                      <p className="text-gray-500">{artifact.period}</p>
                    </div>
                  </div>
                )}

                {artifact.material && (
                  <div className="flex items-start space-x-4">
                    <Gem className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">材质</h4>
                      <p className="text-gray-500">{artifact.material}</p>
                    </div>
                  </div>
                )}

                {artifact.size && (
                  <div className="flex items-start space-x-4">
                    <Ruler className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">尺寸</h4>
                      <p className="text-gray-500">{artifact.size}</p>
                    </div>
                  </div>
                )}

                {artifact.location && (
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">出土地点</h4>
                      <p className="text-gray-500">{artifact.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {artifact.related && artifact.related.length > 0 && (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-chinese">相关文物</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {artifact.related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/dynasty/${artifact.dynasty_id}/${artifact.category_id}/${item.id}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all border border-gray-100 hover:border-blue-200">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 font-chinese">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{artifact.category_name} · {artifact.dynasty_name}</p>
                    </div>
                  </Link>
                ))}
              </div>
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
