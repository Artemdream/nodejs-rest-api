const express = require("express");
const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../../middlewares");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/users");

const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(subscriptionSchema),
  updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
