const fetchLoginStatus = () => ({
  type: 'UPDATE_USER',
  endpoint: '/api/auth',
});

const login = email => ({
  type: 'REQUEST_LOGIN',
  endpoint: '/api/auth',
  options: {
    method: 'POST',
    body: { email },
  },
});

const logout = () => ({
  type: 'LOGOUT',
  endpoint: '/api/auth',
  options: {
    method: 'DELETE',
  },
});

export { fetchLoginStatus, login, logout };
