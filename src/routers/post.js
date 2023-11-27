const express               = require('express'),
      router                = express.Router(),
      post                  = require('../controllers/post'),
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
    router.put('/updatePost/:id',auth,upload.single('image'),post.editPost)
////////////////////////////////////////////////////////////  delete post
    router.delete('/deletePost/:id',auth,post.deletePost);
///////////////////////////////////////////////////////////  get  post
    router.get('/getPost/:id',auth,post.getPost)
//////////////////////////////////////////////////////////   get timeline
/////////////////////////////////////////////////////////    like/disLike post


module.exports = router