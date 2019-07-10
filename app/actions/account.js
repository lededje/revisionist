const register = ({ name, email }) => ({
  type: 'REGISTER',
  endpoint: '/api/account',
  options: {
    method: 'POST',
    body: { name, email },
  },
});

export { register };
