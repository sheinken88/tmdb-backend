const { Users } = require("../models/Users");
const {MovieService} = require("./movieService")

const findUserByEmail = async (email) => {
    return Users.findOne({ where: { email } });
};

const createUser = async (userInfo) => {
    return Users.create(userInfo);
};

const findUserById = async (id) => {
    return Users.findByPk(id);
};


const addFavorite = async (userId, movieId) => {
    const user = await Users.findByPk(userId);
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        return err;
    }

    let favorites = user.favorites;

    if (favorites.some((movie) => movie.id === movieId)) {
        const err = new Error("Movie is already in favorites");
        err.status = 409;
        return err;
    }

    const { data: movie } = await MovieService.getMovie(movieId);
    favorites.push(movie);
    await user.update({ favorites });

    return favorites;
};

const removeFavorite = async (userId, movieId) => {
    const user = await Users.findByPk(userId);
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        return err;
    }

    let favorites = user.favorites;

    if (!favorites.some((movie) => movie.id === movieId)) {
        const err = new Error("Movie is not in favorites");
        err.status = 404;
        return err;
    }

    favorites = favorites.filter((movie) => movie.id !== movieId);
    await user.update({ favorites });

    return favorites;
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
    addFavorite,
    removeFavorite
};
