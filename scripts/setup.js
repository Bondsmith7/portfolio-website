#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up your portfolio website...\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the project root.');
  process.exit(1);
}

console.log('✅ Project structure looks good!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run dev');
console.log('3. Open http://localhost:3000 in your browser');
console.log('\n🎨 Customization tips:');
console.log('- Edit data/projects.json to add your projects');
console.log('- Add markdown files to content/thoughts/ for blog posts');
console.log('- Update contact information in components/Contact.tsx');
console.log('- Customize colors in tailwind.config.js');
console.log('\n🚀 Happy coding!');
