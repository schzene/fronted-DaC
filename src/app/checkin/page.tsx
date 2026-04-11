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
          <div className="w-16 h-16 border-4 border-light-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">加载中...</p>
        </div>
      </div>
    );
  }

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
                className="bg-primary-blue hover:bg-secondary-blue text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                每日签到
              </Link>
              <Link
                href="/gallery"
                className="text-gray-300 hover:text-light-blue font-medium flex items-center space-x-1"
              >
                <BookOpen className="w-5 h-5" />
                <span>文物图鉴</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-3 font-chinese">每日签到</h2>
            <p className="text-lg text-gray-300">坚持学习，记录你的成长足迹</p>
          </div>

          {message && (
            <div
              className={`mb-8 p-4 rounded-xl ${
                message.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              <p className={message.type === 'success' ? 'text-green-300' : 'text-red-300'}>
                {message.text}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-dark-blue/50 rounded-2xl p-8 shadow-sm border border-light-blue/20 text-center">
              <Calendar className="w-12 h-12 text-light-blue mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">{stats?.totalDays || 0}</div>
              <p className="text-gray-300 font-chinese">累计签到天数</p>
            </div>

            <div className="bg-dark-blue/50 rounded-2xl p-8 shadow-sm border border-light-blue/20 text-center">
              <TrendingUp className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">{stats?.currentStreak || 0}</div>
              <p className="text-gray-300 font-chinese">当前连续天数</p>
            </div>

            <div className="bg-dark-blue/50 rounded-2xl p-8 shadow-sm border border-light-blue/20 text-center">
              <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">{stats?.longestStreak || 0}</div>
              <p className="text-gray-300 font-chinese">最长连续天数</p>
            </div>
          </div>

          <div className="bg-dark-blue/50 rounded-2xl p-10 shadow-sm border border-light-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6 font-chinese text-center">
              今日状态
            </h3>

            <div className="max-w-md mx-auto text-center">
              {stats?.todayStatus === 'not_checked' && (
                <div>
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-blue/20 to-secondary-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-16 h-16 text-light-blue" />
                  </div>
                  <p className="text-lg text-gray-300 mb-6">今天还没有签到哦，点击下方按钮开始学习吧！</p>
                  <button
                    onClick={handleCheckIn}
                    disabled={actionLoading}
                    className="w-full bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-4 rounded-xl text-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
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
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-16 h-16 text-green-400" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xl font-bold text-green-300">已签到 ✓</p>
                    <p className="text-gray-300">
                      签到时间：{stats.todayRecord?.checkInTime}
                    </p>
                    <p className="text-gray-300">今日学习已完成！</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 文物识别系统 - 文物智能识别平台
          </p>
        </div>
      </footer>
    </div>
  );
}
