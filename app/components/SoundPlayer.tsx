'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MusicalNoteIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'

const sounds = [
  { id: 'forest', name: 'Forest Birds', file: '/OpenMeditation/sounds/forest.mp3' },
  { id: 'rain', name: 'Gentle Rain', file: '/OpenMeditation/sounds/rain.mp3' },
  { id: 'ocean', name: 'Ocean Waves', file: '/OpenMeditation/sounds/ocean.mp3' },
  { id: 'bells', name: 'Meditation Bells', file: '/OpenMeditation/sounds/bells.mp3' },
]

export default function SoundPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSound, setSelectedSound] = useState<string>('forest')
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const playInitialSound = async () => {
      const audio = new Audio(sounds[0].file)
      audio.loop = true
      audio.volume = volume
      audio.muted = isMuted
      
      audio.addEventListener('play', () => setIsPlaying(true))
      audio.addEventListener('pause', () => setIsPlaying(false))
      audio.addEventListener('ended', () => setIsPlaying(false))
      
      audioRef.current = audio
      
      try {
        await audio.play()
      } catch (error) {
        console.log('Failed to play initial sound:', error)
      }
    }

    playInitialSound()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  const handleSoundSelect = async (soundId: string) => {
    if (selectedSound === soundId) {
      // Stop current sound
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setSelectedSound(null)
      setIsPlaying(false)
    } else {
      // Stop current sound if playing
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      
      // Create and play new sound
      const newSound = sounds.find(s => s.id === soundId)
      if (newSound) {
        const audio = new Audio(newSound.file)
        audio.loop = true
        audio.volume = volume
        audio.muted = isMuted
        
        audio.addEventListener('play', () => setIsPlaying(true))
        audio.addEventListener('pause', () => setIsPlaying(false))
        audio.addEventListener('ended', () => setIsPlaying(false))
        
        audioRef.current = audio
        setSelectedSound(soundId)
        
        try {
          await audio.play()
        } catch (error) {
          console.log('Failed to play sound:', error)
        }
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={false}
        animate={{ scale: isOpen ? 1 : 0.9 }}
        className="bg-white rounded-lg shadow-lg p-4"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full transition-colors ${
              isPlaying ? 'bg-primary-100' : 'hover:bg-gray-100'
            }`}
          >
            <MusicalNoteIcon className={`w-6 h-6 ${isPlaying ? 'text-primary-600' : 'text-gray-600'}`} />
          </button>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="flex flex-col space-y-2">
                {sounds.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => handleSoundSelect(sound.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedSound === sound.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {sound.name}
                    {selectedSound === sound.id && isPlaying && (
                      <span className="ml-2">●</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24"
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
} 