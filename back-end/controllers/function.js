/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const fs = require('fs');
const Comment = require('../models/comments')
const Publication = require('../models/publications')

exports.removeImage = (object)=>{

    if (object.imageUrl || object.profilImgUrl){
        const imageUrl = object.profilImgUrl ? object.profilImgUrl : object.imageUrl
        const filename = imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,(err) =>{
            if (err){
                console.error(`Error deleting image`)
            }
        })
    }
}

exports.deleteComment = (res, commentId, publiId) =>{
    Comment.findByIdAndDelete(commentId)
    .then(()=>{
        if (publiId){
            Publication.findByIdAndUpdate(publiId, {$pull : {commentList : commentId}})
            .then(()=> res.status(201).json({message :"Comment delete"}))
            .catch((error)=> res.status(400).json({message : "Error Removing a comment from a Publication", error : error}))
        }
    })
    .catch((error)=> res.status(400).json({message : "Error deleting a comment", error :error}))
}

