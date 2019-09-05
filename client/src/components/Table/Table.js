import React from "react";

function Table(props){
    return(
        <table className="table table-hover leaderboard">
            <thead>
                <tr>
                    <th scope="col">POSITION</th>
                    <th scope="col">USER</th>
                    <th scope="col">SCORE</th>
                    <th scope="col">RUIN</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}

export default Table;