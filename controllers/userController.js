const { generateToken, validateToken } = require("../utils/tokens");
const { Users } = require("../models/Users");

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.sendStatus(401);
    }

    const { id, email, username, favorites } = user;

    const isValid = await user.validatePassword(req.body.password);

    if (!isValid) {
      return res.sendStatus(401);
    }

    const token = generateToken({
      id,
      username,
      email,
      favorites,
    });

    res.cookie("token", token);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

const signup = async (req, res) => {
  try {
    await Users.create(req.body);
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

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let favorites = user.favorites;

    if (!favorites.some((movie) => movie.id === movieId)) {
      const { data: movie } = await MoviesService.getMovie(movieId);
      favorites.push(movie);
      await user.update({ favorites });

      return res.status(200).send(favorites);
    } else {
      return res.status(409).send("Movie is already in favorites");
    }
  } catch (error) {
    res.status(500).send("Error adding favorite");
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.body.movieId;

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let favorites = user.favorites;

    if (favorites.some((movie) => movie.id === movieId)) {
      favorites = favorites.filter((movie) => movie.id !== movieId);
      await user.update({ favorites });

      return res.status(200).send(favorites);
    } else {
      return res.status(404).send("Movie is not in favorites");
    }
  } catch (error) {
    res.status(500).send("Error removing favorite");
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
};
