{
    "name": "project-3-starter",
    "version": "1.0.0",
    "license": "MIT",
    "main": "server/server.js",
    "scripts": {
      "start": "node server/server.js",
      "start:dev": "concurrently -n client,server \"yarn run client:dev\" \"nodemon server/server.js\"",
      "client:dev": "cd client && yarn start"
    },
    "devDependencies": {
      "concurrently": "^4.1.0",
      "nodemon": "^1.18.10"
    }
  }