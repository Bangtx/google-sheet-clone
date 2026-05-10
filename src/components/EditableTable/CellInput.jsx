import {useContext} from "react";
import {Context} from "./store.js";

const CellInput = () => {
  const injector = useContext(Context)
  const { columns, rows, cursor, setCursor } = injector

  const {rowIndex, columnIndex} = cursor

  console.log(cursor)

  // row = {id: 1, name: 'test', quantity: 2}
  const row = rows[rowIndex]
  // column = {name: 'quantity', text: 'So luong' }
  const column = columns[columnIndex]
  // columnName = quantity
  const columnName = column?.name
  console.log(column, columnName)
  // 2
  const cell = columnName ? row[columnName] : ''
  console.log(cell)

  return (
    // <div
    //   contentEditable={cursor.isEditing ? "true" : "false"}
    //   className={`cell-input`}
    //   style={{
    //     top: cursor.top,
    //     left: cursor.left,
    //     width: cursor.width,
    //     height: cursor.height
    //   }}
    // >
    //   {cell}
    // </div>
    <>
      <div
        className={`cell-input`}
        style={{
          top: cursor.top,
          left: cursor.left,
          width: cursor.width,
          height: cursor.height
        }}
      >
        {cell}
      </div>
      {
        cursor.isEditing && <input className={`cell-input`} value={cell}/>
      }
    </>

  )
}

export default CellInput