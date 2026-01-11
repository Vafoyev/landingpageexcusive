// Form submission handling
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const instructorImage = document.getElementById('instructorImage');
    const logo = document.getElementById('logo');

    // Set instructor image
    instructorImage.src = 'instructor.jpg';

    // Handle logo - Create placeholder if logo.png doesn't exist
    logo.onerror = function () {
        // Create a simple SVG placeholder
        this.style.display = 'none';
        const logoContainer = this.parentElement;
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 55px;
            height: 55px;
            background: linear-gradient(135deg, #064e3b 0%, #10b981 100%);
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 800;
            font-size: 1.5rem;
            font-family: 'Outfit', sans-serif;
        `;
        placeholder.textContent = 'EA';
        logoContainer.insertBefore(placeholder, this);
    };

    // Add scroll effect to header
    const header = document.querySelector('.header');

    // Initial check
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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

        // TELEGRAM BOT SOZLAMALARI
        // 1. @BotFather dan olgan TOKENni shu yerga qo'ying:
        const BOT_TOKEN = 'SIZNING_BOT_TOKENINGIZ';
        // 2. @userinfobot dan olgan CHAT_ID ni shu yerga qo'ying:
        const CHAT_ID = 'SIZNING_CHAT_ID';

        const message = `Yangi buyurtma! 🚀\n\n👤 Ism: ${name}\n📞 Telefon: ${phone}`;

        // Send to Telegram
        if (BOT_TOKEN !== 'SIZNING_BOT_TOKENINGIZ') {
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            });
        }

        // Netlify Form Submission

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Iltimos, to\'g\'ri telefon raqamini kiriting');
            return;
        }

        // Netlify Form Submission
        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
            .then(() => {
                // Success message
                alert(`Rahmat, ${name}! Ro'yxatdan o'tganingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.`);
                form.reset();
            })
            .catch((error) => {
                alert('Xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
                console.error(error);
            });
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



    // Mobile Floating CTA Logic
    const mobileCta = document.getElementById('mobileCta');
    const registrationSection = document.getElementById('register');

    if (mobileCta && registrationSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const registrationTop = registrationSection.offsetTop - window.innerHeight + 100;

            // Show only after Hero and Hide when reaching Registration Form
            if (scrollPosition > 300 && scrollPosition < registrationTop) {
                mobileCta.classList.add('visible');
            } else {
                mobileCta.classList.remove('visible');
            }
        });
    }
});
