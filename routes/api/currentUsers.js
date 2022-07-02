const express = require("express");

const router = express.Router();

const { auth, ctrlWrapper,validation } = require("../../middlewares");

const { currentUser: ctrl } = require("../../controllers");

const {verifyJoiSchema}=require('../../models/user')

router.get('/', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post('/verify', validation(verifyJoiSchema), ctrlWrapper(ctrl.verify));

module.exports = router;