# Docker Troubleshooting Guide

## Issue: Docker Desktop I/O Errors

Docker Desktop is experiencing I/O errors. Here's how to fix it:

### Option 1: Restart Docker Desktop
1. Quit Docker Desktop completely (right-click the whale icon → Quit Docker Desktop)
2. Wait 30 seconds
3. Start Docker Desktop again
4. Wait for it to fully initialize (green whale icon)

### Option 2: Clean Docker Data (if Option 1 doesn't work)
1. Open Docker Desktop
2. Go to Settings → Troubleshoot
3. Click "Clean / Purge data"
4. Select "Remove all data"
5. Click "Clean"
6. Restart Docker Desktop

### Option 3: Reset Docker Desktop (last resort)
1. Open Docker Desktop
2. Go to Settings → Troubleshoot
3. Click "Reset to factory defaults"
4. Restart Docker Desktop

## Once Docker is Working

Run these commands in order:

```bash
# 1. Build the Docker image
docker build -t checkin-pvthostel:latest .

# 2. Tag for Docker Hub
docker tag checkin-pvthostel:latest presidentanderson/checkin-pvthostel:latest

# 3. Login to Docker Hub (you'll be prompted for credentials)
docker login

# 4. Push to Docker Hub
docker push presidentanderson/checkin-pvthostel:latest
```

## Alternative: Build Without Cache
If you still have issues, try building without cache:

```bash
docker build --no-cache -t checkin-pvthostel:latest .
```

## Test Locally
After building, test the container:

```bash
docker run -p 8080:80 checkin-pvthostel:latest
```

Then visit: http://localhost:8080