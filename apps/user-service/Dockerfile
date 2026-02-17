# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the NestJS app (if using TypeScript)
RUN npm run build apps/user-service

# Expose the port your app runs on
EXPOSE 3366

# Command to run the app
CMD ["node", "dist/apps/user-service/main.js"]