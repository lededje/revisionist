const Sequelize = require('sequelize');

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
          type: DataTypes.STRING(48),
          unique: true,
        },
        verificationToken: {
          type: DataTypes.UUID,
          unique: true,
          defaultValue: Sequelize.UUIDV4,
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
          deprecated: true, // Use revokedAt instead
          defaultValue: false,
        },
        revokedAt: {
          type: DataTypes.DATE,
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
        name: {
          singular: 'auth',
          plural: 'auth',
        },
        freezeTableName: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

module.exports = Auth;
