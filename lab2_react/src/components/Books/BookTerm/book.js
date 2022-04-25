import React from "react"
import {Link} from "react-router-dom";

const productTerm = (props) => {
    return(
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.author.name}</td>
            <td scope={"col"}>{props.term.availableCopies}</td>
            <td scope={"col"} className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger ms-2"} onClick={() => props.onDelete(props.term.id)}>Delete</a>
                <Link to={`/books/edit/${props.term.id}`} className={"btn btn-info ms-2"} onClick={() => props.onEdit(props.term.id)}>Edit</Link>
                <a title={"Mark as taken"} className={"btn btn-danger ms-2"} onClick={() => props.onMark(props.term.id)}>Mark As Taken</a>
            </td>
        </tr>
    )
}
export default productTerm;