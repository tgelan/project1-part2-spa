
let pageDisplay = document.getElementById("outlet");
let aboutBtn = document.querySelector("#aboutID")
aboutBtn.addEventListener("click", function (event) {
    displayAboutPage()
    history.pushState("aboutUs", " ", "aboutUs")
    event.preventDefault()

})

//////////////////////// Home Page Display//////////////////////////////////////////////////////////////////

function displayHomePage() {
    const home = `
            <br><img src="image/banner1.png" alt="panoramic" width="100%"> <br>
            `
    fetch("text/Indext.txt")
        .then((res) => res.text())
        .then((data) => {
            pageDisplay.innerHTML = home + data;
        });
}
displayHomePage();

document.getElementById("homeID").addEventListener("click", function (event) {
    displayHomePage()
    history.pushState("Home", " ", "home")
    event.preventDefault()
})

/////////////////////////About PAge//////////////////////////////////////////////////////////////////

function displayAboutPage() {
    const about = `
        <br> <img src="image/library.png" alt="panoramic" width="100%"> 
        <br>
            `
    fetch("text/About.txt")
        .then((res) => res.text())
        .then((data) => {
            pageDisplay.innerHTML = about + data;
        });
}
let virtualBtn = document.getElementById("virtualID")
virtualBtn.addEventListener("click", function (event) {
    displayVirtualPage()
    history.pushState("virtual", " ", "Virtual")
    event.preventDefault()
})

//////////////////////Virtual TOur/////////////////////////////////////////////////////

function displayVirtualPage() {

    const virtual = `
    <picture>
            <img class="rounded"src="image/panoramic.png" alt="panoramic" width="100%">
    </picture>
            `
    fetch("text/VirtualTour.txt")
        .then((res) => res.text())
        .then((data) => {
            pageDisplay.innerHTML = virtual + data;
        });
}
///////////////////////////////////BOOK list//////////////////////////////////////////////
const addBooks =
    `<div class="container">
       <div style="padding-bottom: 1em;padding-top: 1em;">
        <span style="font-size: 2em;">Books in our Collection &#174;</span>
        <span style="float: right;">
              <a type="button" onclick  ="addingBookPage()" class="btn btn-primary">Add New Book</a>
       </span>
    </div>`
let myTable = "";
let arrToSearch = []

