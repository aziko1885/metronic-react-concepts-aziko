#!/bin/bash

# Usage: ./deploy-nextjs-prod.sh demo1
# This script deploys a Next.js demo instance by copying code, updating configs, building, and restarting the app.

set -e  # Exit immediately if a command exits with a non-zero status

# === Configurable variables ===
REPO_URL="git@github.com:keenthemes/metronic-tailwind-react.git"  # Git repository URL
REPO_DIR="/var/www/dev.keenthemes.com/public/metronic/nextjs/metronic-tailwind-react"  # Local path to clone/pull the repo
TARGET_BASE="/var/www/dev.keenthemes.com/public/metronic/nextjs"  # Base path for all demo deployments
NODE_PATH="/home/faizal/.nvm/versions/node/v20.12.2/bin"  # Path to Node.js binaries

# === Accept demo name as argument ===
DEMO="$1"
BRANCH="${2:-main}"
if [ -z "$DEMO" ]; then
  echo "Usage: $0 <demo-name> [branch]"
  exit 1
fi

TARGET_DIR="$TARGET_BASE/$DEMO"  # Full path for this demo deployment
PORT=$((3130 + $(echo "$DEMO" | sed 's/[^0-9]//g')))  # Calculate port based on demo number

export PATH=$PATH:$NODE_PATH  # Ensure correct Node.js is in PATH

echo "[1/6] Cloning or updating repo (branch: $BRANCH)..."
cd "$REPO_DIR"
git fetch origin
git checkout $BRANCH
git reset --hard origin/$BRANCH

echo "[2/6] Copying code to $TARGET_DIR..."
# Remove any existing demo directory and copy fresh code
rm -rf "$TARGET_DIR"
cp -r typescript/nextjs "$TARGET_DIR"
cd "$TARGET_DIR"

echo "[3/6] Updating layout.tsx for $DEMO..."
# Update layout.tsx to use the correct demo layout import and tags
DEMO_NAME=$(echo "$DEMO" | sed 's/demo\([0-9]*\)/Demo\1/')
sed -i "s|import { Demo[0-9]*Layout } from '../components/layouts/demo[0-9]*/layout';|import { ${DEMO_NAME}Layout } from '../components/layouts/$DEMO/layout';|" app/\(protected\)/layout.tsx
sed -i "s|<Demo[0-9]*Layout>|<${DEMO_NAME}Layout>|g" app/\(protected\)/layout.tsx
sed -i "s|</Demo[0-9]*Layout>|</${DEMO_NAME}Layout>|g" app/\(protected\)/layout.tsx

echo "[4/6] Creating next.config.mjs for $DEMO..."
# Generate a next.config.mjs file with the correct basePath and image config
cat > next.config.mjs << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/metronic/tailwind/nextjs/$DEMO',
  output: 'standalone',
  images: {
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.keenthemes.com',
        pathname: '/metronic/tailwind/nextjs/**',
      },
    ],
  }
};
export default nextConfig;
EOF

echo "[5/6] Installing dependencies, generating Prisma client, and building..."
# Install npm dependencies, generate Prisma client, and build the Next.js app
npm i -f
npm ci --force
npx prisma generate
export PORT=$PORT  # Set PORT for build if needed
npm run build:staging

echo "[6/6] Starting or restarting app with pm2 on port $PORT..."
# Start or restart the app using pm2, using a unique name per demo
pm2 restart "metronic-nextjs-$DEMO-dev" --update-env || pm2 start npm --name "metronic-nextjs-$DEMO-dev" -- start

echo "Deployment for $DEMO complete!"
