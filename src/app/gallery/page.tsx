'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Heart, ChevronRight, Sparkles, Camera, Calendar, BookOpen, MessageSquare } from 'lucide-react';

interface Artifact {
  id: string;
  name: string;
  image: string;
  series: string;
  description: string;
  collected: boolean;
  comments: Comment[];
}

interface Comment {
  id: string;
  user: string;
  content: string;
  createdAt: string;
}

interface Series {
  id: string;
  name: string;
  artifacts: Artifact[];
  completed: boolean;
}

const mockSeries: Series[] = [
  {
    id: 'series-1',
    name: '唐三彩陶器',
    artifacts: [
      {
        id: 'artifact-1',
        name: '唐三彩骆驼载乐俑',
        image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=Tang%20Dynasty%20tri-colored%20pottery%20camel%20with%20musicians&size=512x512',
        series: '唐三彩陶器',
        description: '三彩陶艺的代表作品，描绘了骆驼载着乐师的场景',
        collected: true,
        comments: [
          {
            id: 'comment-1',
            user: '文物爱好者',
            content: '这件文物非常精美，展现了艺术水平',
            createdAt: '2026-01-01',
          },
        ],
      },
      {
        id: 'artifact-2',
        name: '唐三彩马',
        image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=Tang%20Dynasty%20tri-colored%20pottery%20horse&size=512x512',
        series: '唐三彩陶器',
        description: '三彩陶马，造型生动，色彩艳丽',
        collected: false,
        comments: [],
      },
      {
        id: 'artifact-3',
        name: '唐三彩仕女俑',
        image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=Tang%20Dynasty%20tri-colored%20pottery%20female%20figure&size=512x512',
        series: '唐三彩陶器',
        description: '三彩陶仕女俑，展现了女性的服饰和姿态',
        collected: false,
        comments: [],
      },
    ],
    completed: false,
  },
  {
    id: 'series-2',
    name: '壁画',
    artifacts: [
      {
        id: 'artifact-4',
        name: '飞天壁画',
        image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=Tang%20Dynasty%20flying%20Apsara%20mural&size=512x512',
        series: '壁画',
        description: '敦煌壁画中的飞天形象，轻盈飘逸',
        collected: false,
        comments: [],
      },
      {
        id: 'artifact-5',
        name: '狩猎图壁画',
        image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=Tang%20Dynasty%20hunting%20scene%20mural&size=512x512',
        series: '壁画',
        description: '壁画中的狩猎场景，展现了当时的生活',
        collected: false,
        comments: [],
      },
    ],
    completed: false,
  },
];

