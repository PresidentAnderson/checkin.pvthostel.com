#!/bin/bash

# Docker Push Instructions for PVT Hostel Check-In System
# Execute these commands after Docker Desktop is running

echo "=== Docker Build and Push Instructions ==="
echo ""
echo "1. First, ensure Docker Desktop is running (check the whale icon in your menu bar)"
echo ""
echo "2. Build the Docker image:"
echo "   docker build -t checkin-pvthostel:latest ."
echo ""
echo "3. Tag the image for Docker Hub:"
echo "   docker tag checkin-pvthostel:latest presidentanderson/checkin-pvthostel:latest"
echo ""
echo "4. Login to Docker Hub:"
echo "   docker login"
echo "   Username: presidentanderson"
echo "   Password: [your Docker Hub password]"
echo ""
echo "5. Push to Docker Hub:"
echo "   docker push presidentanderson/checkin-pvthostel:latest"
echo ""
echo "6. (Optional) Test locally:"
echo "   docker run -p 8080:80 checkin-pvthostel:latest"
echo "   Then visit: http://localhost:8080"
echo ""
echo "=== One-liner after Docker is running and you're logged in ==="
echo "docker build -t checkin-pvthostel:latest . && docker tag checkin-pvthostel:latest presidentanderson/checkin-pvthostel:latest && docker push presidentanderson/checkin-pvthostel:latest"