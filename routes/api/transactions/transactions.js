const express = require('express');
const ctrl = require('../../../controllers/users');
const { validation, auth } = require('../../../middlewares');
const { users } = require('../../../models');

const router = express.Router();

router.post(
  '/transactions',
  validation(users.registerJoiSchema),
  ctrl.register,
);

router.get('/transactions/:id', validation(users.loginJoiSchema), ctrl.login);

router.get('/transactions/:id/month', auth, ctrl.getCurrent);

router.post('/transactions/:id/year', auth, ctrl.logout);

// router.patch('/', auth, validation(users.subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
