const { Category } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const result = await Category.getAll();
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

module.exports = getAll;
