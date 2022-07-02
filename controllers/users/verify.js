const {createError}=require('../../errors');
const {User}=require('../../models/user');
const {sendEmail}=require('../../helpers');

const verify=async(req,res,next)=>{
    const {email}=req.body;

    const user= await User.findOne({email});

    if(!user){
        throw createError(400, `User with email ${email} not found`);
    }

    if (user.verify){
        throw createError(400, `"Verification has already been passed"`);
    }

    const mail= {
        to:email,
        subject:"Email verification",
        html:`<a target="_blank" href="https://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`
    };
    await sendEmail(mail);
    res.json({
        message:"Verification email sent",
    });

};

module.exports=verify;
