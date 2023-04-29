const campoBusca = document.getElementById("campo-busca");

campoBusca.addEventListener("input", () => {
  let valorBusca = campoBusca.value.toLowerCase();

  let listaClientes = document.querySelectorAll(".cliente");
  console.log(clientes);

  listaClientes.forEach((cliente) => {
    let nomeCliente = cliente.querySelector(".info-nome").textContent.toLowerCase();
    console.log(nomeCliente);

    if (nomeCliente.includes(valorBusca)) {
      cliente.style.display = "";
    } else {
      cliente.style.display = "none";
    }
  });
});
