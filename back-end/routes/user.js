/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


/*=============================================================*/
/*------------------------ ROUTES -----------------------------*/
/*=============================================================*/

router.get('/:id', userCtrl.getUserData)
router.put('/:id', auth, multer, userCtrl.modifyUserData)
router.delete('/:id', userCtrl.deleteUserData)
router.get('/:id/publications', userCtrl.getUserPublications)


module.exports = router;