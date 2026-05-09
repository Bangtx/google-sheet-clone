import {useContext} from "react";
import {Context} from "./store.js";

const CellInput = () => {
  const injector = useContext(Context)
  const { columns, rows, cursor, setCursor } = injector

  return (
    <div
      className={`cell-input`}
      style={{
        top: cursor.top,
        left: cursor.left,
        width: cursor.width,
        height: cursor.height
      }}
    ></div>
  )
}

export default CellInput