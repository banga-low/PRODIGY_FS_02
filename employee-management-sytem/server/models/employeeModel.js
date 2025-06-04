import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  department: String,
  role: String,
  salary: String,
  hireDate: Date,
  gender: String,
});

export default mongoose.model('Employee', employeeSchema);