async function displayBooks() {
    let res = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/list`)
    let data = await res.json()
    tableDisplay(data);
}

function tableDisplay(data) {
    myTable = `
       <div class="alert alert-dismissible alert-success" id="displaySuccessDeleted" style="float: right; display: none">
          <button type="button" class="close" aria-disabled="true" data-dismiss="alert">&times;</button>
           <strong>Well done!</strong> You successfully Deleted the Book <a href="#" class="alert-link"></a>.
    </div>

     <table class="table table-hover">
        <thead>
             <tr>
               <th scope="col">#</th>
                <th scope="col">ISBN</th>
                <th scope="col">Book Title</th>
                <th scope="col">Over Due Fee</th>
                <th scope="col">publisher</th>
                <th scope="col">Date Published</th>
                <th scope="col">&nbsp;</th>
                 <th scope="col">&nbsp;</th>
             </tr>
        </thead>`;

    arrToSearch = data
    data.forEach((value,i)=> {

        myTable += `
            <tr>
                <td>${i+1}</td>
                <td>${value.isbn}</td>
                <td>${value.title}</td>
                <td>US$${value.overdueFee}</td>
                <td>${value.publisher}</td>
                <td>${value.datePublished}</td>
                <td><button href="#" ?bookId=${value.bookId} onclick ="editingFunction(${value.bookId})"class ="btn btn-primary" >Edit</button></td>
                <td><a data-toggle="modal" data-bookid="${value.bookId}" href="#confirmDeleteBookModal" onclick ="deletingBook(${value.bookId})" class ="btn btn-primary" 
                data-bookisbn="${value.isbn}" data-booktitle="${value.title}" href="#">Delete</a></td>            

            </tr>`;
            i++;
       
    });
    pageDisplay.innerHTML = myTable + addBooks;
};


document.getElementById("booksID").addEventListener("click", function (event) {
    displayBooks()
    history.pushState("books", " ", "books")
    event.preventDefault()

})
let addingBookForm = `
    <div class="container">
        <form id="bookform">
            <legend> Add New Book</legend>
                <span class="alert alert-dismissible alert-success" id="displaySuccessAdded" style="float: right; display: none">
                 <button type="button" class="close" aria-disabled="true" data-dismiss="alert">&times;</button>
                 <strong>Well done!</strong> You successfully added the Book <a href="#" class="alert-link"></a>.
                </span>
            <div class="col-md-14 mb-3">
                <label for="exampl">*required form fields</label><br>
                <label for="title">*Book Titles</label>
                <input id="title" name="title" type="text" class="form-control" aria-describedby="titleHelp"
                placeholder="Enter Titles" required>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="isbn">*ISBN</label>
                    <input type="text" class="form-control" id="isbn" name="isbn" aria-describedby="isbnHelp"
                    placeholder="Enter isbn" required />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="overdueFee">*Overdue per Pay</label>
                    <input type="number" class="form-control" id="overdueFee" name="overdueFee" aria-describedby="overdue"
                     placeholder="Enter Amount Due" required />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="publisher">*Publisher</label>
                    <input type="text" class="form-control" id="publisher" name="publisher" aria-describedby="publisher"
                    placeholder="Enter publisher" required />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="datePublished">*Date Published</label>
                    <input type="date" class="form-control" id="datePublished" name="datePublished" aria-describedby="datepublished"
                    placeholder="Enter date Published" required />
                </div>

            <div>
                <button type="reset" class="btn btn-primary" style="float:left;" aria-setsize="40"> Reset </button> &nbsp
                    <button type= "button" onclick = "postFetch()" class="btn btn-success" style="float:right;" 
                    id="setBookButton"> SaveBook
                </button>
            </div>
          </div>
        </form>`
let editingBookForm = `
<div class="container">
    <form id="bookform">
        <legend> Edit New Book</legend>
            <span class="alert alert-dismissible alert-success" id="displaySuccess" style="float: right; display:none">
                <button type="button" class="close" aria-disabled="true" data-dismiss="alert">&times;</button>
                <strong>Well done!</strong> You successfully Edited the Book <a href="#" class="alert-link"></a>.
            </span>
        <div class="col-md-14 mb-3">
                <label for="exampl">*required form fields</label><br>
                <label for="title">*Book Titles</label>
                <input id="title" name="title" type="text" class="form-control" aria-describedby="titleHelp"
                 placeholder="Enter Titles" required>
        </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="isbn">*ISBN</label>
                    <input type="text" class="form-control" id="isbn" name="isbn" aria-describedby="isbnHelp"
                        placeholder="Enter isbn" required />
                </div>
        <div class="col-md-6 mb-3">
                <label for="overdueFee">*Overdue per Pay</label>
                <input type="number" class="form-control" id="overdueFee" name="overdueFee" aria-describedby="overdue"
                placeholder="Enter Amount Due" required />
         </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="publisher">*Publisher</label>
                    <input type="text" class="form-control" id="publisher" name="publisher" aria-describedby="publisher"
                        placeholder="Enter publisher" required />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="datePublished">*Date Published</label>
                    <input type="date" class="form-control" id="datePublished" name="datePublished" aria-describedby="datepublished"
                    placeholder="Enter date Published" required />
                </div>

            <div>
                <button type="reset" class="btn btn-primary" style="float:left;" aria-setsize="40"> Reset </button> &nbsp
                <input type = "hidden" id = "bookId">    
                <button type= "button" onclick = "editingBooks()" class="btn btn-success" style="float:right;" 
                    id="setBookButton"> Click To Edit
                </button>
                
            </div> 
            
        </div>
    </form>`
let deleteModal = ` <div class="modal fade" id="confirmDeleteBookModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
       
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Confirm Delete</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p><b>Are you sure you wish to delete this book?</b></p>
                    <br />
                    <p id="isbn"></p>
                    <p id="title"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <input type = "hidden" id = "bookId">    
                    <button id="deleteModalBtnYes" type="button" data-dismiss="modal"
                        class="btn btn-primary">Yes</button>
                </div>
            </div>
        </div>
        </div>`

//////////////////////////////////////Adding Book Page////////////////////////////////////////////////

function addingBookPage() {
    pageDisplay.innerHTML = addingBookForm
}
function postFetch() {
    let bookTitle = document.getElementById("title").value
    let bookIsbn = document.getElementById("isbn").value
    let bookOverDue = document.getElementById("overdueFee").value
    let bookPublisher = document.getElementById("publisher").value
    let theDatePublished = document.getElementById("datePublished").value
    fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/add",
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                isbn: bookIsbn,
                title: bookTitle,
                overdueFee: bookOverDue,
                publisher: bookPublisher,
                datePublished: theDatePublished
            })
        })
 ///////////////////////Dispalying Successfully added Pop up////////////////////////////////////////////////

    let successAlert = document.getElementById("displaySuccessAdded")
    successAlert.style.display = "block";
    setTimeout(() => {
        displayBooks();
    }, 3000)
}

///////////////////// Editing Page Aafter Displaying the page going to be edited////////////////////////////////////////////////////////////

function editingFunction(bookId) {

    pageDisplay.innerHTML = editingBookForm;
    fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/" + bookId)
        .then((response) => response.json())
        .then((book) => {
            document.getElementById("bookId").value = book.bookId
            document.getElementById("isbn").value = book.isbn;
            document.getElementById("title").value = book.title;
            document.getElementById("overdueFee").value = book.overdueFee;
            document.getElementById("publisher").value = book.publisher;
            document.getElementById("datePublished").value = book.datePublished;
        })

}
function editingBooks() {

    let bookId = document.getElementById("bookId").value
    let bookTitle = document.getElementById("title").value
    let bookIsbn = document.getElementById("isbn").value
    let bookOverDue = document.getElementById("overdueFee").value
    let bookPublisher = document.getElementById("publisher").value
    let theDatePublished = document.getElementById("datePublished").value

    fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/${bookId}`,
        {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                isbn: bookIsbn,
                title: bookTitle,
                overdueFee: bookOverDue,
                publisher: bookPublisher,
                datePublished: theDatePublished
            })
        })
    /////////////////////////// Display sucess edit  Pop up/////////////////////////     
    let successAlert = document.getElementById("displaySuccess")
    successAlert.style.display = "block";
    setTimeout(() => {
        displayBooks();
    }, 3000)
}

