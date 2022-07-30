/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user')


/*=============================================================*/
/*------------------------ ROUTES -----------------------------*/
/*=============================================================*/

router.get('/:id', userCtrl.getUserData)
router.put('/id', userCtrl.modifyUserData)
router.delete('/:id', userCtrl.deleteUserData)
router.get('/:id/publication', userCtrl.getUserPublication)


module.exports = router;