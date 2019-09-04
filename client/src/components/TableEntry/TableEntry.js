import React from "react";

class TableEntry extends React.Component {
    constructor(props){
        super(props)
        this._onClick = this._onClick.bind(this)
    }

    _onClick(){
        this.props.onUserClick(this.props.key)
    }

    render(){
        return(
            <tr className="table-entry">
                <th scope="row">{this.props.position}</th>
                <td className="table-user">{this.props.username}</td>
                <td className="table-score">{this.props.score}</td>
                <td className="table-del" onClick={this._onClick}>x</td>
            </tr>
    )}
}

export default TableEntry;