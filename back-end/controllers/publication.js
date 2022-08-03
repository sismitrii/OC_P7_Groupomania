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
    .then((publications)=> res.status(200).json({publications}))
    .catch((error)=> res.status(400).json({message :"Error find publications", error : error}))
}

/*=== Get a publication with it id in request ===*/
exports.getOnePublication = (req, res, next) => {
    Publication.findById(req.params.id)
    .then((publication)=> res.status(200).json({publication}))
    .catch((error)=> res.status(400).json({message :"Error find this publication", error : error}))
}

/*=== Create a publication with or without image and update publications of user that created ===*/
exports.createPublication = (req, res, next) => {
    let publicationContent = req.body.publication ? JSON.parse(req.body.publication).content : req.body.content;

    const publication = new Publication({
        author : req.auth.userId,
        content : publicationContent
    })
    if (req.file){
        publication.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    publication.save()
    .then((newPublication)=>{
        User.findByIdAndUpdate(req.auth.userId, {$push : {publications: newPublication._id}})
        .then(()=>res.status(201).json({mesage : "New publication created"}))
        .catch((error)=> res.status(400).json({mesage : "Error updating user", error : error}))
        })
    .catch((error)=> res.status(400).json({mesage : "Error saving publication", error : error}))

}

/*=== Admin and user loged (token) can modify a publication, content, image or content and image ===*/
exports.modifyPublication = (req, res, next) => {
    const newPublicationContent = req.body.publication ? JSON.parse(req.body.publication).content : req.body.content

    const newPublication = {
        content : newPublicationContent
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
            .then(()=> res.status(201).json({message : "Publication updated"}))
            .catch((error) => res.status(400).json({message : "Error updating Publication", error : error}))
        } else {
            res.status(403).json({message : "Unauthorized"})
        }
    })
    .catch((error)=> res.status(400).json({message : "Error finding user", error : error}))
}

/*=== Admin and user loged (token) can delete a publication and remove image if one ===*/
exports.deletePublication = (req, res, next) => {
    User.findById(req.auth.userId)
    .then((user)=>{
        if ((user.role.includes("ROLE_ADMIN") || user.publications.includes(req.params.id))){
            Publication.findById(req.params.id)
            .then((publication)=>{
                publication.commentList.forEach((comment)=>{
                    Comment.findByIdAndDelete(comment)
                    .then(()=> console.log("deleted"))
                    .catch((error)=> res.status(400).json({message : "Error Deleting comment", error : error}))
                })
                functionCtrl.removeImage(publication)
                Publication.findByIdAndDelete(req.params.id)
                .then(()=>res.status(200).json({message : "Publication and these comment deleted"}))
                .catch((error)=> res.status(400).json({message : "Error deleting publication"}))
            })
            .catch((error)=>res.status(400).json({message : "Error finding publications", error : error}))
            // 2 options
                // Faires des Comment.findByIdAndDelete pour chacun des commentaires de publication.commentList
                // Faire une fonction commune ( sachant qu'il faut retirer tout ce qui est vérif d'identité parceque c'est déjà fait ici)
        }
    })
    .catch((error)=> res.status(400).json({message : "Error finding user", error : error}))
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
                return res.status(200).json({message : "User has already liked this publication"})
            }
        } else {
            if (publication.userLiked.includes(req.auth.userId)){
                publication.like -= 1;
                publication.userLiked.splice(publication.userLiked.indexOf(req.auth.userId), 1);
            } else {
                return res.status(200).json({message : "User haven't liked this publication he can't remove it like"})
            }
        }
        Publication.findByIdAndUpdate(req.params.id, publication)
        .then(()=>res.status(201).json({message : "publication Like Updated"}))
        .catch((error)=> res.status(400).json({mesage : "Error Updating Like", error : error}))
    })
    .catch((error)=> res.status(400).json({message : "Error finding publication to like", error : error}))
}

// exports.removeImage = (object)=>{
//     if (object.imageUrl){
//         const filename = object.imageUrl.split('/images/')[1];
//         fs.unlink(`images/${filename}`,(err) =>{
//             if (err){
//                 console.error(`Error deleting image of publication`)
//             }
//         })
//     }
// }


