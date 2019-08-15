const photosController = require('express').Router();
const { JWTVerifier } = require('../../lib/passport');
const db = require('../../models');
const multer = require('multer')
const storage = require('../../lib/multer')
let upload = multer({ storage: storage });
photosController.post('/', JWTVerifier, upload.single('file'), (req, res) => {
    console.log('made it')
    if (!req.file) {
        console.log("No file received");
        res.sendStatus(500);

    } else {
        console.log('file received');
        console.log(req.body.location,"the body")
        db.Photos.create({ photoName: req.file.filename, location: req.body.location }).then(results => {
            message = "Successfully! uploaded";
            res.sendStatus(200)
        });
    }
});

module.exports = photosController;