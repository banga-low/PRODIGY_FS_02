// src/pages/Dashboard.jsx
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/StatsCard';
import { HiUsers, HiOfficeBuilding, HiUserAdd } from 'react-icons/hi';
import HiresBarChart from '../components/HiresBarChart';
import GenderPieChart from '../components/GenderPieChart';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Top Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="Total Employees" value="120" icon={<HiUsers />} />
          <StatsCard title="Departments" value="6" icon={<HiOfficeBuilding />} />
          <StatsCard title="New Hires (30 days)" value="12" icon={<HiUserAdd />} />
        </div>

        {/* Bottom Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HiresBarChart />
          <GenderPieChart />
        </div>
      </div>
    </DashboardLayout>
  );
}
