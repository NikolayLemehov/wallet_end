const jwt = require("jsonwebtoken");
const { Model: User } = require("../../models").users;
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { ctrlWrapper } = require("../../middlewares/index.js");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw createError(401, "Email or password or verification is wrong");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "100h" });

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  const { name, balance } = updatedUser;

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

module.exports = ctrlWrapper(login);
