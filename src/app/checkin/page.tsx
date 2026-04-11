'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Camera, Calendar, Clock, TrendingUp, Award, CheckCircle2, LogOut, BookOpen } from 'lucide-react';
import { CheckInRecord, CheckInStats } from '@/types/checkin';
import {
  checkIn,
  checkOut,
  getCheckInRecords,
  getCheckInStats
} from '@/lib/checkinService';

export default function CheckInPage() {
  const [stats, setStats] = useState<CheckInStats | null>(null);
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStats(getCheckInStats());
    setRecords(getCheckInRecords());
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

  const handleCheckOut = async () => {
    setActionLoading(true);
    setMessage(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      checkOut();
      loadData();
      setMessage({ type: 'success', text: '✓ 签退成功！今日辛苦了！' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || '签退失败' });
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
              <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-secondary-blue rounded-lg flex items-center justify-center">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-chinese">文物识别系统</h1>
                <p className="text-sm text-gray-300">唐代文物智能识别平台</p>
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

          <div className="bg-dark-blue/50 rounded-2xl p-10 shadow-sm border border-light-blue/20 mb-10">
            <h3 className="text-2xl font-bold text-white mb-6 font-chinese text-center">
              今日状态
            </h3>

            <div className="max-w-md mx-auto text-center">
              {stats?.todayStatus === 'not_checked' && (
                <div>
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-blue/20 to-secondary-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-16 h-16 text-light-blue" />
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

              {stats?.todayStatus === 'checked_in' && stats.todayRecord && (
                <div>
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-16 h-16 text-green-400" />
                  </div>
                  <div className="space-y-3 mb-6">
                    <p className="text-xl font-bold text-green-300">已签到 ✓</p>
                    <p className="text-gray-300">
                      签到时间：{stats.todayRecord.checkInTime}
                    </p>
                  </div>
                  <button
                    onClick={handleCheckOut}
                    disabled={actionLoading}
                    className="w-full bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-4 rounded-xl text-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {actionLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>签退中...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-6 h-6" />
                        <span>签退下班</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {stats?.todayStatus === 'checked_out' && stats.todayRecord && (
                <div>
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-blue/20 to-secondary-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-16 h-16 text-blue-400" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xl font-bold text-blue-300">今日已完成 ✓</p>
                    <p className="text-gray-300">
                      签到时间：{stats.todayRecord.checkInTime}
                    </p>
                    <p className="text-gray-300">
                      签退时间：{stats.todayRecord.checkOutTime}
                    </p>
                    <p className="text-gray-300 font-medium">
                      学习时长：{stats.todayRecord.duration}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-dark-blue/50 rounded-2xl p-10 shadow-sm border border-light-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6 font-chinese">
              签到历史记录
            </h3>

            {records.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>暂无签到记录</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">日期</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">签到时间</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">签退时间</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">时长</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.slice(0, 30).map((record) => (
                      <tr key={record.id} className="border-b border-gray-700 hover:bg-dark-blue/30">
                        <td className="py-3 px-4 text-sm text-white">{record.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-300">{record.checkInTime}</td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {record.checkOutTime || '-'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {record.duration || '-'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              record.status === 'checked_out'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {record.status === 'checked_out' ? '已完成' : '学习中'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 文物识别系统 - 唐代文物智能识别平台
          </p>
        </div>
      </footer>
    </div>
  );
}
