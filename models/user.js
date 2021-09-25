// Inspiration from https://sequelize.org/master/manual/validations-and-constraints.html
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    class User extends Sequelize.Model {
    }
        User.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Enter a name of the user'
                    },
                    notEmpty: {
                        msg: 'Enter a name of the user'
                    }
                }
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,                
                validate: {
                    notNull: {
                        msg: 'Enter a last name of the user.'
                    },
                    notEmpty: {
                        msg: 'Enter a last name of the user.'
                    }
                }
            },
            emailAddress: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: "Enter a valid email address",
                      },
                    notNull: {
                        msg: 'Enter a valid email'
                    },
                    notEmpty: {
                        msg: 'Enter a valid email'
                    }
                },
                unique: {
                    args: true,
                    msg: 'Email already exist'
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'You must enter a password'
                    },
                    notEmpty: {
                        msg: 'You must enter a password'
                    }
                },
            }         
        }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };

  return User;
};
