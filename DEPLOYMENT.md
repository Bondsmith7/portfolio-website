# Portfolio Website - Ubuntu Nginx Deployment Guide

This guide will help you deploy your portfolio website on an Ubuntu server with Nginx.

## Prerequisites

- Ubuntu 20.04+ server
- Domain name pointing to your server
- SSH access to your server
- Resend API key for contact form

## Production Optimizations

This deployment uses Next.js standalone build for optimal performance:
- **Standalone Build**: Self-contained server with minimal dependencies
- **Systemd Service**: Better process management and auto-restart
- **Nginx Reverse Proxy**: Handles static files and SSL termination
- **Security Hardening**: UFW firewall and systemd security settings

## Quick Deployment

1. **SSH into your server:**
   ```bash
   ssh your-username@your-server-ip
   ```

2. **Run the deployment script:**
   ```bash
   wget https://raw.githubusercontent.com/Bondsmith7/portfolio-website/main/deploy.sh
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Update your Resend API key:**
   ```bash
   sudo nano /var/www/portfolio/.env.local
   # Replace 'your_resend_api_key_here' with your actual Resend API key
   ```

4. **Restart the application:**
   ```bash
   sudo systemctl restart portfolio
   ```

## Manual Deployment Steps

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 2. Deploy Application

```bash
# Create application directory
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:$USER /var/www/portfolio

# Clone repository
cd /var/www/portfolio
git clone https://github.com/Bondsmith7/portfolio-website.git .

# Install dependencies
npm install --production

# Create environment file
sudo nano .env.local
```

Add the following content to `.env.local`:
```
RESEND_API_KEY=your_actual_resend_api_key
RESEND_EMAIL_TO=nathan.emanuel007@gmail.com
RESEND_EMAIL_FROM=onboarding@resend.dev
NODE_ENV=production
PORT=3000
```

### 3. Build and Start Application

```bash
# Build the application
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

### 4. Configure Nginx

```bash
# Copy Nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 5. Configure Firewall

```bash
# Configure UFW
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable
```

## SSL Certificate (Recommended)

To enable HTTPS, install Certbot and get a free SSL certificate:

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add this line:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## Updating the Website

To update your website with new changes:

```bash
cd /var/www/portfolio
git pull origin main
npm install --production
npm run build
pm2 restart portfolio
```

## Monitoring

- **Check application status:** `pm2 status`
- **View logs:** `pm2 logs portfolio`
- **Restart application:** `pm2 restart portfolio`
- **Check Nginx status:** `sudo systemctl status nginx`

## Troubleshooting

### Application won't start
```bash
# Check logs
pm2 logs portfolio

# Check if port 3000 is in use
sudo netstat -tlnp | grep :3000
```

### Nginx issues
```bash
# Test configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Contact form not working
- Verify your Resend API key in `.env.local`
- Check if the API key has the correct permissions
- Restart the application: `pm2 restart portfolio`

## File Structure

```
/var/www/portfolio/
├── .next/                 # Built application
├── public/               # Static assets
├── app/                  # Next.js app directory
├── components/           # React components
├── data/                 # Project data
├── .env.local           # Environment variables
├── package.json         # Dependencies
└── nginx.conf           # Nginx configuration
```

## Security Notes

- The `.env.local` file contains sensitive information and should be protected
- Regular security updates: `sudo apt update && sudo apt upgrade`
- Monitor logs regularly for any suspicious activity
- Consider setting up fail2ban for additional security

## Support

If you encounter any issues:
1. Check the logs: `pm2 logs portfolio`
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check Nginx configuration: `sudo nginx -t`
