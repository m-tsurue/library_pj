import Link from 'next/link'
import { BookOpen, Users, Heart, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-6 leading-tight">
              大切な人の知的遺産を、
              <br className="hidden sm:block" />
              未来につなぐ
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 japanese-text max-w-3xl mx-auto">
              本棚は、その人の知的世界そのもの。
              <br className="hidden sm:block" />
              あなたの本棚から、新しい出会いと継承が始まります。
            </p>
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
              <Link href="/upload">
                体験を始める
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Value Propositions */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center text-primary mb-16">
              3つの価値
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-10 h-10 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-serif text-primary">
                    発見
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base japanese-text text-foreground">
                    AIが本棚から読書傾向を分析。
                    同じ興味を持つ人や、
                    新しい本との出会いを創出します。
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-serif text-primary">
                    継承
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base japanese-text text-foreground">
                    大切な人の蔵書を適切に継承。
                    その人の知的世界を、
                    必要とする人へつなぎます。
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-serif text-primary">
                    共有
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base japanese-text text-foreground">
                    質の高い知的コミュニティ。
                    深い対話と学びが生まれる
                    場を提供します。
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 px-4 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center text-primary mb-16">
              使い方
            </h2>
            <div className="space-y-12">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    本棚を撮影
                  </h3>
                  <p className="text-text japanese-text">
                    スマートフォンで本棚の写真を撮影します。
                    AIが自動で書籍を認識します。
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    読書傾向を分析
                  </h3>
                  <p className="text-text japanese-text">
                    蔵書データから、あなたの知的興味や専門分野を可視化します。
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    新しい出会い
                  </h3>
                  <p className="text-text japanese-text">
                    同じ興味を持つ人や、あなたにぴったりの本と出会えます。
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="secondary" size="lg" className="rounded-full px-8 py-6 text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/upload">
                  今すぐ始める
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-primary text-white">
          <div className="max-w-7xl mx-auto text-center">
            <p className="japanese-text">
              © 2024 知的遺産継承プラットフォーム. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
