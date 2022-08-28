/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const fs = require('fs');
const Comment = require('../models/comments')
const Publication = require('../models/publications')
const User = require('../models/users')


/*=============================================================*/
/*------------------------ FUNCTIONS -----------------------------*/
/*=============================================================*/

/*=== Delete image from API===*/
function removeImage(object){
    if (object.imageUrl || object.profilImgUrl){
        const imageUrl = object.profilImgUrl ? object.profilImgUrl: object.imageUrl
        const filename = imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,(err) =>{
            if (err){
                console.error(`Error deleting image`)
            }
        })
    }
}

/*=== Delete the comment asked from DB ===*/
function deleteComment(res, commentId, publiId){
    Comment.findByIdAndDelete(commentId)
    .then(()=>{
        if (publiId){
            Publication.findByIdAndUpdate(publiId, {$pull: {commentList: commentId}})
            .then(()=> res.status(201).json({message: "Comment delete"}))
            .catch((error)=> res.status(400).json({message: "Error Removing a comment from a Publication", error}))
        }
    })
    .catch((error)=> res.status(400).json({message: "Error deleting a comment", error}))
}

/*=== Delete a publication and these comment ===*/
exports.deletePublication = (res, publicationId, userIsToUpdate) =>{
    Publication.findById(publicationId)
    .then((publication)=>{
        publication.commentList.forEach((commentId)=>{
            deleteComment(res, commentId)
        })
        removeImage(publication)
        Publication.findByIdAndDelete(publicationId)
        .then((publication)=>{
            if (userIsToUpdate){
                User.findByIdAndUpdate(publication.author, {$pull: {publications: publicationId }})
                .then(()=> res.status(200).json({message: "Publication and these comment deleted"}))
                .catch((error)=> res.status(400).json({message: "Error updating User", error}))  
            }
        })
        .catch((error)=> res.status(400).json({message: "Error deleting publication"}))
    })
    .catch((error)=>res.status(400).json({message: "Error finding publications", error}))
}

/*=== sort publication and return 5 ===*/
exports.sortAndSend = (req, publications, ) =>{
    publications.sort((a, b) => {
        let dateA = new Date(a.createdAt),
            dateB = new Date(b.createdAt);
        return dateB - dateA;
    });
    
    return publications.slice(parseInt(req.params.start), parseInt(req.params.start) + 5)
   
}

exports.removeImage = removeImage;
exports.deleteComment = deleteComment;


