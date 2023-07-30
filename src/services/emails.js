const nodemailer              = require('nodemailer');

module.exports      = async (email, subject, text)=>{
        try{
            const transporter = nodemailer.createTransport({
                host      : process.env.HOST,
                port      : process.env.MAIL_PORT,
                secure    : false,
                auth      : {
                    user  : process.env.USER,
                    pass  : process.env.PASS
                }
            });

            await transporter.sendMail({
                from      : process.env.USER,
                to        : email,
                subject   : subject,
                text      : text
            })

            console.log('Email Sent Sucessfully');

        } catch (err){
            console.log({message:"Email not sent",err})
            throw new Error(err);
        }
      } 