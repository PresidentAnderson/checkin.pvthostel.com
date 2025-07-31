# DevOps Practices Guide

## Continuous Integration and Deployment for PVT Hostel Check-In System

This guide outlines DevOps best practices, automation strategies, and continuous deployment workflows for the check-in system.

## Table of Contents

1. [DevOps Overview](#devops-overview)
2. [Version Control Strategy](#version-control-strategy)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Automated Testing](#automated-testing)
5. [Infrastructure as Code](#infrastructure-as-code)
6. [Monitoring and Logging](#monitoring-and-logging)
7. [Security Automation](#security-automation)
8. [Performance Optimization](#performance-optimization)
9. [Disaster Recovery](#disaster-recovery)

## DevOps Overview

### Principles
- **Automation**: Minimize manual processes
- **Collaboration**: Bridge development and operations
- **Continuous Improvement**: Iterate and optimize
- **Monitoring**: Measure everything
- **Security**: Built-in, not bolted-on

### Tools Stack
```yaml
Version Control: Git
CI/CD: GitHub Actions / GitLab CI / Jenkins
Monitoring: Google Analytics / Plausible
Error Tracking: Sentry / Rollbar
Testing: Cypress / Jest
Security: OWASP ZAP / Snyk
Performance: Lighthouse CI
```

## Version Control Strategy

### Git Flow

#### Branch Structure
```
main (production)
├── develop (staging)
│   ├── feature/guest-search
│   ├── feature/bulk-import
│   └── feature/report-generation
├── hotfix/critical-bug
└── release/v1.2.0
```

### Branch Policies

#### Main Branch
```yaml
Protection Rules:
  - Require pull request reviews (2 approvers)
  - Require status checks to pass
  - Require branches to be up to date
  - Include administrators
  - Restrict push access
```

#### Commit Convention
```
type(scope): description

Example:
feat(check-in): add nationality field
fix(export): correct date format in JSON
docs(api): update endpoint documentation
style(ui): improve mobile responsiveness
refactor(storage): optimize localStorage usage
test(validation): add email validation tests
chore(deps): update dependencies
```

### Git Hooks

#### Pre-commit Hook
`.git/hooks/pre-commit`:
```bash
#!/bin/bash

# Run linting
eslint *.js || exit 1

# Check for debugging code
grep -r "console.log\|debugger" *.js && {
  echo "Remove console.log and debugger statements"
  exit 1
}

# Validate HTML
html-validate *.html || exit 1

echo "Pre-commit checks passed!"
```

#### Pre-push Hook
`.git/hooks/pre-push`:
```bash
#!/bin/bash

# Run tests
npm test || exit 1

# Check file size
find . -name "*.js" -size +100k -exec echo "Warning: {} is large" \;

echo "Pre-push checks passed!"
```

## CI/CD Pipeline

### GitHub Actions

#### Basic Pipeline
`.github/workflows/ci.yml`:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Validate HTML
      run: |
        npm install -g html-validate
        html-validate *.html
    
    - name: Lint JavaScript
      run: |
        npm install -g eslint
        eslint *.js
    
    - name: Run Security Scan
      run: |
        npm install -g snyk
        snyk test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Minify Files
      run: |
        npm install -g terser clean-css-cli html-minifier
        terser script.js -o script.min.js
        cleancss styles.css -o styles.min.css
        html-minifier --collapse-whitespace index.html -o index.min.html
    
    - name: Upload Artifacts
      uses: actions/upload-artifact@v3
      with:
        name: production-files
        path: |
          *.min.*
          guests.html

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Download Artifacts
      uses: actions/download-artifact@v3
      with:
        name: production-files
    
    - name: Deploy to FTP
      uses: SamKirkland/FTP-Deploy-Action@4.3.0
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        server-dir: /public_html/
```

### GitLab CI

`.gitlab-ci.yml`:
```yaml
stages:
  - test
  - build
  - deploy

variables:
  ARTIFACTS_DIR: "dist"

test:
  stage: test
  script:
    - npm install -g html-validate eslint
    - html-validate *.html
    - eslint *.js
  only:
    - merge_requests
    - main
    - develop

build:
  stage: build
  script:
    - mkdir -p $ARTIFACTS_DIR
    - cp *.html *.css *.js $ARTIFACTS_DIR/
    - npm install -g terser clean-css-cli
    - terser $ARTIFACTS_DIR/script.js -o $ARTIFACTS_DIR/script.js
    - cleancss $ARTIFACTS_DIR/styles.css -o $ARTIFACTS_DIR/styles.css
  artifacts:
    paths:
      - $ARTIFACTS_DIR
    expire_in: 1 week

deploy:
  stage: deploy
  script:
    - apt-get update -qq && apt-get install -y -qq lftp
    - lftp -c "open -u $FTP_USERNAME,$FTP_PASSWORD $FTP_SERVER; mirror -R $ARTIFACTS_DIR /"
  only:
    - main
```

### Jenkins Pipeline

`Jenkinsfile`:
```groovy
pipeline {
    agent any
    
    environment {
        FTP_CREDS = credentials('ftp-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm install -g html-validate eslint'
                sh 'html-validate *.html'
                sh 'eslint *.js'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install -g terser clean-css-cli html-minifier'
                sh 'terser script.js -o dist/script.js'
                sh 'cleancss styles.css -o dist/styles.css'
                sh 'cp *.html dist/'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    curl -T dist/* \
                    ftp://${FTP_CREDS_USR}:${FTP_CREDS_PSW}@ftp.server.com/public_html/
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
```

## Automated Testing

### Unit Testing

#### Test Framework Setup
`package.json`:
```json
{
  "name": "pvt-hostel-checkin",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "devDependencies": {
    "jest": "^27.0.0",
    "@testing-library/jest-dom": "^5.16.0"
  }
}
```

#### Sample Tests
`tests/validation.test.js`:
```javascript
describe('Form Validation', () => {
  test('validates required fields', () => {
    const guest = {
      firstName: '',
      lastName: 'Doe',
      idNumber: 'AB123'
    };
    
    expect(validateGuest(guest)).toBe(false);
  });
  
  test('validates date logic', () => {
    const checkIn = '2025-01-16';
    const checkOut = '2025-01-15';
    
    expect(validateDates(checkIn, checkOut)).toBe(false);
  });
});
```

### Integration Testing

#### Cypress E2E Tests
`cypress/integration/checkin.spec.js`:
```javascript
describe('Guest Check-In Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('completes check-in successfully', () => {
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#idNumber').type('AB123456');
    cy.get('#roomNumber').type('101');
    cy.get('#numberOfGuests').clear().type('2');
    
    cy.get('button[type="submit"]').click();
    
    cy.contains('Guest checked in successfully!').should('be.visible');
  });
  
  it('shows validation errors', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('#firstName:invalid').should('exist');
    cy.get('#lastName:invalid').should('exist');
  });
});
```

### Performance Testing

#### Lighthouse CI
`.github/workflows/lighthouse.yml`:
```yaml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Run Lighthouse CI
      uses: treosh/lighthouse-ci-action@v9
      with:
        urls: |
          https://checkin.pvthostel.com
          https://checkin.pvthostel.com/guests.html
        budgetPath: ./lighthouse-budget.json
        uploadArtifacts: true
```

`lighthouse-budget.json`:
```json
[
  {
    "path": "/*",
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 50
      },
      {
        "resourceType": "total",
        "budget": 200
      }
    ],
    "resourceCounts": [
      {
        "resourceType": "third-party",
        "budget": 0
      }
    ]
  }
]
```

## Infrastructure as Code

### Terraform Configuration

`infrastructure/main.tf`:
```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "static_site" {
  bucket = "pvt-hostel-checkin"
  
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.static_site.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.static_site.arn}/*"
      }
    ]
  })
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.static_site.website_endpoint
    origin_id   = "S3-${aws_s3_bucket.static_site.id}"
  }
  
  enabled             = true
  default_root_object = "index.html"
  
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.static_site.id}"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    viewer_protocol_policy = "redirect-to-https"
  }
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
```

### Docker Configuration

`Dockerfile`:
```dockerfile
FROM nginx:alpine

# Copy static files
COPY *.html *.css *.js /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security headers
RUN echo 'add_header X-Content-Type-Options "nosniff";' >> /etc/nginx/conf.d/security.conf
RUN echo 'add_header X-Frame-Options "DENY";' >> /etc/nginx/conf.d/security.conf
RUN echo 'add_header X-XSS-Protection "1; mode=block";' >> /etc/nginx/conf.d/security.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

`docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    volumes:
      - ./:/usr/share/nginx/html:ro
    restart: unless-stopped
    
  backup:
    image: alpine
    volumes:
      - ./backups:/backups
      - web-data:/data:ro
    command: >
      sh -c "while true; do
        tar -czf /backups/backup-$$(date +%Y%m%d-%H%M%S).tar.gz /data
        find /backups -name 'backup-*.tar.gz' -mtime +7 -delete
        sleep 86400
      done"

volumes:
  web-data:
```

## Monitoring and Logging

### Application Monitoring

#### Google Analytics 4
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Custom Error Tracking
`monitoring.js`:
```javascript
window.addEventListener('error', function(e) {
  // Send to monitoring service
  fetch('/api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: e.message,
      source: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      error: e.error.toString(),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    })
  });
});

// Performance monitoring
window.addEventListener('load', function() {
  const perfData = performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  
  // Log if page load is slow
  if (pageLoadTime > 3000) {
    console.warn(`Slow page load: ${pageLoadTime}ms`);
  }
});
```

### Server Monitoring

#### Health Check Endpoint
Create `health.html`:
```html
<!DOCTYPE html>
<html>
<head><title>Health Check</title></head>
<body>
<script>
  const status = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    localStorage: typeof(Storage) !== 'undefined',
    version: '1.0.0'
  };
  document.body.textContent = JSON.stringify(status);
</script>
</body>
</html>
```

#### Uptime Monitoring
Configure monitoring service:
```yaml
monitors:
  - name: PVT Hostel Check-In
    url: https://checkin.pvthostel.com/health.html
    interval: 5m
    timeout: 30s
    alerts:
      - email: ops@pvthostel.com
      - slack: #alerts
```

## Security Automation

### Dependency Scanning

#### GitHub Dependabot
`.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    reviewers:
      - "security-team"
    labels:
      - "dependencies"
      - "security"
```

### Security Headers Test
`.github/workflows/security.yml`:
```yaml
name: Security Tests

on: [push]

jobs:
  headers:
    runs-on: ubuntu-latest
    steps:
    - name: Test Security Headers
      run: |
        curl -s -D- https://checkin.pvthostel.com | grep -E "X-Frame-Options|X-Content-Type-Options|X-XSS-Protection"
```

### OWASP ZAP Scan
```yaml
name: OWASP ZAP Scan

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  zap_scan:
    runs-on: ubuntu-latest
    steps:
    - name: ZAP Scan
      uses: zaproxy/action-baseline@v0.7.0
      with:
        target: 'https://checkin.pvthostel.com'
```

## Performance Optimization

### Build Optimization

#### Minification Script
`scripts/build.sh`:
```bash
#!/bin/bash

# Create dist directory
mkdir -p dist

# Minify JavaScript
terser script.js \
  --compress \
  --mangle \
  --output dist/script.js

# Minify CSS
cleancss styles.css \
  --level 2 \
  --output dist/styles.css

# Minify HTML
html-minifier \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  index.html -o dist/index.html

# Copy other files
cp guests.html dist/

echo "Build complete! Files in dist/"
```

### CDN Configuration

#### CloudFlare Workers
`workers/cache.js`:
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const cache = caches.default
  let response = await cache.match(request)
  
  if (!response) {
    response = await fetch(request)
    
    if (response.status === 200) {
      const headers = new Headers(response.headers)
      headers.set('Cache-Control', 'public, max-age=86400')
      
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      })
      
      event.waitUntil(cache.put(request, response.clone()))
    }
  }
  
  return response
}
```

## Disaster Recovery

### Backup Strategy

#### Automated Backups
`scripts/backup.sh`:
```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/backups"
SITE_DIR="/var/www/html"
RETENTION_DAYS=30

# Create backup
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.tar.gz"

# Create backup
tar -czf $BACKUP_FILE $SITE_DIR

# Upload to S3
aws s3 cp $BACKUP_FILE s3://pvt-hostel-backups/

# Clean old backups
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete

# Verify backup
if [ -f $BACKUP_FILE ]; then
  echo "Backup successful: $BACKUP_FILE"
else
  echo "Backup failed!" >&2
  exit 1
fi
```

### Recovery Procedures

#### Automated Recovery
`scripts/recover.sh`:
```bash
#!/bin/bash

# Get latest backup
LATEST_BACKUP=$(aws s3 ls s3://pvt-hostel-backups/ | sort | tail -n 1 | awk '{print $4}')

# Download backup
aws s3 cp s3://pvt-hostel-backups/$LATEST_BACKUP /tmp/

# Extract
tar -xzf /tmp/$LATEST_BACKUP -C /

# Verify
if [ -f /var/www/html/index.html ]; then
  echo "Recovery successful"
else
  echo "Recovery failed!" >&2
  exit 1
fi
```

### Incident Response

#### Runbook Template
`runbooks/site-down.md`:
```markdown
# Site Down Incident Response

## Detection
- Monitoring alert received
- User reports

## Diagnosis
1. Check monitoring dashboard
2. Verify DNS resolution
3. Test server connectivity
4. Check application logs

## Resolution
1. If server down:
   - Restart web service
   - Check disk space
   - Review error logs

2. If application error:
   - Check browser console
   - Verify file integrity
   - Restore from backup

3. If network issue:
   - Contact hosting provider
   - Check CDN status
   - Verify SSL certificate

## Post-Incident
1. Document root cause
2. Update runbook
3. Implement prevention measures
```

## Conclusion

Implementing these DevOps practices ensures:
- Reliable deployments
- Quick error detection
- Fast recovery times
- Consistent performance
- Security compliance

Remember to continuously review and update these practices based on your specific needs and emerging best practices.

---

*Last Updated: January 2025*
*Version: 1.0*