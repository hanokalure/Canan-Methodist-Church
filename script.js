document.addEventListener('DOMContentLoaded', function() {
    // Google Sheets Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxPLJLyJd9kZCtO5VGZCF_2Rs8XEwBBL_GUYCz6O7w0vHvJ0dd9MD-rnfTEFPBr7AWB1A/exec'; // Replace with your actual Apps Script URL
    
    // Form Submission Handling
    const form = document.getElementById('myForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        console.log('Form Data:', data); // Log data to debug
        
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response Data:', data); // Log response data to debug
            if (data.result === 'success') {
                alert('Form submitted successfully!');
                form.reset(); // Optional: Reset form fields after successful submission
            } else {
                alert('Failed to submit form. Please try again.');
            }
        })
        .catch(error => console.error('Error!', error.message));
    });

    // Show cards on page load and on scroll
    const cards = document.querySelectorAll('.history-card');
    function showCards() {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top + scrollY;
            const cardHeight = card.offsetHeight;

            if (scrollY + windowHeight > cardTop + cardHeight / 4) {
                card.classList.add('show');
            }
        });
    }

    // Show cards on page load
    showCards();
    // Show cards on scroll
    window.addEventListener('scroll', showCards);

    // Show the popup
    function showPopup(popupId) {
        document.getElementById(popupId).style.display = 'flex';
    }

    // Close the popup
    function closePopup(popupId) {
        document.getElementById(popupId).style.display = 'none';
    }

    // Add event listeners to buttons
    const buttons = document.querySelectorAll('.learn-more-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const popupId = button.getAttribute('data-popup');
            showPopup(popupId);
        });
    });

    // Add event listeners to close buttons
    const closeButtons = document.querySelectorAll('.popup-close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the popup id from the closest popup container
            const popup = button.closest('.popup');
            if (popup) {
                closePopup(popup.id);
            }
        });
    });

    // Add event listener for the "Events" link
    document.getElementById('events-link').addEventListener('click', function(event) {
        event.preventDefault();
        showPopup('puppy-events');
        document.getElementById('puppy-overlay').style.display = 'block';
    });

    // Add event listener for the "SEE ALL EVENTS" button
    document.querySelector('.learn-more-btn').addEventListener('click', function(event) {
        event.preventDefault();
        showPopup('puppy-events');
        document.getElementById('puppy-overlay').style.display = 'block';
    });

    // Add event listener for the "Events" link in the footer
    document.getElementById('footer-events-link').addEventListener('click', function(event) {
        event.preventDefault();
        showPopup('puppy-events');
        document.getElementById('puppy-overlay').style.display = 'block';
    });

    // Add event listener for the close button
    document.getElementById('close-puppy').addEventListener('click', function() {
        document.getElementById('puppy-events').style.display = 'none';
        document.getElementById('puppy-overlay').style.display = 'none';
    });

    // Committee animation
    const container = document.querySelector('.committee-main');
    const items = Array.from(container.children);
    let index = 0;

    function animateItems() {
        if (index >= items.length) return;
        
        // Add the first 4 items to the visible set
        const visibleItems = items.slice(index, index + 4);
        container.innerHTML = '';
        visibleItems.forEach(item => container.appendChild(item.cloneNode(true)));
        
        // Remove the first item after 3 seconds and add a new one
        setTimeout(() => {
            index++;
            if (index + 4 <= items.length) {
                container.innerHTML = '';
                const newVisibleItems = items.slice(index, index + 4);
                newVisibleItems.forEach(item => container.appendChild(item.cloneNode(true)));
            }
            animateItems();
        }, 3000);
    }
    
    animateItems();
});