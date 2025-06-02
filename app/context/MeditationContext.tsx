'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface MeditationSession {
  id: string
  userId: string
  theme: string
  duration: number
  completedAt: string
  sessionType: 'guided' | 'unguided'
}

interface MeditationStats {
  totalSessions: number
  totalMinutes: number
  averageSessionLength: number
  weeklyProgress: { [key: string]: number }
  bestTime: string
}

interface MeditationContextType {
  sessions: MeditationSession[]
  stats: MeditationStats
  addSession: (theme: string, duration: number, sessionType: 'guided' | 'unguided') => void
}

const MeditationContext = createContext<MeditationContextType | undefined>(undefined)

export function MeditationProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<MeditationSession[]>([])
  const [stats, setStats] = useState<MeditationStats>({
    totalSessions: 0,
    totalMinutes: 0,
    averageSessionLength: 0,
    weeklyProgress: {},
    bestTime: 'Morning'
  })
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Load sessions from localStorage
      const storedSessions = localStorage.getItem(`meditation_sessions_${user.id}`)
      if (storedSessions) {
        const parsedSessions = JSON.parse(storedSessions)
        setSessions(parsedSessions)
        updateStats(parsedSessions)
      }
    }
  }, [user])

  const updateStats = (sessions: MeditationSession[]) => {
    if (sessions.length === 0) return

    const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0)
    const averageSessionLength = Math.round(totalMinutes / sessions.length)

    // Calculate weekly progress
    const weeklyProgress: { [key: string]: number } = {}
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    days.forEach(day => weeklyProgress[day] = 0)

    sessions.forEach(session => {
      const date = new Date(session.completedAt)
      const day = days[date.getDay()]
      weeklyProgress[day] += session.duration
    })

    // Calculate best time
    const morningSessions = sessions.filter(s => {
      const hour = new Date(s.completedAt).getHours()
      return hour >= 5 && hour < 12
    }).length
    const afternoonSessions = sessions.filter(s => {
      const hour = new Date(s.completedAt).getHours()
      return hour >= 12 && hour < 17
    }).length
    const eveningSessions = sessions.filter(s => {
      const hour = new Date(s.completedAt).getHours()
      return hour >= 17 && hour < 22
    }).length

    let bestTime = 'Morning'
    if (afternoonSessions > morningSessions && afternoonSessions > eveningSessions) {
      bestTime = 'Afternoon'
    } else if (eveningSessions > morningSessions && eveningSessions > afternoonSessions) {
      bestTime = 'Evening'
    }

    setStats({
      totalSessions: sessions.length,
      totalMinutes,
      averageSessionLength,
      weeklyProgress,
      bestTime
    })
  }

  const addSession = (theme: string, duration: number, sessionType: 'guided' | 'unguided') => {
    if (!user) return

    const newSession: MeditationSession = {
      id: Date.now().toString(),
      userId: user.id,
      theme,
      duration,
      completedAt: new Date().toISOString(),
      sessionType
    }

    const updatedSessions = [...sessions, newSession]
    setSessions(updatedSessions)
    updateStats(updatedSessions)

    // Save to localStorage
    localStorage.setItem(`meditation_sessions_${user.id}`, JSON.stringify(updatedSessions))
  }

  return (
    <MeditationContext.Provider value={{ sessions, stats, addSession }}>
      {children}
    </MeditationContext.Provider>
  )
}

export function useMeditation() {
  const context = useContext(MeditationContext)
  if (context === undefined) {
    throw new Error('useMeditation must be used within a MeditationProvider')
  }
  return context
} 