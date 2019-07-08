const fetchLoginStatus = () => ({
  type: 'UPDATE_USER',
  endpoint: '/api/auth',
});

const logout = () => ({
  type: 'LOGOUT',
  endpoint: '/api/auth',
  options: {
    method: 'DELETE',
  },
});

export { fetchLoginStatus, logout };
