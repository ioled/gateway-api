# Install latest node dependency
FROM node:alpine

# Use Makefule in container
RUN apk add --update make

# Create app directory
WORKDIR /app

# Copy package file with dependencies
COPY package*.json ./

# Install dependencies

RUN npm install

# Copy app to docker
COPY . .

# Expose port to listen server
EXPOSE 5000

# Run server
CMD ["make", "r"]
