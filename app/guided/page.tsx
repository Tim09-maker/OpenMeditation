'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, SunIcon, MoonIcon, CloudIcon, HeartIcon } from '@heroicons/react/24/outline'
import ProtectedRoute from '../components/ProtectedRoute'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const meditationThemes = [
  // Morning & Evening
  {
    id: 'morning',
    name: 'Morning Light',
    description: 'Start your day with clarity and purpose',
    icon: SunIcon,
    duration: 10,
    color: 'bg-orange-100',
    textColor: 'text-orange-600',
    category: 'Daily Practice'
  },
  {
    id: 'night',
    name: 'Evening Calm',
    description: 'Wind down and prepare for restful sleep',
    icon: MoonIcon,
    duration: 15,
    color: 'bg-indigo-100',
    textColor: 'text-indigo-600',
    category: 'Daily Practice'
  },
  // Mindfulness
  {
    id: 'mindful-breathing',
    name: 'Mindful Breathing',
    description: 'Develop awareness through focused breathing',
    icon: CloudIcon,
    duration: 10,
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
    category: 'Mindfulness'
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    description: 'Release tension and connect with your body',
    icon: HeartIcon,
    duration: 15,
    color: 'bg-purple-100',
    textColor: 'text-purple-600',
    category: 'Mindfulness'
  },
  // Stress Relief
  {
    id: 'stress-relief',
    name: 'Stress Relief',
    description: 'Release tension and find inner peace',
    icon: SparklesIcon,
    duration: 20,
    color: 'bg-green-100',
    textColor: 'text-green-600',
    category: 'Stress Relief'
  },
  {
    id: 'anxiety-reduction',
    name: 'Anxiety Reduction',
    description: 'Calm your mind and reduce anxiety',
    icon: HeartIcon,
    duration: 15,
    color: 'bg-pink-100',
    textColor: 'text-pink-600',
    category: 'Stress Relief'
  },
  // Focus & Concentration
  {
    id: 'focus-training',
    name: 'Focus Training',
    description: 'Enhance concentration and mental clarity',
    icon: SparklesIcon,
    duration: 15,
    color: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    category: 'Focus'
  },
  {
    id: 'mindful-work',
    name: 'Mindful Work',
    description: 'Prepare your mind for productive work',
    icon: SunIcon,
    duration: 10,
    color: 'bg-teal-100',
    textColor: 'text-teal-600',
    category: 'Focus'
  }
]

export default function GuidedMeditation() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const router = useRouter()

  const categories = Array.from(new Set(meditationThemes.map(theme => theme.category)))
  const filteredThemes = selectedCategory 
    ? meditationThemes.filter(theme => theme.category === selectedCategory)
    : meditationThemes

  const handleStartMeditation = () => {
    if (selectedTheme) {
      router.push(`/meditate?theme=${selectedTheme}&guided=true`)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Guided Meditation</h1>
            <p className="text-gray-600">Choose a theme to begin your journey</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredThemes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 ${
                  theme.color
                } ${selectedTheme === theme.id ? 'ring-2 ring-primary-500' : ''}`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${theme.textColor} bg-white/50`}>
                    <theme.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{theme.name}</h3>
                    <p className="text-gray-600 mb-4">{theme.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <SparklesIcon className="w-4 h-4 mr-1" />
                        {theme.duration} minutes
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/50 text-gray-600">
                        {theme.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10">
                  <theme.icon className="w-full h-full" />
                </div>
              </motion.button>
            ))}
          </div>

          {selectedTheme && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <button
                onClick={handleStartMeditation}
                className="px-8 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
              >
                Begin Guided Meditation
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ProtectedRoute>
  )
} 