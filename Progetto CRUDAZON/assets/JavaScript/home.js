const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThmZGNiOWRiOGY5NzAwMThiODMwZGYiLCJpYXQiOjE3MDM5MjY5NjksImV4cCI6MTcwNTEzNjU2OX0.nYdcNpqP8-M1X6Dfnnx-eYCpfEK0nB87kLql9A7P2CI";
const headers = {
    "Authorization": token,
    "Accept": "application/json",
    "Content-Type": "application/json"
}

let products = [];





async function renderProducts() {
    try {
      const response = await fetch(url, {
        headers: headers,
      });
      const data = await response.json();
      products = data;
      createCards(products);
    } catch (error) {
      
    }
  }


  async function sendData() {
    try {
        const newRecord = {
            "name": document.getElementById("inputName").value,
            "brand": document.getElementById("inputBrand").value,
            "description": document.getElementById("inputDescription").value,
            "price": document.getElementById("inputPrice").value,
            "imageUrl": document.getElementById("inputImageUrl").value
        }
        let response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newRecord)
            
        })

    let result = await response.json();
    createCards(result);
    } catch (error) {
        console.log(error);
    }

}


function createCards(products) {
    console.log(products);

    let cards = document.getElementById("card");

    cards.innerHTML = '';

    products.forEach(product => {
       let card = `
        <div class="col-sm-12 col-lg-4 g-4">
            <div class="card">
                <img class="card-img-top" src="${product.imageUrl}" alt="Cellulare">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">$${product.price}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <a class="btn btn-info" href="./details.html?id=${product._id}">Dettagli</a>
                    <a href="#" class="btn btn-danger" onclick="openEditWindow('${product._id}')">Modifica</a>
                </div>
            </div>
        </div>    
        `;
        cards.innerHTML += card;
    });
   
}

function openEditWindow(productId) {
    window.open(`back-office.html?id=${productId}`, "_blank", "width=900,height=500");
}

window.onload = function() {
    renderProducts();
    
   
}