////////////////////////// Deleting Books And sucess pop up///////////////////////////////

function deletingBook() {
    pageDisplay.innerHTML = deleteModal + myTable
    $('#confirmDeleteBookModal').on('show.bs.modal', function (param) {

        let bookId = $(param.relatedTarget).data('bookid');
        let isbn = $(param.relatedTarget).data('bookisbn');
        let title = $(param.relatedTarget).data('booktitle');
        $(this).find('.modal-body #isbn').text("Isbn: " + isbn);
        $(this).find('.modal-body #title').text("Book title: " + title);
        $('#deleteModalBtnYes').click(function () {

            fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/${bookId}`, {
                method: "DELETE"
            })
            let successAlert = document.getElementById("displaySuccessDeleted")
            successAlert.style.display = "block";
            setTimeout(() => {
                displayBooks();
            }, 3000)
        })
    })
}

////////////////// Now Searching books/////////////////

let textToSearch = document.getElementById("searchedText");

document.getElementById("searchid").addEventListener("click", searchBook)

function searchBook() {
    let newArray = [];
    for (let item of arrToSearch) {
        if (item.title.includes(textToSearch.value)) {
            newArray.push(item)
        }
    }
    tableDisplay(newArray);
}

//////////////////history API/////////////////////////////////

window.addEventListener("popstate", function (event) {


    if (event.state == "books") {
        displayBooks();

    }
    else if (event.state == "virtual") {
        displayVirtualPage()

    }
    else if (event.state == "aboutUs") {
        displayAboutPage()

    }
    else {
        displayHomePage();
    }


})
