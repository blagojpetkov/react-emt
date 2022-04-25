import React from "react"

const products = (props) => {
    return(
<table className={"table table-striped"}>
    <thead>
    <tr>
    <th>Name of the category</th>
    </tr>
    </thead>
    <tbody>
    {props.categories.map((term)=>{
        return(
            <tr><td>{term}</td></tr>
        )
    })}
    </tbody>
</table>


    )
}
export default products;