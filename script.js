// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const navbar = document.querySelector('.navbar');

// Toggle Navigation
hamburger.addEventListener('click', () => {
    // Toggle Navigation
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
    document.body.classList.toggle('nav-open');
    
    // Animate Links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('nav-active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
        hamburger.click();
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('nav-active')) {
                hamburger.click();
            }
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background on scroll
    if (currentScroll > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        alert('There was an error sending your message. Please try again later.');
    }
});

// Add animation to skill items
const skillItems = document.querySelectorAll('.skill-item');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

skillItems.forEach(item => {
    observer.observe(item);
});

// Add CSS for enhanced navigation
const style = document.createElement('style');
style.textContent = `
    body.nav-open {
        overflow: hidden;
    }

    .navbar {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .navbar.nav-hidden {
        transform: translateY(-100%);
    }

    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .skill-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }

    .skill-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style); 