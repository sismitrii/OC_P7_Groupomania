/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');
const router = express.Router();

const publicationCtrl = require('../controllers/publication')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
/*=============================================================*/
/*------------------------ ROUTES -----------------------------*/
/*=============================================================*/

router.get('/', publicationCtrl.getAllPublication)
router.get('/:id', publicationCtrl.getOnePublication)
router.post('/',auth, multer, publicationCtrl.createPublication)
router.put('/:id', auth, multer, publicationCtrl.modifyPublication)
router.delete('/:id', publicationCtrl.deletePublication)
router.put(':id/like', publicationCtrl.likePublication)


module.exports = router;