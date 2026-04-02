let items = [
    {id: Date.now(), name: "Mobil", price: 150000000, quantity: 1, category: "transportation"},
    {id: Date.now(), name: "Monitor", price: 1250000, quantity: 2, category: "electronic"}
];

let totalItemPrice = document.getElementById("totalItemPrice");

const buttons = document.querySelectorAll(".category-btn");
const buttonStyle = "bg-white w-max p-1 px-5 rounded";
const itemContainer = document.getElementById("item-list");
let activeCategory = "all";
let editing = false;

const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

const input = {
    name: document.getElementById("name"),
    price: document.getElementById("price"),
    quantity: document.getElementById("quantity"),
    category: document.getElementById("category"),
    addItem: document.getElementById("add-btn")
};

buttons.forEach(btn => {
    btn.className = buttonStyle;
    btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-input');
        let result;
        if (activeCategory === 'all'){
            result = items;
        } else {
            result = items.filter(item => item.category === activeCategory);
        }
        renderItem(result);
    })
})

function renderItem(data){
    itemContainer.innerHTML = '';

    data.forEach(item =>{
        total = item.price * item.quantity;
        newTotal = idrConvert(total);
        newPrice = idrConvert(item.price)
        itemContainer.innerHTML += `
        <div class="flex flex-col justify-center items-center bg-white p-4 rounded-xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all p-5">
        <h3 class="font-bold text-lg">${item.name}</h3>
        <p class="text-gray-500 text-sm">${item.category}</p>   
        <p class="text-indigo-500 font-semibold mt-2">${newPrice} | (Amount: ${item.quantity})</p>
        <p class="text-gray-500">Total: ${newTotal}</p>
        <div>
        <button class="bg-red-300 p-1 px-2 rounded mt-2" onclick="deleteItem(${item.id})">Delete</button>
        <button class="bg-green-300 p-1 px-2 rounded mt-2" onclick="editItem(${item.id})">Edit</button>
        </div>
        </div>
        `;
    });

    totalPrice();
};

input.addItem.addEventListener('click', () => {
    if (editing){
        // Find the item being edited
        const targetId = items.find(item => item.name === input.name.value)?.id;
        if (targetId){
            saveEdit(targetId);
        }
    } else {
        // Add new item
        const values = {
            itemName: input.name.value,
            itemPrice: input.price.value,
            itemQuantity: input.quantity.value,
            itemCategory: input.category.value
        };
        let newItem = {
            id: Date.now(),
            name: values.itemName,
            price: values.itemPrice, 
            quantity: values.itemQuantity,
            category: values.itemCategory
        };
        items.push(newItem);
        alert("New item has been created!");
        renderItem(items);
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.value = '';
        })
    }
});

function idrConvert(data){
    return formatter.format(data);
};

function clearInput(){
    const inputs = document.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.value = '';
    })
};

function deleteItem(targetId){
    if (confirm("Are you sure you want to delete this item?")) {
        const index = items.findIndex(item => item.id === targetId);
        if (index !== -1){
            items.splice(index, 1);
        }
        alert("Item has been removed!")
        renderItem(items);
    } else {
        alert("Removement was cancelled")
    }
};

function totalPrice(){
    let total = 0;
    
    items.forEach(item => {
        const pricePerItem = item.price * item.quantity;
        total += pricePerItem;
    });

    const convertedTotal = idrConvert(total);

    totalItemPrice.innerHTML = `Total: ${convertedTotal}`
}

function editItem(targetId){
    const index = items.findIndex(item => item.id === targetId);
    if (index !== -1){
        const item = items[index];
        
        // Fill form with current item data
        input.name.value = item.name;
        input.price.value = item.price;
        input.quantity.value = item.quantity;
        input.category.value = item.category;
        
        // Change button text and functionality
        input.addItem.textContent = "Update Item";
        input.addItem.className = "bg-blue-500 text-white p-2 px-4 rounded";
        editing = true;
    }
}

function saveEdit(targetId){
    const index = items.findIndex(item => item.id === targetId);
    if (index !== -1){
        items[index].name = input.name.value;
        items[index].price = input.price.value;
        items[index].quantity = input.quantity.value;
        items[index].category = input.category.value;
        
        alert("Item has been updated!");
        editing = false;
        clearInput();
        input.addItem.textContent = "Add Item";
        input.addItem.className = "bg-green-300 p-1 px-2 rounded mt-2";
        renderItem(items);
    }
}

renderItem(items);
