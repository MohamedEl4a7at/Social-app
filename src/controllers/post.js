const Post            = require ('../models/post')


module.exports        = {
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
    
}
      