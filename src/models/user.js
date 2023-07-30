const mongoose                      = require('mongoose'),
      bcrybtjs                      = require('bcryptjs'),
      jwt                           = require('jsonwebtoken'),
      validator                     = require('validator')

      userSchema                    = new mongoose.Schema({

        firstName:   {
            type        : String,
            required    : true,
            trim        : true,
            minlength   : 3
        },
        lastName:    {
            type        : String,
            required    : true,
            trim        : true,
            minlength   : 5
        }, 
        email:       {
            type      	: String,
            unique    	: true,
            lowercase 	: true,
            required    : true,
            trim        : true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Invalid Email')
                }
            }
        },
        password:    {
            type     	: String,
            required    : true,
            minlength   : 6,
            validate(value){
                let regExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
                if(!regExp.test(value)){
                    throw new Error('Password must include uppercase,lowercase,numbers and speical characters')
                }
            }
        },
        image:      {
            type        : String,
            default     : null
        },
        dateOfBirth:{
            type        : String,
            trim        : true
        },
        gender:     {
            type        : String,
            enum        : ['Male', 'Female'],
        },
        verified:   {
            type        : Boolean,
            default     : false
        },
        followers:  {
            type        : Array,
            default     : []
        },
        followings: {
            type        : Array,
            default     : [],
        }
      },
      {timestamps:true});


userSchema.pre('save', async function(){
    if(this.isModified('password')){
        this.password = await bcrybtjs.hash(this.password,8)
    }
})

userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET)
}


userSchema.methods.toJSON = function(){
    const userObject = this.toObject()
    delete userObject.password
    return userObject;
}


module.exports  = mongoose.model('User',userSchema);