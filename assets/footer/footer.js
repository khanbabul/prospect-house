// Footer Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('subscribeForm');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('subscribeEmail').value;

            // Basic validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const btn = this.querySelector('.send-message-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for subscribing! We will get back to you as soon as possible.');
                btn.textContent = originalText;
                btn.disabled = false;
                this.reset();
            }, 1500);
        });
    }

    // Footer dropdown hover handling for mobile
    const footerDropdowns = document.querySelectorAll('.footer-nav-item.has-dropdown');

    footerDropdowns.forEach(item => {
        const link = item.querySelector('.footer-nav-link');

        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                item.classList.toggle('dropdown-open');

                const arrow = this.querySelector('.dropdown-arrow');
                if (item.classList.contains('dropdown-open')) {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
});