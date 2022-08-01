/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/

const Publication = require('../models/publications')
const Comment = require('../models/comments')
const auth = require('../middleware/auth')
const publications = require('../models/publications')

/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/

exports.createComment = (req, res, next)=>{
    const comment = new Comment({
        content : req.body.content,
        author : req.auth.userId
    })

    comment.save()
    .then((comment)=> {
        Publication.findByIdAndUpdate(req.params.id, {$push : {commentList : comment._id }})
        .then(()=>res.status(201).json({message : "Comment created"}))
        .catch((error)=> res.status(400).json({message : "Error update commentList in Publications", error : error}))
    })
    .catch((error)=> res.status(400).json({message : "Error saving comment", error : error}))
}


exports.getCommentsOfPublication = (req, res, next)=>{
    Publication.findById(req.params.id)
    .populate("commentList")
    .then((publication)=> res.status(201).json({comments : publication.commentList}))
    .catch((error)=> res.status(400).json({message : "Error finding publication"}))
}


exports.modifyComment = (req, res, next)=>{
    Comment.findByIdAndUpdate(req.params.com_id, {$set : {content : req.body.content}})
    .then(()=> res.status(201).json({message : "comment updated"}))
    .catch((error) => res.status(400).json({message : "Error updating comment", error : error}))
}


exports.deleteComment = (req, res, next)=>{
    
}