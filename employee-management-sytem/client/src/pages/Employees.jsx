import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AddEmployeeForm from "../components/AddEmployee";

const employees = [
  {
    id: 1,
    name: "Alice Kimani",
    email: "alice@company.com",
    phone: "0712345678",
    department: "HR",
    role: "HR Manager",
    salary: "80,000",
    hireDate: "2024-05-12",
    gender: "Female",
  },
  {
    id: 2,
    name: "Brian Otieno",
    email: "brian@company.com",
    phone: "0722345678",
    department: "Sales",
    role: "Sales Rep",
    salary: "60,000",
    hireDate: "2024-04-25",
    gender: "Male",
  },
  {
    id: 3,
    name: "Caroline Mwende",
    email: "caroline@company.com",
    phone: "0733456789",
    department: "IT",
    role: "Developer",
    salary: "100,000",
    hireDate: "2024-05-01",
    gender: "Female",
  },
];

export default function Employees() {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">All Employees</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            {showForm ? "Close Form" : "+ Add Employee"}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <AddEmployeeForm />
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Date Hired</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {employees.map((emp, idx) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{emp.name}</td>
                  <td className="px-4 py-3">{emp.email}</td>
                  <td className="px-4 py-3">{emp.phone}</td>
                  <td className="px-4 py-3">{emp.department}</td>
                  <td className="px-4 py-3">{emp.role}</td>
                  <td className="px-4 py-3">Ksh {emp.salary}</td>
                  <td className="px-4 py-3">{emp.hireDate}</td>
                  <td className="px-4 py-3">{emp.gender}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">
          {employees.map((emp) => (
            <div key={emp.id} className="bg-white shadow rounded-lg p-4 space-y-1">
              <p><span className="font-semibold">Name:</span> {emp.name}</p>
              <p><span className="font-semibold">Email:</span> {emp.email}</p>
              <p><span className="font-semibold">Phone:</span> {emp.phone}</p>
              <p><span className="font-semibold">Department:</span> {emp.department}</p>
              <p><span className="font-semibold">Role:</span> {emp.role}</p>
              <p><span className="font-semibold">Salary:</span> Ksh {emp.salary}</p>
              <p><span className="font-semibold">Date Hired:</span> {emp.hireDate}</p>
              <p><span className="font-semibold">Gender:</span> {emp.gender}</p>
              <div className="pt-2 space-x-4">
                <button className="text-blue-600 hover:underline text-sm">Edit</button>
                <button className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
