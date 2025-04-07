require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const defaultUser = {
  email: 'tuannt.bn@gmail.com',
  password: 'Ab@12345678',
  name: 'Admin User',
  role: 'admin'
};

async function createDefaultUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: defaultUser.email });
    if (existingUser) {
      console.log('Default user already exists');
      process.exit(0);
    }

    // Create new user
    const user = new User(defaultUser);
    await user.save();

    console.log('Default user created successfully:');
    console.log('Email:', defaultUser.email);
    console.log('Password:', defaultUser.password);
    console.log('Role:', defaultUser.role);

  } catch (error) {
    console.error('Error creating default user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createDefaultUser(); 