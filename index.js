require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

// require('./seeds/seed.js');

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const venueRoutes= require('./routes/venue');
app.use('/api/venue', venueRoutes);

const slotRoutes= require('./routes/slot');
app.use('/api/slot', slotRoutes);

const bookingRoutes= require('./routes/booking');
app.use('/api/booking', bookingRoutes);

const transactionRoutes= require('./routes/transaction');
app.use('/api/transaction', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Serving...'));
