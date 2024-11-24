const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/taxi_booking'; // Replace with your MongoDB URI
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define the Booking Schema
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
});

// Create a Model
const Booking = mongoose.model('Booking', bookingSchema);

// API Endpoints

// Test Endpoint
app.get('/', (req, res) => {
    res.send('Taxi Booking Backend is Running!');
});

// Create a Booking
app.post('/bookings', async (req, res) => {
    try {
        const { name, email, phone, pickup, destination, date, time } = req.body;

        // Check if a booking already exists with the same pickup, destination, date, and time
        const existingBooking = await Booking.findOne({ pickup, destination, date, time });

        if (existingBooking) {
            return res.status(400).json({ message: 'Booking already exists for the selected date and time.' });
        }

        // If no duplicate is found, create the new booking
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (err) {
        res.status(400).json({ error: 'Error creating booking', details: err.message });
    }
});

// Fetch All Bookings (Optional)
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching bookings', details: err.message });
    }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
