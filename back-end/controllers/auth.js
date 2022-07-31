/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.signup = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10 )
        .then(hash=>{
            const user = new User({
                email : req.body.email,
                password : hash,
                username : req.body.email.split('@')[0], // don't work
                profilImgUrl : `${req.protocol}://${req.get('host')}/images/profil_default.jpg`
            });

            user.save()
                .then(()=>res.status(201).json({message : "New user created"}))
                .catch((error)=>res.status(400).json({message : "error creating new user", error : error}))
        })
        .catch((error)=> res.status(500).json({message : "hash not  working", error : error}))
    
}

exports.login = (req, res, next)=>{
    User.findOne({email : req.body.email})
        .then((user)=>{
            if (user === null){
                res.status(401).json({message : "Incorrect email"})
            } else {
                bcrypt.compare(req.body.password, user.password)
                .then((valid)=>{
                    if (!valid){
                        res.status(401).json({message : "Password incorrect"}) 
                    } else {
                        res.status(200).json({
                            userId : user._id,
                            token : jwt.sign({userId : user._id},'SECRET_PASSWORD',{expiresIn : '8h'})
                        })
                    }
                })
                .catch((error)=>res.status(500).json({message : "bcrypt compare not working", error : error}))
            }
        })
        .catch(error=> res.status(500).json({message : "login does not work", error : error}))
}

exports.changePassword = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
        User.findByIdAndUpdate(req.auth.userId, {$set : { password: hash }})
        .then(()=> res.status(201).json({message : "User updated"}))
        .catch((error)=>res.status(400).json({error:error}))
    })
    .catch((error)=> res.status(500).json({message : "hash not working", error : error}))
}


