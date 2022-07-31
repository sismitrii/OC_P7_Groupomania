/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const fs = require('fs')

const User = require('../models/users');


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

}


exports.getUserPublication = (req, res, next) => {

}