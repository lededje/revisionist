const fetchLoginStatus = () => ({
  type: 'UPDATE_USER',
  endpoint: '/api/auth',
});

export { fetchLoginStatus };
