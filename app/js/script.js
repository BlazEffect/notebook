window.onload = function (){

    let addNoteOpenButton = document.querySelector(".notepad-add-button .add");
    let addNoteCloseButton = document.querySelector(".notepad-add-popup__close-button");
    let addNoteForm = document.querySelector(".main__notepad-add-popup");

    addNoteOpenButton.addEventListener("click", function(event){
        event.preventDefault();

        if(addNoteForm.classList.contains("notepad-add-popup--close")){
            addNoteForm.classList.remove("notepad-add-popup--close");
            addNoteForm.classList.add("notepad-add-popup--open");
        }
    });

    addNoteCloseButton.addEventListener("click", function(){
        addNoteForm.classList.remove("notepad-add-popup--open");
        addNoteForm.classList.add("notepad-add-popup--close");
    });

    function sendAjax(method, url, data){

    }
}