const Comment                 = require('../models/comment'),
      Post                    = require('../models/post');
    //   mongoose                = require('mongoose')


module.exports                = {
/////////////////////////////////////////////////////////////////////////////// Add Comment
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
    },
/////////////////////////////////////////////////////////////////////////// get all comments
    getComments               : async (req,res)=>{
        try{
            // const comments = await Comment.aggregate([
            //     { $match  : {postId : new mongoose.Types.ObjectId(req.params.id)}},
            //     { $lookup : {from:'users', localField:'userId', foreignField:'_id', as:'user'}} // name of collection (users) not name of model
            // ])
            const comments = await Comment.find({postId:req.params.id}).populate('userId')
            if(comments.length == 0){
                return res.status(404).send({Message:'No Comments found for this post'})
            }else{
                const newComments = comments.map((el) => {

                    const { firstName, lastName } = el.userId,
                          name                    = `${firstName} ${lastName}`,
                          comment                 = el.comment;
                  
                    return { name, comment };
                  });
               res.status(200).send(newComments)
            }
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
/////////////////////////////////////////////////////////////////////////update comment
    updateComment             : async (req,res)=>{
        try{
            const comment = await Comment.findOne({userId: req.user._id, _id: req.params.id})
            if(!comment){
                return res.status(403).send({Message:'You can only edit your own comment'})
            }
            comment.comment = req.body.comment
            await comment.save()
            res.status(200).send(comment)
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
///////////////////////////////////////////////////////////////////////// delete comment
    deleteComment             : async (req,res)=>{
        try{
            const comment = await Comment.findOne({userId: req.user._id, _id:req.params.id})
            if(!comment){
                return res.status(403).send({Message:'You can only delete your own comment'})
            }
            await Comment.deleteOne(comment)
            res.status(200).send({message:"Comment deleted Successfully"})
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
    getComment                : async (req,res)=>{
        try{
            const comment = await Comment.findById(req.params.id)
            if(!comment){
                return res.status(404).send({message:"Not Found!"})
            }
            res.status(200).send(comment)
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    }
}     
      