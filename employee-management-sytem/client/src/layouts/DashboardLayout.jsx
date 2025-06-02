// src/layouts/DashboardLayout.jsx
import { NavLink } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-6 space-y-4 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLink : link}>Overview</NavLink>
          <NavLink to="/employees" className={({ isActive }) => isActive ? activeLink : link}>Employees</NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? activeLink : link}>Settings</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

const link = 'text-gray-700 dark:text-gray-300 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700';
const activeLink = 'bg-blue-600 text-white px-3 py-2 rounded';
