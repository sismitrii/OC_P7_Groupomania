/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');
const mongoose = require('mongoose');

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

  app.use((req, res, next) => {
    res.status(200).json({message : "Work"})
  })


  module.exports = app;