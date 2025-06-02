'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import SoundPlayer from './SoundPlayer'
import { useMeditation } from '../context/MeditationContext'
import { useSearchParams } from 'next/navigation'

// Define meditation themes with their durations
const meditationThemes = {
  'morning': 10,
  'night': 15,
  'mindful-breathing': 10,
  'body-scan': 15,
  'stress-relief': 20,
  'anxiety-reduction': 15,
  'focus-training': 15,
  'mindful-work': 10,
  'default': 10
}

export default function MeditationSession() {
  const [isPlaying, setIsPlaying] = useState(false)
  const searchParams = useSearchParams()
  const theme = searchParams.get('theme') || 'default'
  const isGuided = searchParams.get('guided') === 'true'
  const duration = meditationThemes[theme as keyof typeof meditationThemes] || 10
  const [timeLeft, setTimeLeft] = useState(duration * 60) // Convert minutes to seconds
  const [breathPhase, setBreathPhase] = useState('inhale')
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const { addSession } = useMeditation()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false)
            setSessionCompleted(true)
            // Record the session when completed
            addSession(theme, duration, isGuided ? 'guided' : 'unguided')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, timeLeft, addSession, theme, duration, isGuided])

  useEffect(() => {
    let breathTimer: NodeJS.Timeout
    if (isPlaying) {
      const breathCycle = () => {
        setBreathPhase('inhale')
        setTimeout(() => setBreathPhase('hold'), 4000)
        setTimeout(() => setBreathPhase('exhale'), 7000)
        setTimeout(() => setBreathPhase('rest'), 11000)
      }
      breathTimer = setInterval(breathCycle, 12000)
      breathCycle()
    }
    return () => clearInterval(breathTimer)
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setIsPlaying(false)
    setTimeLeft(duration * 60)
    setSessionCompleted(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative z-10">
        {/* Session Type Indicator */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            isGuided 
              ? 'bg-primary-100 text-primary-600' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {isGuided ? 'Guided' : 'Unguided'} • {duration} min
          </span>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-light text-gray-800 mb-2">{formatTime(timeLeft)}</h1>
          <p className="text-gray-600">
            {sessionCompleted ? 'Session completed! Great job!' : 
              isGuided ? 'Follow the guided instructions' : 'Focus on your breath'}
          </p>
        </div>

        {/* Breathing Animation */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center"
            animate={{
              scale: breathPhase === 'inhale' ? 1.2 : breathPhase === 'exhale' ? 0.8 : 1,
              opacity: breathPhase === 'hold' ? 0.8 : 1,
            }}
            transition={{
              duration: breathPhase === 'inhale' ? 4 : breathPhase === 'exhale' ? 4 : 0.5,
              ease: 'easeInOut',
            }}
          >
            <span className="text-lg text-primary-600 font-medium capitalize">{breathPhase}</span>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={sessionCompleted}
            className="p-4 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8" />
            )}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowPathIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Session Info */}
        <div className="mt-8 text-center text-gray-600">
          {sessionCompleted ? (
            <p className="text-primary-600 font-medium">Your progress has been recorded!</p>
          ) : (
            <>
              <p>Find a comfortable position</p>
              <p className="text-sm mt-2">
                {isGuided 
                  ? 'Listen to the guided instructions and follow along'
                  : 'Close your eyes and focus on your breath'}
              </p>
            </>
          )}
        </div>
      </div>
      <SoundPlayer />
    </div>
  )
} 