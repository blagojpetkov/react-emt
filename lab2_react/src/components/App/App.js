import "./App.css"
import React from "react"
import Books from "../Books/BookList/books"
import Categories from "../Categories/categories"
import Header from "../Header/header"
import BookAdd from "../Books/BookAdd/BookAdd"
import BookEdit from "../Books/BookEdit/bookEdit";
import {BrowserRouter as Router, Navigate, Redirect, Route, Routes} from "react-router-dom";
import EShopService from "../../repository/eshopRepository";
class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return(
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/categories"} exact element={<Categories categories={this.state.categories}/>}/>
                            <Route path={"/books/add"} exact element={<BookAdd onAddBook={this.addBook} authors={this.state.authors} categories={this.state.categories}/>}/>
                            <Route path={"/books/edit/:id"} exact element={
                                <BookEdit
                                book={this.state.selectedBook}
                                onEditBook={this.editBook}
                                authors={this.state.authors}
                                categories={this.state.categories}
                                />}/>
                            <Route path={"/books"} exact element={<Books onMark={this.markBook} onDelete={this.deleteBook} onEdit={this.getBook} books={this.state.books}/>}/>
                            <Route path={"/"} exact element={<Books onMark={this.markBook} onDelete={this.deleteBook} onEdit={this.getBook} books={this.state.books}/>}/>
                            <Route path="*" element={<Navigate to ="/books" />}/>
                        </Routes>
                    </div>
                </main>
            </Router>
        )
    }

    loadBooks = () => {
        EShopService.fetchBooks().then((data) => {
            this.setState({
                books: data.data
            })
        })
    }

    loadCategories = () => {
        EShopService.fetchCategories().then((data) => {
            this.setState({
                categories: data.data
            })
        })
    }

    loadAuthors = () => {
        EShopService.fetchAuthors().then((data) => {
            this.setState({
                authors: data.data
            })
        })
    }

    deleteBook = (id) => {
        EShopService.deleteBook(id).then(()=>{
            this.loadBooks()
        })
    }

    markBook = (id) => {
        EShopService.markBook(id).then(()=>{
            this.loadBooks()
        })
    }

    addBook = (name, category, author, availableCopies) => {
        EShopService.addBook(name, category, author, availableCopies).then(()=>{
            this.loadBooks()
        })
    }

    getBook = (id) => {
        EShopService.getBook(id).then((data)=>{
            this.setState({
                selectedBook: data.data
            })
        })
    }

    editBook = (id, name, category, author, availableCopies) => {
        EShopService.editBook(id, name, category, author, availableCopies).then(()=>{
            this.loadBooks()
        })
    }



    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }
}

export default App