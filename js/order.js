document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const currentPrice = document.getElementById('current-price');
    const totalAmount = document.getElementById('total-amount');
    const amountInput = document.getElementById('amount');
    const currencyInput = document.getElementById('currency');
    
    // Update price based on country selection
    countrySelect.addEventListener('change', function() {
        updatePrice();
    });
    
    // Quantity controls
    decreaseBtn.addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value--;
            updatePrice();
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        if (quantityInput.value < 10) {
            quantityInput.value++;
            updatePrice();
        }
    });
    
    // Update price display
    function updatePrice() {
        const selectedOption = countrySelect.options[countrySelect.selectedIndex];
        const price = selectedOption.dataset.price || 5000;
        const currency = selectedOption.dataset.currency || 'KES';
        const quantity = quantityInput.value;
        const total = price * quantity;
        
        // Format number with commas
        const formattedTotal = new Intl.NumberFormat().format(total);
        const formattedPrice = new Intl.NumberFormat().format(price);
        
        currentPrice.textContent = `${formattedPrice} ${currency}`;
        totalAmount.textContent = `${formattedTotal} ${currency}`;
        
        // Update hidden inputs
        amountInput.value = total;
        currencyInput.value = currency;
    }
    
    // Initialize
    updatePrice();
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
