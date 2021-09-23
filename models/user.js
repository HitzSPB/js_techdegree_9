//users model
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
        User.init({
            id: {
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            emailAddress: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            }         
        }, { sequelize });

        User.associate = (models) => {};
    

    return User;
};