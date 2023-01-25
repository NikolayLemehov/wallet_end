const express = require("express");
const ctrl = require("../../controllers/transactions");
const { validation, auth, validId } = require("../../middlewares");
const { Transaction, transactionSchema } = require("../../models").transactions;

const router = express.Router();

router.post("/transactions", auth, validation(transactionSchema), ctrl.add);

router.get("/transactions/:id", auth, validId, ctrl.getById);

router.get("/transactions/:id/month", auth, validId, ctrl.getByIdMont);

router.get("/transactions/:id/year", auth, validId, ctrl.ctrl.getByIdYear);

module.exports = router;
