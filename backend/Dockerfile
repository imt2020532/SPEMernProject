# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining backend files to the container
COPY . .

# Expose the port on which the Express app will run
EXPOSE 4000

# Command to start the Express app in development mode
CMD ["npm", "run", "dev"]