export default function GalleryPage() {
  const [series, setSeries] = useState<Series[]>(mockSeries);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [completedSeriesName, setCompletedSeriesName] = useState('');

  const handleToggleCollect = (artifactId: string) => {
    let seriesThatWasCompleted = null;
    let completedName = '';
    
    setSeries(prevSeries =>
      prevSeries.map(s => {
        const newArtifacts = s.artifacts.map(a =>
          a.id === artifactId ? { ...a, collected: !a.collected } : a
        );
        const wasNotCompleted = !s.completed;
        const isNowCompleted = newArtifacts.every(a => a.collected);
        
        if (wasNotCompleted && isNowCompleted) {
          seriesThatWasCompleted = s.id;
          completedName = s.name;
        }
        
        return {
          ...s,
          artifacts: newArtifacts,
          completed: isNowCompleted,
        };
      })
    );
    
    if (seriesThatWasCompleted) {
      setCompletedSeriesName(completedName);
      triggerCompletionAnimation();
    }
  };

  // 触发集齐动画 - 在这里可以轻松替换为您想要的动画
  const triggerCompletionAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 180000);
  };

  // 手动测试动画按钮（仅用于测试）
  const testAnimation = () => {
    setCompletedSeriesName('测试套系');
    triggerCompletionAnimation();
  };

  const handleAddComment = (artifactId: string) => {
    if (!newComment.trim()) return;

    setSeries(prevSeries =>
      prevSeries.map(s => ({
        ...s,
        artifacts: s.artifacts.map(a =>
          a.id === artifactId
            ? {
                ...a,
                comments: [
                  ...a.comments,
                  {
                    id: `comment-${Date.now()}`,
                    user: '当前用户',
                    content: newComment,
                    createdAt: new Date().toISOString().split('T')[0],
                  },
                ],
              }
            : a
        ),
      }))
    );

    setNewComment('');
    setSelectedArtifact(null);
  };



  return (
    <div className="min-h-screen heritage-pattern">
      <header className="bg-gradient-to-r from-primary-blue/20 to-secondary-blue/20 backdrop-blur-sm border-b border-light-blue/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h1 className="text-2xl font-bold text-white font-chinese">文物识别系统</h1>
                <p className="text-sm text-gray-300">文物智能识别平台</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-300 hover:text-light-blue font-medium">
                首页
              </Link>
              <Link href="/recognize" className="text-gray-300 hover:text-light-blue font-medium">
                开始识别
              </Link>
              <Link
                href="/checkin"
                className="text-gray-300 hover:text-light-blue font-medium flex items-center space-x-1"
              >
                <Calendar className="w-5 h-5" />
                <span>每日签到</span>
              </Link>
              <Link
                href="/gallery"
                className="bg-primary-blue hover:bg-secondary-blue text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center space-x-1"
              >
                <BookOpen className="w-5 h-5" />
                <span>文物图鉴</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6 font-chinese">
            文物图鉴收藏
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            收藏文物图片，查看套系集齐情况，参与互动评论
          </p>
          <button
            onClick={testAnimation}
            className="bg-secondary-blue hover:bg-primary-blue text-white px-6 py-2 rounded-lg transition-colors text-sm"
          >
            🔍 测试集齐动画
          </button>
        </section>

        {/* ========== 集齐动画区域 ========== */}
        {/* 在这里可以轻松替换为您想要的动画效果 */}
        {showAnimation && (
          <CompletionAnimation 
            seriesName={completedSeriesName}
            onClose={() => setShowAnimation(false)}
          />
        )}

        <div className="space-y-12">
          {series.map((s) => (
            <div key={s.id} className="bg-dark-blue/50 rounded-2xl p-8 border border-light-blue/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white font-chinese">
                  {s.name}
                </h3>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  s.completed
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                }`}>
                  {s.completed ? '已集齐' : `已收集 ${s.artifacts.filter(a => a.collected).length}/${s.artifacts.length}`}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {s.artifacts.map((artifact) => (
                  <div
                    key={artifact.id}
                    className={`rounded-xl overflow-hidden border transition-all ${
                      artifact.collected
                        ? 'border-light-blue/50 hover:shadow-lg hover:shadow-light-blue/20'
                        : 'border-gray-700/50 opacity-70'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={artifact.image}
                        alt={artifact.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => handleToggleCollect(artifact.id)}
                        className={`absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          artifact.collected
                            ? 'bg-red-500/80 text-white'
                            : 'bg-white/80 text-gray-800 hover:bg-white'
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            artifact.collected ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </div>
                    <div className="p-4 bg-dark-blue/80">
                      <h4 className="text-lg font-bold text-white mb-2 font-chinese">
                        {artifact.name}
                      </h4>
                      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                        {artifact.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setSelectedArtifact(artifact)}
                          className="flex items-center space-x-1 text-light-blue hover:text-white text-sm"
                        >
                          <span>查看详情</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-gray-400 flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3" />
                          {artifact.comments.length}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedArtifact && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-blue rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedArtifact.image}
                alt={selectedArtifact.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedArtifact(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2 font-chinese">
                {selectedArtifact.name}
              </h3>
              <p className="text-gray-300 mb-6">{selectedArtifact.description}</p>
              
              <h4 className="text-lg font-bold text-white mb-4 font-chinese">
                评论 ({selectedArtifact.comments.length})
              </h4>
              
              <div className="space-y-4 mb-6">
                {selectedArtifact.comments.length > 0 ? (
                  selectedArtifact.comments.map((comment) => (
                    <div key={comment.id} className="bg-dark-blue/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-white">{comment.user}</span>
                        <span className="text-xs text-gray-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">暂无评论，快来发表第一条评论吧！</p>
                )}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="写下你的评论..."
                  className="flex-1 bg-dark-blue/50 border border-light-blue/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-light-blue/50"
                />
                <button
                  onClick={() => handleAddComment(selectedArtifact.id)}
                  className="bg-secondary-blue hover:bg-primary-blue text-white px-4 py-2 rounded-lg transition-colors"
                >
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 文物识别系统 - 文物智能识别平台
          </p>
        </div>
      </footer>
    </div>
  );
}

// ========== 集齐动画组件 ==========
// 您可以轻松在这里替换成自己想要的动画效果
function CompletionAnimation({ seriesName, onClose }: { seriesName: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(err => console.log('Video play error:', err));
    }
  }, []);

  const handleVideoEnd = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-black rounded-3xl p-4 max-w-5xl w-full mx-4 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 视频动画区域 */}
        <video
          ref={videoRef}
          src="https://image.0xc0de.top/file/1775902333552_1.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full rounded-2xl"
        />

        {/* 文字和按钮层（可选，如果视频已经包含内容可以去掉） */}
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2 font-chinese">
            🎉 套系集齐！
          </h3>
          <p className="text-lg text-gray-300 mb-4 font-chinese">
            {seriesName}
          </p>
          
          <button
            onClick={onClose}
            className="bg-primary-blue hover:bg-secondary-blue text-white px-8 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
