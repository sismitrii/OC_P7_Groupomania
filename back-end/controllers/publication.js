/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const fs = require('fs');

const User = require('../models/users')
const Publication = require('../models/publications')
const Comment = require('../models/comments')

const functionCtrl = require('./function')


/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/

/*=== Get all publications in the data base ===*/
exports.getAllPublication = (req, res, next) => {
    Publication.find()
    .then((publications)=>{
        publications.sort((a, b) => {
            let dateA = new Date(a.createdAt),
                dateB = new Date(b.createdAt);
            return dateB - dateA;
        });
        
        const publicationToReturn = publications.slice(parseInt(req.params.start), parseInt(req.params.start) + 5)
        res.status(200).json({publicationToReturn})})
    .catch((error)=> res.status(400).json({message:"Error find publications", error}))
}

/*=== Get a publication with it id in request ===*/
exports.getOnePublication = (req, res, next) => {
    Publication.findById(req.params.id)
    .then((publication)=> res.status(200).json({publication}))
    .catch((error)=> res.status(400).json({message:"Error find this publication", error}))
}

/*=== Create a publication with or without image and update publications of user that created ===*/
exports.createPublication = (req, res, next) => {
    let publicationContent = req.body.publication ? JSON.parse(req.body.publication).content: req.body.content;

    const publication = new Publication({
        author: req.auth.userId,
        content: publicationContent
    })
    if (req.file){
        publication.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    publication.save()
    .then((newPublication)=>{
        User.findByIdAndUpdate(req.auth.userId, {$push: {publications: newPublication._id}})
        .then(()=>res.status(201).json({message: "New publication created"}))
        .catch((error)=> res.status(400).json({message: "Error updating user", error}))
        })
    .catch((error)=> res.status(400).json({message: "Error saving publication", error}))

}

/*=== Admin and user loged (token) can modify a publication, content, image or content and image ===*/
exports.modifyPublication = (req, res, next) => {
    const newPublicationContent = req.body.publication ? JSON.parse(req.body.publication).content: req.body.content

    const newPublication = {
        content: newPublicationContent
    }

    if (req.file){
        newPublication.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    User.findById(req.auth.userId)
    .then((user)=>{
        if (user.role.includes("ROLE_ADMIN") || user.publications.includes(req.params.id)){
            if (req.file){
                Publication.findById(req.params.id)
                .then((publication)=>{
                    functionCtrl.removeImage(publication)
                })
                .catch((error)=> console.error('Error finding publication'))
            }
            Publication.findByIdAndUpdate(req.params.id, newPublication)
            .then(()=> res.status(201).json({message: "Publication updated"}))
            .catch((error) => res.status(400).json({message: "Error updating Publication", error}))
        } else {
            res.status(403).json({message: "Unauthorized"})
        }
    })
    .catch((error)=> res.status(400).json({message: "Error finding user", error}))
}

/*=== Admin and user loged (token) can delete a publication and remove image if one ===*/
exports.deletePublication = (req, res, next) => {
    User.findById(req.auth.userId)
    .then((user)=>{
        if ((user.role.includes("ROLE_ADMIN") || user.publications.includes(req.params.id))){
            functionCtrl.deletePublication(res, req.params.id, true)
        }
    })
    .catch((error)=> res.status(400).json({message: "Error finding user", error}))
}

/*=== Like or Remove a like and update userLiked Array ===*/
exports.likePublication = (req, res, next) => {
    Publication.findById(req.params.id)
    .then((publication)=>{
        if (req.body.like > 0){
            if (!(publication.userLiked.includes(req.auth.userId))){
                publication.like += 1;
                publication.userLiked.push(req.auth.userId);
            } else {
                return res.status(200).json({message: "User has already liked this publication"})
            }
        } else {
            if (publication.userLiked.includes(req.auth.userId)){
                publication.like -= 1;
                publication.userLiked.splice(publication.userLiked.indexOf(req.auth.userId), 1);
            } else {
                return res.status(200).json({message: "User haven't liked this publication he can't remove it like", error})
            }
        }
        Publication.findByIdAndUpdate(req.params.id, publication)
        .then(()=>res.status(201).json({message: "publication Like Updated"}))
        .catch((error)=> res.status(400).json({message: "Error Updating Like", error}))
    })
    .catch((error)=> res.status(400).json({message: "Error finding publication to like", error}))
}



