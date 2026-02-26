const API_BASE = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("searchBtn");

    // Swap button logic
    const swapBtn = document.querySelector(".swap-btn");
    if (swapBtn) {
        swapBtn.addEventListener("click", () => {
            const fromInput = document.getElementById("from");
            const toInput = document.getElementById("to");
            const temp = fromInput.value;
            fromInput.value = toInput.value;
            toInput.value = temp;
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {

            const fromInput = document.getElementById("from").value.toLowerCase();
            const toInput = document.getElementById("to").value.toLowerCase();
            const dateInput = document.getElementById("date").value;

            // Basic validation
            if (!fromInput || !toInput || !dateInput) {
                showToast("Please fill all origin, destination and date details", "error");
                return;
            }

            const originalText = searchBtn.innerHTML;
            searchBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Searching...`;
            searchBtn.disabled = true;

            fetch(`${API_BASE}/flights`)
                .then(response => response.json())
                .then(data => {
                    searchBtn.innerHTML = originalText;
                    searchBtn.disabled = false;

                    const flightsDiv = document.getElementById("flights");
                    const resultsSection = document.getElementById("resultsSection");
                    const destinationsPreview = document.getElementById("destinationsPreview");

                    flightsDiv.innerHTML = "";

                    // Hide destinations, show results
                    if (destinationsPreview) destinationsPreview.style.display = "none";
                    resultsSection.style.display = "block";

                    const filteredFlights = data.filter(flight => {
                        // Removing the strict date requirement so all future dates show results
                        // Just match origin and destination
                        return (
                            (fromInput === "" || flight.from.toLowerCase().includes(fromInput)) &&
                            (toInput === "" || flight.to.toLowerCase().includes(toInput))
                        );
                    });

                    // Update UI date to match what the user searched, for visual consistency
                    if (filteredFlights.length > 0 && dateInput) {
                        filteredFlights.forEach(f => f.date = dateInput);
                        localStorage.setItem("searchDate", dateInput);
                    }

                    if (filteredFlights.length === 0) {
                        flightsDiv.innerHTML = `
                            <div class="glass" style="padding: 40px; text-align: center; border-radius: var(--radius-lg);">
                                <i class='bx bx-search-alt text-gradient' style="font-size: 4rem; margin-bottom: 20px;"></i>
                                <h3>No flights found</h3>
                                <p class="text-muted">Try adjusting your dates or destinations.</p>
                            </div>
                        `;
                        return;
                    }

                    showToast(`Found ${filteredFlights.length} flights!`, "success");

                    filteredFlights.forEach(flight => {
                        flightsDiv.innerHTML += `
                        <div class="flight-card">
                            <div class="flight-airline">
                                <div class="airline-logo">
                                    <i class='bx bxs-plane-alt'></i>
                                </div>
                                <div class="airline-info">
                                    <h3>${flight.airline}</h3>
                                    <p>Flight ${flight.id} • ${flight.duration}</p>
                                </div>
                            </div>

                            <div class="flight-route">
                                <div class="route-point text-right">
                                    <h2 class="route-time">${flight.departure}</h2>
                                    <span class="route-city">${flight.from}</span>
                                </div>
                                
                                <div class="route-line">
                                    <span class="duration">${flight.duration}</span>
                                    <div class="line-visual">
                                        <i class='bx bxs-plane-take-off'></i>
                                    </div>
                                    <span class="text-muted" style="font-size: 0.75rem;">Non-stop</span>
                                </div>
                                
                                <div class="route-point text-left">
                                    <h2 class="route-time">${flight.arrival}</h2>
                                    <span class="route-city">${flight.to}</span>
                                </div>
                            </div>

                            <div class="flight-action">
                                <div class="flight-price">₹${flight.price}</div>
                                <button onclick="bookFlight(${flight.id})" class="btn btn-primary">
                                    Select <i class='bx bx-right-arrow-alt'></i>
                                </button>
                            </div>
                        </div>
                        `;
                    });

                    // Scroll to results smoothly
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                })
                .catch(error => {
                    searchBtn.innerHTML = originalText;
                    searchBtn.disabled = false;
                    showToast("Failed to connect to server", "error");
                    console.log("ERROR:", error);
                });
        });
    }
});

// Select Flight → Navigate to seat selection or passenger info
function bookFlight(id) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        showToast("Please login first to continue booking", "info");
        setTimeout(() => window.location.href = "login.html", 1500);
        return;
    }

    fetch(`${API_BASE}/flights`)
        .then(res => res.json())
        .then(data => {
            const selectedFlight = data.find(f => f.id === id);

            // Override the flight dummy date with the user's searched date
            const searchDate = localStorage.getItem("searchDate");
            if (searchDate) {
                selectedFlight.date = searchDate;
            }

            localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));

            // Go to passenger info/seat selection page
            // For now, redirect to passenger.html which we will build
            window.location.href = "passenger.html";
        });
}