/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')


/*=============================================================*/
/*------------------------ Schema -----------------------------*/
/*=============================================================*/

const commentSchema = mongoose.Schema({
    content: {type: String, required: true},
    author: {type: String , required: true}
})

commentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Comment', commentSchema)