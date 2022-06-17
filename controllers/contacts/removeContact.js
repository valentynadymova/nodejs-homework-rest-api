const { createError } = require('../../errors');
const {Contact}=require('../../models/contact');

const removeContact=async(req,res,next)=>{
    try{
        const{id}=req.params;
        const deleteContact= await Contact.findByIdAndRemove(id);
        if(!deleteContact){
            throw createError(404, "Not founf")
        }
        res.json({
            status:'success',
            code:200,
            message:'contact deleted',
            data:{
                result: deleteContact,
            },
        });
    }catch(error){
        next(error);
    }
}

module.exports=removeContact;
