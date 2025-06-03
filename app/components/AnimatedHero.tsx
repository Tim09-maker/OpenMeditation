'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function AnimatedHero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/meditation-hero.jpg"
          alt="Peaceful meditation scene"
          fill
          className="object-cover opacity-20"
          priority
          unoptimized
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Find Your Inner Peace
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Start your journey to mindfulness with guided meditations, breathing exercises, and peaceful sounds.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/guided">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-primary-600 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Begin Your Practice</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 