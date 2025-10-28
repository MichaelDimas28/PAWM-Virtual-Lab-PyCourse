require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// It's important to use the port assigned by the environment in production
const PORT = process.env.PORT;
if (!PORT) {
  console.error("Error: PORT environment variable is not set. Falling back to 5000, but this may not work in a production environment.");
}
const finalPort = PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

// Start the server
app.listen(finalPort, () => {
  console.log(`Server running on port ${finalPort}`);
});