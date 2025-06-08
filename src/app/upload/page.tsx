'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Camera, Upload, ArrowLeft, Loader2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function UploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognizedBooks, setRecognizedBooks] = useState<any[]>([])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) return

    setIsProcessing(true)
    
    // デモ用の処理時間をシミュレート
    setTimeout(() => {
      // デモ用の認識結果
      const demoBooks = [
        { title: 'サピエンス全史', author: 'ユヴァル・ノア・ハラリ', genre: '歴史' },
        { title: '銃・病原菌・鉄', author: 'ジャレド・ダイアモンド', genre: '歴史' },
        { title: '利己的な遺伝子', author: 'リチャード・ドーキンス', genre: '科学' },
        { title: '思考、速いと遅い', author: 'ダニエル・カーネマン', genre: '心理学' },
        { title: '夜と霧', author: 'ヴィクトール・E・フランクル', genre: '哲学' },
        { title: '罪と罰', author: 'ドストエフスキー', genre: '文学' },
        { title: '1984年', author: 'ジョージ・オーウェル', genre: '文学' },
        { title: 'ホモ・デウス', author: 'ユヴァル・ノア・ハラリ', genre: '未来学' },
      ]
      
      setRecognizedBooks(demoBooks)
      // LocalStorageに保存
      localStorage.setItem('recognizedBooks', JSON.stringify(demoBooks))
      setIsProcessing(false)
    }, 3000)
  }

  const handleConfirm = () => {
    router.push('/analysis')
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">
            本棚を撮影・アップロード
          </h1>

          {!selectedImage ? (
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground mb-6 japanese-text">
                    本棚の写真を選択してください
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-full"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    画像を選択
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-primary">
                    選択した画像
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={selectedImage}
                    alt="本棚"
                    className="w-full rounded-lg"
                  />
                </CardContent>
              </Card>

              {!isProcessing && recognizedBooks.length === 0 && (
                <div className="text-center">
                  <Button
                    onClick={handleUpload}
                    size="lg"
                    className="rounded-full px-8 py-6 text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    書籍を認識する
                  </Button>
                </div>
              )}

              {isProcessing && (
                <Card className="shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                      <p className="text-lg text-muted-foreground japanese-text">
                        書籍を認識中...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {recognizedBooks.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-primary">
                      認識された書籍（{recognizedBooks.length}冊）
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {recognizedBooks.map((book, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-muted rounded-lg"
                        >
                          <div className="flex-1">
                            <h3 className="font-bold text-foreground">
                              {book.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {book.author} · {book.genre}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={handleConfirm}
                        className="rounded-full px-8"
                      >
                        次へ進む
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}