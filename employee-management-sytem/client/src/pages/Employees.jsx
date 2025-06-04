import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AddEmployee from "../components/AddEmployee";
import axios from "axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");
        setEmployees(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleAddClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      let response;
      if (editingEmployee) {
        response = await api.put(`/employees/${editingEmployee._id}`, newEmployee);
        setEmployees(employees.map(emp => 
          emp._id === editingEmployee._id ? response.data : emp
        ));
      } else {
        response = await api.post("/employees", newEmployee);
        setEmployees([...employees, response.data]);
      }
      setShowForm(false);
      setEditingEmployee(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save employee");
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete employee");
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="p-4">Loading employees...</div>
    </DashboardLayout>
  );

  if (error) return (
    <DashboardLayout>
      <div className="p-4 text-red-500">Error: {error}</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">All Employees</h2>
          <button
            onClick={handleAddClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            {showForm ? "Close Form" : "+ Add Employee"}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <AddEmployee
              onAddEmployee={handleAddEmployee}
              onClose={() => {
                setShowForm(false);
                setEditingEmployee(null);
              }}
              employee={editingEmployee}
            />
          </div>
        )}

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
                <tr key={emp._id} className="border-b hover:bg-gray-50">
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
                    <button 
                      onClick={() => handleEditClick(emp)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteEmployee(emp._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {employees.map((emp) => (
            <div key={emp._id} className="bg-white shadow rounded-lg p-4 space-y-1">
              <p><span className="font-semibold">Name:</span> {emp.name}</p>
              <p><span className="font-semibold">Email:</span> {emp.email}</p>
              <p><span className="font-semibold">Phone:</span> {emp.phone}</p>
              <p><span className="font-semibold">Department:</span> {emp.department}</p>
              <p><span className="font-semibold">Role:</span> {emp.role}</p>
              <p><span className="font-semibold">Salary:</span> Ksh {emp.salary}</p>
              <p><span className="font-semibold">Date Hired:</span> {emp.hireDate}</p>
              <p><span className="font-semibold">Gender:</span> {emp.gender}</p>
              <div className="pt-2 space-x-4">
                <button 
                  onClick={() => handleEditClick(emp)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteEmployee(emp._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}