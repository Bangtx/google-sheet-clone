import {useContext} from "react";
import {Context} from "./store.js";

const CellSelectionRegion = () => {
  const injector = useContext(Context)
  const { selectionRegion  } = injector

  console.log('selectionRegion', selectionRegion)

  return (
    <div style={{
      position: "absolute",
      background: '#16ab384d',
      top: selectionRegion.top,
      left: selectionRegion.left,
      width: selectionRegion.width,
      height: selectionRegion.height,
      pointerEvents: 'none'
    }}></div>
  )
}

export default CellSelectionRegion