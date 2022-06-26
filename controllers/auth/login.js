const { User } = require("../../models/user");
const {createError} = require("../../errors");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
   
    throw createError(401, `Email or password is wrong`);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: { email, subscription: user.subscription },
    },
  });
};

module.exports = logIn;