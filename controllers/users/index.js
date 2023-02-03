const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const googleAuth = require('./googleAuth');
const loginWithToken = require('./loginWithToken');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  googleAuth,
  loginWithToken,
};
