import {useContext} from "react";
import {Context} from "./store.js";

const Cell = ({rowIndex, columnIndex}) => {
  const injector = useContext(Context)
  const { columns, rows, cursor, setCursor } = injector

  // row = {id: 1, name: 'test', quantity: 2}
  const row = rows[rowIndex]
  // column = {name: 'quantity', text: 'So luong' }
  const column = columns[columnIndex]
  // columnName = quantity
  const columnName = column.name
  // 2
  const cell = row[columnName]

  const onClick = () => {
    const cellE = document.querySelector(`#cell-${rowIndex}-${columnIndex}`)
    setCursor({
      ...cursor,
      top: cellE.offsetTop,
      left: cellE.offsetLeft,
      width: cellE.offsetWidth,
      height: cellE.offsetHeight,
      rowIndex: rowIndex,
      columnIndex: columnIndex
    })
  }

  return (
    <td id={`cell-${rowIndex}-${columnIndex}`} onClick={onClick}>{cell}</td>
  )
}

export default Cell