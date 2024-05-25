import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {

  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className='bg-teal-800 text-white shadow-md'>
        <div className='flex justify-between items-center max-w-5xl mx-auto p-4'>
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl'>
              <span className='text-slate-200'>Life</span>
              <span className='text-slate-400'>Pulse</span>
            </h1>
          </Link>

          <ul className='flex gap-4 relative mt-1'>
            <Link to='/about'>
              <li className='text-slate-200 sm:inline hover:underline'>
                About
              </li>
            </Link>
            {currentUser ? (
              <>
                <div className='relative' ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className='text-slate-200 sm:inline hover:underline focus:outline-none'
                  >
                    Action
                    <svg
                      className='inline w-4 h-4 fill-current text-slate-200'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                    </svg>
                  </button>
                  {dropdownOpen && currentUser.role==='consumer' && (
                    <div className='absolute right-0 mt-3 w-56 bg-cyan-200 rounded-md border border-gray-700 shadow-lg z-20'>
                      <Link to='/home' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Home
                      </Link>
                      <Link to='/consumer-blood-request' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Make Blood Request
                      </Link>
                      <Link to='/consumer-blood-request-history' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Blood Request History
                      </Link>
                    </div>
                  )}
                  {dropdownOpen && currentUser.role==='donor' && (
                    <div className='absolute right-0 mt-3 w-60 bg-cyan-200 rounded-md border border-gray-700 shadow-lg z-20'>
                      <Link to='/home' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Home
                      </Link>
                      <Link to='/donor-donation-request' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Make Donation Request
                      </Link>
                      <Link to='/donor-donation-request-history' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Donation Request History
                      </Link>
                    </div>
                  )}
                  {dropdownOpen && currentUser.role==='hospital' && (
                    <div className='absolute right-0 mt-3 w-56 bg-cyan-200 rounded-md border border-gray-700 shadow-lg z-20'>
                      <Link to='/home' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Home
                      </Link>
                      <Link to='/hospital-blood-request' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Make Blood Request
                      </Link>
                      <Link to='/hospital-blood-request-history' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Blood Request History
                      </Link>
                    </div>
                  )}
                  {dropdownOpen && currentUser.role==='organisation' && (
                    <div className='absolute right-0 mt-3 w-60 bg-cyan-200 rounded-md border border-gray-700 shadow-lg z-20'>
                      <Link to='/home' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Home
                      </Link>
                      <Link to='/create-blood' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Create Blood
                      </Link>
                      <Link to='/update-blood' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Update Blood
                      </Link>
                      <Link to='/organisation-blood-request-history' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Blood Request Received
                      </Link>
                      <Link to='/organisation-donation-request-history' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Donation Request Received
                      </Link>
                    </div>
                  )}
                  {dropdownOpen && currentUser.role==='admin' && (
                    <div className='absolute right-0 mt-3 w-52 bg-cyan-200 rounded-md border border-gray-700 shadow-lg z-20'>
                      <Link to='/home' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Home
                      </Link>
                      <Link to='/get-consumers' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Consumer List
                      </Link>
                      <Link to='/get-donors' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Donor List
                      </Link>
                      <Link to='/get-hospitals' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Hospital List
                      </Link>
                      <Link to='/get-organisations' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        Organisation List
                      </Link>
                      <Link to='/admin-blood-request-history' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        All Blood Request
                      </Link>
                      <Link to='/admin-donation-request-history' className='block px-4 py-2 text-black hover:bg-slate-400' onClick={closeDropdown}>
                        All Donation Request
                      </Link>
                    </div>
                  )}
                </div>
              </> ) : (
                  <></>
            )}
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-7 w-7 object-cover border-solid border-2 border-slate-800'
                  src='https://cdn-icons-png.freepik.com/256/3135/3135715.png'
                  alt='profile'
                />
              ) : (
                <li className='text-slate-200 hover:underline'>Login</li>
              )}
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
}
