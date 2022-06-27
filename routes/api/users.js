const express= require('express');

const router=express.Router();

const {auth, ctrlWrapper, validation}= require('../../middlewares');
const {joiSchema}=require('../../models/user');
const {users:ctrl}=require('../../controllers')


router.post('/signup', validation(joiSchema), ctrlWrapper(ctrl.signUp));

router.post('/login', validation(joiSchema), ctrlWrapper(ctrl.logIn));

router.get('/logout', auth, ctrlWrapper(ctrl.logOut));




module.exports=router;

