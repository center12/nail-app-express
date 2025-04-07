const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const intakeFormRoutes = require('./routes/intakeForm');
const subscriptionRoutes = require('./routes/subscription');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/intake-forms', intakeFormRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Nail App API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 