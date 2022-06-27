const express = require("express");

const router = express.Router();

const { auth, ctrlWrapper } = require("../../middlewares");

const { currentUser: ctrl } = require("../../controllers");

router.get('/', auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;