'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Heart, ChevronRight, Sparkles, Camera, Calendar, BookOpen, MessageSquare, Play } from 'lucide-react';
import { getCategories, getCategoryDetail, getArtifactDetail } from '@/lib/api';
import type { CategoriesResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-dc.0xc0de.top:34859';

interface Artifact {
  id: number;
  name: string;
  image: string;
  category: string;
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

export default function GalleryPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [completedSeriesName, setCompletedSeriesName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const catRes = await getCategories();
      const categories = catRes.data;

      const seriesList: Series[] = [];

      for (const cat of categories) {
        try {
          const detailRes = await getCategoryDetail(cat.id);
          const artifacts = detailRes.data.artifacts || [];

          const mapped: Artifact[] = artifacts.map((a: any) => ({
            id: a.id,
            name: a.name,
            image: a.image ? `${API_BASE_URL}${a.image}` : '/5.png',
            category: cat.name,
            description: a.description || '',
            collected: false,
            comments: [],
          }));

          seriesList.push({
            id: cat.id,
            name: cat.name,
            artifacts: mapped,
            completed: false,
          });
        } catch (err) {
          console.error(`Failed to load category ${cat.id}:`, err);
        }
      }

      setSeries(seriesList);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCollect = (artifactId: number) => {
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

  const triggerCompletionAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 180000);
  };

  const testAnimation = (seriesName: string) => {
    setCompletedSeriesName(seriesName);
    triggerCompletionAnimation();
  };

  const handleAddComment = (artifactId: number) => {
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

  if (loading) {
    return (
      <div className="min-h-screen heritage-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-lg">加载文物图鉴中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen heritage-pattern">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-chinese">文物识别系统</h1>
                <p className="text-sm text-gray-500">文物智能识别平台</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="glass-btn-sm px-5 py-2 text-sm">
                首页
              </Link>
              <Link href="/recognize" className="glass-btn-sm px-5 py-2 text-sm">
                开始识别
              </Link>
              <Link
                href="/checkin"
                className="glass-btn-sm px-5 py-2 text-sm flex items-center space-x-1"
              >
                <Calendar className="w-4 h-4" />
                <span>每日签到</span>
              </Link>
              <Link
                href="/gallery"
                className="glass-btn px-6 py-2 text-sm flex items-center space-x-1"
              >
                <BookOpen className="w-4 h-4" />
                <span>文物图鉴</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-chinese">
            文物图鉴收藏
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-4">
            收藏文物图片，查看套系集齐情况，参与互动评论
          </p>
        </section>

        {showAnimation && (
          <CompletionAnimation
            seriesName={completedSeriesName}
            onClose={() => setShowAnimation(false)}
          />
        )}

        <div className="space-y-12">
          {series.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h3 className="text-2xl font-bold text-gray-900 font-chinese">
                    {s.name}
                  </h3>
                  <button
                    onClick={() => testAnimation(s.name)}
                    className="glass-btn-sm px-3 py-1.5 text-xs flex items-center space-x-1"
                    title="测试集齐动画"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>集齐动画</span>
                  </button>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  s.completed
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                }`}>
                  {s.completed ? '已集齐' : `已收集 ${s.artifacts.filter(a => a.collected).length}/${s.artifacts.length}`}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {s.artifacts.map((artifact) => (
                  <div
                    key={artifact.id}
                    className={`rounded-xl overflow-hidden border transition-all bg-white ${
                      artifact.collected
                        ? 'border-blue-200 hover:shadow-lg hover:shadow-blue-100'
                        : 'border-gray-100 opacity-70'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={artifact.collected ? artifact.image : '/5.png'}
                        alt={artifact.name}
                        className="w-full h-48 object-contain bg-gray-50"
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
                    <div className="p-4 bg-white">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 font-chinese">
                        {artifact.name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {artifact.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setSelectedArtifact(artifact)}
                          className="glass-btn-sm px-3 py-1.5 text-xs flex items-center space-x-1"
                        >
                          <span>查看详情</span>
                          <ChevronRight className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              <div className="bg-gray-50 w-full h-64 flex items-center justify-center rounded-t-2xl overflow-hidden">
                <img
                  src={selectedArtifact.image}
                  alt={selectedArtifact.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <button
                onClick={() => setSelectedArtifact(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-chinese">
                {selectedArtifact.name}
              </h3>
              <p className="text-gray-500 mb-6">{selectedArtifact.description}</p>

              <h4 className="text-lg font-bold text-gray-900 mb-4 font-chinese">
                评论 ({selectedArtifact.comments.length})
              </h4>

              <div className="space-y-4 mb-6">
                {selectedArtifact.comments.length > 0 ? (
                  selectedArtifact.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-900">{comment.user}</span>
                        <span className="text-xs text-gray-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
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
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                />
                <button
                  onClick={() => handleAddComment(selectedArtifact.id)}
                  className="glass-btn-sm px-4 py-2"
                >
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-3xl p-4 max-w-5xl w-full mx-4 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src="https://image.0xc0de.top/file/1775902333552_1.mp4"
          autoPlay
          playsInline
          onEnded={handleVideoEnd}
          className="w-full rounded-2xl"
        />

        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 font-chinese">
            🎉 套系集齐！
          </h3>
          <p className="text-lg text-gray-500 mb-4 font-chinese">
            {seriesName}
          </p>

          <button
            onClick={onClose}
            className="glass-btn px-8 py-3 text-lg"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
