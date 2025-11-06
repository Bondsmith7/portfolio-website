'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import projectsData from '@/data/projects.json'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  slug: string
  description: string
  category: string
  technologies: string[]
  image: string
  featured: boolean
  date: string
}

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const projectsPerView = 3 // Show 3 projects at once on desktop
  const totalProjects = projectsData.length
  const needsSlider = totalProjects > projectsPerView

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalProjects - projectsPerView : Math.max(0, prevIndex - 1)
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= totalProjects - projectsPerView ? 0 : prevIndex + 1
    )
  }

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < totalProjects - projectsPerView

  return (
    <section id="projects" className="section-padding bg-secondary-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            My Projects
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            A collection of work spanning technology, agriculture, sustainability, and community service.
          </p>
        </motion.div>

        {/* Projects Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            {needsSlider && (
              <button
                onClick={goToPrevious}
                disabled={!canGoPrevious}
                className={`flex-shrink-0 bg-white shadow-lg hover:bg-primary-50 text-secondary-700 p-4 rounded-full transition-all duration-200 ${
                  !canGoPrevious ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
                aria-label="Previous projects"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Projects Container */}
            <div className={`relative flex-1 ${needsSlider ? 'overflow-hidden' : ''}`} style={{ maxWidth: needsSlider ? '85%' : '100%' }}>
              <div 
                className={`flex gap-6 ${needsSlider ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={needsSlider ? { 
                  transform: `translateX(calc(-${currentIndex} * (100% / ${projectsPerView}) - ${currentIndex} * 1.5rem))` 
                } : {}}
              >
              {projectsData.map((project: Project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0"
                  style={{ width: needsSlider ? `calc((100% - ${(projectsPerView - 1) * 1.5}rem) / ${projectsPerView})` : `calc((100% - ${(totalProjects - 1) * 1.5}rem) / ${totalProjects})` }}
                >
                  <Link href={`/projects/${project.slug}`} className="card group hover:shadow-xl transition-all duration-300 block h-full" style={{ transform: 'scale(0.9)' }}>
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-3 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          (e.currentTarget.nextElementSibling as HTMLElement)?.style.setProperty('display', 'flex');
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                        <span className="text-secondary-500 text-sm">Project Image</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-600 capitalize">
                        {project.category}
                      </span>
                      <span className="text-sm text-secondary-500">
                        {new Date(project.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-secondary-600 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
              </div>
            </div>

            {/* Right Arrow */}
            {needsSlider && (
              <button
                onClick={goToNext}
                disabled={!canGoNext}
                className={`flex-shrink-0 bg-white shadow-lg hover:bg-primary-50 text-secondary-700 p-4 rounded-full transition-all duration-200 ${
                  !canGoNext ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
                aria-label="Next projects"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Dots Indicator */}
          {needsSlider && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(totalProjects / projectsPerView) }).map((_, index) => {
                const startIndex = index * projectsPerView
                const isActive = currentIndex >= startIndex && currentIndex < startIndex + projectsPerView
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(startIndex)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary-600 w-8' 
                        : 'bg-secondary-300 hover:bg-secondary-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
