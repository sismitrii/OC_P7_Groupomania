/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const User = require('../models/users');

/*=== Crypt the password and create a new user in DB ===*/
exports.signup = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10 )
        .then(hash=>{
            const user = new User({
                email: req.body.email,
                password: hash,
                username: req.body.email.split('@')[0], // don't work
                profilImgUrl: `${req.protocol}://${req.get('host')}/images/profil_default.jpg`
            });

            user.save()
                .then(()=>res.status(201).json({message: "New user created"}))
                .catch((error)=>res.status(400).json({message: "error creating new user", error}))
        })
        .catch((error)=> res.status(500).json({message: "hash not  working", error}))
    
}

/*=== Find the account in the DB and send a userId and a signed token ===*/
exports.login = (req, res, next)=>{
    User.findOne({email: req.body.email})
        .then((user)=>{
            if (user === null){
                res.status(404).json({message: "Incorrect email"})
            } else {
                bcrypt.compare(req.body.password, user.password)
                .then((valid)=>{
                    if (!valid){
                        res.status(401).json({message: "Password incorrect"}) 
                    } else {
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign({userId: user._id},process.env.JWT_PASSWORD,{expiresIn: '8h'})
                        })
                    }
                })
                .catch((error)=>res.status(500).json({message: "bcrypt compare not working",error}))
            }
        })
        .catch(error=> res.status(500).json({message: "login does not work", error}))
}

/*=== Hash the new password and replace password of the userId loged (token) by the new hashed password ===*/
/*=== Only a userId from token can change his password ===*/
exports.changePassword = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
        User.findByIdAndUpdate(req.auth.userId, {$set: {password: hash }})
        .then(()=> {
            res.status(201).json({message: "User updated"})
        })
        .catch((error)=>res.status(400).json({error}))
    })
    .catch((error)=> res.status(500).json({message: "hash not working",error}))
}


/*=== Send an email with a link to resetPassword page with the token in parameter ===*/
exports.forgotPassword = (req,res, next)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(!user){
            res.status(404).json({message: "Incorrect email"})
        } else {
            const randomString = crypto.randomBytes(20).toString('hex')
            const token = jwt.sign({token: randomString}, process.env.JWT_PASSWORD, {expiresIn: '900s'}); // 15min

            User.updateOne({email: req.body.email}, {token: randomString})
            .then(()=>{
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `${process.env.FORGOT_EMAIL}`,
                        pass: `${process.env.FORGOT_PASSWORD}`
                    }
                    });
            
                    const mailOptions = {
                    from: 'groupamania.oc@gmail.com',
                    to: `${req.body.email}`,
                    subject: 'Changement mot de passe Groupomania',
                    text: 'Bonjour,\n\n' +
                    `Une demande de modification de mot de passe à été effectué pour votre compte Groupomania\n` +
                    `Veuillez cliquez sur ce lien pour réinitialiser votre mot de passe : \n` +
                    `http://localhost:3001/resetPassword/${token} \n` +
                    `Si vous n'etes pas l'auteur de cette demande ce mail veuillez supprimez ce mail`
                    };
        
            
                    transporter.sendMail(mailOptions, function(error, response){
                    if (error) {
                        console.log(error);
                        res.status(400).json({error})
                    } else {
                        console.log('Email sent : ', response);
                        res.status(200).json({message: 'email sent'})
                    }
                    });
            })
            .catch((err)=> console.log({err}))
        }
    })
    .catch((error)=> res.status(500).json({error}))
}

/*=== Find the user to reset the password with the token and replace is password in DB ===*/
exports.resetPassword = (req,res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
        let decodedToken;
        try{
            decodedToken = jwt.verify(req.body.token,process.env.JWT_PASSWORD);
            console.log(decodedToken.token);
        }catch(error){
            res.status(401).json({message: "Authenficatication Error", error});
        }
        User.findOne({token: decodedToken.token})
        .then((user)=> {
            User.findByIdAndUpdate(user._id, {$set: {password: hash}})
            .then((user)=> res.status(201).json({message: "User updated"}))
            .catch((error)=>res.status(400).json({error}))
        })
        .catch((err)=>console.log(err))
    })
    .catch((error)=> res.status(500).json({message: "hash not working",error}))
}

