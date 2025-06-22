# AWS EC2 Setup Instructions

This document provides step-by-step instructions for launching an AWS EC2 instance and deploying your Next.js application using Docker.

## Step 1: Launch an EC2 Instance

1. Log in to your AWS Management Console
2. Navigate to EC2 Dashboard
3. Click "Launch Instance"
4. Choose an Amazon Machine Image (AMI):
   - Select "Amazon Linux 2023 AMI" (free tier eligible)
5. Choose an Instance Type:
   - Select "t2.micro" for free tier eligibility
   - For production with higher traffic, consider "t3.small" or larger
6. Configure Instance Details:
   - Leave default settings or adjust as needed
7. Add Storage:
   - Default 8GB is sufficient to start
   - For production, consider 20GB or more
8. Add Tags:
   - Add a "Name" tag to identify your instance (e.g., "agentico-production")
9. Configure Security Group:
   - Create a new security group
   - Add the following rules:
     - SSH (Port 22): Your IP or Anywhere (0.0.0.0/0) for development
     - HTTP (Port 80): Anywhere (0.0.0.0/0)
     - HTTPS (Port 443): Anywhere (0.0.0.0/0)
10. Review and Launch
11. Create a new key pair or use an existing one
    - Download the key pair (.pem file)
    - Keep this file secure; you cannot download it again
12. Launch the instance

## Step 2: Connect to Your EC2 Instance

### For macOS/Linux:

1. Open Terminal
2. Change permissions for your key file:
   ```
   chmod 400 path/to/your-key-pair.pem
   ```
3. Connect to your instance:
   ```
   ssh -i path/to/your-key-pair.pem ec2-user@your-instance-public-ip
   ```

### For Windows:

1. Use PuTTY or Windows Subsystem for Linux (WSL)
2. If using PuTTY, convert the .pem file to .ppk using PuTTYgen
3. Connect using your key and the public IP of your instance

## Step 3: Set Up the EC2 Instance

1. Upload the `ec2-setup.sh` script to your instance:
   ```
   scp -i path/to/your-key-pair.pem ec2-setup.sh ec2-user@your-instance-public-ip:~
   ```

2. Run the setup script:
   ```
   chmod +x ec2-setup.sh
   ./ec2-setup.sh
   ```

3. Create a new directory for your application:
   ```
   mkdir -p ~/agentico
   cd ~/agentico
   ```

## Step 4: Deploy Your Application

### Option 1: Clone from Git

1. Clone your repository:
   ```
   git clone https://github.com/yourusername/agentico.git .
   ```

### Option 2: Upload Files Directly

1. Compress your project files:
   ```
   tar -czf agentico.tar.gz .
   ```

2. Upload to your EC2 instance:
   ```
   scp -i path/to/your-key-pair.pem agentico.tar.gz ec2-user@your-instance-public-ip:~/agentico/
   ```

3. Extract the files:
   ```
   cd ~/agentico
   tar -xzf agentico.tar.gz
   rm agentico.tar.gz
   ```

## Step 5: Configure and Start the Application

1. Update the Nginx configuration with your domain (if you have one):
   ```
   nano nginx/conf.d/default.conf
   ```
   Replace "localhost" with your domain name.

2. Run the deployment script:
   ```
   ./deploy.sh
   ```

3. Verify the application is running:
   ```
   docker-compose ps
   ```

## Step 6: Set Up SSL (If You Have a Domain)

1. Point your domain's DNS A record to your EC2 instance's public IP address

2. Wait for DNS propagation (can take up to 48 hours, but often much less)

3. Run the SSL setup script:
   ```
   ./setup-ssl.sh your-domain.com
   ```

## Troubleshooting

### Application Not Accessible

1. Check if containers are running:
   ```
   docker-compose ps
   ```

2. Check container logs:
   ```
   docker-compose logs
   ```

3. Verify security group settings in AWS console

### SSL Certificate Issues

1. Make sure DNS is properly configured and propagated
2. Check Certbot logs:
   ```
   sudo certbot certificates
   ```

## Maintenance

### Updating the Application

1. Pull the latest changes:
   ```
   cd ~/agentico
   git pull
   ```

2. Redeploy:
   ```
   ./deploy.sh
   ```

### Monitoring

1. View container logs:
   ```
   docker-compose logs -f
   ```

2. Check container status:
   ```
   docker-compose ps
   ```

## Cost Optimization

- Use t2.micro or t3.micro instances (free tier eligible for 12 months)
- Consider using Reserved Instances for long-term cost savings
- Monitor your usage in the AWS Billing Dashboard 