const express = require('express');
const contacts = require('../../models/index');
const { ValidationError, createError } = require('../../errors');
const router = express.Router();
const validation=require('../../middlewares/validation');
const contactSchema=require('../../schemas/contactSchema');
const validationMiddleware=validation(contactSchema);

router.get('/', async (req, res, next) => {
  try{
    const allContacts= await contacts.listContacts();
    res.json({ 
      status: 'success',
      code:200,
      data:{
      result: allContacts,
      },
     });
  }catch(e){
    next(e);
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const {id}=req.params;
    const contact=await contacts.getContactById(id);
    if(!contact){
      throw createError(404,"Not found")
    }
    res.json({ 
      status: 'success',
      code:200,
      data:{
      result: contact,
      },
     });
}catch(e){
  next(e);
}
});

router.post("/", validationMiddleware, async (req, res, next) => {
  try {
    const newContact = await contacts.addContact(req.data);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    const {id}=req.params;
    const removeContact=await contacts.removeContact(id);
    if(!removeContact){
      throw createError(404,"Not found")
    }
    res.json({ 
      status: 'success',
      code:200,
      message:'contact deleted',
      data:{
      result: removeContact,
      },
     });
}catch(e){
  next(e);
};
})

router.put('/:id',validationMiddleware, async (req, res, next) => {
  try{
    const {id}=req.params;
    const result=await contacts.updateContact(id,req.data);
    if (!result){
      throw createError(404, 'Not found');
    }
    res.json({
      status:"success",
      code:200,
      data:{
        result,
      },
    });
  }catch(e){
    next(e);
  }
});

module.exports = router


