// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    console.log("main.js loaded");

    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {

        searchBtn.addEventListener("click", function () {

            console.log("Search button clicked");

            const fromInput = document.getElementById("from").value.toLowerCase();
            const toInput = document.getElementById("to").value.toLowerCase();
            const dateInput = document.getElementById("date").value;

            fetch("http://localhost:3000/flights")

                .then(response => response.json())

                .then(data => {

                    console.log("Flights received:", data);

                    const flightsDiv = document.getElementById("flights");

                    flightsDiv.innerHTML = "";

                    const filteredFlights = data.filter(flight => {

                        return (
                            (fromInput === "" || flight.from.toLowerCase().includes(fromInput)) &&
                            (toInput === "" || flight.to.toLowerCase().includes(toInput)) &&
                            (dateInput === "" || flight.date === dateInput)
                        );

                    });

                    if (filteredFlights.length === 0) {

                        flightsDiv.innerHTML = "<h3>No flights found</h3>";
                        return;

                    }

                    flightsDiv.innerHTML = "<h2>Available Flights</h2>";

                    filteredFlights.forEach(flight => {

                        flightsDiv.innerHTML += `
                        
                        <div class="flight-card">

                            <div class="flight-top">

                                <div class="airline">
                                    <img src="https://img.icons8.com/color/48/airplane-take-off.png"/>
                                    <div>
                                        <h3>${flight.airline}</h3>
                                        <p>${flight.duration}</p>
                                    </div>
                                </div>

                                <div class="price">
                                    ₹${flight.price}
                                </div>

                            </div>

                            <div class="flight-middle">

                                <div class="city">
                                    <h2>${flight.from}</h2>
                                    <p>${flight.departure}</p>
                                    <p>${flight.date}</p>
                                </div>

                                <div class="timeline">
                                    ✈────────✈
                                </div>

                                <div class="city">
                                    <h2>${flight.to}</h2>
                                    <p>${flight.arrival}</p>
                                    <p>Arrival</p>
                                </div>

                            </div>

                            <div class="flight-bottom">

                                <button onclick="bookFlight(${flight.id})">
                                    Book Ticket
                                </button>

                            </div>

                        </div>
                        
                        `;

                    });

                })

                .catch(error => {

                    console.log("ERROR:", error);

                });

        });

    }

});


// Book Flight → Redirect to Payment Page
function bookFlight(id) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("Please login first");
        window.location.href = "login.html";
        return;

    }

    fetch("http://localhost:3000/flights")

        .then(res => res.json())

        .then(data => {

            const selectedFlight = data.find(f => f.id === id);

            localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));

            window.location.href = "payment.html";

        });

}


// Logout function
function logout() {

    localStorage.removeItem("user");

    alert("Logged out successfully");

    window.location.href = "index.html";

}