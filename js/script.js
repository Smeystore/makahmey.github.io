// Add new product to the database
function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;

    if (!name || !price) {
        alert("Please fill out all fields.");
        return;
    }

    const product = { name, price };

    fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        appendProductRow(data);
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
    })
    .catch(err => console.error(err));
}

// Load inventory from the database
function loadInventory() {
    fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(appendProductRow);
        })
        .catch(err => console.error(err));
}

// Delete product from the database
function deleteProduct(button, id) {
    fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        button.parentElement.parentElement.remove();
    })
    .catch(err => console.error(err));
}

// Edit product price
function editPrice(button) {
    const row = button.parentElement.parentElement;
    const priceCell = row.querySelector('.product-price');

    let currentPrice = priceCell.textContent.replace(' Riel', '');
    let newPrice = prompt("Enter new price in Riel:", currentPrice);

    if (newPrice) {
        fetch(`http://localhost:5000/api/products/${row.dataset.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price: newPrice })
        })
        .then(response => response.json())
        .then(updatedProduct => {
            priceCell.textContent = `${updatedProduct.price} Riel`;
        })
        .catch(err => console.error(err));
    }
}
