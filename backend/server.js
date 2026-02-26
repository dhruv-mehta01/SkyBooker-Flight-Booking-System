const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Enhanced Realistic Flight Data
const flights = [
    {
        id: 1,
        from: "New York (JFK)",
        to: "London (LHR)",
        price: 45000,
        airline: "British Airways",
        departure: "10:00 PM",
        arrival: "10:15 AM",
        duration: "7h 15m",
        date: "2026-03-15"
    },
    {
        id: 2,
        from: "Dubai (DXB)",
        to: "Mumbai (BOM)",
        price: 18500,
        airline: "Emirates",
        departure: "03:30 PM",
        arrival: "08:10 PM",
        duration: "3h 10m",
        date: "2026-03-20"
    },
    {
        id: 3,
        from: "Delhi (DEL)",
        to: "Singapore (SIN)",
        price: 25000,
        airline: "Singapore Airlines",
        departure: "11:45 PM",
        arrival: "08:00 AM",
        duration: "5h 45m",
        date: "2026-03-10"
    },
    {
        id: 4,
        from: "Paris (CDG)",
        to: "Tokyo (HND)",
        price: 85000,
        airline: "Air France",
        departure: "01:20 PM",
        arrival: "09:30 AM",
        duration: "13h 10m",
        date: "2026-04-05"
    },
    {
        id: 5,
        from: "Ahmedabad (AMD)",
        to: "Toronto (YYZ)",
        price: 95000,
        airline: "Air Canada",
        departure: "04:30 AM",
        arrival: "06:15 PM",
        duration: "24h 15m",
        date: "2026-03-25"
    },
    {
        id: 6,
        from: "Sydney (SYD)",
        to: "Los Angeles (LAX)",
        price: 72000,
        airline: "Qantas",
        departure: "09:50 AM",
        arrival: "06:30 AM",
        duration: "13h 40m",
        date: "2026-05-12"
    },
    {
        id: 7,
        from: "Ahmedabad (AMD)",
        to: "Dubai (DXB)",
        price: 18500,
        airline: "Emirates",
        departure: "10:30 AM",
        arrival: "12:15 PM",
        duration: "3h 15m",
        date: "2026-02-27"
    },
    {
        id: 8,
        from: "Ahmedabad (AMD)",
        to: "Rome (FCO)",
        price: 12000,
        airline: "British Airways",
        departure: "08:00 AM",
        arrival: "11:30 AM",
        duration: "2h 30m",
        date: "2026-02-28"
    },
    {
        id: 9,
        from: "Ahmedabad (AMD)",
        to: "Seoul (ICN)",
        price: 22000,
        airline: "Japan Airlines",
        departure: "02:15 PM",
        arrival: "04:45 PM",
        duration: "2h 30m",
        date: "2026-03-01"
    },
    {
        id: 10,
        from: "Ahmedabad (AMD)",
        to: "Honolulu (HNL)",
        price: 35000,
        airline: "Hawaiian Airlines",
        departure: "09:00 AM",
        arrival: "11:45 AM",
        duration: "5h 45m",
        date: "2026-03-05"
    },
    {
        id: 11,
        from: "Ahmedabad (AMD)",
        to: "Maldives (MLE)",
        price: 28000,
        airline: "Vistara",
        departure: "11:20 AM",
        arrival: "01:30 PM",
        duration: "2h 40m",
        date: "2026-02-28"
    },
    {
        id: 12,
        from: "Ahmedabad (AMD)",
        to: "Cancun (CUN)",
        price: 19500,
        airline: "Delta",
        departure: "07:30 AM",
        arrival: "10:45 AM",
        duration: "4h 15m",
        date: "2026-03-02"
    }
];

// In-memory Data Storage
let bookings = [];
let users = [];

// Middleware for simulating network latency
app.use((req, res, next) => {
    setTimeout(next, 500); // 500ms artificial delay to show UI skeleton/spinners
});

// GET all flights
app.get("/flights", (req, res) => {
    try {
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching flights" });
    }
});

// POST Book flight
app.post("/book", (req, res) => {
    try {
        const { name, email, flightId, seat, totalPrice } = req.body;

        if (!name || !email || !flightId) {
            return res.status(400).json({ message: "Missing required booking details" });
        }

        const flight = flights.find(f => f.id === parseInt(flightId));
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        const booking = {
            bookingId: Math.floor(100000 + Math.random() * 900000), // Random 6 digit PNR
            name,
            userEmail: email,
            flight,
            seat: seat || "Unassigned",
            totalPrice: totalPrice || flight.price,
            status: "Confirmed",
            createdAt: new Date().toISOString()
        };

        bookings.push(booking);

        res.status(201).json({
            message: "Flight booked successfully",
            booking: booking
        });
    } catch (error) {
        res.status(500).json({ message: "Error processing booking" });
    }
});

// GET user bookings
app.get("/bookings", (req, res) => {
    const { email } = req.query;
    if (email) {
        const userBookings = bookings.filter(b => b.userEmail === email);
        return res.status(200).json(userBookings);
    }
    res.status(200).json(bookings);
});

// POST Signup
app.post("/signup", (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password
        };

        users.push(newUser);

        res.status(201).json({
            message: "Account created successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during registration" });
    }
});

// POST Login
app.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SkyBooker Backend running on http://localhost:${PORT}`);
});