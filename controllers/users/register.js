const {Model: User} = require('../../models').users;
const createError = require("http-errors");
const bcrypt = require('bcrypt');
const {ctrlWrapper} = require("../../middlewares/index.js");

const register = async (req, res) => {

  const {email, password} = req.body;
  const existedUser = await User.findOne({email});
  if (existedUser) throw createError(409, `Email in use`);

  const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const user = await User.create({email, password: hashPassword});

  res
    .status(201)
    .json({
      data: {
        id: user._id,
        email: user.email,
        avatarURL: user.avatarURL,
        subscription: user.subscription,
      },
      message: `User by id: ${user._id} has been created`,
    });
};

module.exports = ctrlWrapper(register);
