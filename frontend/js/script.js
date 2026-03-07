const API = "http://localhost:8080";

function fetchAPI(endpoint, options = {}) {
    return fetch(`${API}${endpoint}`, options).then(res => res.json()).catch(err => console.error(err));
}

async function cadastrarCliente() {
    const payload = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value
    };
    await fetch(`${API}/clientes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    location.reload();
}

async function listarClientes() {
    const data = await fetchAPI('/clientes');
    const lista = document.getElementById("listaClientes");
    const select = document.getElementById("clienteId");
    
    if (lista) {
        lista.innerHTML = data.length ? "" : "<p>Nenhum cliente cadastrado.</p>";
        data.forEach(c => lista.innerHTML += `<div class="card">${c.nome} - ${c.telefone}</div>`);
    }
    if (select) {
        data.forEach(c => select.innerHTML += `<option value="${c.id}">${c.nome}</option>`);
    }
}

async function cadastrarServico() {
    const payload = {
        nome: document.getElementById('nomeServico').value,
        descricao: document.getElementById('descricaoServico').value,
        preco: parseFloat(document.getElementById('precoServico').value)
    };
    await fetch(`${API}/servicos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    location.reload();
}

async function listarServicos() {
    const data = await fetchAPI('/servicos');
    const lista = document.getElementById("listaServicos");
    const select = document.getElementById("servicoId");

    if (lista) {
        lista.innerHTML = data.length ? "" : "<p>Nenhum serviço cadastrado.</p>";
        data.forEach(s => lista.innerHTML += `<div class="card">${s.nome} - R$ ${s.preco}</div>`);
    }
    if (select) {
        data.forEach(s => select.innerHTML += `<option value="${s.id}">${s.nome}</option>`);
    }
}

async function agendarServico() {
    const payload = {
        cliente: { id: parseInt(document.getElementById('clienteId').value) },
        servico: { id: parseInt(document.getElementById('servicoId').value) },
        data: document.getElementById('dataAgendamento').value
    };
    await fetch(`${API}/agendamentos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    alert("Agendado com sucesso!");
    window.location.href = "agenda.html";
}

async function listarAgenda() {
    const res = await fetch(`${API}/agendamentos`);
    const data = await res.json();
    const lista = document.getElementById("listaAgenda");
    const filtroData = document.getElementById("filtroData").value;

    if (!lista) return;
    lista.innerHTML = "";

    const agendamentosFiltrados = filtroData 
        ? data.filter(a => a.data === filtroData) 
        : data;

    if (agendamentosFiltrados.length === 0) {
        lista.innerHTML = `<p style="text-align: center; color: #94a3b8; margin-top: 20px;">Nenhum agendamento encontrado.</p>`;
        return;
    }

    agendamentosFiltrados.forEach(a => {
        lista.innerHTML += `
            <div class="card" style="border-left: 5px solid ${getStatusColor(a.status)};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="margin:0">${a.cliente.nome}</h4>
                        <p style="margin: 5px 0; color: #64748b;">${a.servico.nome} • 📅 ${a.data}</p>
                        <p style="margin: 5px 0; font-size: 13px;"><strong>Valor:</strong> ${a.valorTotal ? 'R$ ' + a.valorTotal : 'Pendente'}</p>
                        <span style="font-size: 12px; font-weight: bold; color: var(--primary);">STATUS: ${a.status}</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <button class="btn-action btn-orcamento" onclick="gerarOrcamento(${a.id})">Gerar Orçamento</button>
                        <button class="btn-action btn-aprovar" onclick="alterarStatus(${a.id}, 'aprovar')">Aprovar</button>
                        <button class="btn-action btn-concluir" onclick="alterarStatus(${a.id}, 'concluir')">Concluir</button>
                        <button class="btn-action btn-cancelar" onclick="alterarStatus(${a.id}, 'cancelar')">Cancelar</button>
                    </div>
                </div>
            </div>`;
    });
}

function gerarOrcamento(id) {
    const valor = prompt("Digite o valor do orçamento:");
    if (valor) {
        fetch(`${API}/agendamentos/${id}/orcamento?valor=${valor}`, { method: "PUT" })
            .then(() => listarAgenda());
    }
}

async function alterarStatus(id, acao) {
    await fetch(`${API}/agendamentos/${id}/${acao}`, { method: "PUT" });
    listarAgenda();
}

function getStatusColor(status) {
    switch(status) {
        case 'CONCLUIDO': return '#10b981';
        case 'CANCELADO': return '#ef4444';
        case 'APROVADO': return '#3b82f6';
        default: return '#fbbf24';
    }
}

async function alterarStatus(id, acao) {
    await fetch(`${API}/agendamentos/${id}/${acao}`, { method: "PUT" });
    listarAgenda();
}

document.addEventListener("DOMContentLoaded", () => {
    listarClientes();
    listarServicos();
    if(document.getElementById("listaAgenda")) listarAgenda();
})

async function atualizarPainel() {
    const [clientes, servicos, agendamentos] = await Promise.all([
        fetch(`${API}/clientes`).then(r => r.json()),
        fetch(`${API}/servicos`).then(r => r.json()),
        fetch(`${API}/agendamentos`).then(r => r.json())
    ]);

    if (document.getElementById("countClientes")) 
        document.getElementById("countClientes").innerText = clientes.length;
    
    if (document.getElementById("countServicos")) 
        document.getElementById("countServicos").innerText = servicos.length;
    
    if (document.getElementById("countAgendamentos")) 
        document.getElementById("countAgendamentos").innerText = agendamentos.length;

    const hoje = new Date().toISOString().split('T')[0];
    const servicosHoje = agendamentos.filter(a => a.data === hoje).length;
    
    if (document.getElementById("countHoje")) 
        document.getElementById("countHoje").innerText = servicosHoje;
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarPainel();
});
