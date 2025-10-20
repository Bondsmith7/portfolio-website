'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Code, Leaf, Recycle, Heart } from 'lucide-react'

export default function Hero() {
  const interests = [
    { icon: Code, label: 'Technology', color: 'text-blue-600' },
    { icon: Leaf, label: 'Agriculture', color: 'text-green-600' },
    { icon: Recycle, label: 'Sustainability', color: 'text-emerald-600' },
    { icon: Heart, label: 'Faith', color: 'text-red-600' },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-secondary-900 mb-6">
            Hi, I'm{' '}
            <span className="text-primary-600">Nathan</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-3xl mx-auto"
          >
            Passionate about technology, sustainability, and making a positive impact. 
            Exploring the intersection of innovation, nature, and faith.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {interests.map((interest, index) => (
              <div
                key={interest.label}
                className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md"
              >
                <interest.icon className={`w-5 h-5 ${interest.color}`} />
                <span className="text-secondary-700 font-medium">{interest.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <a
              href="#projects"
              className="btn-primary inline-flex items-center justify-center"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a href="#about" className="text-secondary-400 hover:text-primary-600 transition-colors">
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
