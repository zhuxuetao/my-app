import { Component } from "react";
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  )
}
const TableBody = (props) => {
  const { characters, removeItem } = props
  // setTimeout(() => {
  //   removeItem(0)
  // })
  return (
    <tbody>
      {
        characters.map((row, index) => {
          return (
            <tr key={index}>
              <td>{row.name}-{index}</td>
              <td>{row.job}</td>
              <td>
                <button onClick={() => removeItem(index)}>Delete</button>
              </td>
            </tr>

          )
        })
      }
    </tbody>
  )
}


class Table extends Component {
  render(h) {
    const { characters, removeItem } = this.props
    // setTimeout(() => {
    //   removeItem(0)
    // })
    return (
      <table>
        <TableHeader />
        <TableBody characters={characters} removeItem={removeItem} />
      </table>
    )
  }
}
export default Table