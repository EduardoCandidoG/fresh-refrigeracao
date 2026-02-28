const API = "http://localhost:8080";

function cadastrarCliente() {
    const cliente = {
        nome: nome.value,
        telefone: telefone.value,
        email: email.value,
        endereco: endereco.value
    };

    fetch(`${API}/clientes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente)
    }).then(() => listarClientes());
}

function listarClientes() {
    fetch(`${API}/clientes`)
        .then(r => r.json())
        .then(data => {
            const lista = document.getElementById("listaClientes");
            if (!lista) return;
            lista.innerHTML = "";
            data.forEach(c =>
                lista.innerHTML += `<li>${c.id} - ${c.nome}</li>`
            );
        });
}

function cadastrarServico() {
    const servico = {
        nome: nomeServico.value,
        descricao: descricaoServico.value,
        preco: parseFloat(precoServico.value)
    };

    fetch(`${API}/servicos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(servico)
    }).then(() => listarServicos());
}

function listarServicos() {
    fetch(`${API}/servicos`)
        .then(r => r.json())
        .then(data => {
            const lista = document.getElementById("listaServicos");
            if (!lista) return;
            lista.innerHTML = "";
            data.forEach(s =>
                lista.innerHTML += `<li>${s.id} - ${s.nome}</li>`
            );
        });
}

function agendarServico() {
    const agendamento = {
        cliente: { id: parseInt(clienteId.value) },
        servico: { id: parseInt(servicoId.value) },
        data: dataAgendamento.value
    };

    fetch(`${API}/agendamentos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(agendamento)
    }).then(() => alert("Agendado com sucesso"));
}

function buscarAgenda() {
    fetch(`${API}/agendamentos/data?data=${dataBusca.value}`)
        .then(r => r.json())
        .then(data => {
            const lista = document.getElementById("listaAgenda");
            lista.innerHTML = "";
            data.forEach(a =>
                lista.innerHTML += `<li>${a.cliente.nome} - ${a.servico.nome}</li>`
            );
        });
}

document.addEventListener("DOMContentLoaded", () => {
    listarClientes();
    listarServicos();
});