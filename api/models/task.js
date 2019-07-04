import Sequelize from 'sequelize';

const { Model } = Sequelize;

class Task extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        startTime: {
          type: DataTypes.DATE,
        },
        duration: {
          type: DataTypes.INTEGER,
        },
        label: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: 'task',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { onDelete: 'CASCADE' });
  }
}

export default Task;
