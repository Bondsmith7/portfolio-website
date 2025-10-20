'use client'

import { motion } from 'framer-motion'
import { Code, Leaf, Recycle, Heart, Users, Lightbulb } from 'lucide-react'

export default function About() {
  const skills = [
    {
      category: 'Technology',
      icon: Code,
      items: ['Bachelor\'s in IT (Nyack College)', 'Linux+ Certification', 'Network+ Certification', 'Customer Service Experience'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      category: 'Agriculture',
      icon: Leaf,
      items: ['Sustainable Agriculture', 'Composting', 'Permaculture', 'Environmental Stewardship'],
      color: 'bg-green-100 text-green-600'
    },
    {
      category: 'Sustainability',
      icon: Recycle,
      items: ['Plastic Recycling', 'Material Processing', 'Waste Reduction', 'Environmental Impact'],
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      category: 'Community',
      icon: Heart,
      items: ['Worship Leadership', 'Prayer Ministry', 'Community Building', 'Spiritual Guidance'],
      color: 'bg-red-100 text-red-600'
    }
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            About Me
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            I'm a multifaceted individual passionate about sustainability, and community. 
            My diverse background spans IT support, agriculture, and faith-based service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-secondary-900 mb-6">
              My Journey
            </h3>
            <div className="space-y-4 text-secondary-600">
              <p>
                With a passion for problem-solving and helping others, I've developed expertise across 
                multiple domains. From troubleshooting IT issues to managing sustainable farming operations, 
                I bring a unique perspective to every challenge.
              </p>
              <p>
                My technical expertise extends to Linux server administration, as demonstrated by hosting this 
                portfolio on a Digital Ocean VPS. I've configured Ubuntu, set up Nginx for web serving, 
                implemented SSH key authentication for secure access, and configured UFW firewall rules 
                for robust security. This hands-on experience with Linux systems, network security, and 
                server management showcases my ability to work with enterprise-level infrastructure.
              </p>
              <p>
                My faith in Jesus Christ and commitment to biblical values form the foundation of everything I do. 
                I believe that each individual has a responsibility to accept God's invitation to play their part in God's plan, 
                whether through technical excellence, environmental stewardship, or community service. Inspired by 
                teachings on soul care and spiritual growth, I've learned that true career fulfillment comes from 
                aligning our work with God's purpose and serving others with integrity and compassion.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <div key={skill.category} className="card text-center">
                <div className={`w-12 h-12 rounded-full ${skill.color} flex items-center justify-center mx-auto mb-4`}>
                  <skill.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">{skill.category}</h4>
                <ul className="text-sm text-secondary-600 space-y-1">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-primary-50 rounded-2xl p-8 text-center"
        >
          <Lightbulb className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-secondary-900 mb-4">
            What I'm Looking For
          </h3>
          <p className="text-secondary-600 max-w-3xl mx-auto">
            I'm seeking opportunities that allow me to combine my technical skills with my passion for 
            sustainability and community service. Whether it's IT support at a forward-thinking company, 
            hands-on work in sustainable agriculture, contributing to environmental solutions through 
            recycling and material processing, or serving in faith-based ministry - I'm excited to 
            bring my diverse skills and values to meaningful work.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
