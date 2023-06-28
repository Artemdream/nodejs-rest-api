const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURl,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
