async function addProduct() {
    try {
        const newRecord = {
            "name": document.getElementById("editName").value,
            "description": document.getElementById("editDescription").value,
            "price": document.getElementById("editPrice").value,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newRecord)
        });

        if (!response.ok) {
            throw new Error(`Error in request: ${response.status}`);
        }

        // Close the current window and navigate to the homepage
        window.close();
        window.opener.location.reload();
    } catch (error) {
        console.log(error);
    }
}

// Function to handle the save button click event
function saveNewProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        updateProduct(); // If productId exists, update the product
    } else {
        addProduct(); // Otherwise, add a new product
    }
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        populateEditForm(productId);
    }
    
    // Add event listener to the save button
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", saveNewProduct);
};