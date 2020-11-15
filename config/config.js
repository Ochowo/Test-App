require('dotenv').config();

module.exports = {

  development: {
    database: 'app_dev',
    username: 'epic',
    password: 'password',
    host: '127.0.0.1',
    dialect: 'postgres',
  },

  production: {
    use_env_variable: 'DATABASE_URL'
  },
};