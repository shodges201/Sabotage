import React from "react";
const commas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

class TableEntry extends React.Component {
    constructor(props){
        super(props)
        this._onClick = this._onClick.bind(this)
    }

    _onClick(){
        console.log(`you sabotaged ${this.props.username}`)
    }

    render(){
        return(
            <tr className="table-entry">
                <th scope="row">{this.props.position}</th>
                <td className="table-user">{this.props.username}</td>
                <td className={this.props.score > 0 ? "table-score-pos" : "table-score-neg"}>{commas(this.props.score)}</td>
                {/* <td className="table-del" onClick={this.props.tableAction(this.props.key)}><button type="button"></button></td> */}
            </tr>
    )}
}

export default TableEntry;