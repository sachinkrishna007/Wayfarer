# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY ../package.json ../package-lock.json* ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose the port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
