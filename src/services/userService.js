import apiClient from './axios';

export default {
  getUsers(page) {
    return apiClient.get(`/users?page=${page}`);
  },
  getUser(id) {
    return apiClient.get(`/users/${id}`);
  },
  createUser(user) {
    return apiClient.post('/users', user);
  },
  updateUser(id, user) {
    return apiClient.put(`/users/${id}`, user);
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`);
  }
};
