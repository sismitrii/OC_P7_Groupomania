/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')


/*=============================================================*/
/*------------------------ Schema -----------------------------*/
/*=============================================================*/

const publicationSchema = mongoose.Schema({
    author: {type: String, required: true},
    content: {type: String},
    imageUrl: {type: String},
    like: {type: Number, default: 0},
    userLiked: {type: Array, default:[]},
    commentList: [
        {type: mongoose.Schema.Types.ObjectId 
        , ref: "Comment" }
    ],
    createdAt: {type: Date, required: true, default: Date.now },
    updatedAt: {type: Date, required: true, default: Date.now }
})

publicationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Publication', publicationSchema)