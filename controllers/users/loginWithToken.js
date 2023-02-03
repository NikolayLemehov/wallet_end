const { Model: User } = require('../../models').users;
const createError = require('http-errors');
const { ctrlWrapper } = require('../../middlewares/index.js');

const loginWithToken = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });

  if (!user) throw createError(401, `Please refresh the page`);

  const { name, email, balance } = user;

  res.status(200).json({
    user: {
      name,
      email,
      balance,
      token,
    },
    message: `User by id: ${user._id} has been authorized`,
  });
};

module.exports = ctrlWrapper(loginWithToken);
