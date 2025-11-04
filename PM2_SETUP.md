# PM2, Nginx, and SSL Quick Setup Guide

This guide provides a quick reference for setting up and managing your portfolio with PM2, Nginx, and SSL certificates.

## 🚀 Initial Setup (On Your Server)

### 1. Quick Deploy
```bash
# Download and run deployment script
wget https://raw.githubusercontent.com/Bondsmith7/portfolio-website/main/deploy.sh
chmod +x deploy.sh
./deploy.sh
```

### 2. Configure Environment
```bash
nano /var/www/portfolio/.env.local
```
Update your Resend API key and other variables.

### 3. Setup SSL
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d natanemanuel.org -d www.natanemanuel.org

# Switch to HTTPS config
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo nginx -t && sudo systemctl reload nginx
```

## 📊 PM2 Commands

### Basic Operations
```bash
# Check status
pm2 status

# View logs (live)
pm2 logs portfolio

# View logs (last 100 lines)
pm2 logs portfolio --lines 100

# Monitor (real-time CPU/Memory)
pm2 monit

# Restart application
pm2 restart portfolio

# Stop application
pm2 stop portfolio

# Start application
pm2 start ecosystem.config.js --env production
```

### Advanced Operations
```bash
# Reload with zero-downtime
pm2 reload portfolio

# Delete from PM2
pm2 delete portfolio

# View detailed info
pm2 info portfolio

# Flush logs
pm2 flush portfolio

# Save current process list
pm2 save

# Resurrect saved processes
pm2 resurrect
```

### Using NPM Scripts
```bash
npm run pm2:start      # Start with PM2
npm run pm2:stop       # Stop
npm run pm2:restart    # Restart
npm run pm2:delete     # Delete
npm run pm2:logs       # View logs
npm run pm2:monit      # Monitor
```

## 🌐 Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload (without downtime)
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/error.log

# View access logs
sudo tail -f /var/log/nginx/access.log
```

## 🔒 SSL/Certbot Commands

```bash
# Check certificate status
sudo certbot certificates

# Renew certificates (manual)
sudo certbot renew

# Test renewal process
sudo certbot renew --dry-run

# Renew and reload nginx
sudo certbot renew --post-hook "systemctl reload nginx"

# View certbot logs
sudo journalctl -u certbot
```

## 🔄 Update Your Website

### Method 1: Using Update Script
```bash
cd /var/www/portfolio
./scripts/update-deployment.sh
```

### Method 2: Manual Update
```bash
cd /var/www/portfolio
git pull origin main
npm install
npm run build
pm2 restart portfolio
```

## 🏥 Health Checks

### Run Health Check Script
```bash
cd /var/www/portfolio
./scripts/check-health.sh
```

### Manual Health Checks
```bash
# Check if app is responding
curl -I http://localhost:3000

# Check HTTPS
curl -I https://natanemanuel.org

# Check PM2 processes
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check system resources
htop  # or top
df -h  # disk space
free -h  # memory
```

## 🐛 Troubleshooting

### Application Issues
```bash
# View recent logs
pm2 logs portfolio --lines 100

# Check if port is in use
sudo netstat -tlnp | grep :3000

# Restart application
pm2 restart portfolio

# Delete and restart
pm2 delete portfolio
pm2 start ecosystem.config.js --env production
```

### Nginx Issues
```bash
# Test config
sudo nginx -t

# View errors
sudo tail -f /var/log/nginx/error.log

# Restart nginx
sudo systemctl restart nginx
```

### SSL Issues
```bash
# Check certificate
sudo certbot certificates

# Renew manually
sudo certbot renew --force-renewal

# Check certificate expiry
echo | openssl s_client -servername natanemanuel.org -connect natanemanuel.org:443 2>/dev/null | openssl x509 -noout -dates
```

### PM2 Not Starting on Boot
```bash
# Save process list
pm2 save

# Setup startup script
pm2 startup systemd

# Run the command that PM2 outputs

# Reboot to test
sudo reboot
```

## 📁 Important Files

| File | Purpose | Location |
|------|---------|----------|
| `ecosystem.config.js` | PM2 configuration | `/var/www/portfolio/` |
| `nginx.conf` | Nginx configuration | `/etc/nginx/sites-available/portfolio` |
| `.env.local` | Environment variables | `/var/www/portfolio/.env.local` |
| PM2 logs | Application logs | `/var/www/portfolio/logs/` |
| Nginx logs | Web server logs | `/var/log/nginx/` |
| SSL certs | SSL certificates | `/etc/letsencrypt/live/natanemanuel.org/` |

## 🔐 Security Checklist

- [ ] SSL certificate installed and auto-renewal enabled
- [ ] Firewall (UFW) configured and enabled
- [ ] SSH key-based authentication (disable password auth)
- [ ] Regular system updates (`sudo apt update && sudo apt upgrade`)
- [ ] PM2 running as non-root user
- [ ] Environment variables secured in `.env.local`
- [ ] Fail2ban installed (optional but recommended)
- [ ] Regular backups configured

## 📈 Performance Tips

1. **Enable PM2 Cluster Mode** (for high traffic):
   ```javascript
   // In ecosystem.config.js
   instances: 'max',
   exec_mode: 'cluster'
   ```

2. **Monitor Performance**:
   ```bash
   pm2 monit
   pm2 info portfolio
   ```

3. **Check Nginx Cache**:
   Static files are cached for 1 year automatically.

4. **Review Logs Regularly**:
   ```bash
   pm2 logs portfolio --lines 200
   ```

## 🆘 Emergency Commands

### If Site is Down
```bash
# 1. Check PM2
pm2 status
pm2 logs portfolio --lines 50

# 2. Restart application
pm2 restart portfolio

# 3. Check Nginx
sudo systemctl status nginx
sudo systemctl restart nginx

# 4. Check if app responds locally
curl http://localhost:3000

# 5. Check system resources
free -h
df -h
```

### If High CPU/Memory Usage
```bash
# Check processes
pm2 monit
htop

# Restart application
pm2 restart portfolio

# Clear logs if too large
pm2 flush portfolio
```

## 📞 Support Resources

- **PM2 Docs**: https://pm2.keymetrics.io/docs/
- **Nginx Docs**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Quick Commands Summary**

```bash
# Deploy/Update
./deploy.sh                    # Initial deploy
./scripts/update-deployment.sh # Update

# Monitor
pm2 status                     # Status
pm2 logs portfolio            # Logs
pm2 monit                     # Monitor

# Restart
pm2 restart portfolio         # Restart app
sudo systemctl reload nginx   # Reload nginx

# SSL
sudo certbot renew           # Renew SSL
./scripts/ssl-renew.sh       # SSL renewal script

# Health
./scripts/check-health.sh    # Health check
```

