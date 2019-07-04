import Sequelize from 'sequelize';

const { Model } = Sequelize;

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        verificationToken: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
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
        modelName: 'user',
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Task);
    this.hasMany(models.Auth);
  }
}

export default User;
