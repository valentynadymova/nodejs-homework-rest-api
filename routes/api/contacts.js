const express = require("express");

const router = express.Router();

const validation = require("../../middlewares/validation");
const {schemaCreate, favoritePatchSchema } = require("../../models/contact");
const validateMiddleware = validation(schemaCreate);
const idValidation=require('../../middlewares/idValidation')

const {
  getAll,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:id",idValidation, getById);

router.post("/",validateMiddleware, addContact);

router.delete("/:id", idValidation, removeContact);

router.put("/:id", validateMiddleware, updateContact);

router.patch(
  "/:id/favorite",
  validation(favoritePatchSchema),
  updateContactStatus
);

module.exports = router;
