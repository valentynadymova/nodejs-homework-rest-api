const {Schema, model}= require('mongoose');
const Joi= require('joi');
const bcrypt=require ('bcryptjs')
const userSchema = Schema(
    {
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
      },
      {versionKey: false, timestamps: true}
);

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password); 
  };
  
  const joiSchema = Joi.object({
    password: Joi.string().min(8).required().messages({
      "any.required": "missing required password field",
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
  });
  
 

const User=model('users', userSchema);

module.exports={User, joiSchema};