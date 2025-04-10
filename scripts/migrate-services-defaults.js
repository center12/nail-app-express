require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Service = require('../models/service');
const Category = require('../models/category');

// Read the services data
const servicesPath = path.join(__dirname, '../data/services.json');
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

// Migrate the services data
async function migrateServices(services) {
  const migratedServices = [];

  for (const service of services) {
    try {
      // Find or create category
      let category = await Category.findOne({ name: service.category.name });
      
      if (!category) {
        category = await Category.create({
          name: service.category.name,
          description: service.category.description || '',
          order: service.category.order || 0
        });
      }

      // Create service with category reference
      const migratedService = await Service.create({
        name: service.name,
        price: service.price || '0',
        description: service.description || '',
        category: category._id,
        order: service.order || 0
      });

      migratedServices.push(migratedService);
    } catch (error) {
      console.error(`Error migrating service ${service.name}:`, error);
    }
  }

  return migratedServices;
}

// Run migration
async function runMigration() {
  try {
    // Connect to MongoDB and wait for connection
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Connected to MongoDB successfully');
    
    const migratedServices = await migrateServices(servicesData.data);
    console.log(`Successfully migrated ${migratedServices.length} services`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Handle connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

runMigration(); 