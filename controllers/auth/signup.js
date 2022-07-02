const {User}=require('../../models/user');
const {createError}=require('../../errors');
const bcrypt=require('bcryptjs');
const gravatar=require('gravatar');
const {v4:uuidv4}=require('uuid');

const {sendEmail}=require('../../helpers')

const signUp = async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, `Email ${email} in use`);
    }
    const avatarURL=gravatar.url(email);
    const salt = bcrypt.genSaltSync(10); 
    const hashPassword = bcrypt.hashSync(password, salt);

    const verificationToken=uuidv4();

  
    const result = await User.create({ email, 
      avatarURL, 
      password: hashPassword, 
      verificationToken });

    const { subscription } = result;

    const mail = {
      to: email,
      subject: "Подтверждения email",
      html: `<a target="_blank" href="https://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };
    await sendEmail(mail); 
  
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: { email, avatarURL, subscription },
      },
    });
  };
  
  module.exports = signUp;