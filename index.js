const columns = document.querySelectorAll(".column_card");
const cards = document.querySelectorAll(".card");
const boarData =[];
let draggedCard;

/*  DRAG START   */ 

const dragStart = (event) => {
    draggedCard = event.currentTarget;
    event.dataTransfer.effectallowed = "move";

    // aaplica ao class la no CSS;
    draggedCard.classList.add('dragging');
};

/*    DRAGOVER      */ 


const dragOver = (event) => {
    event.preventDefault();
};

/*    DRAG ENTER  */ 


const dragEnter = ({ target }) => {
    if(target.classList.contains("column_card")) {
        target.classList.add("column--highlitgh");
    }
};
/*    DRAG LEAVE*/


const dragLeave = ({ target }) => {
    target.classList.remove("column--highlitgh");
};

/*    DROP  */


const drop = ({ target }) => {
    // quando drop passar o card para outra coluna 
    if (target.classList.contains("column_card")) {
        target.classList.remove("column--highlitgh");

        const button = target.querySelector('.add-cardbtn');
        if (draggedCard && draggedCard !== button) {
            target.insertBefore(draggedCard, button);
        }
    }
};


const creatCard = (column, button) => {
    if(!column.classList.contains("column_card")) return;

    const card = document.createElement("section");
    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    card.addEventListener("focusout",() =>{
        card.contentEditable = "true";
        if(!card.textContent) card.remove();

    });

    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dblclick", creatCard);
    ;
    
    column.insertBefore(card, button);    
    card.focus();

}
 
cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", (event) => {

        draggedCard = null;
    
        event.currentTarget.classList.remove('dragging');
    });
});
// aqui e onde a função esta sendo excutada
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", creatCard);

    const addBtn = column.querySelector('.add-cardbtn');

    addBtn.addEventListener("click", () => {
        creatCard(column, addBtn);

    });


});

