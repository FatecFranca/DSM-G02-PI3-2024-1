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
    const commentText = document.getElementById('user-comment').value.trim();
    if (!commentText) {
        alert('Por favor, digite um comentário.');
        return;
    }

    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'sectionDIV';

    const commentDiv = document.createElement('div');
    commentDiv.className = 'Userdiv mt-3 border-warning p-3';

    const userIcon = document.getElementById('user-icon').cloneNode(true);
    userIcon.className = 'me-3 UserIcon';

    const commentTextDiv = document.createElement('div');
    commentTextDiv.textContent = commentText;
    commentTextDiv.className = 'textcomment';

    const starSpan = document.createElement('span');
    starSpan.innerHTML = '&#x2606;';
    starSpan.innerHTML = `${starNumber}`;
    starSpan.className = 'star starComment';

    sectionDiv.append(starSpan, commentDiv); 
    commentDiv.append(userIcon, commentTextDiv);
    document.getElementById('chat-container').appendChild(sectionDiv); 
    document.getElementById('user-comment').value = '';
}


let starNumber = 0
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            stars.forEach((s, i) => {
                s.classList.toggle("active", i >= index);
            });
        });
        star.addEventListener("click", () => {
            starNumber = 5 - index
        });
    });
});