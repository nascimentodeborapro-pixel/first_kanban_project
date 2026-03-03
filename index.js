const columns = document.querySelectorAll(".column_card");
const cards = document.querySelectorAll(".card");
const boarData =[];
let draggedCard;
let touchDraggedCard = null; 

/*  DRAG START   */ 

const dragStart = (event) => {
    draggedCard = event.currentTarget;
    event.dataTransfer.effectallowed = "move";

    // aaplica ao class la no CSS;
    draggedCard.classList.add('dragging');
};

/* touch no mobi*/

function touchDragStart(event) {
    
    event.preventDefault();
    touchDraggedCard = event.currentTarget;
    touchDraggedCard.classList.add('dragging');
}

function touchDragMove(event) {
    event.preventDefault();
    if (!touchDraggedCard) return;
    const touch = event.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    columns.forEach(col => col.classList.remove('column--highlitgh'));
    if (el) {
        const col = el.closest('.column_card');
        if (col) col.classList.add('column--highlitgh');
    }
}

function touchDragEnd(event) {
    event.preventDefault();
    if (!touchDraggedCard) return;
    const touch = event.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el) {
        const col = el.closest('.column_card');
        if (col) {
            const button = col.querySelector('.add-cardbtn');
            col.insertBefore(touchDraggedCard, button);
        }
    }
    touchDraggedCard.classList.remove('dragging');
    columns.forEach(col => col.classList.remove('column--highlitgh'));
    touchDraggedCard = null;
}

/*    DRAGOVER      */ 


const dragOver = (event) => {
    event.preventDefault();
};

/*    DRAG ENTER  */ 


const dragEnter = (event) => {
    const column = event.target.closest(".column_card");
    if (column) {
        column.classList.add("column--highlitgh");
    }
};
/*    DRAG LEAVE*/


const dragLeave = (event) => {
    const column = event.target.closest(".column_card");
    if (column) {
        column.classList.remove("column--highlitgh");
    }
};

/*    DROP  */


const drop = (event) => {
    event.preventDefault();
    const column = event.target.closest(".column_card");
    if (column) {
        column.classList.remove("column--highlitgh");
        const button = column.querySelector('.add-cardbtn');
        if (draggedCard && draggedCard !== button) {
            column.insertBefore(draggedCard, button);
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
    
    // add touch support to newly created cards
    card.addEventListener('touchstart', touchDragStart, {passive: false});
    card.addEventListener('touchmove', touchDragMove, {passive: false});
    card.addEventListener('touchend', touchDragEnd);
    
    column.insertBefore(card, button);    
    card.focus();

}
 
cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", (event) => {
        draggedCard = null;
        event.currentTarget.classList.remove('dragging');
    });

    // touch mobile
    card.addEventListener('touchstart', touchDragStart, {passive: false});
    card.addEventListener('touchmove', touchDragMove, {passive: false});
    card.addEventListener('touchend', touchDragEnd);
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

