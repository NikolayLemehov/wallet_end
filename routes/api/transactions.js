const express = require("express");

const { validation, auth } = require("../../middlewares");
const ctrl = require("../../controllers").transactions;

const { transactions } = require("../../models");
const {validationQuery} = require("../../middlewares/index.js");

const router = express.Router();

router.get("/", auth, ctrl.getAll);

router.post("/", auth, validation(transactions.addTransJoiSchema), ctrl.add);

router.get("/statistic", auth, validationQuery(transactions.getStatisticJoiSchema), ctrl.getStatistic);

module.exports = router;
