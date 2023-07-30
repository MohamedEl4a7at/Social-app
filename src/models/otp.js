const mongoose                  = require('mongoose'),

      otpSchema                 = new mongoose.Schema({
        userId:{
            type        : mongoose.Schema.ObjectId,
            require     : true,
        },
        otp:{
            type        : String,
            required    : true,
        },
        createdAt:{
            type        : Date,
            default     : Date.now(),
            expires     : 3600
        }

    },{timestamps:true});
    module.exports              =   mongoose.model("OTP",otpSchema);