#!/bin/bash
set -e

echo "Starting deployment process..."

# Pull latest changes if this is a git repository
if [ -d .git ]; then
    echo "Pulling latest changes from git..."
    git pull
fi

# Build and restart containers
echo "Building and restarting Docker containers..."
docker-compose down
docker-compose build
docker-compose up -d

echo "Waiting for services to start..."
sleep 5

# Check if services are running
echo "Checking if services are running..."
if docker-compose ps | grep -q "Up"; then
    echo "Deployment completed successfully!"
else
    echo "Error: Some containers are not running. Check docker-compose logs."
    docker-compose logs
    exit 1
fi 