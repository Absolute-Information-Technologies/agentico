# Use Node.js LTS as base image
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Update next.config.ts to include standalone output
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set the user to non-root for security
USER node

# Expose port
EXPOSE 3000

# Set environment variable for the host to listen on all interfaces
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"] 