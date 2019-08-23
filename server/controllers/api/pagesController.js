const pagesController = require('express').Router();

const { JWTVerifier } = require('../../lib/passport');
const db = require('../../models');

pagesController.get('/',(req, res) => {
  
  db.Pages.findAll()
    .then(pages => {
      
      res.json(pages)})
    .catch(err => console.log(err));
});

module.exports = pagesController;