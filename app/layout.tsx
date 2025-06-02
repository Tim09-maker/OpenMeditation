import './globals.css'
import type { Metadata } from 'next'
import Navigation from './components/Navigation'
import { AuthProvider } from './context/AuthContext'
import { MeditationProvider } from './context/MeditationContext'

export const metadata: Metadata = {
  title: 'Open Meditation',
  description: 'A modern meditation experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>
          <MeditationProvider>
            <main className="min-h-screen relative">
              <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 via-primary-50/20 to-secondary-50/30 pointer-events-none" />
              <div className="relative z-10">
                {children}
              </div>
            </main>
            <Navigation />
          </MeditationProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 