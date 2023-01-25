const { Category: GetAll } = require("../../models");
const { ctrlWrapper } = require("../../middlewares");

const getAll = async (req, res, next) => {
  try {
    const result = await GetAll.getAll();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = ctrlWrapper(getAll);
