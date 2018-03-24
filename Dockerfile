# Use the node:alpine package, which results in a 5MB~ docker container
FROM node:alpine

# Create the app directory and move to it
WORKDIR /cmda/performance-matters/node

# Install app dependencies
# Wildcard ensures that both package.json & package-llock.json are copied
COPY package*.json ./

# Python is needed for the node-gyp dependency
RUN apk add --update \
    python \
    python-dev && npm install -g node-gyp


# For prod RUN npm install --only=production
RUN npm install

COPY . .

EXPOSE 8000:3080
# Calls the npm script that we want
CMD ["npm", "start"]


