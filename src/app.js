const express                 = require('express'),
      app                     = express(),
      port                    = process.env.PORT || 3000,
      cors                    = require('cors'),
      userRouter              = require('./routers/user'),
      path                    = require('path'),
      publicDirectory         = path.join(__dirname,'../public'),
      postRouter              = require('./routers/post'),
      commentRouter           = require('./routers/comment')



require('dotenv').config()
require('./config/mongoose')
app.use(express.json(),cors(),userRouter,postRouter,commentRouter,express.static(publicDirectory))

app.listen(port,()=>console.log('Server is running'))