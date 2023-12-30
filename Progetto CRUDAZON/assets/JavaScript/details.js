

async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`${url}${productId}`, {
      headers: {
        "Authorization": token,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Errore nella richiesta: ${response.status}`);
    }

    const productDetails = await response.json();
    displayProductDetails(productDetails);
  } catch (error) {
    console.error(error);
  }
}

function displayProductDetails(productDetails) {
  const productDetailsContainer = document.getElementById("productDetails");

 
  const html = `
  <div class="col-sm-4">
  <div class="card">
      <img class="card-img-top" src="${productDetails.imageUrl}" alt="Cellulare">
      <div class="card-body">
          <h5 class="card-title">${productDetails.name}</h5>
          <p class="card-text">${productDetails.description}</p>
          <p class="card-text">$${productDetails.price}</p>
      </div>
  </div>
</div>
    `;

  productDetailsContainer.innerHTML += html;
}

// Esegui la funzione principale quando la pagina si carica
window.onload = function () {

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Se l'ID è presente, recupera e visualizza i dettagli del prodotto
  if (productId) {
    fetchProductDetails(productId);
  }
};
