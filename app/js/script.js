window.onload = function (){
    let addNoteOpenButton = document.querySelector(".notepad-add-button .add");
    let addNoteCloseButton = document.querySelector(".main__notepad-add-popup .notepad__close-button");
    let addNoteForm = document.querySelector(".main__notepad-add-popup");

    let addNoteButton = document.querySelector(".main__notepad-add-popup .form-add .add");

    addNoteOpenButton.addEventListener("click", function(event){
        if(addNoteForm.classList.contains("notepad-popup--close")){
            addNoteForm.classList.remove("notepad-popup--close");
            addNoteForm.classList.add("notepad-popup--open");
        }
    });

    addNoteCloseButton.addEventListener("click", function(){
        if(getTextNoteForm(".main__notepad-add-popup .form-add .form-text")){
            if(confirm("Вы точно хотите закрыть форму добавления заметки?") === true){
                addNoteForm.classList.remove("notepad-popup--open");
                addNoteForm.classList.add("notepad-popup--close");
            }
        }else{
            addNoteForm.classList.remove("notepad-popup--open");
            addNoteForm.classList.add("notepad-popup--close");
        }
    });

    addNoteButton.addEventListener("click", function(){
        if(getTextNoteForm(".main__notepad-add-popup .form-add .form-text")){
            let request = new XMLHttpRequest();

            request.onreadystatechange = function(){
                if(request.readyState === XMLHttpRequest.DONE && request.status === 404){
                    alert("Запись не добавилась, исполняемый файл не найден");
                }
                if(request.readyState === XMLHttpRequest.DONE && request.status === 504){
                    alert("Запись не добавилась, долгое исполнение файла");
                }
                if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
                    let notes = document.querySelector(".main__notepad-notes .container");

                    // TODO: Исправить проблему с добавлением элементов
                    // Если удалить запись, а потом добавить, то индексы бд и записи не будут совпадать
                    let note = document.createElement("div");
                    note.className = "note";
                    note.innerHTML = '<div class="note-text" id="' + notes.length + 1 + '">\n' +
                        '                            <p class="text">' + getTextNoteForm(".main__notepad-add-popup .form-add .form-text") + '</p>\n' +
                        '                        </div>\n' +
                        '\n' +
                        '                        <div class="note-button-edit">\n' +
                        '                            <a class="button blue-button edit"><i class="fa fa-edit"></i></a>\n' +
                        '                        </div>\n' +
                        '                        <div class="note-button-remove">\n' +
                        '                            <a class="button red-button delete"><i class="fa fa-remove"></i></a>\n' +
                        '                        </div>';

                    notes.append(note);

                    addNoteForm.classList.remove("notepad-popup--open");
                    addNoteForm.classList.add("notepad-popup--close");
                }
            }

            request.responseType =	"json";
            request.open("post", "ajax/addNote.php", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            request.send("text=" + getTextNoteForm(".main__notepad-add-popup .form-add .form-text"));
        }else{
            alert("Вы ничего не ввели!");
        }
    });

    let editNoteOpenButton = document.querySelectorAll(".note-button-edit");
    let editNoteCloseButton = document.querySelector(".main__notepad-edit-popup .notepad__close-button");
    let editNoteForm = document.querySelector(".main__notepad-edit-popup");
    let editTextarea = document.querySelector(".main__notepad-edit-popup .form-text");

    let editNoteButton = document.querySelector(".main__notepad-edit-popup .form-edit .edit");

    let currentElement = "";

    editNoteOpenButton.forEach(function(editButton){
        editButton.addEventListener("click", function(){
            if(editNoteForm.classList.contains("notepad-popup--close")){
                editTextarea.value = this.parentNode.children[0].children[0].textContent;
                currentElement = this.parentNode.children[0].children[0];

                editNoteForm.classList.remove("notepad-popup--close");
                editNoteForm.classList.add("notepad-popup--open");
            }
        });
    });

    editNoteCloseButton.addEventListener("click", function (){
        if(getTextNoteForm(".main__notepad-edit-popup .form-edit .form-text") !== currentElement.textContent){
            if(confirm("Вы точно хотите закрыть форму изменения заметки?") === true){
                editNoteForm.classList.remove("notepad-popup--open");
                editNoteForm.classList.add("notepad-popup--close");
            }
        }else{
            editNoteForm.classList.remove("notepad-popup--open");
            editNoteForm.classList.add("notepad-popup--close");
        }
    });

    editNoteButton.addEventListener("click", function(){
        if(getTextNoteForm(".main__notepad-edit-popup .form-edit .form-text") !== currentElement.textContent && getTextNoteForm(".main__notepad-edit-popup .form-edit .form-text") !== ""){
            let request = new XMLHttpRequest();

            request.onreadystatechange = function(){
                if(request.readyState === XMLHttpRequest.DONE && request.status === 404){
                    alert("Запись не изменилась, исполняемый файл не найден");
                }
                if(request.readyState === XMLHttpRequest.DONE && request.status === 504){
                    alert("Запись не изменилась, долгое исполнение файла");
                }
                if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
                    currentElement.textContent = getTextNoteForm(".main__notepad-edit-popup .form-edit .form-text");

                    editNoteForm.classList.remove("notepad-popup--open");
                    editNoteForm.classList.add("notepad-popup--close");
                }
            }

            request.responseType =	"json";
            request.open("post", "ajax/editNote.php", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            request.send("id=" + currentElement.parentNode.parentNode.id + "&text=" + getTextNoteForm(".main__notepad-edit-popup .form-edit .form-text"));
        }else{
            alert("Вы ничего не ввели или текст не отличается от исходного!");
        }
    });

    let removeNoteButton = document.querySelectorAll(".note-button-remove");

    removeNoteButton.forEach(function(removeButton){
        removeButton.addEventListener("click", function(){
            if(confirm("Вы точно хотите удалить эту запись?") === true){
                let request = new XMLHttpRequest();

                request.onreadystatechange = function(){
                    if(request.readyState === XMLHttpRequest.DONE && request.status === 404){
                        alert("Запись не удалилась, исполняемый файл не найден");
                    }
                    if(request.readyState === XMLHttpRequest.DONE && request.status === 504){
                        alert("Запись не удалилась, долгое исполнение файла");
                    }
                    if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
                        let notes = document.querySelector(".main__notepad-notes .container");

                        notes.removeChild(removeButton.parentNode);
                    }
                }

                request.responseType =	"json";
                request.open("post", "ajax/removeNote.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                request.send("id=" + this.parentNode.id);
            }
        });
    });

    function getTextNoteForm(elementClass){
        let textarea = document.querySelector(elementClass);

        return textarea.value;
    }
}