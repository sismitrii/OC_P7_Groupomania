/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const mongoose = require('mongoose');


/*=============================================================*/
/*------------------------ Schema -----------------------------*/
/*=============================================================*/

const profilSchema = mongoose.Schema({
    name : {type : String, required : true }, // par default mettre adresse email ?
    profilImgUrl : {type : String, required : true }, // mettre une image bidon par default
    department : {type : String, required : true, default: "Groupomania"}, 
    birthday : {type : Date }, 
    workNumber : {type : Number },
    mobileNumber : {type : Number },
    workMail : {type : String},
    interests : {type : String},
    biography : {type : String},
    publications : {type : Array, default:[] },
    userId : {type : String, required : true }
})

module.exports = mongoose.model('Profil', profilSchema)