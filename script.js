// Category Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const infographicCards = document.querySelectorAll('.infographic-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        // Filter cards
        infographicCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Card Click Functionality
infographicCards.forEach(card => {
    card.addEventListener('click', () => {
        // Here you would typically navigate to a detailed page
        // For demo purposes, we'll just show an alert
        const title = card.querySelector('.card-title').textContent;
        alert(`即將查看: ${title}\n\n在實際網站中，這裡會導向詳細頁面。`);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactivity to the hero section
const heroSection = document.querySelector('.hero');
const ctaButton = document.querySelector('.cta-button');

ctaButton.addEventListener('mouseenter', () => {
    ctaButton.style.transform = 'translateY(-3px) scale(1.05)';
});

ctaButton.addEventListener('mouseleave', () => {
    ctaButton.style.transform = 'translateY(-2px) scale(1)';
});