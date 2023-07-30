const mongoose                    = require('mongoose'),
      postSchema                  = new mongoose.Schema({

        userId:            {
            type        : mongoose.Schema.Types.ObjectId,
            required    : true,
        },
        description:       {
            type      	: String,
            required    : true,
            max         : 500
        },
        likes:             {
            type        : Array,
            default     : []
        },
        image:             {
            type        : String,
            default     : null
        }
      },
      {timestamps:true});

module.exports = mongoose.model('Post',postSchema)