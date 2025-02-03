// Hamburger Menu Toogle
const hamburgerBtn = document.querySelector('#hamburger-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('#sidebar');

// Open sidebar on hamburger click
hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});

// Close sidebar on close button click
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});


// Close sidebar when clicking outside of it
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Smooth Scrolling with Parallax Effect
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent instant jump

        const targetId = link.getAttribute('href').substring(1); // Get section ID
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjust for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.parallax').forEach((element) => {
        let speed = element.getAttribute('data-speed') || 0.5; // Adjust speed per element
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});


document.querySelector(".contact-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Create the success message element
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-popup"); // Add the success popup class
    successMessage.innerHTML = `
        <i class="fa fa-check-circle"></i> Message sent successfully!
    `;

    // Insert the success message into the contact section
    const contactSection = document.querySelector("#contact");
    contactSection.appendChild(successMessage);

    // Show the success message by adding the 'show' class
    setTimeout(() => {
        successMessage.classList.add("show"); // Fade-in the success message
    }, 100); // Slight delay to allow for rendering

    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove(); // Removes the popup after 3 seconds
    }, 3000);

    // Reset the form after successful submission
    event.target.reset();
});
