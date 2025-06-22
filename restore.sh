#!/bin/bash
set -e

# Check if backup file is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file.tar.gz>"
    echo "Available backups:"
    ls -lh ./backups/*.tar.gz 2>/dev/null || echo "No backups found."
    exit 1
fi

BACKUP_FILE=$1

# Check if backup file exists
if [ ! -f "${BACKUP_FILE}" ]; then
    echo "Error: Backup file '${BACKUP_FILE}' not found."
    exit 1
fi

echo "Starting restore process from ${BACKUP_FILE}..."

# Confirm with user
read -p "This will overwrite the current application files. Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Restore cancelled."
    exit 0
fi

# Stop containers if running
if docker-compose ps -q | grep -q .; then
    echo "Stopping containers..."
    docker-compose stop
fi

# Create a backup of current state before restore
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
CURRENT_BACKUP="./backups/pre_restore_${TIMESTAMP}.tar.gz"
echo "Creating backup of current state before restore..."
mkdir -p ./backups
tar -czf ${CURRENT_BACKUP} \
    --exclude="node_modules" \
    --exclude=".next" \
    --exclude="backups" \
    --exclude=".git" \
    .
echo "Current state backed up to ${CURRENT_BACKUP}"

# Extract backup
echo "Extracting backup..."
tar -xzf ${BACKUP_FILE} --overwrite

# Rebuild and restart containers
echo "Rebuilding and restarting containers..."
docker-compose build
docker-compose up -d

echo "Restore completed successfully!"
echo "If you encounter any issues, you can restore to the previous state with:"
echo "./restore.sh ${CURRENT_BACKUP}" 