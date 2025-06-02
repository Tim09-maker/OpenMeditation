'use client'

import { motion } from 'framer-motion'
import MeditationProgress from '../components/MeditationProgress'
import { CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '../context/AuthContext'
import { useMeditation } from '../context/MeditationContext'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const { user, logout } = useAuth()
  const { stats } = useMeditation()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const maxDuration = Math.max(...Object.values(stats.weeklyProgress))

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-3xl">🧘</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{user?.name || 'Meditation Journey'}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Weekly Progress</h3>
                  <p className="text-gray-600">Track your meditation habits</p>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                {days.map((day) => (
                  <div key={day} className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                      <span className="text-xs text-primary-600">{day}</span>
                    </div>
                    <div className="h-16 w-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ 
                          height: maxDuration > 0 
                            ? `${(stats.weeklyProgress[day] / maxDuration) * 100}%` 
                            : '0%'
                        }}
                        transition={{ duration: 1 }}
                        className="w-full bg-primary-500"
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {stats.weeklyProgress[day] || 0}m
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Meditation Stats</h3>
                  <p className="text-gray-600">Your mindfulness journey</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Average Session</span>
                    <span className="text-sm font-medium text-gray-800">{stats.averageSessionLength} min</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-primary-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((stats.averageSessionLength / 30) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Best Time</span>
                    <span className="text-sm font-medium text-gray-800">{stats.bestTime}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-primary-500 rounded-full transition-all duration-500"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Sessions</span>
                    <span className="text-sm font-medium text-gray-800">{stats.totalSessions}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-primary-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((stats.totalSessions / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Progress Section */}
          <MeditationProgress />
        </motion.div>
      </div>
    </ProtectedRoute>
  )
} 