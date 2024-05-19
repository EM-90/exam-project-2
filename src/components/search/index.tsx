import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export const Search = ({value, onChange}) => {

  return (
    <article className='inputWrapper border-2 flex items-center p-2 rounded-md '>
      <FaSearch size={24} className=' text-skin-primary mx-2'/>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder='Type to search for venue' className='border-none focus:outline-none text-lg w-full py-1' />
    </article>
  )
}

export default Search
