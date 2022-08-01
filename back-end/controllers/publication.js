/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/

const User = require('../models/users')
const Publication = require('../models/publications')


/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/

// REVERIFIER avec plus de publications et des commentaires
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

// to retest when able to add file to request
exports.createPublication = (req, res, next) => {
    const publication = req.file ? new Publication({
        author : req.auth.userId,
        ...JSON.parse(req.body.publication), // content : JSON.parse(req.body.publication).content
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // a essayer remplacer req.get par app.get('port')
    }) : 
    new Publication({
        author : req.auth.userId,
        content : req.body.content
    })

    publication.save()
    .then((newPublication)=>{
        User.findByIdAndUpdate(req.auth.userId, {$push : {publications: newPublication._id}})
        .then(()=>res.status(201).json({mesage : "New publication created"}))
        .catch((error)=> res.status(400).json({mesage : "Error updating user", error : error}))
        })
    .catch((error)=> res.status(400).json({mesage : "Error saving publication", error : error}))

    

}


exports.modifyPublication = (req, res, next) => {

}


exports.deletePublication = (req, res, next) => {

}


exports.likePublication = (req, res, next) => {

}



