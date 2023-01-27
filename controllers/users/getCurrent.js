const { ctrlWrapper } = require("../../middlewares/index.js");
const getCurrent = async (req, res) => {
  const { _id, name, balance } = req.user;

  res.status(200).json({
    id: _id,
    name,
    balance,
  });
};

module.exports = ctrlWrapper(getCurrent);
