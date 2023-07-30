const Comment                 = require('../models/comment'),
      Post                    = require('../models/post')


module.exports                = {
    addComment                : async (req,res)=>{
        try{
            const post        = await Post.findById(req.params.id)
            if(!post){
                return res.status(404).send({message:"Post Not Found!"})
            }
            const comment     = new Comment({comment:req.body.comment, userId:req.user._id, postId:req.params.id})
            await comment.save()
            res.status(200).send(comment)
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    }
}     
      