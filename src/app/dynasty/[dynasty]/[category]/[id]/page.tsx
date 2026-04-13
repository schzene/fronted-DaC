'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Ruler, Gem } from 'lucide-react';

const artifactsData: Record<string, {
  name: string;
  category: string;
  dynasty: string;
  description: string;
  period: string;
  material: string;
  size: string;
  location: string;
}> = {
  '10': {
    name: '鹦鹉莲瓣纹金碗',
    category: '唐三彩',
    dynasty: '唐代',
    description: '这件金碗采用精湛的锤揲工艺，碗身装饰有精美的鹦鹉和莲瓣纹样。鹦鹉栩栩如生，莲瓣层次分明，展现了唐代金银器制作的高超技艺。金碗整体造型优雅，是唐代贵族生活中的珍贵器物。',
    period: '公元8世纪（盛唐时期）',
    material: '黄金',
    size: '口径12.5厘米，高6.8厘米，重325克',
    location: '陕西西安何家村窖藏出土',
  },
  '11': {
    name: '桃形花结八瓣银高足杯',
    category: '唐三彩',
    dynasty: '唐代',
    description: '此银高足杯造型独特，杯身呈桃形，饰有精美花结图案。八瓣设计体现了唐代对对称美的追求。高足设计不仅美观，更便于持握和使用。',
    period: '公元8世纪中叶',
    material: '纯银',
    size: '口径8.2厘米，高10.5厘米',
    location: '陕西西安出土',
  },
  '14': {
    name: '鎏金鹦鹉纹提梁银罐',
    category: '唐三彩',
    dynasty: '唐代',
    description: '银罐通体鎏金，罐身装饰有生动的鹦鹉纹样。提梁设计方便携带，罐体密封性好，可用于储存珍贵物品。鹦鹉在唐代被视为吉祥之鸟，寓意美好。',
    period: '公元8-9世纪',
    material: '银质鎏金',
    size: '高15.5厘米，腹径12厘米',
    location: '陕西法门寺地宫出土',
  },
};

export default function ArtifactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const artifactId = params.id as string;
  
  const artifact = artifactsData[artifactId];
  
  if (!artifact) {
    return (
      <div className="min-h-screen heritage-pattern flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">文物不存在</h1>
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
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex items-center justify-center min-h-[500px]">
              <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="text-9xl text-blue-200">🏺</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 font-chinese">{artifact.name}</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="glass-btn-sm px-4 py-2 text-sm">
                    {artifact.dynasty}
                  </span>
                  <span className="glass-btn-sm px-4 py-2 text-sm">
                    {artifact.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">{artifact.description}</p>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">年代</h4>
                    <p className="text-gray-500">{artifact.period}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Gem className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">材质</h4>
                    <p className="text-gray-500">{artifact.material}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Ruler className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">尺寸</h4>
                    <p className="text-gray-500">{artifact.size}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">出土地点</h4>
                    <p className="text-gray-500">{artifact.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-chinese">相关文物</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(artifactsData)
                .filter(([id]) => id !== artifactId)
                .slice(0, 3)
                .map(([id, item]) => (
                  <Link
                    key={id}
                    href={`/dynasty/tang/category/TGS/artifact/${id}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all border border-gray-100 hover:border-blue-200">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 font-chinese">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{item.category} · {item.dynasty}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
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