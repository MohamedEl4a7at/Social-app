const jwt               = require('jsonwebtoken'),
      User              = require('../models/user');


module.exports = async (req,res,next)=>{
    try{
        const token    = req.header('Authorization').replace('Bearer ',''),
        decode         = jwt.verify(token,process.env.JWT_SECRET),
        user           = await User.findById({_id:decode._id});
        req.user       = user
        next();
    }
    catch(err){
        res.status(401).send({error:'Please Authenticate'})
    }
}