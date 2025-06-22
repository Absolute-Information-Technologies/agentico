# Agentico Deployment Guide

This guide provides comprehensive instructions for deploying the Agentico Next.js application to AWS EC2 using Docker.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Testing](#local-testing)
3. [AWS EC2 Deployment](#aws-ec2-deployment)
4. [SSL Configuration](#ssl-configuration)
5. [Maintenance](#maintenance)
6. [Backup and Restore](#backup-and-restore)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- AWS account
- Domain name (optional, but recommended for production)

## Local Testing

Before deploying to AWS, you can test the Docker setup locally:

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. Access the application at http://localhost:3000

3. Stop the containers when done:
   ```bash
   docker-compose down
   ```

## AWS EC2 Deployment

### 1. Launch an EC2 Instance

Follow the detailed instructions in [AWS-EC2-SETUP.md](AWS-EC2-SETUP.md) to:
- Launch an EC2 instance
- Configure security groups
- Connect to your instance

### 2. Set Up the EC2 Instance

1. Upload the setup script to your EC2 instance:
   ```bash
   scp -i your-key.pem ec2-setup.sh ec2-user@your-ec2-ip:~
   ```

2. SSH into your instance:
   ```bash
   ssh -i your-key.pem ec2-user@your-ec2-ip
   ```

3. Run the setup script:
   ```bash
   chmod +x ec2-setup.sh
   ./ec2-setup.sh
   ```

### 3. Deploy the Application

1. Create a directory for your application:
   ```bash
   mkdir -p ~/agentico
   cd ~/agentico
   ```

2. Upload your application files:
   ```bash
   # From your local machine
   scp -i your-key.pem -r ./* ec2-user@your-ec2-ip:~/agentico/
   ```

3. Deploy the application:
   ```bash
   # On your EC2 instance
   cd ~/agentico
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. Verify the application is running:
   ```bash
   docker-compose ps
   ```

## SSL Configuration

If you have a domain name:

1. Update your domain's DNS settings to point to your EC2 instance's IP address.

2. Run the SSL setup script:
   ```bash
   chmod +x setup-ssl.sh
   ./setup-ssl.sh your-domain.com
   ```

## Maintenance

### Monitoring

Use the monitoring script to check the health of your application:

```bash
chmod +x monitor.sh
./monitor.sh
```

### Updating the Application

To update your application with new code:

1. Upload the new files:
   ```bash
   # From your local machine
   scp -i your-key.pem -r ./updated-files/* ec2-user@your-ec2-ip:~/agentico/
   ```

2. Redeploy:
   ```bash
   # On your EC2 instance
   cd ~/agentico
   ./deploy.sh
   ```

## Backup and Restore

### Creating a Backup

```bash
./backup.sh
```

This will create a backup in the `./backups` directory.

### Restoring from a Backup

```bash
./restore.sh ./backups/agentico_backup_20240101_120000.tar.gz
```

## Troubleshooting

### Container Issues

If containers aren't starting properly:

```bash
docker-compose logs
```

### SSL Certificate Issues

If SSL certificate generation fails:

1. Ensure your domain's DNS is properly configured
2. Check Certbot logs:
   ```bash
   sudo certbot certificates
   ```

### Nginx Configuration Issues

If Nginx isn't working correctly:

```bash
docker-compose logs nginx
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/) 