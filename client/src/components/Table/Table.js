import React from "react";
import "./Table.css";

function Table(props){
    return(
        <table className="table table-hover">
            <thead className="table-head">
                <tr>
                    <th scope="col">POSITION</th>
                    <th scope="col">USER</th>
                    <th scope="col">SCORE</th>
                    {/* <th scope="col">{props.columnAction}</th> */}
                </tr>
            </thead>
            <tbody className="tbody">
                {props.children}
            </tbody>
        </table>
    )
}

export default Table;