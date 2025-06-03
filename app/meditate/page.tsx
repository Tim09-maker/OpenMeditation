'use client'

import { Suspense } from 'react'
import MeditationSession from '../components/MeditationSession'
import MeditationGuide from '../components/MeditationGuide'

export default function MeditatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-3">
            Begin Your Meditation Journey
          </h1>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Take a moment to breathe, find your center, and begin your path to mindfulness
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
            <MeditationGuide />
          </div>
          <div className="order-1 lg:order-2 sticky top-8">
            <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading meditation session...</div>}>
              <MeditationSession />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
} 