/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const fs = require('fs');

exports.removeImage = (object)=>{

    if (object.imageUrl || object.profilImgUrl){
        const imageUrl = object.profilImgUrl ? object.profilImgUrl : object.imageUrl
        const filename = imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,(err) =>{
            if (err){
                console.error(`Error deleting image`)
            }
        })
    }
}