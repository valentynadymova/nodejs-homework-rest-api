const {User}=require('../../models/user');
const {createError}=require('../../errors');
const bcrypt=require('bcryptjs');

const signUp = async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, `Email ${email} in use`);
    }
    const salt = bcrypt.genSaltSync(10); 
    const hashPassword = bcrypt.hashSync(password, salt);
  
    const result = await User.create({ email, password: hashPassword });
    const { subscription } = result;
  
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: { email, subscription },
      },
    });
  };
  
  module.exports = signUp;