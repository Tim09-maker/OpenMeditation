'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  SparklesIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Guided', href: '/guided', icon: SparklesIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
]

const unauthenticatedNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Login', href: '/login', icon: UserIcon },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()
  const navItems = user ? navigation : unauthenticatedNavigation

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg md:hidden"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-40 md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex-1 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      pathname === item.href
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop navigation */}
      <nav className="fixed top-1/2 right-8 -translate-y-1/2 z-40 hidden md:block">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-3">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-primary-100 text-primary-600 transform scale-110'
                    : 'text-gray-600 hover:bg-gray-50 hover:scale-105'
                }`}
                title={item.name}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
} 