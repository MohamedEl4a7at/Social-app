const Post            = require ('../models/post')


module.exports        = {
/////////////////////////////////////////////////////////////////// add post
    addPost           : async (req,res)=>{
        try{
            const post  = new Post({...req.body,userId:req.user._id});
            if(req.file){
                post.image = "http://localhost:3000/uploads/" + req.file.filename
            }
            await post.save();
            res.status(200).send({message:"post uploaded successfully",post})
        }
        catch (err){
            res.status(400).send({"message":err.message})
        }
    },
/////////////////////////////////////////////////////////////////// update post
    editPost          : async (req,res) =>{
        try{
            const post = await Post.findOne({userId: req.user._id, _id: req.params.id})
            if(!post){
                return res.status(403).send({Message:'You can only edit your own post'})
            }
            if(req.file){
                post.image = "http://localhost:3000/uploads/" + req.file.filename;
            }
            if(req.body.description){
                post.description = req.body.description;
            }
            await post.save()
            res.status(200).send({message:post})
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
///////////////////////////////////////////////////////////////////// delete post
    deletePost         : async (req,res)=> {
        try{
            const post = await Post.findOneAndDelete({_id: req.params.id, userId:req.user._id})
            if(!post){
                return res.status(403).send({Message:'You can only delete your own post'})
            }
            res.status(200).send({message:"post deleted successfully!"})
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
//////////////////////////////////////////////////////////////////// get all posts for specefic user (search)
    getAllPosts        : async (req,res)=>{
        try{

        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
/////////////////////////////////////////////////////////////////// get post 
    getPost           : async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            if(!post){
                return res.status(404).send({message:"Not Found!"}) 
            }
            res.status(200).send(post)
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
/////////////////////////////////////////////////////////////////// get timeline 
    getTimeLine        : async (req,res)=>{
        try{
            const friendPosts = await Promise.all(
                req.user.followings.map((id)=>{ return Post.find({})})
            )
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
////////////////////////////////////////////////////////////////// like/disLike Post
    likePost          : async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            if(!post){
                return res.status(404).send("not found")
            }
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    }
}
      