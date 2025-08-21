# Use Node.js 18 image
FROM node:20

# Create app directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Build the project
RUN npm run build

# Start in dev mode (optional: switch to start:prod for production)
CMD ["npm", "run", "start:dev"]
