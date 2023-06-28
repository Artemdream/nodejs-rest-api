const { User } = require("../../models");
const Jimp = require("jimp");

const { ctrlWrapper } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  const avatarURl = path.join("avatars", fileName);

  const image = await Jimp.read(resultUpload);
  image.resize(250, 250);
  await image.writeAsync(resultUpload);
  await User.findByIdAndUpdate(_id, { avatarURl });

  res.json({
    avatarURl,
  });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
