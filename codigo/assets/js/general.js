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

    if (usuarioData.nome) {
        document.getElementById("usernameDisplay").textContent += " " + usuarioData.nome;
    } else {
        document.getElementById("usernameDisplay").textContent += " Não identificado";
    }
});



console.log("Nome:", usuarioData.nome);
console.log("Email:", usuarioData.email);

//REGIAO DEDICADA PARA CONTROLAR AUTENTICAÇAO DE USUARIO E LOGOUT//

function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('https://jsonserver.samaranegabriel.repl.co/funcionarios')
        .then(response => response.json())
        .then(usuarios => {
            const usuario = usuarios.find(u => u.email === email && u.senha === senha);
            if (usuario) {
                console.log(usuario);
        
                const usuarioJSON = {
                    email: usuario.email,
                    nome: usuario.nome,
                    admin: usuario.admin
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