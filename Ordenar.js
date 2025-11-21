let produtos = [];

$(document).ready(function () {
  $.ajax({
    url: "products.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      produtos = data;
      renderizar(produtos);
    },
  });

  $("#ordenar").on("change", function () {
    const opcao = $(this).val();
    let lista = [...produtos]; // copia da lista

    switch (opcao) {
      case "name-asc":
        lista.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-desc":
        lista.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "price-asc":
        lista.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        lista.sort((a, b) => b.price - a.price);
        break;

      case "category":
        lista.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    renderizar(lista);
  });
});

// Função para mostrar os produtos na tela
function renderizar(lista) {
  $("#catalogo").empty();

  lista.forEach((p) => {
    $("#catalogo").append(`
            <div class="card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>Categoria: ${p.category}</p>
                <p><strong>R$ ${p.price.toFixed(2)}</strong></p>
            </div>
        `);
  });
}
