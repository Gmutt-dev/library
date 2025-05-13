// MAIN SCRIPT START //

const myLibrary = [];

// Get DOM .title-list element reference
const titleList = document.querySelector(".title-list");
// Get DOM .book-container element reference
const bookContainer = document.querySelector(".book-container");
// Get DOM .new-book <dialog> reference
const newBookDialog = document.querySelector(".new-book");

// On startup show any books already in the library
displayBooks();

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
    // Redraw the book cards to update the DOM
    displayBooks();
    }
);

// Reset and close the modal if Cancel button is clicked
newBookDialog.querySelector("button.cancel-button").addEventListener("click", (e) => {
    newBookDialog.close();
    newBookDialog.querySelector("form").reset();    
    }
);

// Eventlistener on book cards
bookContainer.addEventListener("click", (e) => {
    // Click on "remove book" button
    if (e.target.textContent === "remove book") {
        removeBookFromLibraryById(e.target.dataset.id);
        displayBooks();
    // Click on "mark read" / "mark unread" button
    } else if (e.target.classList.contains("read-toggle")) {
        getBookById(e.target.parentElement.dataset.id).toggleIsRead();
        displayBooks();
    }
})

// MAIN SCRIPT END //

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

Book.prototype.toggleIsRead = function() {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function removeBookFromLibraryById(id) {
    const index = myLibrary.findIndex((book) => book.id === id);
    myLibrary.splice(index, 1);
}

function getBookById(id) {
    const foundBook = myLibrary.find(book => book.id === id);

    return foundBook;
}

// Extracts input fields values from modal and returns an array with the values, that will work as input to addBookToLibrary()
function getNewBookDetails(textFields, radioButtons) {

    return [textFields[0].value, textFields[1].value, parseInt(textFields[2].value), radioButtons[0].checked];
}

function clearTitleList() {
    titleList.innerHTML = "";
}

function displayTitleList() {
    clearTitleList();
    myLibrary.forEach((book) => {
        const newLi = document.createElement("li");
        newLi.textContent = book.title;
        titleList.appendChild(newLi);
    })
}

function clearBookCards() {
    bookContainer.innerHTML = "";
}

function createBookCard(book) {
    //create new div card
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    newBookCard.dataset.id = book.id;
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
    //create toggle isRead button
    const newToggleIsReadButton = document.createElement("button");
    newToggleIsReadButton.textContent = book.isRead ? "mark unread" : "mark read";
    newToggleIsReadButton.classList.add("read-toggle");
    newBookCard.appendChild(newToggleIsReadButton);
    //create remove book button and include book id in dataset
    const newRemoveBtn = document.createElement("button");
    newRemoveBtn.textContent = "remove book";
    newRemoveBtn.dataset.id = book.id;
    newBookCard.appendChild(newRemoveBtn);

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

// Displays book titles in sidebar AND book cards
function displayBooks() {
    displayTitleList();
    displayBookCards();
}


