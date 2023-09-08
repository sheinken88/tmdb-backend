const Users = require("../models/Users");
const MovieService = require("./movieService");
const { Op } = require("sequelize");
const axios = require("axios");
const config = require("../config/index");

const axiosRetry = require("axios-retry");

axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status === 500;
  },
});

const urlAPI = config.URLAPI;
const apiKey = config.APIKEY;

const findUserByEmail = async (email) => {
  return Users.findOne({ where: { email } });
};

const validateUserPassword = async (email, password) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return null;
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return null;
  }

  return user;
};

const createUser = async (userInfo) => {
  try {
    return await Users.create(userInfo);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const findUserById = async (id) => {
  return Users.findByPk(id);
};

const addFavorite = async (userId, movieId) => {
  try {
    const user = await Users.findByPk(userId);
    const movieIdInt = parseInt(movieId);

    if (user.favorites.includes(movieIdInt)) {
      throw new Error("Movie already favorited");
    }

    user.favorites = [...user.favorites, movieIdInt];
    await user.save();

    const response = await axios.get(
      `${urlAPI}/movie/${movieIdInt}?api_key=${apiKey}&language=es-ES`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeFavorite = async (userId, movieId) => {
  try {
    const user = await Users.findByPk(userId);
    const movieIdInt = parseInt(movieId);
    user.favorites = user.favorites.filter((id) => id !== movieId);
    await user.save();

    const updatedFavorites = await Promise.all(
      user.favorites.map(async (favMovieId) => {
        const response = await axios.get(
          `${urlAPI}/movie/${favMovieId}?api_key=${apiKey}&language=es-ES`
        );
        return response.data;
      })
    );
    return updatedFavorites;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFavorites = async (userId) => {
  try {
    const user = await Users.findByPk(userId);
    const favorites = await Promise.all(
      user.favorites.map(async (movieId) => {
        const response = await axios.get(
          `${urlAPI}/movie/${movieId}?api_key=${apiKey}&language=es-ES`
        );
        return response.data;
      })
    );
    return favorites;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  findUserByEmail,
  validateUserPassword,
  createUser,
  findUserById,
  addFavorite,
  removeFavorite,
  getFavorites,
};
