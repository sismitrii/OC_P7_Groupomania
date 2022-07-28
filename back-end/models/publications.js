/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')


/*=============================================================*/
/*------------------------ Schema -----------------------------*/
/*=============================================================*/

const publicationSchema = mongoose.Schema({
    author : {type : String, required : true},
    creationDate : {Date, required : true, default: new Date()},
    content : {type : String},
    imageUrl : {type : String},
    like : {Number, default : 0},
    userLiked : {Array, default :[]},
    comment : {type : Number, default : 0}, // easier trop print number of comment
    commentList : {Array, default : []},
    publiId : {type : String, required :true, unique:true}
})

publicationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Publication', publicationSchema)