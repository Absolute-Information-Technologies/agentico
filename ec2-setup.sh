#!/bin/bash
set -e

echo "Setting up EC2 instance for Docker deployment..."

# Update system packages
echo "Updating system packages..."
sudo dnf update -y

# Install Docker
echo "Installing Docker..."
sudo dnf install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
echo "Docker installed successfully."

# Install Docker Compose
echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
echo "Docker Compose installed successfully."

# Install Git
echo "Installing Git..."
sudo dnf install git -y
echo "Git installed successfully."

# Create directory structure for Nginx and Certbot
echo "Creating directory structure..."
mkdir -p ~/agentico/nginx/conf.d
mkdir -p ~/agentico/nginx/certbot/conf
mkdir -p ~/agentico/nginx/certbot/www

echo "EC2 instance setup completed successfully!"
echo "Next steps:"
echo "1. Clone your repository to ~/agentico"
echo "2. Update your domain in nginx/conf.d/default.conf"
echo "3. Run deploy.sh to start your application" 