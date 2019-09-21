const pagesController = require('express').Router();

const { JWTVerifier } = require('../../lib/passport');
const db = require('../../models');

pagesController.get('/',(req, res) => {
  
  db.Pages.findAll({
    where: {
      public :true
    }
  })
    .then(pages => {
      
      res.json(pages)})
    .catch(err => console.log(err));
});
pagesController.get('/auth', JWTVerifier,(req, res) => {

  db.Pages.findAll()
    .then(pages => {
      res.json(pages)})
    .catch(err => console.log(err))

}); 
pagesController.get('/:id',(req, res) => {

   db.Pages.findOne({where:{pageName:req.params.id, public:true}})
    .then(page => {
      res.json(page)
    })
    .catch(err => console.log(err));
});
pagesController.post('/',(req, res) => {
  
  db.Pages.update(req.body.pageInfo,{where:{id:req.body.id}})
    .then(results => {
      res.json(results)
      })
    .catch(err => console.log(err));
});
pagesController.put('/',(req, res) => {
  
  db.Pages.create(req.body)
    .then(results => {
      res.json(results)
      })
    .catch(err => console.log(err));
});

module.exports = pagesController;