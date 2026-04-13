'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Camera, Calendar, TrendingUp, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { CheckInStats } from '@/types/checkin';
import {
  checkIn,
  getCheckInStats
} from '@/lib/checkinService';

export default function CheckInPage() {
  const [stats, setStats] = useState<CheckInStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStats(getCheckInStats());
    setLoading(false);
  };

  const handleCheckIn = async () => {
    setActionLoading(true);
    setMessage(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      checkIn();
      loadData();
      setMessage({ type: 'success', text: '✓ 签到成功！欢迎回来！' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || '签到失败' });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen heritage-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
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
                className="glass-btn px-6 py-2 text-sm"
              >
                每日签到
              </Link>
              <Link
                href="/gallery"
                className="glass-btn-sm px-5 py-2 text-sm flex items-center space-x-1"
              >
                <BookOpen className="w-4 h-4" />
                <span>文物图鉴</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3 font-chinese">每日签到</h2>
            <p className="text-lg text-gray-500">坚持学习，记录你的成长足迹</p>
          </div>

          {message && (
            <div
              className={`mb-8 p-4 rounded-xl ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <p className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
                {message.text}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats?.totalDays || 0}</div>
              <p className="text-gray-500 font-chinese">累计签到天数</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <TrendingUp className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats?.currentStreak || 0}</div>
              <p className="text-gray-500 font-chinese">当前连续天数</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <Award className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats?.longestStreak || 0}</div>
              <p className="text-gray-500 font-chinese">最长连续天数</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-chinese text-center">
              今日状态
            </h3>

            <div className="max-w-md mx-auto text-center">
              {stats?.todayStatus === 'not_checked' && (
                <div>
                  <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-16 h-16 text-blue-400" />
                  </div>
                  <p className="text-lg text-gray-500 mb-6">今天还没有签到哦，点击下方按钮开始学习吧！</p>
                  <button
                    onClick={handleCheckIn}
                    disabled={actionLoading}
                    className="glass-btn w-full py-4 text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>签到中...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-6 h-6" />
                        <span>立即签到</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {stats?.todayStatus !== 'not_checked' && stats?.todayRecord && (
                <div>
                  <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-16 h-16 text-green-400" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xl font-bold text-green-600">已签到 ✓</p>
                    <p className="text-gray-500">
                      签到时间：{stats.todayRecord?.checkInTime}
                    </p>
                    <p className="text-gray-500">今日学习已完成！</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

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