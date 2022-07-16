//Book class - represent a book 
class Book {
    constructor(title, author ,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//----------------------U I   C L A S S ---------------------- Handle UI tasks
class UI{
    static displayBooks(){

        const books=Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
    }
    static deleteBook(t){
        if(t.classList.contains('delete')){
            var tr = t.parentElement.parentElement; 
            tr.remove();
            UI.showAlert('Book Deleted Successfully','success');
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        //make dissapear fter sometime
        setTimeout(()=>document.querySelector('.alert').remove(),3000);

    }
    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
//------------------S T O R E   C L A S S -------- Handles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }
    static addBook(newBook){
        const books = Store.getBooks();
        books.push(newBook);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}
//--------------------------E V E N T S ------------------------------//

//events - display books 
document.addEventListener('DOMContentLoaded',UI.displayBooks);


//event - add books
document.getElementById('book-form').addEventListener('submit',(e)=>{


    //prevent actual submit
    e.preventDefault();

    //get form values;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //validate
    if(title=='' || author=='' ||isbn==''){
       UI.showAlert('please fill all the required fields','danger');
    }
    else {
       UI.showAlert('Book added successfully','success');

       //instantiate book
        const book = new Book(title,author,isbn);

        //console.log(book);

        //addbook to UI
        UI.addBookToList(book);

//-------add book to store
        Store.addBook(book);

        //clear fields
        UI.clearFields();
    }
    
})

//event - remove books

document.addEventListener('click',(e)=>{
    //remove book from UI
    UI.deleteBook(e.target);

    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent) 
    //see html structure
    
});



