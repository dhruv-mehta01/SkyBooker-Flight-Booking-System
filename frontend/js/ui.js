// Global UI Utilities

// Page Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 500);
});

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'bx-info-circle';
    if(type === 'success') icon = 'bx-check-circle';
    if(type === 'error') icon = 'bx-error-circle';

    toast.innerHTML = `<i class='bx ${icon}'></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if(navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Sync User display on load
document.addEventListener("DOMContentLoaded", () => {
    const userDisplay = document.getElementById("userDisplay");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const myBookingsBtn = document.getElementById("myBookingsBtn");

    const userStr = localStorage.getItem("user");
    if(userStr) {
        try {
            const user = JSON.parse(userStr);
            if(userDisplay) userDisplay.innerText = `Welcome, ${user.name}`;
            if(loginBtn) loginBtn.style.display = "none";
            if(logoutBtn) logoutBtn.style.display = "inline-flex";
            if(myBookingsBtn) myBookingsBtn.style.display = "inline-flex";
        } catch(e) {}
    }
});
