# base image
FROM node:latest

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./

RUN npm install

# Copy project files to workdir
COPY . .

# expose port
EXPOSE 4200

# start app
CMD ["npm", "start"]
