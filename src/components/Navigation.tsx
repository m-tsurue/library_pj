'use client'

import Link from 'next/link'
import { BookOpen, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
            <span className="font-serif text-lg sm:text-xl font-bold text-primary">
              知的遺産継承
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/onboarding"
              className="px-4 py-2 text-primary hover:text-primary-dark transition-colors"
            >
              使い方
            </Link>
            <Button asChild className="rounded-full">
              <Link href="/upload">
                体験を始める
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <Link
              href="/onboarding"
              className="block px-4 py-3 text-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              使い方
            </Link>
            <div className="mx-4 my-2">
              <Button asChild className="w-full rounded-full" onClick={() => setIsMenuOpen(false)}>
                <Link href="/upload">
                  体験を始める
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}