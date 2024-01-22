import React from 'react'
import { useState } from 'react'
import { apiUrl } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { expresions } from '../utils/expressions'

function AddCategory() {

const [category, setCategory] = useState({ category_name: ''})
const [valido, setValido] = useState(null)

const navigate = useNavigate()
  
const handleChange = (e)=>{
    setCategory({ category_name: e.target.value})
}

const validacion = () => {
    if(expresions.category){
        if(expresions.category.test(category.category_name)){
            setValido(true)
        } else {
            setValido(false)
        }
    }
}

const handleCatSubmit = async (e)=>{
    e.preventDefault()

   const res = await apiUrl.post("/category", category, {
        headers: { "Content-Type": "application/json" },
    });

  navigate('/')
}

  return (
    <div>
     <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      <form onSubmit={handleCatSubmit} className="w-2/5">
        <h3 className="font-bold text-2xl my-3 text-white">
          Add Category
        </h3>
        <input
          type="text"
          name="category"
          placeholder="Write your category"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          onKeyUp={validacion}
          onBlur={validacion}
          value={category.category_name}
          autoFocus
        />
        {(!valido && category.category_name != "") && <p className='text-red-500'>please insert a valid category name</p>}
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={!valido}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          > 
          Save
          </button>
        </div>
      </form>
    </div>
 </div>
  )
}

export default AddCategory