module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    fullname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    birthofdate: {
      type: Sequelize.STRING
    },
    phonenumber: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};