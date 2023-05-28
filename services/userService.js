const Users = require("../models/Users");
const {MovieService} = require("./movieService")

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
        console.log("Error creating user:", error);
        throw error;  
    }
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
    validateUserPassword,
    createUser,
    findUserById,
    addFavorite,
    removeFavorite
};
