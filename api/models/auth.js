import Sequelize from 'sequelize';

const { Model } = Sequelize;

class Auth extends Model {
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
        accessToken: {
          type: DataTypes.STRING,
          unique: true,
        },
        verficationToken: {
          type: DataTypes.STRING,
          unique: true,
        },
        expiry: {
          type: DataTypes.DATE,
        },
        ipAddress: {
          type: DataTypes.STRING,
        },
        verifiedAt: {
          type: DataTypes.DATE,
        },
        revoked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
        modelName: 'auth',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

export default Auth;
