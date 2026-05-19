import './style.sass'
import { Context } from './store.js'
import Row from './Row'
import {useRef, useState} from "react";
import CellInput from "./CellInput.jsx";
import CellSelectionRegion from "./CellSelectionRegion.jsx";



const EditableTable = ({columns, rows, onInput}) => {
  const table = useRef()

  const [cursor, setCursor] = useState({
    top: -100,
    left: -100,
    width: 0,
    height: 0,
    rowIndex: -1,
    columnIndex: -1,
    isEditing: false
  })

  const [selectionRegion, setSelectionRegion] = useState({
    top: -10,
    left: -10,
    width: 0,
    height: 0,
  })

  const provider = {
    columns,
    rows,
    cursor,
    setCursor,
    onInput,
    table,
    selectionRegion,
    setSelectionRegion
  }

  return (
    <div>
      <Context value={provider}>
        <table className={'editable-table'} ref={table}>
          <thead>
          <tr>
            {
              columns.map(column => {
                return <th key={column.name} style={{width: column.width}}>{column.name}</th>
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            rows.map((row, index) => {
              return <Row key={index} rowIndex={index}/>
            })
          }
          </tbody>
        </table>
        <CellInput/>
        <CellSelectionRegion/>
      </Context>
    </div>
  )
}

export default EditableTable