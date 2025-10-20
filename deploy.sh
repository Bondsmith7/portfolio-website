#!/bin/bash

# Portfolio Website Deployment Script for Ubuntu
# Run this script on your Ubuntu server

set -e

echo "🚀 Starting Portfolio Website Deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js (if not already installed)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 for process management
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:$USER /var/www/portfolio

# Clone or update repository
echo "📥 Cloning/updating repository..."
cd /var/www/portfolio
if [ -d ".git" ]; then
    git pull origin main
else
    git clone https://github.com/Bondsmith7/portfolio-website.git .
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Create environment file
echo "🔧 Setting up environment..."
sudo tee /var/www/portfolio/.env.local > /dev/null <<EOF
RESEND_API_KEY=your_resend_api_key_here
RESEND_EMAIL_TO=nathan.emanuel007@gmail.com
RESEND_EMAIL_FROM=onboarding@resend.dev
NODE_ENV=production
PORT=3000
EOF

# Build the application
echo "🔨 Building application..."
npm run build

# Install and configure Nginx
echo "🌐 Configuring Nginx..."
sudo apt install -y nginx

# Copy Nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Start services
echo "🚀 Starting services..."
sudo systemctl restart nginx
sudo systemctl enable nginx

# Start the application with PM2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup

# Configure UFW firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable

echo "✅ Deployment completed successfully!"
echo "🌐 Your portfolio is now running at: http://your-domain.com"
echo "📧 Don't forget to update your Resend API key in /var/www/portfolio/.env.local"
