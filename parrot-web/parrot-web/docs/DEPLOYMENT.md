# Deployment Guide - Parrot Web App

Complete deployment instructions for production environments.

---

## Table of Contents
1. [Heroku Deployment](#heroku-deployment)
2. [Docker Deployment](#docker-deployment)
3. [AWS Deployment](#aws-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Database Migration](#database-migration)
6. [CI/CD Pipeline](#cicd-pipeline)

---

## Heroku Deployment

### Prerequisites
- Heroku CLI installed (`npm install -g heroku`)
- Heroku account
- Git repository initialized

### Step 1: Create Heroku Apps

**Backend:**
```bash
heroku create parrot-backend-app
heroku addons:create mongolab:sandbox --app parrot-backend-app
```

**Frontend:**
```bash
heroku create parrot-frontend-app
```

### Step 2: Configure Environment Variables

**Backend:**
```bash
heroku config:set JWT_SECRET=your_secret_key --app parrot-backend-app
heroku config:set NODE_ENV=production --app parrot-backend-app
```

Get MongoDB URI automatically from `heroku config` and update `.env`

### Step 3: Deploy Backend

```bash
cd backend
heroku login
git push heroku main
heroku logs --tail --app parrot-backend-app
```

### Step 4: Build and Deploy Frontend

```bash
cd frontend
npm run build

# Install Heroku buildpack for static
heroku buildpacks:add https://buildpacks.herokuapp.com/buildpacks/github/gaffneyc/buildpack-nginx.git --app parrot-frontend-app

# Set API endpoint
heroku config:set REACT_APP_API_URL=https://parrot-backend-app.herokuapp.com --app parrot-frontend-app

git push heroku main
```

### Step 5: Verify Deployment

```bash
# Backend health check
curl https://parrot-backend-app.herokuapp.com/api/health

# Frontend (should load app)
open https://parrot-frontend-app.herokuapp.com
```

---

## Docker Deployment

### Create Dockerfile for Backend

**backend/Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Create Dockerfile for Frontend

**frontend/Dockerfile**
```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Create Docker Compose

**docker-compose.yml**
```yaml
version: '3.8'

services:
  mongo:
    image: mongo:7.0
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: parrot
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      MONGO_URI: mongodb://mongo:27017/parrot
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - mongo
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      REACT_APP_API_URL: http://backend:5000
    depends_on:
      - backend

volumes:
  mongo_data:
```

### Build and Run

```bash
docker-compose build
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## AWS Deployment

### Backend Deployment (EC2)

**1. Launch EC2 Instance**
```bash
# Create instance with Ubuntu 22.04 LTS
# Security Group: Allow ports 22, 80, 443, 5000
```

**2. Connect and Setup**
```bash
ssh -i key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB (or use AWS DocumentDB)
sudo apt-get install -y mongodb

# Clone repository
git clone https://github.com/yourname/parrot-web.git
cd parrot-web/backend
npm install
```

**3. Configure Environment**
```bash
sudo nano .env
# Set JWT_SECRET, MONGO_URI, NODE_ENV=production
```

**4. Use PM2 for Process Management**
```bash
sudo npm install -g pm2
pm2 start server.js --name "parrot-backend"
pm2 startup
pm2 save
```

**5. Setup Nginx Reverse Proxy**
```bash
sudo apt-get install -y nginx

sudo nano /etc/nginx/sites-available/default
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo systemctl restart nginx
```

### Frontend Deployment (S3 + CloudFront)

**1. Build for Production**
```bash
cd frontend
npm run build
```

**2. Create S3 Bucket**
```bash
aws s3 mb s3://parrot-app-frontend

# Set permissions for public read
aws s3 cp build s3://parrot-app-frontend --recursive --acl public-read
```

**3. Configure CloudFront**
- Origin: S3 bucket
- Viewer protocol: Redirect HTTP to HTTPS
- Cache behavior: Compress objects automatically

**4. Custom Domain**
```bash
# Route 53: Create alias to CloudFront distribution
```

---

## Database Migration

### MongoDB Atlas (Cloud)

**1. Create Account**
- Go to https://www.mongodb.com/cloud/atlas
- Create cluster (free tier available)

**2. Get Connection String**
```
mongodb+srv://user:password@cluster.mongodb.net/parrot?retryWrites=true&w=majority
```

**3. Update Environment**
```bash
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/parrot
```

**4. Seed Data**
```bash
npm run seed
# Or restart backend server (auto-seed)
```

### Export/Import Data

**Export from Local:**
```bash
mongodump --db parrot --out /backup/parrot
```

**Import to Production:**
```bash
mongorestore --uri "mongodb+srv://user:password@cluster.mongodb.net" /backup/parrot
```

---

## Environment Configuration

### Production .env Template

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/parrot

# JWT
JWT_SECRET=use_a_strong_random_string_here_minimum_32_chars

# File Upload
UPLOAD_DIR=/home/ubuntu/parrot-backend/uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# AWS S3 (Optional for file storage)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=parrot-uploads
AWS_REGION=us-east-1
```

### Frontend Environment

**Create .env.production**
```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

**.github/workflows/deploy.yml**
```yaml
name: Deploy Parrot

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Test Backend
        run: |
          cd backend
          npm install
          npm run test

      - name: Test Frontend
        run: |
          cd frontend
          npm install
          npm run test

      - name: Build Frontend
        run: |
          cd frontend
          npm run build

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "parrot-backend-app"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
          appdir: "backend"

      - name: Deploy Frontend to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 sync frontend/build s3://parrot-app-frontend --delete
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} --paths "/*"
```

---

## Monitoring & Logging

### Application Performance Monitoring (APM)

**New Relic Integration**
```bash
npm install newrelic
```

Create `newrelic.js`:
```javascript
exports.config = {
  app_name: ['Parrot Backend'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info'
  }
};
```

### Log Management

**CloudWatch Logs (AWS)**
```bash
# Install agent
npm install aws-sdk

# Configure in server.js
const CloudWatchTransport = require('winston-cloudwatch');
```

---

## Security Checklist

- [ ] Change default passwords and JWT secrets
- [ ] Enable HTTPS/SSL certificate (Let's Encrypt)
- [ ] Setup firewall rules and security groups
- [ ] Enable MongoDB authentication
- [ ] Configure rate limiting
- [ ] Enable CORS with specific domains
- [ ] Setup database backups (daily)
- [ ] Monitor error logs regularly
- [ ] Enable two-factor authentication for admin accounts
- [ ] Use environment variables for all secrets

---

## Rollback Procedure

### Heroku Rollback
```bash
heroku releases --app parrot-backend-app
heroku rollback v45 --app parrot-backend-app
```

### Docker Rollback
```bash
docker-compose down
git checkout previous-version
docker-compose up -d
```

### Database Rollback
```bash
# Restore from backup
mongorestore --drop --archive=backup.archive
```

---

## Performance Optimization

1. **Enable GZIP compression** in Nginx
2. **Implement Redis caching** for frequently accessed data
3. **Use CDN** for static assets
4. **Optimize database indexes** on frequently queried fields
5. **Implement pagination** for large datasets
6. **Use load balancers** for scaling backend

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| High memory usage | Implement caching, optimize queries, use clustering |
| Slow API response | Add database indexes, implement pagination |
| Frontend not connecting | Check CORS settings, verify API URL in environment |
| Database connection timeout | Check MONGO_URI, verify network connectivity |
| File upload fails | Check disk space, verify permissions, increase MAX_FILE_SIZE |

---

**For local testing guide, see [README.md](../README.md)**
