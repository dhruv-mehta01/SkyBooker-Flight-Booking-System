const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// Flight data
const flights = [

{
id: 1,
from: "Ahmedabad",
to: "Delhi",
price: 5000,
airline: "SkyBooker Airways",
departure: "10:00 AM",
arrival: "12:15 PM",
duration: "2h 15m",
date: "2026-02-27"
},

{
id: 2,
from: "Mumbai",
to: "Bangalore",
price: 4500,
airline: "IndiGo",
departure: "1:30 PM",
arrival: "03:20 PM",
duration: "1h 50m",
date: "2026-02-27"
},

{
id: 3,
from: "Delhi",
to: "Chennai",
price: 6000,
airline: "Air India",
departure: "6:45 PM",
arrival: "09:25 PM",
duration: "2h 40m",
date: "2026-02-27"
}

];


// Booking storage
let bookings = [];
let users = [];

// Get all flights
app.get("/flights", (req, res) => {

    res.json(flights);

});


// Book flight
app.post("/book", (req, res) => {

    const { name, flightId } = req.body;

    const flight = flights.find(f => f.id === flightId);

    if(!flight){

        return res.status(404).json({
            message: "Flight not found"
        });

    }
    const booking = {
    bookingId: bookings.length + 1,
    name,
    flight,
    userEmail: req.body.email
};

    bookings.push(booking);

    res.json({

        message: "Flight booked successfully",
        booking: booking

    });

});


// Get bookings
app.get("/bookings", (req, res) => {

    res.json(bookings);

});

// Signup
app.post("/signup", (req, res) => {

    const { name, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);

    if(existingUser){

        return res.json({
            message: "User already exists"
        });

    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);

    res.json({
        message: "Signup successful",
        user: newUser
    });

});

// Login
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if(!user){

        return res.json({
            message: "Invalid credentials"
        });

    }

    res.json({
        message: "Login successful",
        user: user
    });

});

// Start server
app.listen(3000, () => {

    console.log("Server running on port 3000");

});