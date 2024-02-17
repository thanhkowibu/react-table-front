import { useState, useEffect } from 'react'
import Table from './Components/Table'
import { Modal } from './Components/Modal'
import { EditModal } from './Components/EditModal'
import { motion } from 'framer-motion'
import axios from 'axios'
import backgroundImage from './assets/mika.jfif'

import SlideInNotifications from './Components/Noti'


function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [notifications, setNotifications] = useState([]);
const generateNotif = (text) => {
    const data = {
        text: `${text}`,
    };
    return data;
};

  const [rows, setRows] = useState([])
    const [rowToEdit, setRowToEdit] = useState({})

  const handleSubmit = (form) => {
    // axios.post('http://localhost:3030/table', form)
      axios.post('https://mock-table.onrender.com/table', form)
      .then(res => {
          setRows([...rows, res.data])
          setIsOpen(false)
          const newNotification = generateNotif('Added 1 item');
          setNotifications((pv) => [newNotification, ...pv]);
      })
      .catch(err => {
          console.log(err)
      })
  }
  const handleEditSubmit = (form) => {
    // axios.put(`http://localhost:3030/table/${rowToEdit.id}`, form)
      axios.put(`https://mock-table.onrender.com/table/${rowToEdit.id}`, form)
        .then(res => {
            setRows(rows.map(row => row.id === rowToEdit.id ? res.data : row))
            setIsEditOpen(false)
            const newNotification = generateNotif('Item has been edited');
            setNotifications((pv) => [newNotification, ...pv]);
        })
        .catch(err => {
            console.log(err)
        })
    }
  const handleOpenEdit = (dataId) => {
    // axios.get(`http://localhost:3030/table/${dataId}`)
      axios.get(`https://mock-table.onrender.com/table/${dataId}`)
        .then(res => {
            setRowToEdit(res.data)
            setIsEditOpen(true)
            // console.log(res.data)
            // console.log(rowToEdit)
            // console.log(isEditOpen)
        })
        .catch(err => {
            console.log(err)
        })
    }

  const handleDelete = (dataId, index) => {
    // axios.delete(`http://localhost:3030/table/${dataId}`)
      axios.delete(`https://mock-table.onrender.com/table/${dataId}`)
      .then(() =>{
          setRows(rows.filter((_, i) => i !== index))
          const newNotification = generateNotif('Deleted 1 item');
          setNotifications((pv) => [newNotification, ...pv]);
      })
      .catch(err => {
          console.log(err)
      })
      // console.log(dataId, index)
  }

  useEffect(() => {
    // axios.get('http://localhost:3030/table')
    axios.get('https://mock-table.onrender.com/table')
      .then(res => {
          setRows(res.data)
      })
      .catch(err => {
          console.log(err)
      })
  },[])
  console.log(rows)
  
  return (
  <div className='flex flex-col items-center justify-center h-screen bg-slate-100'>
    <div 
      className='absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-20 filter blur-[1px]' 
      style={{ backgroundImage: `url(${backgroundImage})`}}
    />
    <div 
      className='absolute inset-0 bg-black opacity-10 pointer-events-none'
    />
    <Table rows={rows} deleteRow={handleDelete} editRow={handleOpenEdit} />
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={()=>setIsOpen(true)} className='block mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md'>Add</motion.button>
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleSubmit}/>
    <EditModal isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} data={rowToEdit} onSubmit={handleEditSubmit}/>
    <SlideInNotifications notifications={notifications} setNotifications={setNotifications} />
  </div>
  )
}

export default App
