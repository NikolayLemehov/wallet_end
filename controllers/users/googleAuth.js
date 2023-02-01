const jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../../middlewares/index.js');
const { Model: User } = require('../../models').users;
const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '100h' });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`http://localhost:3000?token=${token}`);
};

module.exports = ctrlWrapper(googleAuth);
