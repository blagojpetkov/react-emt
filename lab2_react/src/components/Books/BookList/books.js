import React from "react"
import ReactPaginate from "react-paginate";
import BookTerm from "../BookTerm/book"
import {Link} from "react-router-dom";

class Books extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            page: 0,
            size: 5
        }
    }

    render() {

        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const offset = this.state.size * this.state.page
        const nextPageOffset = offset + this.state.size;

        const books = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Available copies</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books}
                            </tbody>
                        </table>
                    </div>

                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 d-grid gap-2">
                                <Link className={"btn btn-dark"} to={"/books/add"}>Add new book</Link>
                            </div>
                        </div>
                    </div>

                    <ReactPaginate
                        previousLabel={"back"}
                        nextLabel={"next"}
                        breakLabel={<a href="/#">...</a>}
                        breakClassName={"break-me"}
                        pageClassName={"ms-2 me-2"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination m-4 justify-content-center"}
                        activeClassName={"active"}/>
                </div>
            </div>
        );
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })

    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((term) => {
            return(
                <BookTerm term = {term} onDelete={this.props.onDelete} onEdit={this.props.onEdit} onMark={this.props.onMark}/>
            )
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
}


export default Books