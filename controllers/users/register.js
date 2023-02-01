const { Model: User } = require('../../models').users;
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { ctrlWrapper } = require('../../middlewares/index.js');

const register = async (req, res) => {
  const { email: willEmail, password, name: willName } = req.body;
  const email = willEmail.trim();
  const name = willName.trim();
  const existedUser = await User.findOne({ email });
  if (existedUser)
    throw createError(409, `Email ${email} has been already used.`);

  const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const user = await User.create({ name, email, password: hashPassword });

  res.status(201).json({
    user: {
      id: user._id,
      email: user.email,
      name,
    },
    message: `User by id: ${user._id} has been created`,
  });
};

module.exports = ctrlWrapper(register);
