const myLibrary = [];

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

// Add prototype function to Book to toggle isRead
Book.prototype.toggleIsRead = function() {

}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function clearBookCards() {
    bookContainer.innerHTML = "";
}

function createBookCard(book) {
    
    //create new div card
    const newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    //create <h2> element for card heading
    const newH2 = document.createElement("h2");
    newH2.textContent = "Book: ";
    newBookCard.appendChild(newH2);
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

// Get DOM .book-container element reference
const bookContainer = document.querySelector(".book-container");

// temp Create test books
addBookToLibrary("Hobbit", "JRR Tolkien", 250, true);
addBookToLibrary("War and Peace", "Tolstoy", 600, false);
addBookToLibrary("Dune", "Frank Herbert", 300, true);``
console.log(myLibrary);
// /temp

displayBookCards();
