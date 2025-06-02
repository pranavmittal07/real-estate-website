import { FaSearch } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import React from 'react'

const Header = () => {
  return (
    <header className=' bg-slate-300 shadow-md'>
        <div className='flex justify-between items-center p-3'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'> 
                <span className='text-slate-500'>Apna</span>
                <span className='text-slate-700'>Ghar</span>
            </h1>
            <form className='flex bg-slate-100 p-3 rounded-lg items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none'/>
                <FaSearch className='text-slate-600'/>
            </form>

            <ul className='flex gap-4'>
                <Link to="/">
                <li className='text-slate-700 hidden sm:inline  hover:underline'>Home</li>
                </Link>
                <Link to="/about">
                <li className='text-slate-700 hidden sm:inline  hover:underline'>About</li>
                </Link>
                <Link to="/sign-in">
                <li className='text-slate-700   hover:underline'>Sign In</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header