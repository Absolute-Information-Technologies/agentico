#!/bin/bash
set -e

# Check if domain is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <your-domain.com>"
    exit 1
fi

DOMAIN=$1
EMAIL="admin@${DOMAIN}"

echo "Setting up SSL for ${DOMAIN}..."

# Install Certbot
echo "Installing Certbot..."
sudo dnf install certbot -y

# Stop Nginx to free up port 80
echo "Stopping Nginx temporarily..."
docker-compose stop nginx

# Get SSL certificate
echo "Obtaining SSL certificate..."
sudo certbot certonly --standalone -d ${DOMAIN} -d www.${DOMAIN} --email ${EMAIL} --agree-tos --no-eff-email

# Update Nginx configuration for SSL
echo "Updating Nginx configuration..."
cat > nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name ${DOMAIN} www.${DOMAIN};
    
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    
    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    location / {
        proxy_pass http://nextjs:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Set up auto-renewal
echo "Setting up automatic certificate renewal..."
echo "0 0,12 * * * root certbot renew --quiet && docker-compose restart nginx" | sudo tee -a /etc/crontab > /dev/null

# Restart Nginx
echo "Restarting Nginx..."
docker-compose up -d nginx

echo "SSL setup completed successfully!"
echo "Your website should now be accessible at https://${DOMAIN}" 