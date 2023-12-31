const User                = require('../models/user'),
      OTP                 = require('../models/otp'),
      randomstring        = require('randomstring'),
      sendEmail           = require('../services/emails'),
      validations         = require('../utils/validations/user'),
      auth                = require('../middlewares/auth');


module.exports            = {
////////////////////////////////////////////////////////////////////sign up
    addUser               : async(req,res)=>{
        try{
            let user = await User.findOne({email:req.body.email})
            if(user){
                    res.status(409).send({message:"User with given email already exist"})
            }else{
                if(req.body.password !== req.body.confirmPassword){
                    res.status(400).send({message:"Password Does Not Match"})
                }else{
                    user = new User(req.body)
                    await user.save()
                }
                const otp = await new OTP ({
                    userId    :   user._id,
                    otp       :   randomstring.generate({
                        length  : 4,
                        charset : 'numeric'
                    })
                }).save();

                await sendEmail(user.email,"Verify Email",`Your verification OTP is: ${otp.otp}`)
                res.status(200).send({message:'An Email sent to your account please verify',user})
            }

        }
        catch(err){
            res.status(400).send(err.message)
        }
    },
/////////////////////////////////////////////////////////////////////verify otp
    verifyOtp              : async(req,res)=>{
        try{
            const user = await User.findById(req.params.id)
            if(!user){
                res.status(404).send({message:"User Not Found"})
            }else{
                const otp  = await OTP.findOne({
                    userId : user._id,
                    otp    : req.body.otp
                });
                if(!otp){
                    return res.status(401).send("Invalid or Expired otp")
                }else{
                   user.verified = true;
                   await user.save();
                   await OTP.deleteOne({id:otp._id});
                   res.status(200).send({message:"Email verified successfully"});
                }
            }
        }
        catch(err){
             res.status(400).send(err.message)
        }
    },
/////////////////////////////////////////////////////////////////// login
    login                   : async (req,res)=>{
        try{
            const user  = await validations.login(req.body.email,req.body.password)
            if(user.verified == false){
                let otp   = await OTP.findOne({userId:user._id});
                if(!otp){
                    otp     = await new OTP({
                        userId  : user._id,
                        otp     : randomstring.generate({
                            length   :4,
                            charset  :"numeric"
                        })
                    }).save()
                }
                await sendEmail(user.email,"Verify Email",`Your verification OTP is: ${otp.otp}`)
                res.status(200).send({message:'An Email sent to your account please verify',user})
            }else{
                const token = user.generateToken();
                res.status(200).send({user,token})
            }
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
//////////////////////////////////////////////////////////////// add image
    uploadPic               : async (req,res)=>{
        try{
            req.user.image  = "http://localhost:3000/uploads/" + req.file.filename
            await req.user.save() 
            res.status(200).send({message:"image uploaded successfully", user: req.user})
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
//////////////////////////////////////////////////////////////// update
    update                  : async (req,res)=>{
        try {
            const updates = Object.keys(req.body)
            updates.forEach(el=>updates[el] = req.user[el])
            if(req.file)(
                req.user.image = "http://localhost:3000/uploads/" + req.file.filename
            )
            await req.user.save()
            res.status(200).send(req.mom)
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    },
}