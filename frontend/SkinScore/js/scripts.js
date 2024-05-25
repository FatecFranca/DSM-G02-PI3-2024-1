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
    const commentDiv = document.createElement('div');
    const userIcon = document.getElementById('user-icon').cloneNode(true);
    const commentTextDiv = document.createElement('div');
    const chatContainer = document.getElementById('chat-container');
    if (commentText.trim() === '') {
        alert('Por favor, digite um comentário.');
        return;
    }
    commentDiv.classList.add('Userdiv', 'mt-3', 'border-warning', 'p-3');
    userIcon.classList.add('me-3');
    userIcon.style = 'UserIcon';

    commentTextDiv.textContent = commentText;
    commentTextDiv.classList.add('textcomment');
    commentTextDiv.style =  'TextDiv';

    commentDiv.appendChild(userIcon);
    commentDiv.appendChild(commentTextDiv);

    chatContainer.appendChild(commentDiv);
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