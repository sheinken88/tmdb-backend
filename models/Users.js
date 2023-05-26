const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {
  async hash(plainPassword, salt) {
    return bcrypt.hash(plainPassword, salt);
  }

  async validatePassword(password) {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

Users.init(
  {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
    favorites: {
      type: Sequelize.JSON,
      defaultValue: [],
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

Users.beforeCreate(async (user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  const hash = await user.hash(user.password, user.salt);
  user.password = hash;
});

module.exports = Users;
