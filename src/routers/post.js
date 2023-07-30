const express               = require('express'),
      router                = express.Router(),
      post                  = require('../controllers/post')
      auth                  = require('../middlewares/auth'),
      multer                = require('multer'),
      storage               = multer.diskStorage({
        destination         : function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename            : function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
      }),
      upload                = multer({
        fileFilter(req,file,cb){
            if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
                return cb(new Error('Please upload a valid image'),null)
            }
            //accept file
            cb(null,true)
        },
      storage});

////////////////////////////////////////////////////////////// add Post
    router.post('/addPost',auth,upload.single('image'),post.addPost)
///////////////////////////////////////////////////////////// update post
////////////////////////////////////////////////////////////  delete post
///////////////////////////////////////////////////////////  get  post
//////////////////////////////////////////////////////////   get timeline

module.exports = router