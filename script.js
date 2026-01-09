// Form submission handling
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const instructorImage = document.getElementById('instructorImage');

    // Set instructor image
    instructorImage.src = 'instructor.jpg';

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        // Basic validation
        if (!name || !phone) {
            alert('Iltimos, barcha maydonlarni to\'ldiring');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Iltimos, to\'g\'ri telefon raqamini kiriting');
            return;
        }

        // Success message
        alert(`Rahmat, ${name}! Ro'yxatdan o'tganingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.`);

        // Log to console (in production, this would send to a server)
        console.log('Registration submitted:', { name, phone });

        // Reset form
        form.reset();

        // Optional: Send data to server
        // fetch('/api/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, phone })
        // });
    });

    // Smooth scroll for navigation links
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

    // Add scroll animation to course cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        // Auto-format for Uzbekistan phone numbers
        if (value.length > 0 && !value.startsWith('998')) {
            if (value.startsWith('0')) {
                value = '998' + value.substring(1);
            } else if (value.length <= 9) {
                value = '998' + value;
            }
        }

        // Format: +998 XX XXX XX XX
        if (value.length >= 3) {
            let formatted = '+' + value.substring(0, 3);
            if (value.length > 3) {
                formatted += ' ' + value.substring(3, 5);
            }
            if (value.length > 5) {
                formatted += ' ' + value.substring(5, 8);
            }
            if (value.length > 8) {
                formatted += ' ' + value.substring(8, 10);
            }
            if (value.length > 10) {
                formatted += ' ' + value.substring(10, 12);
            }
            e.target.value = formatted;
        }
    });
});
