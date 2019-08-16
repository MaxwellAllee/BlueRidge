{
    "name": "project-3-starter",
    "version": "1.0.0",
    "license": "MIT",
    "main": "server/server.js",
    "scripts": {
      "install": "yarn run install:client && yarn run install:server",
      "install:client": "cd client && yarn",
      "install:server": "cd server && yarn",
      "build": "cd client && yarn build",
      "start": "node server/server.js",
      "start:dev": "concurrently -n client,server \"yarn run client:dev\" \"yarn run server:dev\"",
      "client:dev": "cd client && yarn start",
      "server:dev": "nodemon server/server.js",
      "heroku-postbuild": "yarn build"
    },
    "devDependencies": {
      "concurrently": "^4.1.0",
      "nodemon": "^1.18.10"
    }
  }