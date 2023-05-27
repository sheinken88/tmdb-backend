const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validateUser = require("../middleware/auth");


router.post("/signup", usersController.signup);
router.post("/login", usersController.login);


router.get("/me", validateUser, usersController.me);
router.post("/logout", validateUser, usersController.logout);
router.put("/:userId/addFavorite", validateUser, usersController.addToFavorites);
router.put("/:userId/removeFavorite", validateUser, usersController.removeFromFavorites);

module.exports = router;
