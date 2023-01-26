const express = require("express");

const { category } = require("../../controllers");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, category.getAll);

module.exports = router;
