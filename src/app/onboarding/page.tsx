'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, BookOpen, Camera, Users } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: '知的遺産を未来へ',
      icon: BookOpen,
      description: '本棚は、その人の知的世界を映し出す鏡です。あなたの本棚から、新しい出会いと継承の物語が始まります。',
      image: '/bookshelf.jpg'
    },
    {
      title: '簡単3ステップ',
      icon: Camera,
      description: '本棚の写真を撮影するだけで、AIが自動的に書籍を認識。あなたの読書傾向を分析し、知的プロフィールを作成します。',
      image: '/camera.jpg'
    },
    {
      title: '質の高いコミュニティ',
      icon: Users,
      description: '同じ興味を持つ人々とつながり、深い対話と学びの場を創出。大切な人の蔵書を、必要とする人へ適切に継承します。',
      image: '/community.jpg'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/upload')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-primary/10 to-accent/10 p-12 flex items-center justify-center">
                <Icon className="w-32 h-32 text-primary opacity-20" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="mb-8">
                  <div className="flex space-x-2 mb-6">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 w-12 rounded-full transition-colors ${
                          index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                    {currentStepData.title}
                  </h2>
                  <p className="text-lg text-gray-600 japanese-text">
                    {currentStepData.description}
                  </p>
                </div>

                <div className="flex justify-between">
                  {currentStep > 0 ? (
                    <button
                      onClick={handlePrevious}
                      className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      前へ
                    </button>
                  ) : (
                    <Link
                      href="/"
                      className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      ホームへ
                    </Link>
                  )}
                  
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                  >
                    {currentStep < steps.length - 1 ? '次へ' : '始める'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}