const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./getCurrent");
const { register } = require("./register");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
