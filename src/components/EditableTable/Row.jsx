import Cell from "./Cell";
import { Context } from './store.js'
import {useContext} from "react";

const Row = ({rowIndex}) => {
  const injector = useContext(Context)
  const { columns } = injector

  return (
    <tr>
      {
        columns.map((column, index) => {
          return (
            <Cell
              rowIndex={rowIndex}
              columnIndex={index}
              key={column.name}
            //   row={row}
            //   column={column}
            />
          )
        })
      }
    </tr>
  )
}

export default Row