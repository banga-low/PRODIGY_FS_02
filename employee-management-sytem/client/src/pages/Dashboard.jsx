import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import HiresBarChart from "../components/HiresBarChart";
import GenderPieChart from "../components/GenderPieChart";

export default function Overview() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    departments: {},
    newHires: 0,
    genderDistribution: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/employees");
        const employees = response.data;
        
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const departments = {};
        const genderDistribution = {};
        let newHires = 0;

        employees.forEach(emp => {
          departments[emp.department] = (departments[emp.department] || 0) + 1;
          genderDistribution[emp.gender] = (genderDistribution[emp.gender] || 0) + 1;
          
          const hireDate = new Date(emp.hireDate);
          if (hireDate > thirtyDaysAgo) {
            newHires++;
          }
        });

        setStats({
          totalEmployees: employees.length,
          departments,
          newHires,
          genderDistribution
        });

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return (
    <DashboardLayout>
      <div className="p-4">Loading dashboard...</div>
    </DashboardLayout>
  );

  if (error) return (
    <DashboardLayout>
      <div className="p-4 text-red-500">Error: {error}</div>
    </DashboardLayout>
  );

  const departmentChartData = {
    labels: Object.keys(stats.departments),
    datasets: [{
      label: 'Employees',
      data: Object.values(stats.departments),
      backgroundColor: [
        '#3b82f6', // Blue
        '#10b981', // Green
        '#f59e0b', // Amber
        '#ef4444', // Red
        '#8b5cf6', // Purple
        '#ec4899'  // Pink
      ],
      borderColor: '#fff',
      borderWidth: 1
    }]
  };

  const genderChartData = {
    labels: Object.keys(stats.genderDistribution),
    datasets: [{
      label: 'Gender Distribution',
      data: Object.values(stats.genderDistribution),
      backgroundColor: [
        '#3b82f6', // Blue
        '#ec4899', // Pink
        '#10b981'  // Green (for other genders if present)
      ],
      borderColor: '#fff',
      borderWidth: 1
    }]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Employees</h3>
            <p className="text-2xl font-bold">{stats.totalEmployees}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Departments</h3>
            <p className="text-2xl font-bold">{Object.keys(stats.departments).length}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">New Hires (30d)</h3>
            <p className="text-2xl font-bold">{stats.newHires}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Employees by Department</h3>
            <div className="h-64">
              <HiresBarChart data={departmentChartData} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
            <div className="h-64">
              <GenderPieChart data={genderChartData} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}