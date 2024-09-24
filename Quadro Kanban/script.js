const columns = document.querySelectorAll(".column");

document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {  // Corrigido para "dragend"
    e.target.classList.remove("dragging");
});

columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        e.preventDefault();  // Previne o comportamento padrão do dragover
        const dragging = document.querySelector(".dragging");  // Corrigido para "querySelector"
        const applyAfter = getNewPosition(item, e.clientY);

        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            item.prepend(dragging);
        }
    });
});

function getNewPosition(column, positionY) {
    const cards = column.querySelectorAll(".item:not(.dragging)");  // Corrigido para "querySelectorAll"
    let result;

    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if (positionY >= boxCenterY) result = refer_card;
    }
    return result;
}