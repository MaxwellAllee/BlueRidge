const pagesController = require('express').Router();

const { JWTVerifier } = require('../../lib/passport');
const db = require('../../models');

pagesController.get('/',(req, res) => {
  
  db.Pages.findAll()
    .then(pages => {
      
      res.json(pages)})
    .catch(err => console.log(err));
});
pagesController.post('/',(req, res) => {
  
  db.Pages.update(req.body.pageInfo,{where:{id:req.body.id}})
    .then(results => {
      console.log(results)
      res.json(results)
      })
    .catch(err => console.log(err));
});
pagesController.put('/',(req, res) => {
  
  db.Pages.create(req.body)
    .then(results => {
      console.log(results)
      res.json(results.dataValues)
      })
    .catch(err => console.log(err));
});

module.exports = pagesController;