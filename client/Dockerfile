# Stage 1: Build the Next.js app
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Set environment variable for Next.js build
ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API}

# Copy the rest of the app files
COPY . .

# Build the Next.js app for production
RUN npm run build

# Stage 2: Set up the production environment
FROM node:latest

# Set working directory
WORKDIR /app

# Copy the .next folder, node_modules, and package.json from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the Next.js app on port 3000
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "run", "start"]
