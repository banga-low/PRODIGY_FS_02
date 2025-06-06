import { useState, useEffect } from "react";

export default function AddEmployee({ onAddEmployee, onClose, employee }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    salary: "",
    hireDate: "",
    gender: "",
  });

  // Pre-fill form when editing an employee
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        role: employee.role,
        salary: employee.salary,
        hireDate: employee.hireDate,
        gender: employee.gender,
      });
    } else {
      // Reset form when adding new employee
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        salary: "",
        hireDate: "",
        gender: "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { 
      ...formData,
      id: employee ? employee.id : Date.now() // Keep existing ID for edits
    };
    
    onAddEmployee(employeeData);
    onClose();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Department Field */}
        <div>
          <label className="block text-sm font-medium">Department</label>
          <select
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select...</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Role Field */}
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Salary Field */}
        <div>
          <label className="block text-sm font-medium">Salary</label>
          <input
            type="number"
            name="salary"
            required
            value={formData.salary}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Hire Date Field */}
        <div>
          <label className="block text-sm font-medium">Date Hired</label>
          <input
            type="date"
            name="hireDate"
            required
            value={formData.hireDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {employee ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}