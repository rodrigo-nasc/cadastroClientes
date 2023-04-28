const adicionar = document.getElementById("add-cliente");
const modal = document.getElementById("caixa-modal");
const form = document.getElementById("form");
const adicionaCliente = document.getElementById("adicionar");
const cancela = document.getElementById("cancelar");
const erro = document.querySelector(".error");
const container = document.querySelector(".container");

let corpoTabela = document.querySelector(".corpo-tabela");

const campoNome = document.querySelector(".info-nome");
const campoEmail = document.querySelector(".info-email");
const campoCelular = document.querySelector(".info-celular");
const campoCidade = document.querySelector(".info-cidade");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const celular = document.getElementById("celular");
const cidade = document.getElementById("cidade");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
mostrarClientes();

console.log(clientes);

let novaLinha = null;

adicionaCliente.addEventListener("click", () => {
    if (nome.value && email.value && celular.value && cidade.value) {
        if (novaLinha) {
            novaLinha.querySelector(".info-nome").innerText = nome.value;
            console.log((novaLinha.querySelector(".info-nome").innerText = nome.value));
            novaLinha.querySelector(".info-email").innerText = email.value;
            novaLinha.querySelector(".info-celular").innerText = celular.value;
            novaLinha.querySelector(".info-cidade").innerText = cidade.value;
            alert("Atualizado com sucesso");
            novaLinha = null;
            escondeModal();
            container.classList.remove("container-opacity");
        } else {
            dadosCliente();
            escondeModal();
            container.classList.remove("container-opacity");
        }

        nome.value = "";
        email.value = "";
        celular.value = "";
        cidade.value = "";
    } else {
        erro.textContent = "Preencha todos os campos";
        erro.classList.remove("esconde");
        erro.classList.add("aparece");
    }
});

adicionar.addEventListener("click", () => {
    mostrarModal();
    container.classList.add("container-opacity");
});

cancela.addEventListener("click", () => {
    escondeModal();
    erro.classList.add("esconde");
    container.classList.remove("container-opacity");
    novaLinha = null;
    nome.value = "";
    email.value = "";
    celular.value = "";
    cidade.value = "";
});

function dadosCliente() {
    let cliente = {
        nome: nome.value,
        email: email.value,
        celular: celular.value,
        cidade: cidade.value,
    };

    clientes.push(cliente);

    localStorage.setItem("clientes", JSON.stringify(clientes));
    console.log(clientes);

    mostrarClientes();
}

function mostrarClientes() {
    let corpoTabela = document.querySelector(".corpo-tabela");
    corpoTabela.innerHTML = "";

    clientes.forEach((cliente, index) => {
        const novoCliente = document.createElement("tr");
        novoCliente.className = "cliente";

        const valorNome = document.createElement("td");
        valorNome.textContent = cliente.nome;
        valorNome.className = "info-nome";

        const valorEmail = document.createElement("td");
        valorEmail.textContent = cliente.email;
        valorEmail.className = "info-email";

        const valorCelular = document.createElement("td");
        valorCelular.textContent = cliente.celular;
        valorCelular.className = "info-celular";

        const valorCidade = document.createElement("td");
        valorCidade.textContent = cliente.cidade;
        valorCidade.className = "info-cidade";

        const buttons = document.createElement("span");
        buttons.className = "botoes";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.dataset.index = index;

        editar.addEventListener("click", () => {
            console.log("oi");
            mostrarModal();
            novaLinha = novoCliente;
            nome.value = valorNome.textContent;
            email.value = valorEmail.textContent;
            celular.value = valorCelular.textContent;
            cidade.value = valorCidade.textContent;

            container.classList.add("container-opacity");
        });

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.dataset.index = index;

        buttons.append(editar, excluir);

        novoCliente.append(valorNome, valorEmail, valorCelular, valorCidade, buttons);
        corpoTabela.appendChild(novoCliente);

        /*li.innerHTML = `
        <span class="nome">Nome: </span>${cliente.nome} 
        <span class="email">E-mail: </span>${cliente.email} 
        <span class="celular">Celular: </span>${cliente.celular} 
        <span class="cidade">Cidade: </span>${cliente.cidade} 
        <span class="buttons"><button class="editar">Editar</button><button class="excluir" data-index="${index}">Excluir</button></span> `;
        li.className = "cliente";*/
    });

    const botoesExcluir = document.querySelectorAll(".excluir");
    console.log(botoesExcluir);
    botoesExcluir.forEach((botao) => {
        botao.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            removerCliente(index);
            alert("Cliente removido");
        });
    });
}

function mostrarModal() {
    modal.classList.remove("esconde");
    modal.classList.add("aparece");
}

function escondeModal() {
    modal.classList.add("esconde");
    modal.classList.remove("aparece");
}

function removerCliente(index) {
    clientes.splice(index, 1);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    mostrarClientes();
}