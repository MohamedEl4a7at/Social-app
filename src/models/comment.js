const mongoose                    = require('mongoose'),
      commentSchema               = new mongoose.Schema({

        userId:     {
            type        : mongoose.Schema.Types.ObjectId,
            required    : true,
        },
        postId:     {
            type        : mongoose.Schema.Types.ObjectId,
            required    : true,
        }, 
        comment:    {
            type      	: String,
            required    : true,
            max         : 500
        }
      },
      {timestamps:true});

module.exports = mongoose.model('Comment',commentSchema)