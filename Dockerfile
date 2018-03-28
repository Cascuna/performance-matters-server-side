# Use the node:alpine package, which results in a 5MB~ docker container
FROM node:alpine

# Create the app directory and move to it
WORKDIR /cmda/performance-matters/node

# Install app dependencies
# Wildcard ensures that both package.json & package-llock.json are copied
COPY package*.json ./

# For prod RUN npm install --only=production
RUN npm install

COPY . .

EXPOSE 3080
# Calls the npm script that we want
CMD ["npm", "start"]


