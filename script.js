

function Book(title, author, pages, isRead) {
    if (!new.target) {
        throw Error("This function can only be used as a constructor!");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// TODO: Add prototype chain function to Book to toggle isRead
Book.prototype.toggleIsRead = function() {

}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

// Extracts input fields values from modal and returns an array with the values, that will work as input to addBookToLibrary()
function getNewBookDetails(textFields, radioButtons) {

    return [textFields[0].value, textFields[1].value, parseInt(textFields[2].value), radioButtons[0].checked];
}

function clearBookCards() {
    bookContainer.innerHTML = "";
}

function createBookCard(book) {
    
    //create new div card
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    //create book title <p>
    const newTitleP = document.createElement("p");
    newTitleP.textContent = `Title: ${book.title}`;
    newBookCard.appendChild(newTitleP);
    //create book author <p>
    const newAuthorP = document.createElement("p");
    newAuthorP.textContent = `Author: ${book.author}`;
    newBookCard.appendChild(newAuthorP);
    //create book no of pages <p>
    const newPagesP = document.createElement("p");
    newPagesP.textContent = `No of pages: ${book.pages}`;
    newBookCard.appendChild(newPagesP);
    //create book is read <p>
    const newIsReadP = document.createElement("p");
    newIsReadP.textContent = `Has been read?: ${book.isRead}`;
    newBookCard.appendChild(newIsReadP);

    return newBookCard;
}

function displayBookCards() {
    // Clear all books first
    clearBookCards();
    // Iterate over books in array, create div element with book details as contents and add to .book-container on the DOM one by one
    myLibrary.forEach((book) => {
        bookContainer.appendChild(createBookCard(book));
    })
    
}

// MAIN SCRIPT START //

const myLibrary = [];

// Get DOM .book-container element reference
const bookContainer = document.querySelector(".book-container");
// Get DOM .new-book <dialog> reference
const newBookDialog = document.querySelector(".new-book");

// temp Create test books
addBookToLibrary("Hobbit", "JRR Tolkien", 250, true);
addBookToLibrary("War and Peace", "Tolstoy", 600, false);
addBookToLibrary("Dune", "Frank Herbert", 300, true);``
console.log(myLibrary);
// /temp

// On startup show any books already in the library
displayBookCards();

// Add eventlistener on button that must open the new book modal input dialog
document.querySelector(".open-new-book-modal-button").addEventListener("click", (e) => {
    newBookDialog.showModal()
    }
);

// Add submit eventlistener on the dialog modal form
newBookDialog.querySelector("form").addEventListener("submit", (e) => {
    // Create a new book and add to the library
    addBookToLibrary(...getNewBookDetails(newBookDialog.querySelectorAll("input[type=text]"), newBookDialog.querySelectorAll("input[type=radio]")));
    // Reset the form to remove entries
    newBookDialog.querySelector("form").reset();
    // redraw the book cards to update the DOM
    displayBookCards();
    }
);

// Reset and close the modal if Cancel button is clicked
newBookDialog.querySelector("button.cancel-button").addEventListener("click", (e) => {
    newBookDialog.close();
    newBookDialog.querySelector("form").reset();    
    }
);

// MAIN SCRIPT END //