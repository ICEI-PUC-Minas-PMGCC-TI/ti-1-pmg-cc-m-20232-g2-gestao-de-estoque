function getUsuarioData() {
    // Buscar o item do localStorage
    const usuarioJson = localStorage.getItem("Usuario");

    // Verificar se o item existe
    if (usuarioJson) {
        // Converter a string JSON em um objeto
        const usuario = JSON.parse(usuarioJson);

        // Capturar nome e email do usuário
        const nome = usuario.nome;
        const email = usuario.email;

        // Retornar um objeto com nome e email
        return { nome, email };
    } else {
        // Retornar um objeto vazio se não houver dados no localStorage
        return {};
    }
}

const usuarioData = getUsuarioData();

document.addEventListener('DOMContentLoaded', function () {
    const usernameDisplay = document.getElementById("usernameDisplay");
    const emailDisplay = document.getElementById("emailDisplay");

    if (usuarioData.nome) {
        usernameDisplay.textContent += " " + usuarioData.nome;
    } else {
        usernameDisplay.textContent += " Não identificado";
    }

    if (usuarioData.email) {
        emailDisplay.textContent = usuarioData.email;
    } else {
        emailDisplay.textContent = "Email não identificado";
    }
});


//REGIAO DEDICADA PARA CONTROLAR AUTENTICAÇAO DE USUARIO E LOGOUT//

function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log("Nome:", usuarioData.nome);
    console.log("Email:", usuarioData.email);


    fetch('https://jsonserver.samaranegabriel.repl.co/funcionarios')
        .then(response => response.json())
        .then(usuarios => {
            const usuario = usuarios.find(u => u.email === email && u.senha === senha);
            if (usuario) {
                console.log(usuario);

                const usuarioJSON = {
                    email: usuario.email,
                    nome: usuario.nome,
                    admin: usuario.admin,
                    id: usuario.id
                };

                const usuarioSalvo = JSON.stringify(usuarioJSON);

                localStorage.setItem('Usuario', usuarioSalvo);

                alert('Login bem-sucedido!');

                // Redirecionar para index.html
                window.location.href = 'pages/homepage.html';

            } else {
                alert('Email ou senha incorretos.');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
}

function logout() {
    localStorage.clear();
    window.location.href = '../index.html';
    console.log("LOCALSTORAGE LIMPO");
}
