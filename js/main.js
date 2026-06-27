/**
 * UNISWA Custom Javascript
 * Handles animations, gallery switching, and WhatsApp form redirects
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Scroll animations using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => animationObserver.observe(el));

    // 2. Change navbar styling on scroll
    const navbar = document.querySelector('.navbar-uniswa');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.classList.remove('shadow-sm');
                navbar.style.padding = '0.8rem 0';
            }
        });
    }

    // 3. Product Gallery switching
    const thumbnails = document.querySelectorAll('.gallery-thumb');
    const mainImage = document.getElementById('main-gallery-img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image source and alt text
                const newSrc = this.getAttribute('data-large-src');
                const newAlt = this.querySelector('img').getAttribute('alt');
                mainImage.setAttribute('src', newSrc);
                mainImage.setAttribute('alt', newAlt);
            });
        });
    }

    // 4. WhatsApp inquiry and contact redirect
    const inquiryForm = document.getElementById('uniswa-inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Extract field values
            const name = document.getElementById('form-name').value.trim();
            const company = document.getElementById('form-company').value.trim();
            const country = document.getElementById('form-country').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const productSelect = document.getElementById('form-product');
            const product = productSelect ? productSelect.value : '';
            const message = document.getElementById('form-message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in the required fields (Name, Email, Message).');
                return;
            }

            // Create WhatsApp message body
            let wsMessage = `Hello UNISWA Exports,\n\n`;
            wsMessage += `I would like to make an agricultural export inquiry.\n\n`;
            wsMessage += `*Name:* ${name}\n`;
            if (company) wsMessage += `*Company:* ${company}\n`;
            if (country) wsMessage += `*Country:* ${country}\n`;
            wsMessage += `*Email:* ${email}\n`;
            if (phone) wsMessage += `*Phone:* ${phone}\n`;
            if (product) wsMessage += `*Product Interest:* ${product}\n`;
            wsMessage += `\n*Message:* ${message}`;

            // URL Encode the message
            const encodedText = encodeURIComponent(wsMessage);
            const phoneNumber = '918522021116'; // UNISWA WhatsApp number
            
            // Redirect to WhatsApp web/app
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // 5. Product-specific quick inquiry buttons
    const quickInquiryBtns = document.querySelectorAll('.btn-quick-inquire');
    quickInquiryBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product-name');
            const phoneNumber = '918522021116';
            
            const wsMessage = `Hello UNISWA Exports,\n\nI am interested in importing *${productName}*. Please provide the technical specifications, pricing, minimum order quantities (MOQ), and shipping availability.`;
            const encodedText = encodeURIComponent(wsMessage);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});
