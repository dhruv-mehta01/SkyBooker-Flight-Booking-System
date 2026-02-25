# SkyBooker – Full Stack Flight Booking System ✈️

SkyBooker is a full-stack flight booking web application built using modern web technologies. It simulates a real-world airline reservation system where users can search flights, authenticate, book tickets, complete payment simulation, and view ticket details.

This project demonstrates strong understanding of full-stack development, REST APIs, frontend-backend integration, authentication flow, and modern UI/UX design.

## Live Project Workflow

User Flow:
Signup → Login → Search Flights → Select Flight → Payment → Ticket Confirmation

## Key Features
Authentication System  
• User signup and login  
• Session handling using LocalStorage  
• Protected booking functionality  

Flight Search System  
• Fetch flights from backend REST API  
• Dynamic rendering using JavaScript  
• Modern flight cards with airline, duration, departure, and price  

Booking System  
• Flight selection and booking flow  
• Booking stored via backend API  
• Ticket confirmation page  

Payment Simulation  
• Payment page with confirmation flow  
• Redirect to ticket page after successful payment  

Modern UI/UX  
• Professional airline-style interface  
• Gradient color scheme  
• Responsive layout  
• Interactive components  

## Tech Stack

Frontend  
• HTML5  
• CSS3  
• JavaScript (ES6)  

Backend  
• Node.js  
• Express.js  

Tools & Concepts  
• REST API  
• Git & GitHub  
• JSON data handling  
• DOM Manipulation  
• LocalStorage authentication  

## System Architecture

Frontend (Client)
Handles:
• UI rendering  
• User interaction  
• API requests  

Backend (Server)
Handles:
• Flight data API  
• Booking API  
• User authentication logic  

Communication:
Frontend ⇄ REST API ⇄ Backend Server

## Project Structure
```
SkyBooker-Flight-Booking-System/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── payment.html
│   ├── ticket.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── auth.js
│   │   └── script.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│
└── README.md
```
## API Endpoints

GET /flights  
Returns list of available flights  

POST /book  
Creates a new booking  

POST /signup  
Registers new user  

POST /login  
Authenticates user  

## How to Run Locally
Step 1 — Clone repository
```
git clone https://github.com/dhruv-mehta01/SkyBooker-Flight-Booking-System.git
cd SkyBooker-Flight-Booking-System
```

Step 2 — Start backend server
```
cd backend
npm install
node server.js
```

Step 3 — Run frontend
Open:
```
frontend/index.html
```

in your browser

---

## Skills Demonstrated

Full Stack Development  
REST API Development  
Frontend-Backend Integration  
Authentication System  
Modern UI Design  
JavaScript DOM Manipulation  
Node.js & Express  

## Future Improvements

• MongoDB database integration  
• JWT authentication  
• Real payment gateway integration  
• Booking history dashboard  
• Admin panel  
• Cloud deployment  

## Project Impact

This project demonstrates real-world full-stack development skills including API design, authentication flow, booking system logic, and modern frontend UI — making it suitable for portfolio, internships, and placement opportunities.

## Author

Dhruv Mehta  
Computer Science Student,
ICT-Ganpat university,Mehsana

GitHub:  
https://github.com/dhruv-mehta01  
