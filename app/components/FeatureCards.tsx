'use client'

import { motion } from 'framer-motion'
import { PlayIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function FeatureCards() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose OpenMeditation?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="card text-center"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/OpenMeditation/images/guided-meditation.jpg"
                alt="Guided meditation"
                fill
                className="object-cover rounded-full"
                unoptimized
              />
            </div>
            <PlayIcon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Guided Sessions</h3>
            <p className="text-gray-600">Access hundreds of guided meditation sessions for all experience levels.</p>
          </motion.div>
          <motion.div 
            className="card text-center"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/OpenMeditation/images/time-meditation.jpg"
                alt="Time meditation"
                fill
                className="object-cover rounded-full"
                unoptimized
              />
            </div>
            <ClockIcon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Flexible Duration</h3>
            <p className="text-gray-600">Choose from 5-minute quick sessions to hour-long deep meditation.</p>
          </motion.div>
          <motion.div 
            className="card text-center"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/OpenMeditation/images/progress-meditation.jpg"
                alt="Progress tracking"
                fill
                className="object-cover rounded-full"
                unoptimized
              />
            </div>
            <HeartIcon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your meditation journey and build a consistent practice.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 