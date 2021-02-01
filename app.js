console.log('This is my second projecdt');
function Book(name,author,type){
    this.name = name
    this.author = author
    this.type = type
}

// Display Constructor
function Display() {

}

//Add methods to display prototype
Display.prototype.add =function(book){
    console.log('Adding to UI');
    let tableBody = document.getElementById('tableBody');
    let uiString =`<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
    tableBody.innerHTML += uiString;
}

//Implementation of the clear function
Display.prototype.clear=function(){
    //Clear my form
    let libraryForm  = document.getElementById('libraryForm');
    libraryForm.reset();
}


//Implementation of the clear function
Display.prototype.validate=function(book){
    if (book.name.length < 2 || book.author.length < 2){
        return false
    }
    else{
        return true
    }
}


Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);

}


//Add submit event listener to libraryForm.
let libraryForm  = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);   //When the user clicks on the submit libraryForm then call libraryFormSubmit function which we have defined below

//libraryFormSubmit function
function libraryFormSubmit(e){
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;   //Take the value of what the user has entered in the 'Book Nmae' input
    let author = document.getElementById('author').value;   //Take the value of what the user has entered in the 'Author' input
    let type;

    //These three below are for knowing-> what value has the user choosen b/w fiction,programming,and Comedy 
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let Comedy = document.getElementById('Comedy');

    //Now we check which option the user has chosen!
    if (fiction.checked){
        type = fiction.value;
    }
    else if (programming.checked){
        type = programming.value;
    }
    else if (Comedy.checked){
        type = Comedy.value;
    }
    let book =new Book(name,author,type);
    console.log(book); 
    
    let display =new Display();
    if (display.validate(book)){

        display.add(book);  //This will add the book into the DOM
        display.clear();    //Clears the text that we have entered in the input boxes
        display.show('Succeess','Your book has been successfully added');
    }
    else{
        //Show error to the user becuz they haven't entered any book name and author 
        display.show('error','Sorry you cannot add this book');

    }


    e.preventDefault(); //Whenever we click on submit in the form i.e the 'Add Book' button the page reloads ,so in order to prevent this reloading of the page we use the method preventDefault() which prevents the page from reloading

}