import {useContext, useEffect, useRef} from "react";
import {Context} from "./store.js";

const CellInput = () => {
  const injector = useContext(Context)
  const { columns, rows, cursor, setCursor, onInput } = injector
  const {rowIndex, columnIndex} = cursor
  const divRef = useRef(null)

  // row = {id: 1, name: 'test', quantity: 2}
  const row = rows[rowIndex]
  // column = {name: 'quantity', text: 'So luong' }
  const column = columns[columnIndex]
  // columnName = quantity
  const columnName = column?.name
  // 2
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
    // event: ArrowUp ArrowLeft ArrowDown ArrowRight
    let newColIndex = cursor.columnIndex
    let newRowIndex = cursor.rowIndex

    console.log('vai dayu', event)

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
    if (!cursor.isEditing && cursor.rowIndex !== -1 && divRef.current) {
      // Dùng preventScroll để tránh trình duyệt bị giật trang khi focus
      divRef.current.focus({ preventScroll: true });
    }
  }, [cursor.rowIndex, cursor.columnIndex, cursor.isEditing])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      moveCursor('ArrowRight')
      return
    }

    moveCursor(e.key)

    // Nếu đang KHÔNG trong chế độ edit, và người dùng gõ một phím ký tự (độ dài 1 như a, b, 1, 2...)
    if (!cursor.isEditing && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // 1. Chuyển sang chế độ edit
      setCursor({ ...cursor, isEditing: true })

      onInput({
        columnIndex,
        rowIndex,
        value: cell + e.key
      })

      // Prevent mặc định để input không nhận phím này thành 2 lần gõ
      e.preventDefault()
    }
  }

  return (
    <>
      <div
        ref={divRef}            // Gắn ref
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
          && <
            input
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
              // fontSize: '16px',
              // paddingLeft: '2px',
              pointerEvents: 'auto', // Để input nhận được double click

              // Trick mấu chốt: Ẩn đi khi chưa edit, nhưng không gỡ khỏi DOM
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