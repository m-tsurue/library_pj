'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, User } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import Navigation from '@/components/Navigation'

export default function AnalysisPage() {
  const router = useRouter()
  const [books, setBooks] = useState<any[]>([])
  const [genreData, setGenreData] = useState<any[]>([])
  const [authorData, setAuthorData] = useState<any[]>([])

  useEffect(() => {
    // LocalStorageから書籍データを取得
    const savedBooks = localStorage.getItem('recognizedBooks')
    if (savedBooks) {
      const booksData = JSON.parse(savedBooks)
      setBooks(booksData)
      
      // ジャンル分析
      const genreCounts: { [key: string]: number } = {}
      booksData.forEach((book: any) => {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1
      })
      
      const genreChartData = Object.entries(genreCounts).map(([genre, count]) => ({
        name: genre,
        value: count
      }))
      setGenreData(genreChartData)
      
      // 著者分析
      const authorCounts: { [key: string]: number } = {}
      booksData.forEach((book: any) => {
        authorCounts[book.author] = (authorCounts[book.author] || 0) + 1
      })
      
      const sortedAuthors = Object.entries(authorCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([author, count]) => ({ author, count }))
      
      setAuthorData(sortedAuthors)
    }
  }, [])

  const COLORS = ['#1a365d', '#d69e2e', '#2c5282', '#f6ad55', '#4a5568']

  const handleNext = () => {
    // 分析結果を保存
    localStorage.setItem('analysisData', JSON.stringify({
      genreData,
      authorData,
      totalBooks: books.length
    }))
    router.push('/matching')
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/upload"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">
            あなたの読書傾向分析
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ジャンル分析 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                ジャンル分析
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genreData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 著者分析 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                よく読む著者 TOP5
              </h2>
              <div className="space-y-3">
                {authorData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">{item.author}</span>
                    <span className="text-sm text-gray-600">{item.count}冊</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 知的興味マップ */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4">
                知的興味マップ
              </h2>
              <div className="flex flex-wrap gap-3">
                {['歴史', '科学', '心理学', '哲学', '文学', '未来学', '社会学', '経済学'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-accent/20 text-accent-dark rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-gray-600 japanese-text">
                あなたは幅広い分野に興味を持つ知的探求者です。特に歴史と科学に深い関心があり、
                人類の過去と未来を俯瞰的に理解しようとする傾向が見られます。
              </p>
            </div>

            {/* 読書の深度 */}
            <div className="md:col-span-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4">
                読書プロフィール
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">{books.length}</p>
                  <p className="text-gray-600">認識された書籍数</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">{genreData.length}</p>
                  <p className="text-gray-600">ジャンルの多様性</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-dark">高</p>
                  <p className="text-gray-600">知的好奇心レベル</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleNext}
              className="inline-flex items-center px-8 py-4 bg-accent text-white rounded-full text-lg font-medium hover:bg-accent-dark transition-colors shadow-lg"
            >
              マッチング体験へ
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </>
  )
}