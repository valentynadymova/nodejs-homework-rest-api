const {createError}=require('../../errors');
const {User}=require('../../models/user');

const verifyEmail=async(req,res)=>{
    const {verificationToken}=req.params;
    const user= await User.findOne({verificationToken});
    if(!user){
        throw createError(404,'user not found');
    }
    await user.findByIdAndUpdate(user._id,{verify:true,verificationToken:null});

    res.json({
        message:'Verification is successful'
    })

}

module.exports=verifyEmail;
