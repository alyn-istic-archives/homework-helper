

const n_goal = document.getElementById("new-item")
const c_goal = document.getElementById("close-item");
const s_goal = document.getElementById("submit-item");

const shop_output = document.getElementById("shop-output");

const shop_form = document.getElementById("item-form");
const clear = document.getElementById("clear-bought");

let items = JSON.parse(localStorage.getItem("items")) || [];
let items_bought = JSON.parse(localStorage.getItem("items_bought")) || [];


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
function uploadItem() {
    const item_name = document.getElementById("item-name").value.trim();
    const item_value = document.getElementById("item-value").value.trim();
    const details = document.getElementById("item-details").value.trim();
    const id = Date.now();

    const entry = {item_name, item_value, details, id};

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

            const name = document.createElement("h1");
            name.classList.add("sh1");
            name.textContent = data.item_name;

            const value = document.createElement("p");
            value.classList.add("sp");
            value.textContent = data.item_value;

            const details = document.createElement("p");
            details.classList.add("sp");
            details.textContent = data.details;

            const buy = document.createElement("button");
            buy.textContent = "buy";
            buy.classList.add("buy-btn");

            item.appendChild(name);
            item.appendChild(value);   
            item.appendChild(details);
            item.appendChild(buy);

            shop_output.appendChild(item);
 
            buy.addEventListener("click", () => {
                buyItem(data.id, data.item_value, data);
            });

        });
    }
    
}

function clearBought(){
    items_bought = [];
    localStorage.setItem("items_bought", JSON.stringify(items_bought));
    calculatehours();
}

function buyItem(id) {
        // remove from localStorage
        const item = items.find(i => i.id === id);


        if (item){
            let items_bought = JSON.parse(localStorage.getItem("items_bought")) || [];
            items_bought.push(item);
            localStorage.setItem("items_bought", JSON.stringify(items_bought));
        }


        items = items.filter(session => session.id !== id);
        localStorage.setItem("items", JSON.stringify(items));

        displayItems(items);
        calculatehours();
        // remove from UI
}

displayItems(items);