let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let deleteAll = document.getElementById("deleteAll");
let tbody = document.getElementById("tbody");

let products;
if (localStorage.products != null) {
    products = JSON.parse(localStorage.products); 
} else {
    products = [];
}
getTotal();

//read all products after upload page 
readProduct();

mood = "create"
create.innerHTML = "create";

let tmp;

//getTotal
function getTotal() {
    if (price.value != "") {
        total.innerHTML = `total: ${+price.value + +taxes.value + +ads.value - +discount.value}`;
        total.style.background = "#4caf50";
    } else {
        total.innerHTML = `total`;
        total.style.background = "#f44336";
    }
}    


//create

function createProduct() {
    if (mood == "create") {
        if (count.value == "") {count.value = 1}
        if (count.value >= 1){
            for(let i = 0; i < +count.value; i++){
                let newProduct = {
                    title: title.value.toLowerCase(),
                    price: price.value,
                    taxes: taxes.value,
                    ads: ads.value,
                    discount: discount.value,
                    total: total.innerHTML,
                    category: category.value.toLowerCase(),
                }
                products.push(newProduct);
                localStorage.setItem("products", JSON.stringify(products));
            }
        } else { 
            window.alert("enter a positive number")
        }
    } else { //mood == "update"
        products[tmp].title = title.value;
        products[tmp].price = price.value;
        products[tmp].taxes = taxes.value;
        products[tmp].ads = ads.value;
        products[tmp].discount = discount.value;
        products[tmp].total = total.innerHTML;
        products[tmp].category = category.value;
        localStorage.products = JSON.stringify(products);
        create.innerHTML = "create";
        mood = "create";
        count.style.display = "block";
    }
    clearData();
    readProduct();
}

//clear data 
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    search.value = "";
    getTotal();
}

function readProduct() {
    if (localStorage.products != null) {
        products = JSON.parse(localStorage.getItem("products"));
        tbody.innerHTML = "";
        for(let i = 0; i < products.length; i++){
            tbody.innerHTML +=
            `<tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button id="update" onclick=updateProduct(${i})>update</button></td>
                <td><button id="delete" onclick=deleteProduct(${i})>delete</button></td>
            </tr>`;
        }    
    } else {
        tbody.innerHTML = "";
    }
    showDeleteAllButton();
}


function showDeleteAllButton() {
    if (localStorage.products != null) {
        deleteAll.style.display = "block";
    } else {
        deleteAll.style.display = "none";
    }
}

function clearAllData() {
    localStorage.clear();
    products = [];
    readProduct();
}

function deleteProduct(i){
    products.splice(i, 1); //delete product(i)
    localStorage.products = JSON.stringify(products);
    if (products.length == 0) {
        localStorage.clear();
    }
    readProduct();
}

function updateProduct(i) {
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    category.value = products[i].category;
    count.style.display = "none";
    create.innerHTML = "update";
    mood = "update";
    tmp = i;
    scroll = ({
        top: 0,
    })
}

let searchMood;
function searchClick(id) {
    if (id == "searchTitle") {
        search.placeholder = "search by title";
        searchMood = "searchTitle";
    } else { //id == "searchCategory"
        search.placeholder = "search by category";
        searchMood = "searchCategory";
    }
    search.value = "";
    search.focus();
    readProduct();
}

function searchProduct(value) {
    if (searchMood == "searchTitle") {
        tbody.innerHTML = "";
        for (let i = 0; i < products.length; i++){
            if (products[i].title.includes(value.toLowerCase())) {
                tbody.innerHTML +=
                `<tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button id="update" onclick=updateProduct(${i})>update</button></td>
                    <td><button id="delete" onclick=deleteProduct(${i})>delete</button></td>
                </tr>`;
            }
        }
    } else { //searchMood == "searchCategory"
        tbody.innerHTML = "";
        for (let i = 0; i < products.length; i++){
            if (products[i].category.includes(value.toLowerCase())) {
                tbody.innerHTML +=
                `<tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button id="update" onclick=updateProduct(${i})>update</button></td>
                    <td><button id="delete" onclick=deleteProduct(${i})>delete</button></td>
                </tr>`;
            }
        }
    }
}