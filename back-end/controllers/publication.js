/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/

const publications = require('../models/publications')
const Publication = require('../models/publications')


/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/

exports.getAllPublication = (req, res, next) => {
    Publication.find()
    .then((publications)=> res.status(200).json({publications}))
    .catch((error)=> res.status(400).json({message :"Error find publications", error : error}))
}


exports.getOnePublication = (req, res, next) => {
    Publication.findById(req.params.id)
    .then((publication)=> res.status(200).json({publication}))
    .catch((error)=> res.status(400).json({message :"Error find this publication", error : error}))

}


exports.createPublication = (req, res, next) => {

}


exports.modifyPublication = (req, res, next) => {

}


exports.deletePublication = (req, res, next) => {

}


exports.likePublication = (req, res, next) => {

}



