/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')


/*=============================================================*/
/*------------------------ Schema -----------------------------*/
/*=============================================================*/

const commentSchema = mongoose.Schema({
    content : {type : String, required : true},
    author : {type : String , required : true},
    id : {type : String, required : true, unique : true}
})

commentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Comment', commentSchema)