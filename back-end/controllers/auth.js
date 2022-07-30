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
                username : req.body.email.split('@')[0],
                profilImgUrl : `${req.protocol}://${req.get('host')}/images/profil_default.jpg`
            });

            user.save()
                .then(()=>res.status(201).json({message : "New user created"}))
                .catch((error)=>res.status(400).json({message : "error creating new user", error : error}))
        })
        .catch((error)=> res.status(500).json({message : "hash not  working", error : error}))
    
}

exports.login = (req, res, next)=>{
    console.log("test");
}


