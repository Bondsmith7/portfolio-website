import { notFound } from 'next/navigation'
import projectsData from '@/data/projects.json'
import Link from 'next/link'
import ImageCarousel from '@/components/ImageCarousel'

interface ProjectStep {
  date?: string
  title: string
  details?: string
  videoUrl?: string
}

interface ProjectItem {
  id: number
  title: string
  slug: string
  description: string
  longDescription?: string
  category: string
  technologies: string[]
  image?: string
  images?: string[]
  featured: boolean
  date: string
  steps?: ProjectStep[]
}

export async function generateStaticParams() {
  return (projectsData as ProjectItem[]).map((p) => ({ slug: p.slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = (projectsData as ProjectItem[]).find(p => p.slug === params.slug)
  if (!project) return notFound()

  const displayDate = new Date(project.date).toLocaleDateString()
  const description = project.longDescription || project.description
  
  // Support both single image and multiple images (backward compatible)
  const images = project.images || (project.image ? [project.image] : [])
  
  // Image-specific notes (for the toilet repair project)
  const imageNotes: Record<string, string> = {}
  if (project.slug === 'resolved-running-toilet-replaced-diaphragm') {
    imageNotes['/images/diaphragm2.jpg'] = 'The 1.28 gpf diaphragm didn\'t allow enough water to flow and led to a thunking sound. The 1.6 gpf was needed for my toilet assembly.'
  }

  return (
    <main className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-primary-600 hover:underline">← Back to home</Link>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-secondary-900 mb-4">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-secondary-600 mb-6">
          <span className="capitalize text-primary-700 font-medium">{project.category}</span>
          <span>•</span>
          <span>{displayDate}</span>
        </div>

        <ImageCarousel images={images} alt={project.title} imageNotes={imageNotes} />

        <p className="text-lg text-secondary-700 leading-8 mb-10">{description}</p>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.steps && project.steps.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Step-by-step progression</h2>
            <ol className="relative border-s-2 border-secondary-200 ps-4">
              {project.steps.map((step, index) => (
                <li key={index} className="mb-8 ms-4">
                  <div className="absolute w-3 h-3 bg-primary-500 rounded-full -start-1.5 mt-2" />
                  <time className="mb-1 text-sm font-normal leading-none text-secondary-500">
                    {step.date}
                  </time>
                  <h3 className="text-lg font-semibold text-secondary-900">{step.title}</h3>
                  {step.details && (
                    <p className="text-secondary-700 mt-1">{step.details}</p>
                  )}
                  {step.videoUrl && (
                    <a 
                      href={step.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch tutorial video
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </main>
  )
}


