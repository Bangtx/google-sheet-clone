import './App.css'
import EditableTable from './components/EditableTable'
import {useState} from "react";

const columns = [
  { name: 'product', width: '60%'},
  { name: 'quantity', width: '10%' },
  { name: 'price', width: '10%' },
  { name: 'amount', width: '10%' },
  { name: 'comment', width: '10%' },
]

const rows = [
  {
    id: 1,
    product: 'product 1',
    quantity: 50,
    price: 10000,
    amount: 500000,
    comment: 'this is comment'
  },
  {
    id: 2,
    product: 'product 2',
    quantity: 50,
    price: 10000,
    amount: 500000,
    comment: 'this is comment 2'
  }
]

function App() {

  return (
    <>
      <EditableTable columns={columns} rows={rows}/>
    </>
  )
}

export default App
