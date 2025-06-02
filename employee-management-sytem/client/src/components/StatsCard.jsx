// src/components/StatsCard.jsx
export default function StatsCard({ title, value, icon }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md w-full sm:w-auto">
        <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
        <div className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mt-1">
          {icon} {value}
        </div>
      </div>
    );
  }
  