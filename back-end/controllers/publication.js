/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const fs = require('fs');

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

// retest with a file and with an admin
exports.modifyPublication = (req, res, next) => {
    const newPublication = req.file ? {
        ...JSON.parse(req.body.publication),
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : 
    {
        content : req.body.content
    }

    User.findById(req.auth.userId)
    .then((user)=>{
        if (user.role.includes("ROLE_ADMIN") || user.publications.includes(req.params.id)){
            if (req.file){
                Publication.findById(req.params.id)
                .then((publication)=>{
                    const filename = publication.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`,(err) =>{
                        console.error(`Error deleting image of publication : ${req.params.id}`)
                    })
                })
                .catch((error)=> console.error('Error finding publication de delete picture'))
            }
            Publication.findByIdAndUpdate(req.params.id, newPublication)
            .then(()=> res.status(201).json({message : "Publication updated"}))
            .catch((error) => res.status(400).json({message : "Error updating Publication", error : error}))
        } else {
            res.status(403).json({message : "Unauthorized"})
        }
    })
    .catch((error)=> res.status(400).json({message : "Error finding user", error : error}))
}


exports.deletePublication = (req, res, next) => {

}


exports.likePublication = (req, res, next) => {

}



