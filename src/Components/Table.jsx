import React from 'react'
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs'
import './Table.css'
import { AnimatePresence, motion } from "framer-motion";

const Table = ({rows, deleteRow, editRow}) => {
  return (
    <div className=' w-full'>
        <table className='block overflow-hidden table-fixed border-collapse shadow-lg shadow-slate-400 rounded-lg whitespace-nowrap w-[100em] max-w-[80%] m-auto overflow-x-auto'>
            <thead className=' bg-gray-500 text-black'>
                <tr>
                    <th>Page</th>
                    <th className='w-full'>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <AnimatePresence>
                {rows.map((row, index) => (
                    <motion.tr 
                    initial={{ y: -10, opacity: 0, transition: {
                        delay: 0,
                    }, }}
                    animate={{ y: 0, opacity: 1, transition: {
                        ease: "easeInOut",
                        type: "spring",
                        damping: 15,
                        stiffness: 250,
                    },}}
                    exit={{ y: 5, opacity: 0, transition: {
                        ease: "easeInOut",
                        duration: 0.3,
                    }, }} 
                    key={row.id}>
                        <td className=''>{row.page}</td>
                        <td>{row.description}</td>
                        <td>
                            <span className={`label ${row.status}`}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span>
                        </td>
                        <td>
                            <span className='flex justify-around'>
                                <BsFillTrashFill onClick={()=>deleteRow(row.id,index)} className=' text-red-500 cursor-pointer hover:scale-125 hover:ease-in-out duration-300 transition'/>
                                <BsPencilSquare onClick={()=>editRow(row.id)} className=' text-gray-700 cursor-pointer hover:scale-125 hover:ease-in-out duration-300 transition'/>
                            </span>
                        </td>
                    </motion.tr>
                ))}
                </AnimatePresence>
            </tbody>
        </table>
    </div>
  )
}

export default Table