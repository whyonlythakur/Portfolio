document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle with Emoji Change
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-mode");
            themeToggle.innerHTML = "☀️";
            localStorage.setItem("dark-mode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            themeToggle.innerHTML = "🌙";
            localStorage.setItem("dark-mode", "disabled");
        }
    }

    themeToggle.addEventListener("click", () => {
        setTheme(!body.classList.contains("dark-mode"));
    });

    // Load theme preference from localStorage
    setTheme(localStorage.getItem("dark-mode") === "enabled");

    // Page Load Animation
    document.body.classList.add("loaded");

    // Smooth Page Transitions (Only for internal links)
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                let href = this.href;
                document.body.classList.remove("loaded");
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });

    // Search Functionality
    function filterProjects() {
        let searchInput = document.getElementById("searchBox").value.toLowerCase();
        let projects = document.querySelectorAll(".project-card");

        projects.forEach(project => {
            let projectTitle = project.querySelector("h3").innerText.toLowerCase();
            let projectDesc = project.querySelector("p") ? project.querySelector("p").innerText.toLowerCase() : ""; // Handle missing <p> tag

            if (projectTitle.includes(searchInput) || projectDesc.includes(searchInput)) {
                project.style.display = "block"; // Show project
            } else {
                project.style.display = "none"; // Hide project
            }
        });
    }

    document.getElementById("searchBox").addEventListener("keyup", filterProjects);

    // Filter by Category
    function filterCategory(category) {
        let projects = document.querySelectorAll(".project-card");

        projects.forEach(project => {
            let projectCategory = project.getAttribute("data-category");

            if (category === "all" || projectCategory === category) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });
    }

    // Ensure buttons trigger filtering correctly
    let filterButtons = document.querySelectorAll(".filter-buttons button");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            let category = this.innerText.toLowerCase(); // Get category from button text
            if (category === "all") category = "all"; // Adjust case sensitivity
            filterCategory(category);
        });
    });

    // Testimonials Slider
    let index = 0;
    const testimonials = document.querySelectorAll(".testimonial-card");

    function showTestimonial(n) {
        testimonials.forEach((t, i) => {
            t.classList.toggle("active", i === n);
        });
    }

    function nextTestimonial() {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    }

    if (testimonials.length > 0) {
        setInterval(nextTestimonial, 5000);
        showTestimonial(index);
    }

    // Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;
            let status = document.getElementById("form-status");

            if (name && email && message) {
                status.innerHTML = "✅ Message sent successfully!";
                status.style.color = "green";
                this.reset();
            } else {
                status.innerHTML = "❌ Please fill in all fields.";
                status.style.color = "red";
            }
        });
    }
});
