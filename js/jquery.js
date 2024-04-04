
let participantes = [
    {
        nome: "João Vitor", 
        email: "joazinho@gmail.com", 
        dataInscricao: new Date(2023, 10, 17, 15, 15), 
        dataCheckIn: new Date(2024, 2, 20, 22, 10)
    }, 
    {
        nome: "Lucas Schneiders", 
        email: "schneiderscad@gmail.com", 
        dataInscricao: new Date(2022, 11, 17, 15, 30), 
        dataCheckIn: new Date(2024, 4, 23, 19, 10)
    },
    {
        nome: "Maria Silva", 
        email: "maria.silva@example.com", 
        dataInscricao: new Date(2023, 3, 5, 10, 45), 
        dataCheckIn: new Date(2024, 1, 10, 14, 20)
    },
    {
        nome: "Pedro Oliveira", 
        email: "pedro.oliveira@example.com", 
        dataInscricao: new Date(2023, 7, 12, 13, 20), 
        dataCheckIn: new Date(2024, 3, 15, 9, 30)
    },
    {
        nome: "Ana Souza", 
        email: "ana.souza@example.com", 
        dataInscricao: new Date(2023, 2, 25, 8, 10), 
        dataCheckIn: new Date(2024, 5, 5, 18, 45)
    },
    {
        nome: "Rafaela Santos", 
        email: "rafaela.santos@example.com", 
        dataInscricao: new Date(2023, 6, 8, 17, 50), 
        dataCheckIn: new Date(2024, 0, 3, 11, 55)
    },
    {
        nome: "Carlos Pereira", 
        email: "carlos.pereira@example.com", 
        dataInscricao: new Date(2023, 9, 19, 11, 25), 
        dataCheckIn: new Date(2024, 6, 18, 16, 40)
    },
    {
        nome: "Mariana Costa", 
        email: "mariana.costa@example.com", 
        dataInscricao: new Date(2023, 4, 30, 14, 15), 
        dataCheckIn: new Date(2024, 8, 8, 8, 50)
    },
    {
        nome: "Gustavo Almeida", 
        email: "gustavo.almeida@example.com", 
        dataInscricao: new Date(2023, 1, 15, 9, 35), 
        dataCheckIn: new Date(2024, 10, 25, 21, 15)
    },
    {
        nome: "Juliana Ferreira", 
        email: "juliana.ferreira@example.com", 
        dataInscricao: new Date(2023, 8, 22, 16, 40), 
        dataCheckIn: new Date(2024, 7, 12, 12, 30)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    //condicional
    if(participante.dataCheckIn == null) {
        dataCheckIn = `
        <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
        Confirmar Check-in
        </button>
        `
    }
    

    return `
    <tr>
            <td><strong>${participante.nome}</strong>
                <br>
                <small>${participante.email}</small>
            </td>
            
            <td>${dataInscricao}</td>
            <td>${dataCheckIn}</td>
        </tr>
    `
}
const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes){
        output = output + criarNovoParticipante(participante) 
    }
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }
    //verifica se o participante ja existe
    const existente = participantes.find((p) => p.email == participante.email)

    if(existente) {
        alert("Email já cadastrado")
        return
    }

    //adiciona participantes
    participantes = [participante, ...participantes]

    atualizarLista(participantes)

    //limpar form
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    //confirmar checkin
    const mensagemConfirm = 'Tem certeza que deseja fazer o check-in?'
    if(confirm(mensagemConfirm) == false){
        return
    } 
    //encontrar participante
    const participante = participantes.find((p) => p.email == event.target.dataset.email)

    //atualizar o checkin
    participante.dataCheckIn = new Date()

    //atualizar a lista de participantes
    atualizarLista(participantes)
}