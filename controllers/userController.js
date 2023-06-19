const { generateToken, validateToken } = require("../utils/tokens");
const MovieService = require("../services/movieService");
const userService = require("../services/userService");

const login = async (req, res) => {
  try {
    const user = await userService.validateUserPassword(
      req.body.email,
      req.body.password
    );

    if (!user) {
      return res.sendStatus(401);
    }

    const { id, userName, email, favorites } = user;

    const token = generateToken({
      id,
      userName,
      email,
      favorites,
    });

    res.cookie("token", token);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err);
  }
};

const signup = async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

const secret = (req, res) => {
  const { payload } = validateToken(req.cookies.token);
  req.user = payload;
  res.send(payload);
};

const me = (req, res) => {
  res.send(req.user);
};

const addToFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.body.movieId;

    const newFavorites = await userService.addFavorite(userId, movieId);

    if (newFavorites instanceof Error) {
      return res.status(newFavorites.status).send(newFavorites.message);
    }

    return res.status(200).send(newFavorites);
  } catch (error) {
    if (error.message === "Movie already favorited") {
      return res
        .status(400)
        .json({ message: "This movie is already in your favorites list." });
    }
    res.status(500).send("Error adding favorite");
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.body.movieId;

    const newFavorites = await userService.removeFavorite(userId, movieId);

    if (newFavorites instanceof Error) {
      return res.status(newFavorites.status).send(newFavorites.message);
    }

    console.log("newFavorites: ", newFavorites);
    return res.status(200).send(newFavorites);
  } catch (error) {
    res.status(500).send("Error removing favorite");
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favorites = await userService.getFavorites(userId);

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching favorites" });
  }
};

module.exports = {
  login,
  signup,
  logout,
  secret,
  me,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};
