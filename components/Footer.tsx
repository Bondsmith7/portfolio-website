'use client'

import { Heart, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Thoughts', href: '#thoughts' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/nathan',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/nathan',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:nathan@example.com',
      label: 'Email'
    }
  ]

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">Nathan</h3>
            <p className="text-secondary-300 mb-6">
              Passionate about technology, sustainability, and making a positive impact. 
              Building bridges between innovation, nature, and community.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center text-secondary-300 hover:text-white hover:bg-primary-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
            <div className="space-y-2 text-secondary-300">
              <p>Available for new opportunities</p>
              <p>Remote work preferred</p>
              <p>Open to diverse projects</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Nathan. All rights reserved.
            </p>
            <p className="text-secondary-400 text-sm flex items-center mt-4 md:mt-0">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> and lots of coffee
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
