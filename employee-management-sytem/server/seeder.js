import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employeeManagementSystem';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@ems.com' });
    if (existingAdmin) {
      console.log('Admin already exists. Exiting seeder.');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new User({
      name: 'System Admin',
        email: 'admin@ems.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('✅ Admin user created:', adminUser.email);

    process.exit();
  } catch (error) {
    console.error('Seeder error:', error);
    process.exit(1);
  }
};

seedAdmin();
