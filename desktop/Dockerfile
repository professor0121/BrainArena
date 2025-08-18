# ---- Base image with Node.js ----
FROM node:20-bullseye AS builder

# Install dependencies for electron-builder
RUN apt-get update && apt-get install -y \
  libgtk-3-0 \
  libx11-xcb1 \
  libnss3 \
  libasound2 \
  libxss1 \
  libxtst6 \
  libxkbfile1 \
  rpm \
  && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install deps
RUN npm install

# Copy rest of the project
COPY . .

# Build the app
RUN npm run build

# Package app for Linux (can also do win/mac if cross-compile enabled)
RUN npm run build:linux

# ---- Final stage ----
FROM debian:bullseye-slim

# App output folder
WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/release /app/release

CMD ["echo", "Build complete. Check /app/release for installers."]
