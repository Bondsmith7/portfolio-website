import { notFound } from 'next/navigation'
import projectsData from '@/data/projects.json'
import Link from 'next/link'

interface ProjectStep {
  date?: string
  title: string
  details?: string
}

interface ProjectItem {
  id: number
  title: string
  slug: string
  description: string
  longDescription?: string
  category: string
  technologies: string[]
  image: string
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

        <div className="aspect-video bg-secondary-100 rounded-lg overflow-hidden mb-8">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

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
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </main>
  )
}


