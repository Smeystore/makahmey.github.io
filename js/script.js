document.addEventListener('DOMContentLoaded', loadInventory);

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;

    if (!name || !price) {
        alert("Please fill out all fields.");
        return;
    }

    const product = { name, price };
    saveToLocalStorage(product);
    appendProductRow(product);

    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
}

function appendProductRow(product) {
    const table = document.getElementById('inventory-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${product.name}</td>
        <td class="product-price">${product.price} Riel</td>
        <td>
            <button onclick="editPrice(this)">Edit Price</button>
            <button onclick="deleteProduct(this, '${product.name}')">Delete</button>
        </td>
    `;

    table.appendChild(row);
}

function saveToLocalStorage(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function loadInventory() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(appendProductRow);
}

function resetInventory() {
    localStorage.removeItem('products');
    document.getElementById('inventory-list').innerHTML = '';
}

function deleteProduct(button, name) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.name !== name);
    localStorage.setItem('products', JSON.stringify(products));

    button.parentElement.parentElement.remove();
}

function editPrice(button) {
    const row = button.parentElement.parentElement;
    const priceCell = row.querySelector('.product-price');

    let currentPrice = priceCell.textContent.replace(' Riel', '');
    let newPrice = prompt("Enter new price in Riel:", currentPrice);

    if (newPrice) {
        priceCell.textContent = `${newPrice} Riel`;

        let products = JSON.parse(localStorage.getItem('products')) || [];
        const name = row.cells[0].textContent;
        products = products.map(product => {
            if (product.name === name) {
                product.price = newPrice;
            }
            return product;
        });
        localStorage.setItem('products', JSON.stringify(products));
    }
}

function searchProduct() {
    const searchQuery = document.getElementById('search-box').value.toLowerCase();
    const rows = document.getElementById('inventory-list').getElementsByTagName('tr');

    for (let row of rows) {
        const productName = row.getElementsByTagName('td')[0].textContent.toLowerCase();
        row.style.display = productName.includes(searchQuery) ? '' : 'none';
    }
}
