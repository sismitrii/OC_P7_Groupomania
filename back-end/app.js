/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication')
//const User = require('./models/users')
// const Publication = require('./models/publications')

require('dotenv').config();
/*=============================================================*/
/*--------------------- CONFIGURATION -------------------------*/
/*=============================================================*/

/*=== Connect to MongoDb ===*/

mongoose.connect(`${process.env.MONGODB_CONNECT}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



/*=== Express ===*/
const app = express();

app.use(express.json());


/*=============================================================*/
/*------------------------ HEADERS ----------------------------*/
/*=============================================================*/

// add these header to all the request 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  })

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/publication', publicationRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

  // app.post('/user', (req, res, next)=>{
  //   const user = new User({
  //     email : req.body.email,
  //     password : req.body.password
  //   })
    
  //   user.save()
  //   .then(() => res.status(201).json({message : "new User"}))
  //   .catch(error => res.status(400).json({message : "error", error : error}))
  // })

  // app.post('/publication', (req, res, next)=>{
  //   const publication = new Publication({
  //     ...req.body
  //   })
  //   publication.save()
  //   .then((newPublication)=>{
  //     User.findOneAndUpdate({_id : req.body.author}, {$push: {publications: newPublication._id}}, { new: true })
  //     .then(()=>res.status(201).json({message :"Well Done"}))
  //   })
  // })

  // app.get('/publication/:id', async function(req, res, next){
  //   User.findById( req.params.id)
  //   .populate("publications")
  //   .then((test)=>res.status(200).json({publication: test.publications}))
  // })

  // app.get('/test/:id/publi/:otherId', (req,res,next)=>{
  //   console.log(req.params.id);
  //   console.log(req.params.otherId);
  // })




  module.exports = app;