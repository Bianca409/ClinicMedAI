import { useAuth } from '../context/useAuth';
import { Calendar, UserCheck, ShieldCheck, Sparkles, Clock, FileText } from 'lucide-react';

/**
 * Dashboard workspace view displaying authenticated user session status and role guidance.
 *
 * @returns {JSX.Element} Rendered dashboard view.
 */
export default function Dashboard() {
  const { user } = useAuth();

  /**
   * Resolves appropriate banner visual details based on assigned user role.
   *
   * @param {string} role - The role string stored in authentication context.
   * @returns {Object} Style classes and descriptive role title.
   */
  const getRolePresentation = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return {
          title: 'System Administrator',
          description: 'Full administrative access to manage medical staff, shifts, and holiday requests.',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: ShieldCheck,
        };
      case 'ROLE_DOCTOR':
        return {
          title: 'Doctor Portal',
          description: 'Access patient consultations, weekly shift schedules, and virtual prescriptions.',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: UserCheck,
        };
      case 'ROLE_PATIENT':
        return {
          title: 'Patient Portal',
          description: 'Book consultations, consult AI triage recommendations, and inspect medical history.',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
          icon: Sparkles,
        };
      default:
        return {
          title: 'Authenticated Member',
          description: 'Standard clinic portal access.',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
          icon: UserCheck,
        };
    }
  };

  const presentation = getRolePresentation(user?.role);
  const IconComponent = presentation.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center border border-teal-100 shrink-0">
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome, {user?.firstName} {user?.lastName}
                </h1>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${presentation.badgeColor}`}>
                  {presentation.title}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Connected as <span className="font-medium text-slate-700">{user?.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Appointments</h3>
          <p className="text-sm text-slate-500 mt-1">
            Track upcoming visits, handle rescheduling, or manage confirmation workflows.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Schedules & Shifts</h3>
          <p className="text-sm text-slate-500 mt-1">
            Inspect working hours, vacation requests, and doctor coverage calendar.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Medical Records</h3>
          <p className="text-sm text-slate-500 mt-1">
            Access diagnoses, virtual medication schedules, and clinical notes.
          </p>
        </div>
      </div>
    </div>
  );
}
