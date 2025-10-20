# Portfolio Website

A clean, modular portfolio website showcasing diverse skills and interests across technology, agriculture, sustainability, and community service.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Tech Stack**: Next.js 14, React, TypeScript
- **Smooth Animations**: Framer Motion for engaging user experience
- **Content Management**: Markdown support for thoughts and blog posts
- **SEO Optimized**: Built-in SEO with Next.js
- **Fast Performance**: Optimized for speed and accessibility

## Sections

1. **Hero**: Introduction with key interests and call-to-action
2. **About**: Personal story and diverse skill sets
3. **Projects**: Showcase of work across different domains
4. **Thoughts**: Blog-style content with markdown support
5. **Contact**: Contact form and social links

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Content**: Markdown files for thoughts/blog posts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolioSite
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Adding New Projects

Edit `data/projects.json` to add new projects:

```json
{
  "id": 7,
  "title": "Your Project Title",
  "description": "Project description",
  "category": "technology|agriculture|sustainability|community",
  "technologies": ["Tech 1", "Tech 2"],
  "image": "/path/to/image",
  "featured": false,
  "date": "2024-01-01"
}
```

### Adding New Thoughts/Blog Posts

Create new markdown files in `content/thoughts/` with frontmatter:

```markdown
---
title: "Your Thought Title"
date: "2024-01-01"
category: "technology|community|sustainability|agriculture"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
---

# Your Content Here
```

### Styling

- Colors: Edit `tailwind.config.js` to customize the color scheme
- Fonts: Update font imports in `app/globals.css`
- Components: Modify individual components in the `components/` directory

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Content Strategy

### For Job Applications

- **IT Support**: Highlight technical troubleshooting and customer service skills
- **Farming**: Showcase agricultural knowledge and sustainability focus
- **Recycling**: Emphasize environmental impact and material processing experience
- **Ministry**: Demonstrate community building and leadership abilities

### SEO Optimization

- Update meta tags in `app/layout.tsx`
- Add structured data for better search visibility
- Optimize images and content for performance
- Use semantic HTML throughout

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have questions or need help customizing the portfolio, feel free to reach out through the contact form on the website.
