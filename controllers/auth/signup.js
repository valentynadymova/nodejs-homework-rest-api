const {User}=require('../../models/user');
const {createError}=require('../../errors');
const bcrypt=require('bcryptjs');
const gravatar=require('gravatar');


const signUp = async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, `Email ${email} in use`);
    }
    const avatarURL=gravatar.url(email);
    const salt = bcrypt.genSaltSync(10); 
    const hashPassword = bcrypt.hashSync(password, salt);
  
    const result = await User.create({ email, avatarURL, password: hashPassword });
    const { subscription } = result;
  
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: { email, avatarURL, subscription },
      },
    });
  };
  
  module.exports = signUp;