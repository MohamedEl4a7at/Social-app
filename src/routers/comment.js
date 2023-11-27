const express               = require('express'),
      router                = express.Router(),
      comment               = require('../controllers/comment'),
      auth                  = require('../middlewares/auth')

////////////////////////////////////////////////////////////// add comment
    router.post('/addComment/:id',auth,comment.addComment)
///////////////////////////////////////////////////////////// update comment
    router.patch('/updateComment/:id',auth,comment.updateComment)
////////////////////////////////////////////////////////////  delete comment
    router.delete('/deleteComment/:id',auth,comment.deleteComment)
///////////////////////////////////////////////////////////  get  comment
    router.get('/getComment/:id',auth,comment.getComment)
//////////////////////////////////////////////////////////   get all comment
    router.get('/allComments/:id',auth,comment.getComments)
module.exports = router