const apiUrl = 'https://jsonserver.samaranegabriel.repl.co/fornecedores';

// CRUD - CREATE
const createClient = async (client) => {
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    });
}

// CRUD - READ
const readClient = async () => {
    const response = await fetch(apiUrl);
    return response.json();
}

// CRUD - UPDATE
const updateClient = async (id, client) => {
    console.log(client);
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    });
}

// CRUD - DELETE
const deleteClient = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
}

// Funções para manipulação do modal
const openModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    console.log("Modal classes after openModal:", modal.className);
}

    const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

// Validação de campos e limpeza de campos
const isValidFields = () => document.getElementById('form').reportValidity()
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

// Salvar Cliente
const saveClient = async () => {
    if (isValidFields()) {
        const client = {
            fornecedor: document.getElementById('nome').value,
            celular: document.getElementById('telefone').value,
            endereco: document.getElementById('endereco').value,
            categoria: document.getElementById('categoria').value
        };
        
        const id = document.getElementById('nome').dataset.index;
        if (id == 'new') {
            await createClient(client);
            alert("Fornecedor cadastrado com sucesso!");
        } else {
            await updateClient(id, client);
            alert("Fornecedor atualizado com sucesso!");
        }
        closeModal();
        await updateTable();
    }
}

// Criar linha na tabela
const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.fornecedor}</td>
        <td>${client.categoria}</td>
        <td>${client.celular}</td>
        <td>${client.endereco}</td>
        <td>
            <button type="button" class="button editar" id="edit-${client.id}">Editar</button>
            <button type="button" class="button excluir" id="delete-${client.id}">Excluir</button>
        </td>
    `;
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

// Limpar tabela
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

// Atualizar tabela
const updateTable = async () => {
    const dbClient = await readClient();
    clearTable();
    dbClient.forEach(createRow);
}

// Preencher campos para edição
const fillFields = (client) => {
    document.getElementById('nome').value = client.fornecedor;
    document.getElementById('telefone').value = client.celular;
    document.getElementById('endereco').value = client.endereco;
    document.getElementById('categoria').value = client.categoria;
    document.getElementById('nome').dataset.index = client.id;
}

// Editar Cliente
const editClient = async (id) => {
    const dbClient = await readClient();
    const client = dbClient.find(client => client.id == id);
    fillFields(client);
    openModal();
}

// Manipulador para editar e excluir
// Manipulador para editar e excluir
const editDelete = async (event) => {
    if (event.target.type == 'button') {
        const [action, id] = event.target.id.split('-');
        console.log(`Action: ${action}, ID: ${id}`); // Adiciona log para depuração
        if (action == 'edit') {
            console.log(`Editando cliente com ID: ${id}`); // Log ao tentar editar
            await editClient(id);
        } else if (action == 'delete') {
            console.log(`Excluindo cliente com ID: ${id}`); // Log ao tentar excluir
            const client = (await readClient()).find(client => client.id == id);
            const response = confirm(`Deseja realmente excluir o fornecedor ${client.fornecedor}`);
            if (response) {
                await deleteClient(id);
                await updateTable();
            }
        }
    }
}



// Event Listeners
document.getElementById('cadastrarFornecedor').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('salvar').addEventListener('click', saveClient);
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);
document.getElementById('cancelar').addEventListener('click', closeModal);

// Inicialização
updateTable();
