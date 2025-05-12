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

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}


// Create test books
addBookToLibrary("Hobbit", "JRR Tolkien", 250, true);
addBookToLibrary("War and Peace", "Tolstoy", 600, false);
addBookToLibrary("Dune", "Frank Herbert", 300, true);``
console.log(myLibrary);