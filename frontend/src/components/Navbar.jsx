import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Activity, LogOut, User as UserIcon } from 'lucide-react';

/**
 * Top navigation bar providing brand identity, active session status, and navigation controls.
 *
 * @returns {JSX.Element} The rendered navigation element.
 */
export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * Formats role identifiers into human-friendly badge labels.
   *
   * @param {string} role - Raw system role string.
   * @returns {string} Formatted label.
   */
  const formatRole = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Administrator';
      case 'ROLE_DOCTOR':
        return 'Doctor';
      case 'ROLE_PATIENT':
        return 'Patient';
      default:
        return 'User';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition">
          <div className="bg-teal-50 p-2 rounded-lg text-teal-600 border border-teal-100">
            <Activity className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            ClinicMed<span className="text-teal-600">AI</span>
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <UserIcon className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-700">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded-full">
                  {formatRole(user?.role)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 text-sm font-medium text-slate-600 hover:text-red-600 transition px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-teal-600 px-3 py-2 rounded-lg transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition shadow-xs"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
