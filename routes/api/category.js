const express = require("express");
const router = express.Router();

const { category } = require("../../controllers");
const { auth, ctrlWrapper } = require("../../middlewares");

router.get("/categories", auth, ctrlWrapper(category.getAll));

module.exports = router;
