const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {
    }
        Course.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A title must be set'
                    },
                    notEmpty: {
                        msg: 'A title must be set'
                    }
                }
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'No description found'
                    },
                    notEmpty: {
                        msg: 'No description found'
                    }
                }
            },
            estimatedTime: {
                type: Sequelize.STRING
            },
            materialsNeeded: {
                type: Sequelize.STRING
            }
        }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };
  return Course;
};