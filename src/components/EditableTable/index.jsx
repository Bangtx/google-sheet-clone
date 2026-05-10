import './style.sass'
import { Context } from './store.js'
import Row from './Row'
import {useState} from "react";
import CellInput from "./CellInput.jsx";



const EditableTable = ({columns, rows}) => {

  const [cursor, setCursor] = useState({
    top: -1,
    left: -1,
    width: 0,
    height: 0,
    rowIndex: -1,
    columnIndex: -1,
    isEditing: false
  })

  const provider = {
    columns,
    rows,
    cursor,
    setCursor
  }

  const onDoubleClick = () => {
    setCursor({...cursor, isEditing: true})
  }

  return (
    <div onDoubleClick={onDoubleClick}>
      <Context value={provider}>
        <table className={'editable-table'}>
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
      </Context>
    </div>
  )
}

export default EditableTable