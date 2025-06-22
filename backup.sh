#!/bin/bash
set -e

# Configuration
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/agentico_backup_${TIMESTAMP}.tar.gz"

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

echo "Starting backup process..."

# Stop containers if running
if docker-compose ps -q | grep -q .; then
    echo "Stopping containers for consistent backup..."
    docker-compose stop
fi

# Create backup archive
echo "Creating backup archive..."
tar -czf ${BACKUP_FILE} \
    --exclude="node_modules" \
    --exclude=".next" \
    --exclude="backups" \
    --exclude=".git" \
    .

# Restart containers
echo "Restarting containers..."
docker-compose up -d

# Display backup information
echo "Backup completed successfully!"
echo "Backup file: ${BACKUP_FILE}"
echo "Backup size: $(du -h ${BACKUP_FILE} | cut -f1)"

# Keep only the 5 most recent backups
echo "Cleaning up old backups..."
ls -t ${BACKUP_DIR}/agentico_backup_*.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null || true

echo "Backup process completed."
echo "To restore this backup, run: ./restore.sh ${BACKUP_FILE}" 