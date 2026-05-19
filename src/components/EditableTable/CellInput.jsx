import {useContext, useEffect, useRef} from "react";
import {Context} from "./store.js";

const CellInput = () => {
  const injector = useContext(Context)
  const { columns, rows, cursor, setCursor, onInput } = injector
  const {rowIndex, columnIndex} = cursor

  const inputRef = useRef(null)

  const row = rows[rowIndex]
  const column = columns[columnIndex]
  const columnName = column?.name
  const cell = columnName ? row[columnName] : ''

  const onDoubleClick = () => {
    setCursor({...cursor, isEditing: true})
  }

  const onChange = (e) => {
    onInput({
      columnIndex,
      rowIndex,
      value: e.target.value
    })

    if (!cursor.isEditing) {
      setCursor({ ...cursor, isEditing: true })
    }
  }

  const moveCursor = (event) => {
    let newColIndex = cursor.columnIndex
    let newRowIndex = cursor.rowIndex

    if (!['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event)) return;

    if (event === 'ArrowUp') {
      if (newRowIndex === 0) return
      newRowIndex = cursor.rowIndex - 1
    }
    else if (event === 'ArrowDown') {
      if (newRowIndex === rows.length - 1) return
      newRowIndex = cursor.rowIndex + 1
    }
    else if (event === 'ArrowLeft') {
      if (newColIndex === 0) return;
      newColIndex = cursor.columnIndex - 1
    }
    else {
      newColIndex = cursor.columnIndex + 1
      if (newColIndex === columns.length) {
        newColIndex = 0
        if (newRowIndex === rows.length - 1) return
        newRowIndex += 1
      }
    }

    const cellE = document.querySelector(`#cell-${newRowIndex}-${newColIndex}`)

    setCursor({
      ...cursor,
      top: cellE.offsetTop,
      left: cellE.offsetLeft,
      width: cellE.offsetWidth,
      height: cellE.offsetHeight,
      rowIndex: newRowIndex,
      columnIndex: newColIndex,
      isEditing: true
    })
  }

  useEffect(() => {
    // 2. Sửa điều kiện: Luôn luôn focus vào inputRef mỗi khi vị trí ô hoặc trạng thái chỉnh sửa thay đổi
    if (cursor.rowIndex !== -1 && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [cursor.rowIndex, cursor.columnIndex, cursor.isEditing])

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && cursor.isEditing) {
      moveCursor('ArrowRight')
      return
    }

    if (e.key === 'Enter' && !cursor.isEditing) {
      setCursor({...cursor, isEditing: true})
      return
    }

    moveCursor(e.key)

    if (!cursor.isEditing && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      setCursor({ ...cursor, isEditing: true })

      onInput({
        columnIndex,
        rowIndex,
        value: cell + e.key
      })

      e.preventDefault()
    }
  }

  return (
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
        {
          cursor.rowIndex !== -1
          && <input
            ref={inputRef}
            onKeyDown={onKeyDown}
            onDoubleClick={onDoubleClick}
            value={cell}
            autoFocus={true}
            onChange={onChange}
            style={{
              width: '100%',
              height: '100%',
              outline: 'none',
              border: 'none',
              pointerEvents: 'auto',
              opacity: cursor.isEditing ? 1 : 0,
              backgroundColor: cursor.isEditing ? '#fff' : 'transparent',
            }}
          />
        }
      </div>
    </>
  )
}

export default CellInput