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