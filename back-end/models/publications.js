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
    creationDate : {type : Date, required : true, default: new Date()},
    content : {type : String},
    imageUrl : {type : String},
    like : {Number, default : 0},
    userLiked : {Array, default :[]},
    commentList : [
        {type : mongoose.Schema.Types.ObjectId 
        , ref : "Comment" }
    ]
})

publicationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Publication', publicationSchema)