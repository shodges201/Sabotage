import React from "react";

function TableEntry(props){
    return(
        <tr className="table-entry">
            <th scope="row">{props.position}</th>
            <td className="table-user">{props.username}</td>
            <td className="table-score">{props.score}</td>
        </tr>
    )
}

export default TableEntry;