import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import background from './assets/banner1.jpg';

export default function Home() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
    <div className='bg-teal-800'>
      <header className='text-white shadow-xl p-3'>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
          <Link to='#'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <span className='text-slate-200'>Life</span>
              <span className='text-slate-400'>Pulse</span>
            </h1>
          </Link>
          <ul className='flex gap-4 mt-1'>
            <Link to='/home'>
              <li className='text-slate-200 sm:inline hover:underline'>
                Home
              </li>
            </Link>
            <Link to='/about'>
              <li className='text-slate-200 sm:inline hover:underline'>
                About
              </li>
            </Link>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-7 w-7 object-cover border-solid border-2 border-slate-800'
                  src='https://cdn-icons-png.freepik.com/256/3135/3135715.png'                  alt='profile'
                />
              ) : (
                <li className='text-slate-200 hover:underline'>Login</li>
              )}
            </Link>
          </ul>
        </div>
      </header>
      <div 
        className='flex text-center items-center h-screen text-white' 
        style={{ 
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }}
      >
        <div className='mx-auto text-black'>
            <h1 className='text-4xl font-semibold mb-4'>LifePulse™</h1>
            <p className="text-xl mb-8 "> Welcome to LifePulse™! <br /> Jump right in, if you need or donate Blood.</p>
            <Link to={"/home"} className="bg-cyan-400 p-3 text-lg text-black font-semibold rounded-lg border-2 border-black">Proceed</Link>
        </div>
      </div>
      <div className="flex justify-center text-slate-300 p-4">
          <p>© 2024 LifePulse™</p>
      </div>
    </div>
    </>
  )
}
