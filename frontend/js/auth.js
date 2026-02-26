const API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {

    // Login Form Submit
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const btn = loginForm.querySelector("button");
            const originalText = btn.innerHTML;
            btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Signing In...`;
            btn.disabled = true;

            fetch(API + "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        showToast(data.message || "Login successful", "success");
                        localStorage.setItem("user", JSON.stringify(data.user));
                        setTimeout(() => window.location.href = "index.html", 1000);
                    } else {
                        showToast(data.message || "Invalid credentials", "error");
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }
                })
                .catch(err => {
                    showToast("Connection error", "error");
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });
        });
    }

    // Signup Form Submit
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const btn = signupForm.querySelector("button");
            const originalText = btn.innerHTML;
            btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Creating Account...`;
            btn.disabled = true;

            fetch(API + "/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        showToast(data.message || "Account created successfully", "success");
                        setTimeout(() => window.location.href = "login.html", 1500);
                    } else {
                        showToast(data.message || "User already exists", "error");
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }
                })
                .catch(err => {
                    showToast("Connection error", "error");
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });
        });
    }

});

// Global logout exported for UI buttons
window.logout = function () {
    localStorage.removeItem("user");
    showToast("Logged out successfully", "info");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
};