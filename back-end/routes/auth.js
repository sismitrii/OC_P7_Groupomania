/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth')
const auth = require('../middleware/auth')

/*=============================================================*/
/*------------------------ ROUTES -----------------------------*/
/*=============================================================*/

router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)
router.put('/change_password',auth, authCtrl.changePassword)
router.post('/forgot_password', authCtrl.forgotPassword)
router.put('/reset_password', authCtrl.resetPassword)

module.exports = router;


