/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/

const Publication = require('../models/publications')
const Comment = require('../models/comments')
const auth = require('../middleware/auth')

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

}


exports.modifyComment = (req, res, next)=>{

}


exports.deleteComment = (req, res, next)=>{

}