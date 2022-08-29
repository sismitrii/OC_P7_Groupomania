/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const fs = require('fs')

const User = require('../models/users');
const Publication = require('../models/publications')
const Comment = require('../models/comments')

const functionCtrl = require('./function')


/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/


/*=== Get all user data from an user except password even if it's hashed ===*/
exports.getUserData = (req, res) => {
    User.findById(req.params.id)
    .then((user)=>{
        delete user._doc.password;
        if (user._doc.token){
            delete user._doc.token;
        } 
        res.status(200).json({user})
    })
    .catch((error)=> res.status(500).json({message: "User does exist in DB", error}))
}

/*=== User loged (token) can modify element from his own profil ===*/
exports.modifyUserData = (req, res) => {
    const newUserData = req.body.user ? {...JSON.parse(req.body.user)}: {...req.body};

    if (req.file){
        newUserData.profilImgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    
    if (newUserData.password || newUserData.role){
        delete newUserData.password;
        delete newUserData.role;
        res.status(403).json({message:"Unauthorized to modify password or role"})
    } else {
        User.findById(req.auth.userId)
        .then((user)=>{
            if (user){
                if (req.file && user.profilImgUrl !== `${req.protocol}://${req.get('host')}/images/profil_default.jpg` ){
                    functionCtrl.removeImage(user)
                }
                User.updateOne({_id: req.params.id}, newUserData)
                .then(()=> res.status(201).json({message: "User modified"}))
                .catch((error)=> res.status(400).json({message: "Error update user", error}))
            } else {
                res.status(401).json({message: "le token of user not valid"})
            }
        })
        .catch((error)=> res.status(500).json({message: "Error finding user", error}))
    }
}

/*=== Admin and User loged can delete a user from DB ===*/
// Maybe add something to say that the  account have been desactivated
exports.deleteUserData = (req, res) => {
    User.findById(req.auth.userId)
    .then((userRequesting)=>{
        if ((userRequesting.role.includes("ROLE_ADMIN"))|| (req.params.id === req.auth.userId)){
            User.findById(req.params.id)
            .then((userToDelete)=>{
                userToDelete.publications.forEach(publicationId => {
                    functionCtrl.deletePublication(res, publicationId, false)
                })
                if (userToDelete.profilImgUrl !== `${req.protocol}://${req.get('host')}/images/profil_default.jpg` ){
                    functionCtrl.removeImage(userToDelete)
                }
                User.findByIdAndDelete(userToDelete)
                .then(()=> res.status(200).json({message: "User deleted"}))
                .catch((error)=> res.status(400).json({message: "Error deleting User", error}))
            .catch((error)=> res.status(400).json({message: "Error finding User", error:error}))
            })
        }
    })
    .catch((error)=> res.status(400).json({message: "Error finding User", error}))
}

/*=== Get all Publication from a user ===*/
exports.getUserPublications = (req, res) => {
    User.findById(req.params.id)
    .populate("publications")
    .then((user)=> {
        const publicationsToReturn = functionCtrl.sortAndSend(req,user.publications)
        res.status(201).json({publications: publicationsToReturn})
    })
    .catch((error)=> res.status(500).json({message: "Error finding User", error}))
}

/*=== Research Request ===*/
exports.getUsers = (req, res) =>{
    let regex = new RegExp(req.body.searchValue, 'i')
    User.find({username: regex}, '_id username')
    .then((users)=> res.status(200).json({users}))
    .catch((error)=>res.status(500).json({message: "Error finding Users"}))
}



