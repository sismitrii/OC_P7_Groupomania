/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

/*=============================================================*/
/*------------------------ Schema -----------------------------*/
/*=============================================================*/

function toLower(mail) { 
    return mail.toLowerCase();
  }

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique:true, lowercase: true }, //  set: toLower, //if no set an email can have 2 acount flo@gmail.com and fLo@gmail.com are the same email but can be registred 1 time each
    password: {type: String, required: true},
    role: {type: Array, default:["ROLE_USER"]},
    username: {type: String }, // Tout ce qui est devant l'@
    profilImgUrl: {type: String}, // mettre une image bidon par default
    department: {type: String, default: "Groupomania"}, 
    birthday: {type: Date }, 
    workNumber: {type: Number },
    mobileNumber: {type: Number },
    interests: {type: String},
    biography: {type: String},
    publications: [
     {type: mongoose.Schema.Types.ObjectId 
     , ref: "Publication" }
    ],
    token: {type: String},
    createdAt: {type: Date, default: Date.now}
    // to add a publication for this user: 
    /*Publication.create(req.body)
    .then(function(dbReview) {
      // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
      return db.Product.findOneAndUpdate({ _id: .... }, {$push: {reviews: dbReview._id}}, { new: true });
    })*/

    //subordinateList: {type: Array}
    // admin level ?
        // lvl 1 delete all publication, all comments, desactivated an user, and everything other lvl can do
        // lvl 2 "responsable" can add to to do list of there "subordinate"
        // lvl 3 normal actions, CRUD on there own publication, comment, task, profile
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)

//https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType
// https://www.npmjs.com/package/mongoose-unique-validator