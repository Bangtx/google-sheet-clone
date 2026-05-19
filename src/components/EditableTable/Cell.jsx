import {useCallback, useContext, useEffect, useState, useRef} from "react";
import {Context} from "./store.js";

const Cell = ({rowIndex, columnIndex}) => {
  const injector = useContext(Context)
  const { columns, rows, cursor, setCursor, table, selectionRegion, setSelectionRegion } = injector

  // row = {id: 1, name: 'test', quantity: 2}
  const row = rows[rowIndex]
  // column = {name: 'quantity', text: 'So luong' }
  const column = columns[columnIndex]
  // columnName = quantity
  const columnName = column.name
  // 2
  const cell = row[columnName]

  const startCellRef = useRef({
    top: -10,
    left: -10,
    width: 0,
    height: 0,
    rowIndex: 0,
    columnIndex: 0
  });

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

    setSelectionRegion({
      top: -10,
      left: -10,
      width: 0,
      height: 0,
    })
  }

  const getSelectionCell = (e) => {
    const td = e.target.closest('td');

    if (!td) return;

    const [rowIndex, colIndex] = td.id.replace('cell-', '').split('-')

    return {
      rowIndex,
      colIndex,
      top: td.offsetTop,
      left: td.offsetLeft,
      width: td.offsetWidth,
      height: td.offsetHeight
    }
  }

  // 1. Dùng useCallback để hàm này không bị tạo mới sau mỗi lần render
  const onMouseMove = useCallback((e) => {
    const currentCell = getSelectionCell(e)

    const startCell = startCellRef.current;
    console.log(currentCell.rowIndex, startCell.rowIndex, currentCell.colIndex, startCell.colIndex)
    if (currentCell.rowIndex === startCell.rowIndex && currentCell.colIndex === startCell.colIndex) return

    const selectionWidth = currentCell.left - startCell.left + currentCell.width
    const selectionHeight = currentCell.top - startCell.top + currentCell.height

    setSelectionRegion({
      ...selectionRegion,
      top: startCell.top,
      left: startCell.left,
      width: selectionWidth,
      height: selectionHeight
    })
  }, [])

  // 2. Dùng useCallback cho onMouseUp và gỡ cả mousemove lẫn chính nó
  const onMouseUp = useCallback((e) => {
    table.current?.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp) // Gỡ sự kiện toàn cục
    // setStartCell(getSelectionCell(e))
  }, [table, onMouseMove])

  const onMouseDown = (e) => {
    const cellData = getSelectionCell(e);
    if (cellData) {
      startCellRef.current = cellData;
    }

    table.current?.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <td
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      ref={startCellRef}
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