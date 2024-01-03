const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + div button");
const allInput = document.querySelectorAll(".add-book-form > input, .completed-form-section > input");
const addBookForm = document.querySelector(".add-book-form");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        console.log(allInput);
        dialog.close();
    }
    return;
})

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("Elp")
    dialog.close();
})

const myLibrary = [];

function Book(title, author, pages, completed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.completed = completed;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}