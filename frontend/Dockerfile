# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining frontend files to the container
COPY . .

# Set environment variable for the proxy
#ENV REACT_APP_API_URL=http://host.docker.internal:4003

# Expose the port on which the React app will run
EXPOSE 3000

# Command to start the React app
CMD ["npm", "start"]
