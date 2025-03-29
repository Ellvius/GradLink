const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { 
  sequelize, 
  testDatabaseConnection, 
  syncDatabase 
} = require('./config/database');

// Import all models and set up associations
require('./models');  // Ensure models are loaded before DB operations

// Initialize Express App
const app = express();

// Middleware
app.use(helmet()); // Adds security headers
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Import Routes
const userRoutes = require('./routes/userRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
// const eventRoutes = require('./routes/eventRoutes');
// const jobRoutes = require('./routes/jobRoutes');
// const forumRoutes = require('./routes/forumRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// Route Mounting
app.use('/api/users', userRoutes);
app.use('/api/alumni', alumniRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/forums', forumRoutes);
// app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await testDatabaseConnection();
    
    await syncDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
