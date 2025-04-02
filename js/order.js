document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const currentPrice = document.getElementById('current-price');
    const totalAmount = document.getElementById('total-amount');
    const amountInput = document.getElementById('amount');
    const currencyInput = document.getElementById('currency');
    
    // Initialize with zero values
    function initializePrices() {
        currentPrice.textContent = "0";
        totalAmount.textContent = "0";
        amountInput.value = "0";
        currencyInput.value = "";
    }
    
    // Update price based on country selection
    countrySelect.addEventListener('change', function() {
        updatePrice();
    });
    
    // Quantity controls
    decreaseBtn.addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value--;
            updatePrice();
        } else {
            alert('Quantity must be at least 1');
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
        const price = selectedOption.dataset.price || 0;
        const currency = selectedOption.dataset.currency || '';
        const quantity = quantityInput.value;
        
        // Calculate base total
        let total = quantity >= 1 ? price * quantity : 0;
        let displayHTML = "0";
        
        if (quantity >= 1) {
            if (quantity > 1) {
                // Apply 15% discount if quantity > 1
                const originalTotal = price * quantity;
                const discount = originalTotal * 0.15;
                total = originalTotal - discount;
                
                // Create display with strikethrough original price
                displayHTML = `
                    
                    </span>
                    <div class="text-success small mt-1">
                        15% discount applied (Save ${new Intl.NumberFormat().format(discount)} ${currency})
                    </div>
                `;
            } else {
                // No discount for single quantity
                displayHTML = `
                    <span class="text-primary fw-bold">
                        ${new Intl.NumberFormat().format(total)} ${currency}
                    </span>
                `;
            }
        }
        
        // Update displays
        currentPrice.textContent = quantity >= 1 ? `${new Intl.NumberFormat().format(price)} ${currency}` : "0";
        totalAmount.innerHTML = displayHTML;
        
        // Update hidden inputs
        amountInput.value = total;
        currencyInput.value = quantity >= 1 ? currency : '';
    }
    
    // Initialize with zero values
    initializePrices();
    
    // Back to Top Button
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
    
    // Form submission handler
    document.getElementById('orderForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate quantity
        const quantity = parseInt(quantityInput.value);
        if (quantity < 1) {
            alert('Quantity must be at least 1');
            return false;
        }
        
        // Show loading indicator
        const submitBtn = document.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
        
        try {
            // Submit form via AJAX
            const formData = new FormData(this);
            
            // Save order details to LocalStorage
            const orderDetails = {};
            formData.forEach((value, key) => {
                orderDetails[key] = value;
            });
            localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
            
            const response = await fetch('process_order.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Save WhatsApp link too
                localStorage.setItem('whatsappLink', data.whatsapp_link);

                // Mobile detection
                const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                // Always redirect to thank you page first
                window.location.href = 'thank_you.html';
                
                // Open WhatsApp after a short delay
                setTimeout(() => {
                    if (isMobile) {
                        // For mobile - create a temporary iframe to open WhatsApp
                        const iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        iframe.src = data.whatsapp_link;
                        document.body.appendChild(iframe);
                        setTimeout(() => document.body.removeChild(iframe), 3000);
                    } else {
                        // For desktop - open in new tab
                        window.open(data.whatsapp_link, '_blank');
                    }
                }, 500);
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}\nPlease contact us directly at +254 752 198022`);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
});