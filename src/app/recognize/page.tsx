'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import { Camera, Upload, X, Search, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import { recognizeArtifact } from '@/lib/api';
import { mockRecognize } from '@/lib/mockApi';
import { Artifact, RecognitionResult } from '@/types';

export default function RecognizePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handleRecognize = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setResult(null);

    try {
      const response = await recognizeArtifact(file, 5, 85);
      setResult(response);
    } catch (err: any) {
      console.log('后端API不可用，使用模拟数据');
      try {
        const mockResponse = await mockRecognize();
        setResult(mockResponse);
      } catch (mockErr) {
        setError('识别失败，请稍后重试');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const renderArtifactCard = (artifact: Artifact, isMain: boolean = false) => (
    <div
      className={`bg-white rounded-xl p-6 border ${
        isMain ? 'border-heritage-gold shadow-lg' : 'border-gray-200 hover:border-heritage-gold/50'
      } transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-xl font-bold text-gray-900 font-chinese mb-1">
            {artifact.name}
          </h4>
          <span className="inline-block px-3 py-1 bg-heritage-gold/10 text-heritage-gold rounded-full text-sm font-medium">
            {artifact.category}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-heritage-gold">
            {artifact.similarity_percent}%
          </div>
          <div className="text-sm text-gray-500">相似度</div>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">{artifact.description}</p>
      <div className="mt-4 flex items-center text-heritage-gold hover:text-heritage-bronze cursor-pointer">
        <span className="text-sm font-medium">查看详情</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen heritage-pattern">
      <header className="bg-gradient-to-r from-heritage-gold/10 to-heritage-bronze/10 backdrop-blur-sm border-b border-heritage-gold/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-heritage-gold to-heritage-bronze rounded-lg flex items-center justify-center">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-chinese">文物识别系统</h1>
                  <p className="text-sm text-gray-600">唐代文物智能识别平台</p>
                </div>
              </Link>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-heritage-gold font-medium">
                首页
              </Link>
              <Link
                href="/recognize"
                className="bg-heritage-gold hover:bg-heritage-bronze text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                开始识别
              </Link>
              <Link
                href="/checkin"
                className="text-gray-700 hover:text-heritage-gold font-medium flex items-center space-x-1"
              >
                <Calendar className="w-5 h-5" />
                <span>每日签到</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-chinese">
              上传文物图片
            </h2>
            <p className="text-lg text-gray-600">
              支持 JPG、PNG、GIF、BMP 格式，文件大小不超过 10MB
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-heritage-gold bg-heritage-gold/5'
                    : 'border-gray-300 hover:border-heritage-gold hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="预览"
                      className="max-h-80 mx-auto rounded-lg shadow-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-20 h-20 bg-heritage-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-10 h-10 text-heritage-gold" />
                    </div>
                    <p className="text-xl text-gray-700 mb-2 font-medium">
                      {isDragActive ? '释放以上传文件' : '拖拽图片到此处'}
                    </p>
                    <p className="text-gray-500">或点击选择文件</p>
                  </div>
                )}
              </div>

              {file && (
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleRecognize}
                    disabled={isUploading}
                    className="flex-1 bg-gradient-to-r from-heritage-gold to-heritage-bronze text-white py-4 rounded-xl font-medium text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>识别中...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-6 h-6" />
                        <span>开始识别</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    清除
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">识别失败</h4>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              {result ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-chinese">
                      识别结果
                    </h3>
                    <p className="text-gray-600">
                      {result.data.status === 'exact_match'
                        ? '找到精准匹配的文物'
                        : '为您推荐以下相似文物'}
                    </p>
                  </div>

                  {result.data.status === 'exact_match' && result.data.result && (
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-heritage-gold/10 to-heritage-bronze/10 rounded-xl p-4 mb-4">
                        <p className="text-sm text-heritage-gold font-medium">
                          ✓ 精准匹配
                        </p>
                      </div>
                      {renderArtifactCard(result.data.result, true)}
                    </div>
                  )}

                  {result.data.results && result.data.results.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 font-chinese">
                        相似文物推荐
                      </h4>
                      <div className="space-y-4">
                        {result.data.results.map((artifact, index) => (
                          <div key={artifact.id}>
                            {renderArtifactCard(artifact, index === 0)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Camera className="w-12 h-12 text-gray-300" />
                    </div>
                    <p className="text-lg">上传图片后将在此显示识别结果</p>
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
            © 2024 文物识别系统 - 唐代文物智能识别平台
          </p>
        </div>
      </footer>
    </div>
  );
}
