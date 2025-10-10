# Use Node 16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app/

# Copy the package.json and yarn.lock first for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
