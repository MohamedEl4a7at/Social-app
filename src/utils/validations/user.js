const User                 = require('../../models/user'),
      bcryptjs             = require('bcryptjs');

module.exports             = {
    login                  : async (email,password)=>{
        const user         = await User.findOne({ email })
        if(!user){
            throw new Error('Please check email or password')
        }else{
            const isMatch  = await bcryptjs.compare(password,user.password)
            if(!isMatch){
                throw new Error('Please check email or password')
            }else{
                return user;
            }
        }
    }
}