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


// document.querySelector(".contact-form").addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent form submission

//     // Create the success message element
//     const successMessage = document.createElement("div");
//     successMessage.classList.add("success-popup"); // Add the success popup class
//     successMessage.innerHTML = `
//         <i class="fa fa-check-circle"></i> Message sent successfully!
//     `;

//     // Insert the success message into the contact section
//     const contactSection = document.querySelector("#contact");
//     contactSection.appendChild(successMessage);

//     // Show the success message by adding the 'show' class
//     setTimeout(() => {
//         successMessage.classList.add("show"); // Fade-in the success message
//     }, 100); // Slight delay to allow for rendering

//     // Remove success message after 3 seconds
//     setTimeout(() => {
//         successMessage.remove(); // Removes the popup after 3 seconds
//     }, 3000);

//     // Reset the form after successful submission
//     event.target.reset();
// });



// document.querySelector(".contact-form").addEventListener("submit", async (e) => {
//     e.preventDefault();
  
//     const formData = {
//       name: document.getElementById("name").value,
//       email: document.getElementById("email").value,
//       message: document.getElementById("message").value,
//     };
  
//     const response = await fetch("https://d8csi9nxy0.execute-api.us-west-1.amazonaws.com/dev", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });
  
//     const data = await response.json();
//     alert(data.message);
//   });
  

document.querySelector(".contact-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("https://16ejwbl257.execute-api.us-west-1.amazonaws.com/prod/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data); 

        if (response.ok && data.message && data.message === "Email sent successfully!") {
            showSuccessMessage("Message sent successfully!");
            e.target.reset();
        } else {
            const errorMsg = data.error || "Failed to send message. Please try again.";
            showErrorMessage(errorMsg);
        }
        
    } catch (error) {
        console.error("Error:", error);
        showErrorMessage("An error occurred. Check your connection.");
    }
});

// Function to show a success message popup
function showSuccessMessage(message) {
    showPopupMessage(message, "success-popup", "fa-check-circle");
}

// Function to show an error message popup
function showErrorMessage(message) {
    showPopupMessage(message, "error-popup", "fa-exclamation-circle");
}

// Generic function to create and display popups
function showPopupMessage(message, className, iconClass) {
    const popup = document.createElement("div");
    popup.classList.add(className);
    popup.innerHTML = `<i class="fa ${iconClass}"></i> ${message}`;

    const contactSection = document.querySelector("#contact");
    contactSection.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("show");
    }, 100);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}
