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

function addBookToLibrary() {
    const title = prompt("Title:");
    const author = prompt("Author:");
    const pages = prompt("Number of pages:");
    const isRead = prompt("Has been read? true/false", false);
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

