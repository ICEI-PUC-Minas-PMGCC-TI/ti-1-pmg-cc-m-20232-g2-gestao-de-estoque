//botão modal 
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () =>{ 
    clearFields()
    document.getElementById('modal').classList.remove('active')
}
//botão modal

    //temp - temporário
/*const tempClient = {
    nome: "Maria",
    telefone: "31995555",
    email: "maria@gmail.com",
    endereco: "rua alecrim dourado",
    categoria: "alguma coisa",
    site: "www.ale.com"
}*/

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

//DELETE 
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}

//CRUD - UPDATE - editar
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//CRUD - READ
const readClient = () => getLocalStorage()

//CRUD - CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}


//botão modal
document.getElementById('cadastrarFornecedor')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)


//botão modal 

const isValidFields = () => {
    //os campos obrigatórios tem que estar preenchidos, se não, não salva
    return document.getElementById('form').reportValidity()
}

//interação com o botão de salvar
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Fornecedor'
}
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            endereco: document.getElementById('endereco').value,
            categoria: document.getElementById('categoria').value,
            site: document.getElementById('site').value
        }
        
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
            alert("Fornecedor cadastrado com sucesso!")
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
            alert("Fornecedor atualizado com sucesso!")
            
        }
        
        
    }
    //minuto 1:13:26
}

//aqui eu já comentei a minha tabela no html
const createRow = (client, index) => { 
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client,index}</td>
        <td>${client.nome}</td> 
        <td>${client.telefone}</td>
        <td>${client.email}</td>
        <td>${client.endereco}</td>
        <td>${client.categoria}</td>
        <td>${client.site}</td>   
        <td>
            <button type="button" class="button editar" id="edit-${index}">Editar</button>
            <button type="button" class="button excluir" id="delete-${index}">Excluir</button>
        </td>           
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
} 

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}
const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    
    document.getElementById('nome').value = client.nome
    document.getElementById('telefone').value = client.telefone
    document.getElementById('email').value = client.email
    document.getElementById('endereco').value = client.endereco
    document.getElementById('categoria').value = client.categoria
    document.getElementById('site').value = client.site
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()

}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o fornecedor ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
           
        }
    }
}

updateTable()


document.getElementById('salvar') 
    .addEventListener('click', saveClient)


document.querySelector('#tableClient>tbody')
.addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)