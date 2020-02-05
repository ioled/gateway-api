# Install latest node dependency
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package file with dependencies
COPY package*.json ./

# Install dependencies

RUN npm install

# Copy app to docker
COPY . .

# Expose port to listen server
EXPOSE 5000

# Run server
CMD ["npm", "start"]
