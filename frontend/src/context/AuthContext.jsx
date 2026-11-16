import { useState } from 'react';
import { AuthContext } from './authContextDef';
import { authService } from '../services/authService';

/**
 * Provider component wrapping application tree with authentication state and actions.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child elements requiring access to authentication.
 * @returns {JSX.Element} Provider wrapper.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Failed to parse cached user credentials:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });
  const [loading] = useState(false);

  /**
   * Authenticates user credentials, caches the session token, and updates reactive state.
   *
   * @param {Object} credentials - User credentials payload.
   * @returns {Promise<Object>} The authenticated user profile.
   */
  const login = async (credentials) => {
    const data = await authService.login(credentials);
    const userProfile = {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(userProfile));

    setToken(data.token);
    setUser(userProfile);

    return userProfile;
  };

  /**
   * Registers a new account, persists the issued authentication session, and updates state.
   *
   * @param {Object} userData - User registration attributes.
   * @returns {Promise<Object>} The registered user profile.
   */
  const register = async (userData) => {
    const data = await authService.register(userData);
    const userProfile = {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(userProfile));

    setToken(data.token);
    setUser(userProfile);

    return userProfile;
  };

  /**
   * Purges stored credentials and resets in-memory authentication states.
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
