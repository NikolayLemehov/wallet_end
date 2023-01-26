const express = require("express");

const { validation, auth } = require("../../middlewares");
const ctrl = require("../../controllers").transactions;

const { transactions } = require("../../models");

const router = express.Router();

router.get("/", auth, ctrl.getAll);

router.post("/", auth, validation(transactions.addTransJoiSchema), ctrl.add);

router.get("/categories", auth);

router.get("/statistic", auth, ctrl.getStatistic);

module.exports = router;
