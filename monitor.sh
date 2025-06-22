#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Agentico Application Monitoring =====${NC}"
echo "Time: $(date)"
echo

# Check if Docker is running
echo -e "${YELLOW}Checking Docker service:${NC}"
if systemctl is-active --quiet docker; then
    echo -e "${GREEN}Docker is running${NC}"
else
    echo -e "${RED}Docker is not running!${NC}"
    echo "Attempting to start Docker..."
    sudo systemctl start docker
fi
echo

# Check running containers
echo -e "${YELLOW}Checking containers:${NC}"
CONTAINERS=$(docker-compose ps -q)
if [ -z "$CONTAINERS" ]; then
    echo -e "${RED}No containers running!${NC}"
    echo "To start containers, run: ./deploy.sh"
else
    echo -e "${GREEN}Containers running:${NC}"
    docker-compose ps
fi
echo

# Check container resource usage
echo -e "${YELLOW}Container resource usage:${NC}"
docker stats --no-stream
echo

# Check disk usage
echo -e "${YELLOW}Disk usage:${NC}"
df -h | grep -E '^Filesystem|/dev/xvda1'
echo

# Check memory usage
echo -e "${YELLOW}Memory usage:${NC}"
free -h
echo

# Check CPU load
echo -e "${YELLOW}CPU load:${NC}"
uptime
echo

# Check application logs (last 10 lines)
echo -e "${YELLOW}Recent application logs:${NC}"
docker-compose logs --tail=10 nextjs
echo

echo -e "${YELLOW}===== Monitoring Complete =====${NC}"
echo "For detailed logs, run: docker-compose logs -f"
echo "To restart the application, run: ./deploy.sh" 