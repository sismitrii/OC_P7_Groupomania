/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');
const router = express.Router();

const publicationCtrl = require('../controllers/publication')
const commentCtrl = require('../controllers/comment')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
/*=============================================================*/
/*------------------------ ROUTES -----------------------------*/
/*=============================================================*/

router.get('/:start', publicationCtrl.getAllPublication)
router.get('/:id', publicationCtrl.getOnePublication)
router.post('/',auth, multer, publicationCtrl.createPublication)
router.put('/:id', auth, multer, publicationCtrl.modifyPublication)
router.delete('/:id', auth, publicationCtrl.deletePublication)
router.put('/:id/like',auth, publicationCtrl.likePublication)

router.post('/:id/comment', auth, commentCtrl.createComment)
router.get('/:id/comment', commentCtrl.getCommentsOfPublication)
router.put('/comment/:com_id', auth, commentCtrl.modifyComment)
router.delete('/:id/comment/:com_id', auth, commentCtrl.deleteComment)


module.exports = router;