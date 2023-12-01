// Função para fazer uma requisição GET para o servidor e retornar os dados
function fetchFornecedores() {
    return fetch('https://jsonserver.samaranegabriel.repl.co/fornecedores')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Função para processar e exibir os dados dos fornecedores
function displayFornecedores(dados) {
    var main = document.querySelector('main'); // Seleciona o elemento <main>

    dados.forEach(function (fornecedorInfo, i) {
        // Criação e configuração do elemento 'article'
        var article = document.createElement('article');
        article.classList.add('caixafor');

        var content = `
            <img src="/assets/img/unknown.png" alt="Logo fornecedor" />
            <a href="/aviso.html" target="_blank" ><i class="fa-solid fa-gear"></i></a>
            <ul>
                <li><b>Fornecedor:</b> ${fornecedorInfo.fornecedor}</li>
                <li><b>Categoria:</b> ${fornecedorInfo.categoria}</li>
                <li><b>Celular:</b> ${fornecedorInfo.celular}</li>
                <li><b>Endereço:</b> ${fornecedorInfo.endereço}</li>
            </ul>
        `;

        article.innerHTML = content;
        main.appendChild(article);

        // Criação dos botões e campo editável
        var notes = document.createElement('div');
        notes.classList.add('notes');

        var contentEditable = document.createElement('p');
        contentEditable.contentEditable = true;
        contentEditable.id = 'myContent' + i;

        var undoButton = document.createElement('button');
        undoButton.className = 'btn';
        undoButton.id = 'undo' + i;
        undoButton.textContent = 'Desfazer';
        undoButton.disabled = true;

        var saveButton = document.createElement('button');
        saveButton.className = 'btn';
        saveButton.id = 'save' + i;
        saveButton.textContent = 'Salvar';
        saveButton.disabled = true;

        notes.appendChild(contentEditable);
        notes.appendChild(undoButton);
        notes.appendChild(saveButton);

        main.appendChild(notes);
    });
}

// Chama a função fetchFornecedores e processa os dados recebidos
fetchFornecedores().then(dados => {
    if (dados) {
        displayFornecedores(dados);
    }
});

// Resto do seu código original para manipulação da interface do usuário...
