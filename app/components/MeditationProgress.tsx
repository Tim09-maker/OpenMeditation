'use client'

import { motion } from 'framer-motion'
import { TrophyIcon, FireIcon, ClockIcon, PlayIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useMeditation } from '../context/MeditationContext'

interface Achievement {
  id: string
  name: string
  description: string
  icon: typeof TrophyIcon
  progress: number
  total: number
}

export default function MeditationProgress() {
  const { stats, sessions } = useMeditation()

  // Calculate current streak
  const calculateStreak = () => {
    if (sessions.length === 0) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const sessionDates = sessions.map(session => {
      const date = new Date(session.completedAt)
      date.setHours(0, 0, 0, 0)
      return date.getTime()
    })

    let streak = 0
    let currentDate = today.getTime()

    while (sessionDates.includes(currentDate)) {
      streak++
      currentDate -= 24 * 60 * 60 * 1000 // Subtract one day
    }

    return streak
  }

  const currentStreak = calculateStreak()

  // Calculate guided vs unguided stats
  const guidedSessions = sessions.filter(s => s.sessionType === 'guided').length
  const unguidedSessions = sessions.filter(s => s.sessionType === 'unguided').length
  const guidedMinutes = sessions
    .filter(s => s.sessionType === 'guided')
    .reduce((sum, s) => sum + s.duration, 0)
  const unguidedMinutes = sessions
    .filter(s => s.sessionType === 'unguided')
    .reduce((sum, s) => sum + s.duration, 0)

  const achievements: Achievement[] = [
    {
      id: 'streak',
      name: 'Meditation Streak',
      description: 'Complete 7 days in a row',
      icon: FireIcon,
      progress: currentStreak,
      total: 7
    },
    {
      id: 'guided',
      name: 'Guided Sessions',
      description: 'Complete 10 guided sessions',
      icon: PlayIcon,
      progress: guidedSessions,
      total: 10
    },
    {
      id: 'unguided',
      name: 'Unguided Sessions',
      description: 'Complete 10 unguided sessions',
      icon: HeartIcon,
      progress: unguidedSessions,
      total: 10
    },
    {
      id: 'total',
      name: 'Total Minutes',
      description: 'Meditate for 60 minutes',
      icon: ClockIcon,
      progress: stats.totalMinutes,
      total: 60
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Progress</h2>
      
      {/* Session Type Distribution */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Session Distribution</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-600 font-medium">Guided</span>
              <span className="text-primary-600">{guidedMinutes} min</span>
            </div>
            <div className="h-2 bg-primary-100 rounded-full">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${(guidedMinutes / stats.totalMinutes) * 100}%` }}
              />
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Unguided</span>
              <span className="text-gray-600">{unguidedMinutes} min</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-gray-500 rounded-full transition-all duration-500"
                style={{ width: `${(unguidedMinutes / stats.totalMinutes) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start space-x-4"
          >
            <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
              <achievement.icon className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">{achievement.name}</h3>
                <span className="text-sm text-gray-500">
                  {achievement.progress}/{achievement.total}
                </span>
              </div>
              
              <div className="h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((achievement.progress / achievement.total) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 