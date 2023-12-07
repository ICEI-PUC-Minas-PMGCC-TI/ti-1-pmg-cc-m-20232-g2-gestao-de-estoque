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
                window.location.href = '../index.html';

            } else {
                alert('Email ou senha incorretos.');
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
}
