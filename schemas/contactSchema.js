const Joi=require('joi')

const contactSchema = Joi.object({
    name: Joi.string().min(8).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().min(7).max(15).required(),
  });

module.exports = contactSchema;