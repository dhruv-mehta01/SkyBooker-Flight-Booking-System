// Fetch flights from backend
fetch("http://localhost:3000/flights")
.then(response => response.json())
.then(data => {
    const flightsDiv = document.getElementById("flights");

    data.forEach(flight => {
        const div = document.createElement("div");
        div.className = "flight";

        div.innerHTML = `
            <h3>${flight.from} → ${flight.to}</h3>
            <p>Price: ₹${flight.price}</p>
            <button onclick="bookFlight(${flight.id})">Book</button>
        `;

        flightsDiv.appendChild(div);
    });
});

function bookFlight(flightId) {
    const name = prompt("Enter passenger name:");

    fetch("http://localhost:3000/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            flightId: flightId
        })
    })
    .then(response => response.json())
    .then(data => {

        localStorage.setItem("booking", JSON.stringify(data.booking));

        window.location.href = "ticket.html";
    });
}