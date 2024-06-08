window.addEventListener('DOMContentLoaded', event => {
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };
    navbarShrink();

    document.addEventListener('scroll', navbarShrink);
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%'
        });
    }
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
    commentDiv.className = 'Userdiv mt-3 border-warning p-3 commentDiv';

    const userIcon = document.getElementById('user-icon').cloneNode(true);
    userIcon.className = 'me-3 UserIcon';

    const commentTextDiv = document.createElement('div');
    commentTextDiv.textContent = commentText;
    commentTextDiv.className = 'textcomment';

    const starSpan = document.createElement('span');
    starSpan.className = 'star starComment';
    for (let i = 0; i < starNumber; i++) {
        const starElement = document.createElement('span');
        starElement.innerHTML = '&#x2605;';
        starSpan.appendChild(starElement);
    }
    sectionDiv.append(starSpan, commentDiv);
    commentDiv.append(userIcon, commentTextDiv);
    document.getElementById('chat-container').appendChild(sectionDiv);
    document.getElementById('user-comment').value = '';
}

let starNumber = 0;
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            stars.forEach((s, i) => {
                s.classList.toggle("active", i >= index);
            });
        });
        star.addEventListener("click", () => {
            starNumber = 5 - index;
        });
    });
});

document.getElementById('loginForm').addEventListener('click', function (event) {
    event.preventDefault();
    fazerLogin();
});

function fazerLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao conectar no banco....');
        }
        return response.json();
    })
    .then(data => {

        // console.log('JSON recebido:', data); print de teste
        // Aqui vc compara o usuario do html com o json retornado da requisicao
        const user = data.find(user => user.username === username && user.password === password);
        if (user) {
            console.log('Login bem-sucedido:', user);
            window.location.href = '/frontend/SkinScore/pages/login/main.html';
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error.message);
        alert('Usuário ou senha incorretos');
    });
}

document.getElementById('logout').addEventListener('click', function (event) {
    event.preventDefault();
    fazerLogout();
});

function fazerLogout() {
    console.log('Fazendo logout...');
    window.location.href = '/frontend/SkinScore/pages/login/login.html';
}

document.getElementById('registerform').addEventListener('submit', function(event) {
    event.preventDefault();
    Register();
});

function Register() {
    const username = document.getElementById('newusername').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('newpassword').value;
    const confirmpassword = document.getElementById('confirm-password').value;

    if (password !== confirmpassword) {
        alert('As senhas não coincidem');
        return;
    }

    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao conectar no banco, tente novamente.');
        }
        return response.json();
    })
    .then(data => {
        alert('Cadastro realizado com sucesso!');
        //insira as variaveis de cadastro
        window.location.href = '/frontend/SkinScore/pages/login/login.html';
    })
    .catch(error => {
        console.error('Erro ao fazer o cadastro:', error.message);
        alert('Erro ao fazer o cadastro: ' + error.message);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const character1 = document.getElementById('image-container-1');
    const character1_ID = '665cb71f42641de29915741e';
    
    fetch(`http://localhost:8080/skins/${character1_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao conectar no banco.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            const skin = data.skin;
            const imageUrl = skin.image;
            character1.src = imageUrl;
            character1.alt = skin.name;
        } else {
            throw new Error('Skin não encontrada.');
        }
    })
    .catch(error => {
        console.error('Erro ao tentar puxar a imagem:', error.message);
        character1.alt = 'Erro ao carregar a imagem.';
    });
});



