# Deployment Guide

## PVT Hostel Check-In System Deployment

This guide provides step-by-step instructions for deploying the PVT Hostel Check-In System to various hosting platforms.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Traditional Web Hosting (FTP)](#traditional-web-hosting-ftp)
3. [Static Site Hosting](#static-site-hosting)
4. [Cloud Deployment](#cloud-deployment)
5. [On-Premises Deployment](#on-premises-deployment)
6. [Domain Configuration](#domain-configuration)
7. [SSL/HTTPS Setup](#sslhttps-setup)
8. [Post-Deployment](#post-deployment)
9. [Rollback Procedures](#rollback-procedures)

## Pre-Deployment Checklist

### Code Preparation
```
□ All features tested locally
□ Browser compatibility verified
□ Documentation updated
□ Configuration reviewed
□ Backup of current version (if updating)
□ Test data removed
□ Error handling implemented
□ Performance optimized
```

### Files to Deploy
```
/
├── index.html          [Required]
├── guests.html         [Required]
├── styles.css          [Required]
├── script.js           [Required]
├── favicon.ico         [Optional]
├── robots.txt          [Optional]
└── docs/              [Optional]
```

### Environment Verification
```
□ Target server accessible
□ FTP/SSH credentials ready
□ Domain name configured
□ SSL certificate available
□ Backup location prepared
```

## Traditional Web Hosting (FTP)

### Step 1: Prepare FTP Client

**Recommended FTP Clients:**
- FileZilla (Windows/Mac/Linux)
- Cyberduck (Mac/Windows)
- WinSCP (Windows)
- Transmit (Mac)

### Step 2: Configure FTP Connection

```
Host: ftp.yourdomain.com
Username: your-ftp-username
Password: your-ftp-password
Port: 21 (or 22 for SFTP)
Protocol: FTP/SFTP
```

### Step 3: Upload Files

1. **Connect to Server**
   ```
   - Open FTP client
   - Enter connection details
   - Click "Connect"
   ```

2. **Navigate to Web Root**
   ```
   Common paths:
   - /public_html/
   - /www/
   - /htdocs/
   - /home/username/public_html/
   ```

3. **Upload Files**
   ```
   - Select all 4 core files
   - Drag to remote directory
   - Ensure transfer mode is "Auto"
   - Wait for upload completion
   ```

### Step 4: Verify Deployment

```
1. Open browser
2. Navigate to: https://yourdomain.com
3. Test all functionality
4. Check browser console for errors
```

### cPanel Deployment

If using cPanel:

1. **File Manager Method**
   ```
   - Login to cPanel
   - Open File Manager
   - Navigate to public_html
   - Upload files using Upload button
   - Extract if uploaded as zip
   ```

2. **Set Permissions**
   ```
   - Select all files
   - Click "Permissions"
   - Set to 644 for files
   - Set to 755 for directories
   ```

## Static Site Hosting

### Netlify Deployment

#### Method 1: Drag and Drop
1. Visit [netlify.com](https://netlify.com)
2. Drag project folder to deployment area
3. Wait for deployment
4. Access via provided URL

#### Method 2: Git Integration
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Connect to Netlify
# 1. Login to Netlify
# 2. Click "New site from Git"
# 3. Choose repository
# 4. Deploy
```

#### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

### Vercel Deployment

#### CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
# - Set project name
# - Choose directory
# - Deploy
```

#### Configuration
Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### GitHub Pages

1. **Create Repository**
   ```bash
   # Create new repository on GitHub
   # Clone locally
   git clone https://github.com/username/pvt-hostel-checkin.git
   cd pvt-hostel-checkin
   ```

2. **Add Files**
   ```bash
   # Copy files to repository
   cp /path/to/files/* .
   git add .
   git commit -m "Add check-in system"
   git push origin main
   ```

3. **Enable GitHub Pages**
   ```
   - Go to Settings > Pages
   - Source: Deploy from branch
   - Branch: main
   - Folder: / (root)
   - Save
   ```

4. **Access Site**
   ```
   URL: https://username.github.io/pvt-hostel-checkin/
   ```

## Cloud Deployment

### AWS S3 + CloudFront

#### Step 1: Create S3 Bucket
```bash
# Using AWS CLI
aws s3 mb s3://pvt-hostel-checkin

# Configure for static hosting
aws s3 website s3://pvt-hostel-checkin \
  --index-document index.html \
  --error-document error.html
```

#### Step 2: Upload Files
```bash
# Sync files to S3
aws s3 sync . s3://pvt-hostel-checkin \
  --exclude ".git/*" \
  --exclude "*.md" \
  --acl public-read
```

#### Step 3: Configure CloudFront
```json
{
  "DistributionConfig": {
    "Origins": [{
      "DomainName": "pvt-hostel-checkin.s3.amazonaws.com",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }],
    "DefaultRootObject": "index.html",
    "Enabled": true
  }
}
```

### Google Cloud Storage

#### Step 1: Create Bucket
```bash
# Create bucket
gsutil mb gs://pvt-hostel-checkin

# Make public
gsutil iam ch allUsers:objectViewer gs://pvt-hostel-checkin
```

#### Step 2: Upload Files
```bash
# Upload files
gsutil -m cp -r * gs://pvt-hostel-checkin/

# Set metadata
gsutil setmeta -h "Content-Type:text/html" \
  -h "Cache-Control:public, max-age=3600" \
  gs://pvt-hostel-checkin/*.html
```

### Azure Static Web Apps

```bash
# Using Azure CLI
az staticwebapp create \
  --name pvt-hostel-checkin \
  --resource-group myResourceGroup \
  --source ./ \
  --location "East US 2" \
  --branch main \
  --app-artifact-location "." \
  --token $GITHUB_TOKEN
```

## On-Premises Deployment

### Apache Server

#### Step 1: Copy Files
```bash
# Copy to web root
sudo cp -r /path/to/files/* /var/www/html/
```

#### Step 2: Configure Apache
Create `/etc/apache2/sites-available/pvt-hostel.conf`:
```apache
<VirtualHost *:80>
    ServerName checkin.pvthostel.com
    DocumentRoot /var/www/html
    
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Security Headers
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "DENY"
    Header set X-XSS-Protection "1; mode=block"
</VirtualHost>
```

#### Step 3: Enable Site
```bash
sudo a2ensite pvt-hostel.conf
sudo a2enmod headers
sudo systemctl reload apache2
```

### Nginx Server

#### Configuration
Create `/etc/nginx/sites-available/pvt-hostel`:
```nginx
server {
    listen 80;
    server_name checkin.pvthostel.com;
    root /var/www/pvt-hostel;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Security headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";
    
    # Caching
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/pvt-hostel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### IIS (Windows)

1. **Copy Files**
   ```
   Copy to: C:\inetpub\wwwroot\pvt-hostel\
   ```

2. **Create Site**
   ```
   - Open IIS Manager
   - Right-click Sites > Add Website
   - Site name: PVT Hostel Check-In
   - Physical path: C:\inetpub\wwwroot\pvt-hostel
   - Binding: http, port 80
   ```

3. **Configure MIME Types**
   ```
   - Select site
   - Open MIME Types
   - Ensure .js and .css are configured
   ```

## Domain Configuration

### DNS Settings

#### A Record (IPv4)
```
Type: A
Name: checkin (or @)
Value: YOUR_SERVER_IP
TTL: 3600
```

#### AAAA Record (IPv6)
```
Type: AAAA
Name: checkin (or @)
Value: YOUR_SERVER_IPV6
TTL: 3600
```

#### CNAME (for subdomains)
```
Type: CNAME
Name: checkin
Value: your-main-domain.com
TTL: 3600
```

### CloudFlare Configuration

1. **Add Site to CloudFlare**
2. **Configure DNS Records**
3. **Enable Features:**
   - Auto Minify (HTML, CSS, JS)
   - Brotli Compression
   - HTTP/2
   - Always HTTPS

## SSL/HTTPS Setup

### Let's Encrypt (Free SSL)

#### Using Certbot
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache

# Obtain certificate
sudo certbot --apache -d checkin.pvthostel.com

# Auto-renewal
sudo certbot renew --dry-run
```

### CloudFlare SSL

1. **Enable SSL/TLS**
   - Login to CloudFlare
   - Go to SSL/TLS
   - Choose "Full (strict)"

2. **Force HTTPS**
   - Create Page Rule
   - URL: http://*checkin.pvthostel.com/*
   - Setting: Always Use HTTPS

### Manual SSL Installation

1. **Generate CSR**
   ```bash
   openssl req -new -newkey rsa:2048 -nodes \
     -keyout domain.key -out domain.csr
   ```

2. **Install Certificate**
   - Upload certificate files
   - Update server configuration
   - Restart web server

## Post-Deployment

### Verification Checklist
```
□ Site loads correctly
□ All pages accessible
□ Forms submit properly
□ Guest list displays
□ Export functionality works
□ Console shows no errors
□ HTTPS working
□ Mobile responsive
```

### Performance Testing

#### Google PageSpeed Insights
1. Visit [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your URL
3. Review suggestions
4. Aim for 90+ score

#### GTmetrix
1. Visit [GTmetrix](https://gtmetrix.com/)
2. Analyze site
3. Review waterfall
4. Optimize as needed

### Security Scan

#### Mozilla Observatory
```
https://observatory.mozilla.org/analyze/checkin.pvthostel.com
```

#### Security Headers
```
https://securityheaders.com/?q=checkin.pvthostel.com
```

## Rollback Procedures

### Quick Rollback

1. **Keep Previous Version**
   ```bash
   # Before deployment
   cp -r /var/www/html /var/www/html.backup
   
   # Rollback
   mv /var/www/html /var/www/html.failed
   mv /var/www/html.backup /var/www/html
   ```

2. **Version Control Rollback**
   ```bash
   # Git rollback
   git checkout previous-commit-hash
   git push --force
   ```

### Deployment Issues

#### Common Problems

1. **404 Errors**
   - Check file paths
   - Verify index.html exists
   - Check .htaccess rules

2. **JavaScript Errors**
   - Clear browser cache
   - Check file upload completed
   - Verify file permissions

3. **Styling Issues**
   - Force refresh (Ctrl+F5)
   - Check CSS file path
   - Verify MIME types

### Emergency Contacts

- **Hosting Support**: support@hosting.com
- **Domain Registrar**: support@registrar.com
- **IT Team**: it@pvthostel.com

## Deployment Automation

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to FTP

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: FTP Deploy
      uses: SamKirkland/FTP-Deploy-Action@4.0.0
      with:
        server: ftp.yourdomain.com
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        server-dir: /public_html/
```

### Deployment Script
Create `deploy.sh`:
```bash
#!/bin/bash

# Configuration
REMOTE_HOST="your-server.com"
REMOTE_USER="username"
REMOTE_PATH="/var/www/html"
LOCAL_PATH="."

# Deploy
echo "Deploying to $REMOTE_HOST..."
rsync -avz --delete \
  --exclude '.git' \
  --exclude '*.md' \
  --exclude 'deploy.sh' \
  $LOCAL_PATH/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

echo "Deployment complete!"
```

## Conclusion

Successful deployment requires careful planning and testing. Always:
1. Test thoroughly before deployment
2. Keep backups of working versions
3. Monitor after deployment
4. Document any custom configurations

For additional support, refer to your hosting provider's documentation or contact the IT support team.

---

*Last Updated: January 2025*
*Version: 1.0*