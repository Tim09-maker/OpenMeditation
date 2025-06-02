'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const steps = [
  {
    title: "Find Your Space",
    description: "Choose a quiet, comfortable place where you won't be disturbed. Sit or lie down in a position that feels natural to you."
  },
  {
    title: "Set Your Intention",
    description: "Take a moment to reflect on why you're meditating today. What do you hope to achieve or experience?"
  },
  {
    title: "Focus on Your Breath",
    description: "Notice the natural rhythm of your breath. Feel the air moving in and out of your body."
  },
  {
    title: "Stay Present",
    description: "When your mind wanders, gently bring your attention back to your breath. This is normal and part of the practice."
  }
]

export default function MeditationGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Guide Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[300px] rounded-3xl overflow-hidden mb-8"
      >
        <Image
          src="/images/meditation-guide.jpg"
          alt="Meditation guide"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h3 className="text-2xl font-light mb-1">Sarah Chen</h3>
          <p className="text-sm opacity-90 font-light">Meditation Guide & Mindfulness Coach</p>
        </div>
      </motion.div>

      {/* Guide Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group hover:bg-white/50 transition-colors duration-300 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-light">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 bg-white/50 backdrop-blur-sm rounded-3xl p-8"
      >
        <h3 className="text-xl font-light text-gray-800 mb-6">Pro Tips</h3>
        <ul className="space-y-4 text-gray-600">
          {[
            "Start with shorter sessions and gradually increase the duration",
            "Practice at the same time each day to build a consistent habit",
            "Don't judge your thoughts - simply observe them and let them pass",
            "Use ambient sounds to help maintain focus and create a peaceful atmosphere"
          ].map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3 font-light"
            >
              <span className="text-primary-400 text-lg">•</span>
              {tip}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
} 