# Use an official Node.js 16 image from Docker Hub
FROM node:16-slim

# Create a new directory in the container and set it as the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files into the working directory
COPY ../my-express-app/package*.json ./

# Install the dependencies
RUN npm install --only=production

# Copy all files from the my-express-app directory to the working directory in the container
COPY ../my-express-app/ .

# The app listens on port 3000, so let's expose this port
EXPOSE 8080

# Run the application
CMD [ "node", "app.js" ]
