# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (if your Node.js application listens on a specific port)
EXPOSE 3001

# Define the command to run your Node.js application
CMD [ "npm", "run","dev" ]