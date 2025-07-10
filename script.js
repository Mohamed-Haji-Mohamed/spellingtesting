const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Create and inject nav overlay
const navOverlay = document.createElement("ul");
navOverlay.classList.add("nav-overlay");
navOverlay.innerHTML = navLinks.innerHTML;
document.body.appendChild(navOverlay);

// Toggle menu function
function toggleMenu() {
  navOverlay.classList.toggle("active");
  menuToggle.innerHTML = navOverlay.classList.contains("active") ? "&times;" : "&#9776;";
}

// Event listeners
menuToggle.addEventListener("click", toggleMenu);
navOverlay.addEventListener("click", (e) => {
  if (e.target.tagName === "A") toggleMenu();
});











