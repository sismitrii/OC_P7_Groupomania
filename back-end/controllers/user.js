/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const fs = require('fs')

const User = require('../models/users');
const Publication = require('../models/publications')
const Comment = require('../models/comments')


/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/

exports.getUserData = (req, res, next) => {
    User.findById(req.params.id)
    .then((user)=>{
        delete user._doc.password // delete user.password doesn't work 
        res.status(200).json({user})
    })
    .catch((error)=> res.status(400).json({message : "User does exist in DB", error : error}))
}


exports.modifyUserData = (req, res,next) => {
    const newUserData = req.file ? 
    {...JSON.parse(req.body.user),
    profilImgUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} 
    :
    {...req.body}
    
    if (newUserData.password || newUserData.role){
        delete newUserData.password;
        delete newUserData.role;
        res.status(403).json({message :"Unauthorized to modify password or role"})
    } else {
        User.findById(req.auth.userId)
        .then((user)=>{
            if (user){
                if (req.file && user.profilImgUrl !== `${req.protocol}://${req.get('host')}/images/profil_default.jpg` ){
                    const filename = user.profilImgUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err)=>{
                        if (err){
                            console.error(`Error deleting image : ${filename} in back-end/images`)
                        }
                    })
                }
                User.updateOne({_id: req.params.id}, newUserData)
                .then(()=> res.status(201).json({message : "User modified"}))
                .catch((error)=> res.status(400).json({message : "Error update user", error : error}))
            } else {
                res.status(401).json({message : "le token of user not valid"})
            }
        })
        .catch((error)=> res.status(400).json({message : "Error finding user", error : error}))
    }
}


exports.deleteUserData = (req, res, next) => {
    User.findById(req.auth.userId)
    .then((userRequesting)=>{
        if ((userRequesting.role.includes("ROLE_ADMIN"))|| (req.params.id === req.auth.userId)){
            User.findById(req.params.id)
            .then((userToDelete)=>{
                userToDelete.publications.forEach(publicationId => {
                    Publication.findById(publicationId)
                    .then((publication)=>{
                        publication.commentList.forEach((comment)=>{
                        Comment.findByIdAndDelete(comment)
                        .then(()=> console.log("Comment deleted"))
                        .catch((error)=> res.status(400).json({message : "Error Deleting comment", error : error}))
                    })
                    Publication.findByIdAndDelete(publicationId)
                    .then(()=>console.log("Publication deleted"))
                    .catch((error)=> res.status(400).json({message : "Error deleting publication"}))
                    });
                })
                User.findByIdAndDelete(userToDelete)
                .then(()=> res.status(200).json({message : "User deleted"}))
                .catch((error)=> res.status(400).json({message : "Error deleting User", error : error}))
            .catch((error)=> res.status(400).json({message : "Error finding User", error :error}))
            })
        }
    })
    .catch((error)=> res.status(400).json({message : "Error finding User", error : error}))
}

// To retest after creating request to add publications
exports.getUserPublications = (req, res, next) => {
    User.findById(req.params.id)
    .populate("publications")
    .then((user)=> res.status(201).json({publications : user.publications}))
}