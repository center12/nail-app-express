require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Drink = require('../models/drink');
const Category = require('../models/category');

// Read the drinks data
const drinksPath = path.join(__dirname, '../data/drinks.json');
const drinksData = JSON.parse(fs.readFileSync(drinksPath, 'utf8'));

// Migrate the drinks data
async function migrateDrinks(drinks) {
  const migratedDrinks = [];

  for (const drink of drinks) {
    try {
      if(!drink.category) {
        continue;
      }
      // Find or create category
      let category = await Category.findOne({ name: drink.category.name });
      
      if (!category) {
        category = await Category.create({
          name: drink.category.name,
          description: drink.category.description || '',
          order: drink.category.order || 0
        });
      }

      // Create drink with category reference
      const migratedDrink = await Drink.create({
        name: drink.name,
        price: drink.price || '12.99',
        description: drink.description || 'A delicious beverage',
        category: category._id,
        order: drink.order || 999
      });

      migratedDrinks.push(migratedDrink);
    } catch (error) {
      console.error(`Error migrating drink ${drink.name}:`, error);
    }
  }

  return migratedDrinks;
}

// Run migration
async function runMigration() {
  try {
    // Connect to MongoDB and wait for connection
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Connected to MongoDB successfully');
    
    const migratedDrinks = await migrateDrinks(drinksData.data);
    console.log(`Successfully migrated ${migratedDrinks.length} drinks`);
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