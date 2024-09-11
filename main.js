document.addEventListener('DOMContentLoaded', function () {
    const openMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const navbar = document.getElementById('navbar');
    const overlay = document.getElementById('overlay');

    const backProject = document.querySelector('.back-project');
    const selectRewardBtns = document.querySelectorAll('.select-reward');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCard = document.getElementById('modal-card');
    const modalCloseBtn = document.getElementById('modal-close-menu');
    const completedCard = document.querySelector('.completed-card');
    const gotItBtn = document.getElementById('got-it');
    const bookmarkIcon = document.getElementById('bookmark')

    let lastWindowWidth = window.innerWidth; // Store initial window width
    let isNavbarOpen = false; // Track navbar state

    // Function to update the visibility of menu buttons
    function updateMenuButtonsVisibility() {
        if (window.innerWidth >= 1100) {
            // Desktop view: Hide mobile menu buttons and ensure the navbar is hidden
            navbar.style.display = 'none';
            overlay.style.display = 'none';
            openMenuBtn.style.display = 'none';
            closeMenuBtn.style.display = 'none';
            isNavbarOpen = false;
        } else {
            // Mobile view: Show/hide menu buttons based on current state
            openMenuBtn.style.display = isNavbarOpen ? 'none' : 'block';
            closeMenuBtn.style.display = isNavbarOpen ? 'block' : 'none';
            navbar.style.display = isNavbarOpen ? 'block' : 'none';
            overlay.style.display = isNavbarOpen ? 'block' : 'none';
        }
    }

    // Function to handle navbar toggling on smaller screens
    function toggleMobileMenu(show) {
        if (window.innerWidth < 1100) { // Only for screen widths less than 1100px
            navbar.style.display = show ? "block" : "none";
            overlay.style.display = show ? "block" : "none";
            openMenuBtn.style.display = show ? "none" : "block";
            closeMenuBtn.style.display = show ? "block" : "none";
            isNavbarOpen = show;
        }
    }

    openMenuBtn.addEventListener('click', function () {
        toggleMobileMenu(true);
    });

    closeMenuBtn.addEventListener('click', function () {
        toggleMobileMenu(false);
    });

    overlay.addEventListener('click', function () {
        toggleMobileMenu(false);
    });

    // Open modal on "Back This Project" button click 
    backProject.addEventListener('click', function () {
        modalOverlay.style.display = 'block'; // Show modal
        modalCard.style.display = 'block'; // Ensure modal is visible
        document.body.classList.add('modal-open'); // Disable background scroll
        window.scrollTo(0, 0); // Scroll to the top of the page

        // Ensure all .hr-2 and .pledge-bottom-block elements are hidden when modal opens
        document.querySelectorAll('.hr-2').forEach(hr => hr.style.display = 'none');
        document.querySelectorAll('.pledge-bottom-block').forEach(block => block.style.display = 'none');
    });

    // Open modal on "Select Reward" button click and activate corresponding radio button
    selectRewardBtns.forEach(button => {
        button.addEventListener('click', function () {
            const cardId = this.getAttribute('data-card'); // Get the card ID from data-card attribute
            const card = document.getElementById(cardId); // Get the corresponding card

            modalOverlay.style.display = 'block'; // Show modal
            modalCard.style.display = 'block'; // Ensure modal is visible
            document.body.classList.add('modal-open'); // Disable background scroll
            window.scrollTo(0, 0); // Scroll to the top of the page

            // Activate the corresponding radio button
            if (card) {
                document.querySelectorAll('.radio').forEach(radio => {
                    const isActive = radio.closest('.selection-card').id === cardId;
                    const circle = radio.querySelector('.circle');
                    if (circle) {
                        circle.style.display = isActive ? 'block' : 'none'; // Show or hide circles based on activation
                    }
                });

                // Mark the corresponding card as active and scroll into view
                document.querySelectorAll('.selection-card').forEach(selectionCard => {
                    selectionCard.classList.remove('active'); // Remove active class from all cards
                    const hrElement = selectionCard.querySelector('.hr-2');
                    if (hrElement) hrElement.style.display = 'none'; // Hide hr-2 if it exists
                    const pledgeBottomBlock = selectionCard.querySelector('.pledge-bottom-block');
                    if (pledgeBottomBlock) pledgeBottomBlock.style.display = 'none'; // Hide pledge-bottom-block for all cards

                    if (selectionCard.id === cardId) {
                        selectionCard.classList.add('active'); // Add active class to the corresponding card
                        const hrElement = selectionCard.querySelector('.hr-2');
                        if (hrElement) hrElement.style.display = 'block'; // Show hr-2 if it exists
                        if (pledgeBottomBlock) pledgeBottomBlock.style.display = 'flex'; // Show pledge-bottom-block for active card
                        selectionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setTimeout(() => {
                            window.scrollBy(0, -20); // Adjust the scroll position to add a top margin (20px)
                        }, 500);
                    }
                });
            }
        });
    });

    // Close modal
    modalCloseBtn.addEventListener('click', function () {
        modalOverlay.style.display = 'none'; // Hide modal
        modalCard.style.display = 'none'; // Hide modal card
        document.body.classList.remove('modal-open'); // Enable background scroll
    });

    // Close modal when clicking outside of the modal card
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            modalCard.style.display = 'none'; // Hide modal card
            document.body.classList.remove('modal-open'); // Enable background scroll
        }
    });

    // Radio button click functionality for selection cards
    document.querySelectorAll('.radio').forEach((radio) => {
        radio.addEventListener('click', function () {
            const selectionCard = this.closest('.selection-card');

            if (!selectionCard) {
                console.error('No selection card found');
                return;
            }

            const isActive = selectionCard.classList.contains('active');

            document.querySelectorAll('.selection-card').forEach((card) => {
                card.classList.remove('active');
                const circle = card.querySelector('.circle');
                if (circle) {
                    circle.style.display = 'none'; // Hide all circles
                }

                const hrElement = card.querySelector('.hr-2');
                const pledgeBottomBlock = card.querySelector('.pledge-bottom-block');
                if (hrElement) hrElement.style.display = 'none'; // Hide hr-2 if it exists
                if (pledgeBottomBlock) pledgeBottomBlock.style.display = 'none'; // Hide pledge-bottom-block for all cards
            });

            if (!isActive) {
                const circle = this.querySelector('.circle');
                if (circle) {
                    circle.style.display = 'block'; // Show circle
                }

                selectionCard.classList.add('active');

                const hrElement = selectionCard.querySelector('.hr-2');
                const pledgeBottomBlock = selectionCard.querySelector('.pledge-bottom-block');
                if (hrElement) hrElement.style.display = 'block';
                if (pledgeBottomBlock) pledgeBottomBlock.style.display = 'flex';

                selectionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    window.scrollBy(0, -20); // Adjust the scroll position to add a top margin (20px)
                }, 500);
            }
        });
    });

    // Handle multiple "Continue" buttons
    document.querySelectorAll('.continue').forEach(button => {
        button.addEventListener('click', function () {
            modalCard.style.display = 'none';
            document.body.classList.add('modal-open');
            completedCard.style.display = 'block';
            window.scrollTo(0, 0); // Scroll back to the top
        });
    });

    // Handle "Got it" button click to reset modal without reloading the page
    gotItBtn.addEventListener('click', function () {
        completedCard.style.display = 'none'; // Hide the completed card
        modalOverlay.style.display = 'none'; // Hide modal overlay
        modalCard.style.display = 'none'; // Hide modal card
        document.body.classList.remove('modal-open'); // Enable background scroll
        document.querySelectorAll('.radio .circle').forEach(circle => circle.style.display = 'none');
        document.querySelectorAll('.selection-card').forEach(card => {
            card.classList.remove('active');
            const hrElement = card.querySelector('.hr-2');
            const pledgeBottomBlock = card.querySelector('.pledge-bottom-block');
            if (hrElement) hrElement.style.display = 'none';
            if (pledgeBottomBlock) pledgeBottomBlock.style.display = 'none';
        });
    });

    // Call this function on page load
    updateMenuButtonsVisibility();

    // Add event listener for window resize
    window.addEventListener('resize', function () {
        updateMenuButtonsVisibility(); // Update menu button visibility based on screen size
    });

    document.getElementById("bookmark-icon-text").addEventListener("click", function() {
        const bookmarkIcon = document.getElementById("bookmark");
        const text = document.querySelector(".bookmark-text");

        // Check the current SVG file
        if (bookmarkIcon.getAttribute("src") === "./images/icon-bookmark.svg") {
        // Change to cyan version and update text to "Bookmarked"
            bookmarkIcon.setAttribute("src", "./images/icon-bookmarked-cyan.svg");
            text.textContent = "Bookmarked";
        } else {
          // Revert to original SVG and text
            bookmarkIcon.setAttribute("src", "./images/icon-bookmark.svg");
            text.textContent = "Bookmark";
    };
});

});
