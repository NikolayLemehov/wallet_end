const express = require("express");
const router = express.Router();

const { category } = require("../../controllers");
const { auth } = require("../../middlewares");

router.get("/categories", auth, category.getAll);

module.exports = router;
