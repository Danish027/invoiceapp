# Use the official Node.js image with the specified version
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the entire Next.js application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port on which the Next.js application will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]


# docker build -t my-nextjs-app .
# docker run -p 3000:3000 my-nextjs-app
