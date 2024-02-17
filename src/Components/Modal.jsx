import React from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";

export const Modal = ({isOpen, setIsOpen, onSubmit}) => {
    const [form, setForm] = useState({
        page: '',
        description: '',
        status: "live"
    })
    const [invalid, setInvalid] = useState("")
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const validate = () => {
        if(form.page === ''){
            setInvalid("Page")
            return false
        }
        else if(form.description === ''){
            setInvalid("Description")
            return false
        }
        return true
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validate()) return
        onSubmit(form)
        setForm({page: '', description: '', status: "live"})
        setInvalid("")
    }

  return (
    <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={()=>{setIsOpen(false);setForm({page: '', description: '', status: "live"});setInvalid("")}}
                className=' backdrop-blur-[1px] fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center'
            >
                <motion.div 
                    initial={{ y: 0, scaleY: 0.3, transition: {
                        delay: 0,
                    }, }}
                    animate={{ y: 0, scaleY: 1, transition: {
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 270,
                        damping: 17,
                    },}}
                    exit={{ scaleY: 0}}        
                    onClick={(e) => e.stopPropagation()}
                    className='rounded-lg bg-white p-10 w-3/5'
                >
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-2">
                            <label className='mb-1' htmlFor="page">Page</label>
                            <input id='page' className='border border-black rounded-md p-2 text-base' name="page" onChange={handleChange}/>
                        </div>
                        {invalid === "Page" && <p className='text-red-600 flex items-center'>Please fill in this field</p>}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="description">Description</label>
                            <textarea id='description' className='border border-black rounded-md p-2 text-base' name="description" onChange={handleChange}/>
                        </div>
                        {invalid === "Description" && <p className='text-red-500 flex items-center'>Please fill in this field</p>}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="status">Status</label>
                            <select id='status' className='border border-black rounded-md p-2 text-base' name="status" onChange={handleChange}>
                                <option value="live">Live</option>
                                <option value="draft">Draft</option>
                                <option value="error">Error</option>
                            </select>
                        </div>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type='submit' className='block m-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md'>Submit</motion.button>
                    </form>
                </motion.div>
            </motion.div>
            )}
    </AnimatePresence>
  )
}
