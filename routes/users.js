const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateUser = require("../middleware/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/secret", userController.secret);
router.get("/me", validateUser, userController.me);
router.put("/:userId/addFavorite", validateUser, userController.addToFavorites);
router.put(
  "/:userId/removeFavorite",
  validateUser,
  userController.removeFromFavorites
);
router.get("/:userId/favorites", validateUser, userController.getFavorites);

module.exports = router;
