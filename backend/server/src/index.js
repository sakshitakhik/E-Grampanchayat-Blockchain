const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, connectDB } = require('./config/database');

// Import routes (to be created)
const authRoutes = require('./routes/auth');
const certificateRoutes = require('./routes/certificates');
const complaintRoutes = require('./routes/complaints');
const announcementRoutes = require('./routes/announcements');
const pollRoutes = require('./routes/polls');
const models = require('./models'); // Import models to register them with Sequelize

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/polls', pollRoutes);

app.get('/', (req, res) => {
  res.send('E-Grampanchayat API is running...');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Sync database models
  try {
    // alter: true updates the schema without wiping data
    await sequelize.sync({ alter: true });
    console.log('Database synchronized (alter: true)');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
