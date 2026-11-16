import { useContext } from 'react';
import { AuthContext } from './authContextDef';

/**
 * Custom hook providing simplified access to authentication context.
 *
 * @returns {Object} Authentication context values and dispatcher functions.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an AuthProvider hierarchy');
  }
  return context;
}
