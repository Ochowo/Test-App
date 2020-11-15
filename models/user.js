const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      allowNull: {
        args: false,
        msg: 'Please provide a valid email',
      },
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please provide a password',
      },
    },
  }, {
    timestamps: false,
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
  });
  /**
   * compares if the passed arguments are equal
   * @param {string} password
   * @param {object} user
   * @returns {boolean} true or false
   */
  User.prototype.comparePassword = (password, user) => bcrypt.compareSync(password, user.password);
  /**
   * encrypt a user's password
   * @param {string} password
   * @returns {string} hashed password
   *
   */
  User.prototype.encryptPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(6));
  User.beforeCreate((user) => {
    user.password = user.encryptPassword(user.password);
  });
  return User;
};
