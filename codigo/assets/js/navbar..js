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

// Exemplo de uso
const usuarioData = getUsuarioData();
console.log("Nome:", usuarioData.nome);
console.log("Email:", usuarioData.email);

