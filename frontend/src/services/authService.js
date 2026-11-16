import api from './api';

/**
 * Authentication service handling login and registration network requests.
 */
export const authService = {
  /**
   * Authenticates user credentials against the backend.
   *
   * @param {Object} credentials - User email and raw password.
   * @param {string} credentials.email - Account email address.
   * @param {string} credentials.password - Account password.
   * @returns {Promise<Object>} Authentication response containing the JWT and user profile.
   */
  login: async ({ email, password }) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Registers a new patient account with the clinic backend.
   *
   * @param {Object} userData - Registration payload for the new user.
   * @param {string} userData.firstName - User first name.
   * @param {string} userData.lastName - User last name.
   * @param {string} userData.email - User email address.
   * @param {string} userData.password - User password.
   * @param {string} [userData.phoneNumber] - Optional phone contact.
   * @returns {Promise<Object>} Authentication response containing the JWT and user profile.
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};
