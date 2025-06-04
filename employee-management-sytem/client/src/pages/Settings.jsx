import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

export default function Settings() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Mock validation (replace with real API calls later)
    setTimeout(() => {
      try {
        // Simulate network delay
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords don't match");
        }
        if (formData.newPassword.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        // In a real app, this would be an API call:
        // await updatePassword(formData.currentPassword, formData.newPassword);
        
        setSuccess("Password updated successfully!");
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (err) {
        setError(err.message || "Failed to update password");
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Simulate network delay
  };

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Change Password</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                'Change Password'
              )}
            </button>
          </form>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">user@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Login:</span>
              <span className="font-medium">Just now</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Created:</span>
              <span className="font-medium">May 15, 2023</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}