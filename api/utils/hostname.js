const defaultHost = 'https://revisionist.miles.dev';

const hostname = path => `${process.env.HOSTNAME || defaultHost}${path}`;

module.exports = hostname;
