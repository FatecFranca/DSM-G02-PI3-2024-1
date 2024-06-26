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

function addComment(skinId) {
    const commentText = document.getElementById(`user-comment-${skinId}`).value.trim();
    if (!commentText) {
        alert('Por favor, digite um comentário.');
        return;
    }

    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'sectionDIV';

    const commentDiv = document.createElement('div');
    commentDiv.className = 'Userdiv mt-3 border-warning p-3 commentDiv';

    const userIcon = document.getElementById(`user-icon-${skinId}`).cloneNode(true);
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

    // Botão de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'btn btn-primary btn-sm ms-2 ';
    editButton.style.height = '30px'; // Defina a altura desejada aqui
    editButton.onclick = function() {
        editComment(commentDiv, commentTextDiv, skinId);
    };

    // Botão de apagar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Apagar';
    deleteButton.className = 'btn btn-danger btn-sm ms-2';
    deleteButton.style.height = '30px'; // Defina a altura desejada aqui
    deleteButton.onclick = function() {
        deleteComment(sectionDiv);
    };

    commentDiv.append(userIcon, commentTextDiv, editButton, deleteButton);
    sectionDiv.append(starSpan, commentDiv);
    document.getElementById(`chat-container-${skinId}`).appendChild(sectionDiv);
    document.getElementById(`user-comment-${skinId}`).value = '';
}

function editComment(commentDiv, commentTextDiv, skinId) {
    const commentText = commentTextDiv.textContent;
    document.getElementById(`user-comment-${skinId}`).value = commentText;
    commentDiv.parentNode.remove();
}

function deleteComment(sectionDiv) {
    sectionDiv.remove();
}

let starNumber = 0;
document.addEventListener("DOMContentLoaded", () => {
    const ratings = document.querySelectorAll(".rating");

    ratings.forEach((rating) => {
        const stars = rating.querySelectorAll(".star");
        stars.forEach((star, index) => {
            star.addEventListener("click", () => {
                stars.forEach((s, i) => {
                    s.classList.toggle("active", i >= index);
                });
                starNumber = 5 - index;
            });
        });
    });
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
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
            //alert('Até aqui tudo certo');
            console.log('Login bem-sucedido:', user);
            window.location.href = '/frontend/SkinScore/pages/login/main.html';
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error.message);
        //alert('Usuário ou senha incorretos');
    });
}

document.getElementById('logout').addEventListener('submit', function (event) {
    event.preventDefault();
    fazerLogout();
});

function fazerLogout() {
    console.log('Fazendo logout...');
    window.location.href = '/frontend/SkinScore/pages/login/login.html';
}

function skinCollection(skin1, skin2, skin3, skinId) {
    //665cd5b4a13b26664fb7f2c4           6665e3c4e86edf9f31889e41         6665e3ffe86edf9f31889e43
    const skiname = document.getElementById(`name-${skinId}`);
    const describeskin = document.getElementById(`description-${skinId}`);
    const skinprice = document.getElementById(`price-value-${skinId}`);

    // Montando a URL com os parâmetros de consulta
    const url = `http://localhost:8080/skins?skin1=${skin1}&skin2=${skin2}&skin3=${skin3}`;

    fetch(url, {
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
        
    })
    .catch(error => {
        console.error('Erro ao puxar a skin', error.message);
    });
}


function Register(event) {
    event.preventDefault(); // Prevent form from submitting the default way

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
            return response.json().then(err => { throw new Error(err.error); });
        }
        return response.json();
    })
    .then(data => {
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/frontend/SkinScore/pages/login/login.html';
    })
    .catch(error => {
        console.error('Erro ao fazer o cadastro:', error.message);
        alert('Erro ao fazer o cadastro: ' + error.message);
    });
}


