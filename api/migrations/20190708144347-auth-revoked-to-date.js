module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('auth', 'revokedAt', Sequelize.DATE),
  down: queryInterface => queryInterface.removeColumn('auth', 'revokedAt'),
};
