window.addEventListener('DOMContentLoaded', event => {
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };
    navbarShrink();

    document.addEventListener('scroll', navbarShrink);
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});
function addComment() {
    // Get the comment text from the input field
    const commentText = document.getElementById('user-comment').value;
    if (commentText.trim() === '') {
        alert('Por favor, digite um comentário.');
        return;
    }
    // Create a new div for the comment
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('Userdiv', 'mt-3', 'border-warning', 'p-3');

    // Create the user icon element
    const userIcon = document.getElementById('user-icon').cloneNode(true);
    userIcon.classList.add('me-3');

    // Apply styles for user icon
    userIcon.style.marginBottom = '5rem';
    userIcon.style.marginRight = '0.5rem';
    userIcon.style.width = '50px';
    userIcon.style.height = '50px';

    // Create the comment text element
    const commentTextDiv = document.createElement('div');
    commentTextDiv.textContent = commentText;
    commentTextDiv.classList.add('textcomment');
    commentTextDiv.style.border = "2px solid #ffc800";
    commentTextDiv.style.overflowY = "auto";
    commentTextDiv.style.overflowWrap = "break-word";
    commentTextDiv.style.textAlign = "left"
     // Border color as yellow

    // Append the user icon and comment text to the comment div
    commentDiv.appendChild(userIcon);
    commentDiv.appendChild(commentTextDiv);

    // Append the comment div to the chat container
    const chatContainer = document.getElementById('chat-container');
    chatContainer.appendChild(commentDiv);

    // Clear the input field
    document.getElementById('user-comment').value = '';
}
document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");

    stars.forEach(function(star, index) {
        star.addEventListener("click", function() {
            removeActiveStars();
            for (let i = stars.length - 1; i >= index; i--) {
                stars[i].classList.add("active");
            }
        });
    });

    function removeActiveStars() {
        stars.forEach(function(star) {
            star.classList.remove("active");
        });
    }
});