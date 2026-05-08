// Initialize AOS scroll animations
AOS.init({
    duration: 800,
    once: true,
});

// Sticky navbar on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Mobile hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    const spans = hamburger.querySelectorAll('span');
    
    if (navLinks.classList.contains('mobile-active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Booking form validation and loading animation
const bookingForm = document.getElementById('bookingForm');
const bookButton = document.getElementById('bookButton');
const bookSpinner = document.getElementById('bookSpinner');
const pickupInput = document.getElementById('pickup');
const destinationInput = document.getElementById('destination');
const dateTimeInput = document.getElementById('dateTime');
const pickupError = document.getElementById('pickupError');
const destinationError = document.getElementById('destinationError');
const dateTimeError = document.getElementById('dateTimeError');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    [pickupError, destinationError, dateTimeError].forEach(el => el.textContent = '');
    [pickupInput, destinationInput, dateTimeInput].forEach(input => {
        input.parentElement.style.borderColor = '#e0e0e0';
    });

    // Validate fields
    if (!pickupInput.value.trim()) {
        pickupError.textContent = 'Please enter a pickup location';
        pickupInput.parentElement.style.borderColor = '#666666';
        isValid = false;
    }

    if (!destinationInput.value.trim()) {
        destinationError.textContent = 'Please enter a destination';
        destinationInput.parentElement.style.borderColor = '#666666';
        isValid = false;
    }

    if (!dateTimeInput.value) {
        dateTimeError.textContent = 'Please select date and time';
        dateTimeInput.parentElement.style.borderColor = '#666666';
        isValid = false;
    }

    if (isValid) {
        // Show loading state
        bookButton.disabled = true;
        bookButton.querySelector('.button-text').style.display = 'none';
        bookSpinner.style.display = 'block';

        // Simulate API call
        setTimeout(() => {
            bookSpinner.style.display = 'none';
            bookButton.querySelector('.button-text').style.display = 'inline';
            bookButton.disabled = false;
            alert('Ride booked successfully! Your driver will arrive shortly.');
            bookingForm.reset();
        }, 1500);
    }
});

// Price estimate buttons
const priceButtons = document.querySelectorAll('.btn-price');
const priceEstimates = {
    'TRIVER Go': '$8 - $15',
    'TRIVER Premium': '$15 - $30',
    'TRIVER Bike': '$6 - $12',
    'TRIVER XL': '$12 - $25'
};

priceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const categoryTitle = button.closest('.category-card').querySelector('h3').textContent;
        const estimate = priceEstimates[categoryTitle] || 'Estimate not available';
        alert(`Estimated price for ${categoryTitle}: ${estimate}`);
    });
});