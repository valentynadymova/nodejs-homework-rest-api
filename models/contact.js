const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const schemaCreate = Joi.object({
  name: Joi.string().min(8).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk"] },
    })
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  phone: Joi.string().min(7).max(15).required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.bool(),
});

const favoritePatchSchema = Joi.object({ favorite: Joi.bool() });

const Contact = model("contacts", contactSchema); 

module.exports = { Contact, schemaCreate, favoritePatchSchema };
