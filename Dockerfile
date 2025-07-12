# --------------------------
# STAGE 1: Base Environment
# --------------------------
FROM node:18 AS base
WORKDIR /app

# Copy root-level config and install files
COPY package*.json ./
COPY tsconfig.json ./
COPY drizzle.config.ts ./
COPY postcss.config.js ./
COPY tailwind.config.ts ./

# --------------------------
# STAGE 2: Install Dependencies
# --------------------------
FROM base AS deps
RUN npm install

# --------------------------
# STAGE 3: Build the Project
# --------------------------
FROM deps AS builder

# Copy the rest of the project files
COPY . .

# Run the full build (frontend + backend)
RUN npm run build

# --------------------------
# STAGE 4: Production Image
# --------------------------
FROM node:18 AS server
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Optional: add .env.production if needed
# COPY .env.production .env

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose backend port
EXPOSE 3000

# Start the backend
CMD ["npm", "run", "start"]
