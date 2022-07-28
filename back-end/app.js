/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');

/*=============================================================*/
/*--------------------- EXPRESS CONFIG ------------------------*/
/*=============================================================*/

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