/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt')

require('dotenv').config();

const Fixtures = require('node-mongodb-fixtures');
const fixtures = new Fixtures();

fixtures.connect(`${process.env.MONGODB_CONNECT}`,
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => fixtures.unload())
.then(() => fixtures.load())
.then(() => fixtures.disconnect())
.catch((error)=> console.log(error))


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication')
const User = require('./models/users')
// const Publication = require('./models/publications')


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

  module.exports = app;