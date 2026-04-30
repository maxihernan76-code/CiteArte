document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
        }
    });

    // Registration Form Submission (Mock)
    const form = document.getElementById('registration-form');
    const successMsg = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate API call
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            successMsg.classList.remove('hidden');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        }, 1500);
    });

    // Modal and Ticket Booking Logic
    const modal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close-modal');
    const buyButtons = document.querySelectorAll('.buy-btn');
    const modalShowName = document.getElementById('modal-show-name');
    const modalTotal = document.getElementById('modal-total');
    const mockPaymentBtns = document.querySelectorAll('.mock-btn');
    const paymentSuccess = document.getElementById('payment-success');

    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const showCard = e.target.closest('.show-card');
            const showName = btn.getAttribute('data-show');
            const ticketInput = showCard.querySelector('input[type="number"]');
            const numTickets = parseInt(ticketInput.value);
            
            // Extract price from string e.g. "$5000 ARS c/u"
            const priceText = showCard.querySelector('.price').textContent;
            const price = parseInt(priceText.replace(/\D/g, ''));

            const total = numTickets * price;

            modalShowName.textContent = `Show: ${showName} (${numTickets} entrada${numTickets > 1 ? 's' : ''})`;
            modalTotal.textContent = `Total: $${total.toLocaleString('es-AR')} ARS`;
            
            // Reset modal state
            paymentSuccess.classList.add('hidden');
            mockPaymentBtns.forEach(b => b.style.display = 'block');
            
            // Open modal
            modal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal if clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Mock payment processing
    mockPaymentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const originalText = e.target.textContent;
            e.target.textContent = 'Procesando...';
            
            // Disable buttons
            mockPaymentBtns.forEach(b => b.disabled = true);

            setTimeout(() => {
                e.target.textContent = originalText;
                mockPaymentBtns.forEach(b => {
                    b.disabled = false;
                    b.style.display = 'none'; // Hide buttons on success
                });
                paymentSuccess.classList.remove('hidden');
                
                // Auto close after 3 seconds
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 3000);
            }, 1500);
        });
    });
});
