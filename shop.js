

const n_goal = document.getElementById("new-item")
const c_goal = document.getElementById("close-item");
const s_goal = document.getElementById("submit-item");

const shop_output = document.getElementById("shop-output");

const shop_form = document.getElementById("item-form");
const clear = document.getElementById("clear-bought");
const show_bought = document.getElementById("show-bought");

const cantbuy = document.getElementById("cantbuy-form");
const c_cantbuy = document.getElementById("close-cantbuy");

const delete_form = document.getElementById("delete-form");

let items = JSON.parse(localStorage.getItem("items")) || [];
let items_bought = JSON.parse(localStorage.getItem("items_bought")) || [];

const renewable = document.querySelector('input[name="item-type"]:checked').value === "renewable";


if (n_goal){
    n_goal.addEventListener("click", function() {
        showItemPopup(true);
    });
}

if (c_goal){
    c_goal.addEventListener("click", function() {
        showItemPopup(false);
    });
}
if (s_goal){
    s_goal.addEventListener("click", function() {
        uploadItem();
    });
}

if (clear){
    clear.addEventListener("click", function() {
        clearBought();
    });
}

if (show_bought){
    show_bought.addEventListener("click", function(){
        displayBought();
    })
}

if (c_cantbuy){
    c_cantbuy.addEventListener("click", function() {
        showCantBuy(false);
    });
}

function showItemPopup(isVisible) {
    const itemPopup = document.querySelector(".item-popup");
    const itemPopupOverlay = document.querySelector(".popup-overlay");

    if (isVisible) {
        itemPopup.classList.add("show");
        itemPopupOverlay.classList.add("show");
    } else {
        itemPopup.classList.remove("show");
        itemPopupOverlay.classList.remove("show");
    }
}

function showCantBuy(isVisible) {
    const itemPopup = document.querySelector(".cantbuy-popup");
    const itemPopupOverlay = document.querySelector(".popup-overlay");

    if (isVisible) {
        itemPopup.classList.add("show");
        
        itemPopupOverlay.classList.add("show");
    } else {
        itemPopup.classList.remove("show");
        itemPopupOverlay.classList.remove("show");
    }
}

function uploadItem() {
    const item_name = document.getElementById("item-name").value.trim();
    const item_value = document.getElementById("item-value").value.trim();
    const details = document.getElementById("item-details").value.trim();
    const renewable = document.querySelector('input[name="item-type"]:checked').value === "renewable";
    const id = Date.now();

    const entry = {item_name, item_value, details,renewable, id};

    items.push(entry);
    localStorage.setItem("items", JSON.stringify(items));

    displayItems(items);

    shop_form.reset();
    showSessionPopup(false);

}
function displayItems(items) {
    const shop_output = document.getElementById("shop-output");
    if (!shop_output) return;
    if (shop_output){
        shop_output.innerHTML = "";
        items.forEach(data => {
            const item = document.createElement("div");
            item.classList.add("item-card");

            const value = document.createElement("h2");
            value.textContent = data.item_value;

            const details = document.createElement("p");
            details.classList.add("sp");
            details.textContent = data.details;

            const renew = document.createElement("h1");
            renew.classList.add("sh1");
            renew.textContent = data.item_name + (data.renewable ? " (Renewable)" : "");

            const buy = document.createElement("button");
            buy.textContent = "buy";
            buy.classList.add("buy-btn");

            const deleteitem = document.createElement("button");
            deleteitem.textContent = "delete";
            deleteitem.classList.add("buy-btn");

            
            item.appendChild(renew);
            item.appendChild(value);   
            item.appendChild(details);
            
            item.appendChild(buy);
            item.appendChild(deleteitem);

            shop_output.appendChild(item);
 
            buy.addEventListener("click", () => {
                buyItem(data.id);
            });

            deleteitem.addEventListener("click", () => {
                showDelete(true);
                const y_delete = document.getElementById("yes-delete");
                const n_delete = document.getElementById("no-delete");
                y_delete.addEventListener("click", function(){
                    deleteItem(data.id);
                    showDelete(false);
                })
                n_delete.addEventListener("click", function(){
                    showDelete(false);
                })
            });

        });
    }
}

function clearBought(){
    items_bought = [];
    localStorage.setItem("items_bought", JSON.stringify(items_bought));
    calculatehours();
}

function displayBought(){
    let items_bought = JSON.parse(localStorage.getItem("items_bought")) || [];

    calculatehours();
    displayItems(items_bought);

}


function buyItem(id) {
        // remove from localStorage
    const totalhours = JSON.parse(localStorage.getItem("hours_total"))
    const item = items.find(i => i.id === id);

    if (item.item_value<=totalhours){

        if (item){
            let items_bought = JSON.parse(localStorage.getItem("items_bought")) || [];
            items_bought.push(item);
            localStorage.setItem("items_bought", JSON.stringify(items_bought));
        }

        if (!item.renewable){
            items = items.filter(session => session.id !== id);
            localStorage.setItem("items", JSON.stringify(items));
        }

        displayItems(items);
        calculatehours();
    }
    else{
        showCantBuy(true);
    }
        // remove from UI
}

function deleteItem(id){
    const item = items.find(i => i.id === id);

    if (item){
        items = items.filter(session => session.id !== id);
        localStorage.setItem("items", JSON.stringify(items));

        displayItems(items);
    }
}


displayItems(items);