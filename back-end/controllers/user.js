/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/

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

}


exports.deleteUserData = (req, res, next) => {

}


exports.getUserPublication = (req, res, next) => {

}