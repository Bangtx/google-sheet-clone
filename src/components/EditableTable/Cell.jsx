import {useCallback, useContext} from "react";
import {Context} from "./store.js";

const Cell = ({rowIndex, columnIndex}) => {
  const injector = useContext(Context)
  const { columns, rows, cursor, setCursor, table } = injector

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
      columnIndex: columnIndex,
      isEditing: false
    })
  }

  // 1. Dùng useCallback để hàm này không bị tạo mới sau mỗi lần render
  const onMouseMove = useCallback((e) => {
    console.log({
      top: e.target.offsetTop,
      left: e.target.offsetLeft,
      width: e.target.offsetWidth,
      height: e.target.offsetHeight
    })

  }, [])

  // 2. Dùng useCallback cho onMouseUp và gỡ cả mousemove lẫn chính nó
  const onMouseUp = useCallback(() => {
    table.current?.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp) // Gỡ sự kiện toàn cục
  }, [table, onMouseMove])

  const onMouseDown = () => {
    table.current?.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <td
      id={`cell-${rowIndex}-${columnIndex}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {cell}
    </td>
  )
}

export default Cell