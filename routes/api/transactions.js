const express = require('express');
const ctrl = require('../../controllers').transactions;
const { validation, auth, validId } = require('../../middlewares');
const { transactionSchema } = require('../../models').transactions;

const router = express.Router();

router.post('/transactions', auth, validation(transactionSchema), ctrl.add);

router.get('/transactions/:id', auth, validId, ctrl.getById);

// router.get('/transactions/:id/month', auth, validId, ctrl.getByIdMont);

// router.get('/transactions/:id/year', auth, validId, ctrl.getByIdYear);

module.exports = router;
