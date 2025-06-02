// src/components/HiresBarChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { department: 'Sales', hires: 10 },
  { department: 'HR', hires: 4 },
  { department: 'IT', hires: 8 },
  { department: 'Finance', hires: 6 },
];

export default function HiresBarChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Hires per Department</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hires" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
