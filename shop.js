
const form = document.getElementById("shop-form");
const s_item_btn = document.getElementById("submit-item");

let items = JSON.parse(localStorage.getItem("sessions")) || [];

if (s_item_btn){
    s_item_btn.addEventListener("click", function(event) {
        event.preventDefault();
        uploadSession();
        updatehours(sessions);
    });
}

uploadSession(){
    const item_name = document.getElementById("item-name").value.trim();
    const item_value = document.getElementById("item-value").value.trim();
    const details = document.getElementById("item-details").value.trim();
    const id = Date.now();

    const entry = {item_name, item_value, details, id};

    sessions.push(entry);

    localStorage.setItem("sessions", JSON.stringify(sessions));

    displayEntries(sessions);

    genCourseBtns();

    form.reset();
    showSessionPopup(false);

}