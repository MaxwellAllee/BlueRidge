const photosController = require('express').Router();
const { JWTVerifier } = require('../../lib/passport');
const db = require('../../models');
const multer = require('multer')
const storage = require('../../lib/multer')
let upload = multer({ storage: storage });
photosController.post('/delete/',  JWTVerifier, (req, res) => {
    db.Photos.destroy({ where: { id: req.body.id } }).then(results => {
        res.json(results)
    })
})
photosController.post('/', JWTVerifier, upload.single('file'), (req, res) => {
    console.log('made it')
    if (!req.file) {
        console.log("No file received");
        res.sendStatus(500);

    } else {
        console.log('file received');
        console.log(req.body.location, "the body")
        db.Photos.create({ photoName: req.file.filename, location: req.body.location }).then(results => {
            message = "Successfully! uploaded";
            res.sendStatus(200)
        });
    }
});
photosController.get('/:id', (req, res) => {
    console.log(req.param.id, 'lookup')
    const pageLookUp = {}
    console.log(req.params.id)
    if (req.params.id !== 'gallery' && req.params.id !== 'edit') {
        pageLookUp.where = { location: req.params.id }
    }
    console.log('---------------------------------------------------------------------------------------------------')
    console.log(pageLookUp)
    db.Photos.findAll(pageLookUp).then(photos => {
        res.json(photos)
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = photosController;
