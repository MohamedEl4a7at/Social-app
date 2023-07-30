const express               = require('express'),
      router                = express.Router(),
      user                  = require('../controllers/user'),
      auth                  = require('../middlewares/auth'),
      multer              = require('multer'),
      storage             = multer.diskStorage({
        destination       : function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename          : function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
      }),
      upload              = multer({
        fileFilter(req,file,cb){
            if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
                return cb(new Error('Please upload a valid image'),null)
            }
            //accept file
            cb(null,true)
        },
      storage});

///////////////////////////////////////////////// sign up
     router.post('/signUp',user.addUser);
//////////////////////////////////////////////// verify otp
     router.post('/verifyOtp/:id',user.verifyOtp);
/////////////////////////////////////////////// login
     router.post('/login',user.login);
/////////////////////////////////////////////// add photo
     router.patch('/addPic',auth,upload.single('image'),user.uploadPic)
////////////////////////////////////////////// update profile
     router.patch('/updateProfile',auth,upload.single('image'),user.update)
module.exports = router;
