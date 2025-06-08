'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, User, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { mockUsers, findCommonBooks, findRecommendedBooks, Book } from '@/data/mockUsers'

export default function MatchingPage() {
  const [userBooks, setUserBooks] = useState<Book[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  useEffect(() => {
    // LocalStorageから書籍データを取得
    const savedBooks = localStorage.getItem('recognizedBooks')
    if (savedBooks) {
      setUserBooks(JSON.parse(savedBooks))
    }
  }, [])

  const getMatchScore = (targetUserBooks: Book[]) => {
    const commonBooks = findCommonBooks(userBooks, targetUserBooks)
    return Math.round((commonBooks.length / Math.max(userBooks.length, targetUserBooks.length)) * 100)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/analysis"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">
            同じ興味を持つ人たち
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {mockUsers.map((user) => {
              const commonBooks = findCommonBooks(userBooks, user.books)
              const recommendedBooks = findRecommendedBooks(userBooks, user.books)
              const matchScore = getMatchScore(user.books)

              return (
                <div
                  key={user.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-primary">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.profession}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">マッチ度</span>
                      <span className="text-lg font-bold text-accent">{matchScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2 transition-all"
                        style={{ width: `${matchScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <BookOpen className="w-4 h-4 mr-2 text-primary" />
                      共通書籍: {commonBooks.length}冊
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Sparkles className="w-4 h-4 mr-2 text-accent" />
                      おすすめ: {recommendedBooks.slice(0, 3).length}冊
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {selectedUser && (
            <div className="bg-white rounded-lg shadow-xl p-8">
              {(() => {
                const user = mockUsers.find(u => u.id === selectedUser)!
                const commonBooks = findCommonBooks(userBooks, user.books)
                const recommendedBooks = findRecommendedBooks(userBooks, user.books).slice(0, 3)

                return (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                          <User className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
                          <p className="text-gray-600">{user.profession}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-gray-700 mb-6 japanese-text">{user.bio}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-bold text-primary mb-3 flex items-center">
                          <BookOpen className="w-5 h-5 mr-2" />
                          共通の書籍
                        </h3>
                        <div className="space-y-2">
                          {commonBooks.map((book, index) => (
                            <div key={index} className="p-3 bg-primary/5 rounded-lg">
                              <p className="font-medium text-gray-800">{book.title}</p>
                              <p className="text-sm text-gray-600">{book.author}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-accent mb-3 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2" />
                          おすすめの書籍
                        </h3>
                        <div className="space-y-2">
                          {recommendedBooks.map((book, index) => (
                            <div key={index} className="p-3 bg-accent/10 rounded-lg">
                              <p className="font-medium text-gray-800">{book.title}</p>
                              <p className="text-sm text-gray-600">{book.author}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-bold text-primary mb-2">つながる理由</h4>
                      <p className="text-gray-700 japanese-text">
                        {user.name}さんとあなたは、{commonBooks[0]?.genre || '哲学'}や
                        {commonBooks[1]?.genre || '歴史'}の分野で共通の関心があります。
                        特に「{commonBooks[0]?.title || 'サピエンス全史'}」のような本を通じて、
                        深い対話ができそうです。
                      </p>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </main>
    </>
  )
}