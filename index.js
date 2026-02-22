const columns = document.querySelectorAll(".column_card");
const cards = document.querySelectorAll(".card");
const boarData =~[];
let draggedCard;


const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectallowed = "move";
};
const dragOver = (event) => {
    event.preventDefault();
};
const dragEnter = ({ target }) => {
    if(target.classList.contains("column_card")) {
        target.classList.add("column--highlitgh");
    }
};
const dragLeave = ({ target }) => {
    target.classList.remove("column--highlitgh");
};
const drop = ({ target }) => {
    if(target.classList.contains("column_card")){
     target.classList.remove("column--highlitgh");
    target.append(draggedCard);
    }
   
};


const creatCard = ({ target }) => {
    if(!target.classList.contains("column_card")) return;

    const card = document.createElement("section");
    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    card.addEventListener("focusout",() =>{
        card.contentEditable = "true";
        if(!card.textContent) card.remove();

    });

    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dblclick", creatCard)

    target.append(card);
    card.focus();

}
 
cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
});

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", creatCard);
});

