// Initialize AOS
AOS.init({ duration: 800, once: true });

// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('sticky', window.scrollY > 50);
});

// Mobile Menu
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
        spans.forEach(span => span.style.transform = 'none');
        spans[1].style.opacity = '1';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            hamburger.querySelectorAll('span').forEach(span => span.style.transform = 'none');
            hamburger.querySelectorAll('span')[1].style.opacity = '1';
        }
    });
});

// Booking Form Validation
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    const bookButton = document.getElementById('bookButton');
    const bookSpinner = document.getElementById('bookSpinner');
    const pickupInput = document.getElementById('pickup');
    const destinationInput = document.getElementById('destination');
    const dateTimeInput = document.getElementById('dateTime');
    const pickupError = document.getElementById('pickupError');
    const destinationError = document.getElementById('destinationError');
    const dateTimeError = document.getElementById('dateTimeError');

    // Set min date to today (Indian timezone)
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    dateTimeInput.min = today.toISOString().slice(0, 16);

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        [pickupError, destinationError, dateTimeError].forEach(el => el.textContent = '');
        [pickupInput, destinationInput, dateTimeInput].forEach(input => input.parentElement.style.borderColor = '#e0e0e0');

        if (!pickupInput.value.trim()) {
            pickupError.textContent = 'Please enter pickup (e.g., Connaught Place, Delhi)';
            pickupInput.parentElement.style.borderColor = '#666666';
            isValid = false;
        }

        if (!destinationInput.value.trim()) {
            destinationError.textContent = 'Please enter destination (e.g., Mumbai Airport)';
            destinationInput.parentElement.style.borderColor = '#666666';
            isValid = false;
        }

        if (!dateTimeInput.value) {
            dateTimeError.textContent = 'Please select date/time';
            dateTimeInput.parentElement.style.borderColor = '#666666';
            isValid = false;
        }

        if (isValid) {
            bookButton.disabled = true;
            bookButton.querySelector('.button-text').style.display = 'none';
            bookSpinner.style.display = 'block';

            setTimeout(() => {
                bookSpinner.style.display = 'none';
                bookButton.querySelector('.button-text').style.display = 'inline';
                bookButton.disabled = false;
                alert('Ride booked! Fare: ₹245. Driver will arrive in 10 minutes.');
                bookingForm.reset();
            }, 1500);
        }
    });
}

// Price Estimates (INR)
const priceButtons = document.querySelectorAll('.btn-price');
const priceEstimates = {
    'TRIVER Go': '₹150 - ₹300',
    'TRIVER Premium': '₹400 - ₹800',
    'TRIVER Bike': '₹80 - ₹150',
    'TRIVER XL': '₹300 - ₹600'
};
priceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const title = button.closest('.category-card, .service-card').querySelector('h3').textContent;
        alert(`Estimated ${title} Fare: ${priceEstimates[title] || 'N/A'}`);
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        const icon = item.querySelector('.fa-chevron-down');
        icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
    });
});

// City Filter
const cityFilter = document.getElementById('cityFilter');
if (cityFilter) {
    cityFilter.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.city-card').forEach(card => {
            const city = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = city.includes(term) ? 'block' : 'none';
        });
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! TRIVER India will respond within 24 hours. Toll-free: +91 1800 123 4567');
        contactForm.reset();
    });
}