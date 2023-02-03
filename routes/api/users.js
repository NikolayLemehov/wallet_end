const express = require('express');
const ctrl = require('../../controllers').users;
const { validation, auth, passport } = require('../../middlewares');
const { users } = require('../../models');

const router = express.Router();

router.post('/signup', validation(users.registerJoiSchema), ctrl.register);

router.post('/signin', validation(users.loginJoiSchema), ctrl.login);

router.post('/signin-with-token', ctrl.loginWithToken);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  ctrl.googleAuth,
);

router.post('/signout', auth, ctrl.logout);

router.get('/current', auth, ctrl.getCurrent);

module.exports = router;
