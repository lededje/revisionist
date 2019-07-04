module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('auth', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    accessToken: {
      type: Sequelize.STRING(48),
      unique: true,
    },
    verificationToken: {
      type: Sequelize.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    },
    expiry: {
      type: Sequelize.DATE,
    },
    ipAddress: {
      type: Sequelize.STRING,
    },
    revoked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    verifiedAt: {
      type: Sequelize.DATE,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('auth'),
};
