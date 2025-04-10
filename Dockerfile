# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy the rest of the source code
COPY . .

# Build the project
RUN npm run build

# Expose port if needed (not specified, so omitted)

# Start the MCP server
CMD [ "node", "./dist/index.js" ]
