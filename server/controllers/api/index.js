const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/secrets', require('./secretsController'));
apiControllers.use('/photos', require('./photosController'));
apiControllers.use('/pages', require('./pagesController'));
module.exports = apiControllers;
