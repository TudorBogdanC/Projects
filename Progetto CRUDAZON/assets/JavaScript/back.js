
let id = '';
async function populateEditForm(productId) {
    id = productId;
    try {
        const response = await fetch(`${url}${productId}`, {
            headers: {
                "Authorization": token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.status}`);
        }

        const productDetails = await response.json();
        fillFormFields(productDetails);
    } catch (error) {
        console.error(error);
    }
}

function fillFormFields(productDetails) {
    // Popola i campi del modulo di modifica con i dati del prodotto
    document.getElementById("editName").value = productDetails.name;
    document.getElementById("editDescription").value = productDetails.description;
    document.getElementById("editPrice").value = productDetails.price;
}

// funzione per salvare le modifiche del prodotto //
async function saveChanges() {
    try {
       
        const newRecord = {
            "name": document.getElementById("editName").value,
            "description": document.getElementById("editDescription").value,
            "price": document.getElementById("editPrice").value,
            
        }
        let response = await fetch(`${url}${id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(newRecord)
            
        })

         result = await response.json();
    } catch (error) {
        console.log(error);
    }

}

window.onload = function() {
    // Recupera l'ID del prodotto dalla query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Se l'ID è presente, popola il modulo di modifica con i dati del prodotto
    if (productId) {
        populateEditForm(productId);
    }
};