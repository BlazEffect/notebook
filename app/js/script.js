window.onload = function (){
    let addNoteOpenButton = document.querySelector(".notepad-add-button .add");
    let addNoteCloseButton = document.querySelector(".notepad-add-popup__close-button");
    let addNoteForm = document.querySelector(".main__notepad-add-popup");

    let addNoteButton = document.querySelector(".main__notepad-add-popup .form-add .add");

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

    addNoteButton.addEventListener("click", function(){
        let textarea = document.querySelector(".main__notepad-add-popup .form-add .form-text");

        let request = new XMLHttpRequest();

        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE && request.status === 404){
                alert("Запись не добавилась, исполняемый файл не найден");
                addNoteForm.classList.remove("notepad-add-popup--open");
                addNoteForm.classList.add("notepad-add-popup--close");
            }
            if(request.readyState === XMLHttpRequest.DONE && request.status === 504){
                alert("Запись не добавилась, долгое исполнение файла");
                addNoteForm.classList.remove("notepad-add-popup--open");
                addNoteForm.classList.add("notepad-add-popup--close");
            }
            if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
                addNoteForm.classList.remove("notepad-add-popup--open");
                addNoteForm.classList.add("notepad-add-popup--close");
            }
        }

        request.responseType =	"json";
        request.open("post", "ajax/addNote.php", true);

        request.send(textarea.value);
    });
}