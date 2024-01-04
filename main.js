const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + div button");
const addBookForm = document.querySelector(".add-book-form");
const booksDisplay = document.querySelector(".books-display");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
    return;
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

function appendNewBookDiv(book) {
    // Creating actual div
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-indiv");

    // Creating Title h1
    const bookTitle = document.createElement("h1");
    bookTitle.classList.add("book-indiv-title");
    bookTitle.textContent = book.title;

    // Creating Author p
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-indiv-author");
    bookAuthor.textContent = book.author;

    // Creating Pages p
    const bookPages = document.createElement("p");
    bookPages.classList.add("book-indiv-pages");
    bookPages.textContent = `Pages: ${book.pages}`;

    // Creating Read Button
    const bookRead = document.createElement("button");
    bookRead.classList.add(`${book.completed ? 'book-indiv-readButton-completed' : 'book-indiv-readButton-incomplete'}`);
    bookRead.textContent = `${book.completed ? 'Read' : 'Not Read'}`

    // Creating Delete Button
    const bookRemove = document.createElement("button");
    bookRemove.classList.add("book-indiv-removeButton");
    bookRemove.textContent = "Remove"

    // Adding all elements to div
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(bookRead);
    bookDiv.appendChild(bookRemove);

    // Adding bookDiv to bookDisplay
    booksDisplay.appendChild(bookDiv);
}

function toggleCompletedProperty(button) {
    const bookTitle = button.parentNode.firstElementChild.innerText;
    const result = myLibrary.find(book => {
        return book.title === bookTitle
    })
    const resultIndex = myLibrary.indexOf(result)
    myLibrary[resultIndex].completed = !myLibrary[resultIndex].completed
}

function deleteBook(button) {
    const bookTitle = button.parentNode.firstElementChild.innerText;
    const result = myLibrary.find(book => {
        return book.title === bookTitle
    })
    const resultIndex = myLibrary.indexOf(result)
    myLibrary.splice(resultIndex, 1);
    refreshLibraryDisplay();
}

function refreshLibraryFunctionality() {
    // The reason we're doing this is to prevent nested functions within a button press
    const allReadToggleButtons = document.querySelectorAll(".book-indiv-readButton-completed, .book-indiv-readButton-incomplete");
    for (let index = 0; index < allReadToggleButtons.length; index++) {
        const element = allReadToggleButtons[index];
        element.addEventListener('click', () => {
            if(element.className === "book-indiv-readButton-completed") {
                element.innerText = "Not Read";
                element.classList = "book-indiv-readButton-incomplete";
            } else {
                element.innerText = "Read";
                element.classList = "book-indiv-readButton-completed";
            }
            toggleCompletedProperty(element)
        })
    }

    const allRemoveButtons = document.querySelectorAll(".book-indiv-removeButton")
    for (let index = 0; index < allRemoveButtons.length; index++) {
        const element = allRemoveButtons[index];
        element.addEventListener('click', () => {
            deleteBook(element);
        })
    }
}

function refreshLibraryDisplay() {
    // Clear the innerHTML
    booksDisplay.innerHTML = "";
    // Add all new books
    for (let index = 0; index < myLibrary.length; index++) {
        appendNewBookDiv(myLibrary[index]);
    }
    refreshLibraryFunctionality();
}

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const allInput = document.querySelectorAll(".add-book-form > input, .completed-form-section > input");
    const newBook = []
    for (let index = 0; index < allInput.length; index++) {
        if(allInput[index].id === "completed") {
            newBook.push(allInput[index].checked)
        } else {
            newBook.push(allInput[index].value);
        }
    }
    addBookToLibrary(new Book(newBook[0], newBook[1], newBook[2], newBook[3]))
    refreshLibraryDisplay()
    dialog.close();
})

addBookToLibrary(new Book("A Game Of Thrones", "George R. R. Martin", 694, true));
refreshLibraryDisplay();