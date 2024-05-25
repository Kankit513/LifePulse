import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      console.log(data);
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // const handleDeleteUser = async () => {
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: 'DELETE',
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };

  const handleLogOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/logout`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  return (
      <>
      {currentUser.role === 'consumer' ? (
        <h1 className='text-3xl font-semibold text-center mt-6'>User Profile</h1>
      ) :
      currentUser.role === 'donor' ? (
        <h1 className='text-3xl font-semibold text-center mt-6'>Donor Profile</h1>
      ) :
      currentUser.role === 'admin' ? (
        <h1 className='text-3xl font-semibold text-center mt-6'>Admin Profile</h1>
      ) :
      currentUser.role === 'hospital' ? (
        <h1 className='text-3xl font-semibold text-center mt-6'>Hospital Profile</h1>
      ) :
      currentUser.role === 'organisation' ? (
        <h1 className='text-3xl font-semibold text-center mt-6'>Organisation Profile</h1>
      ) : (
        null
      )}
      <div className='p-4 max-w-md mx-auto border-2 border-slate-800 rounded-md my-6 bg-slate-300'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <img
            src='https://cdn-icons-png.freepik.com/256/3135/3135715.png'
            alt='profile'
            className='rounded-full h-24 w-24 object-cover self-center mt-4 border-solid border-2 border-black'
          />
          {(currentUser.role === 'consumer' || currentUser.role === 'donor' || currentUser.role === 'admin') ? (
          <>
          <input
            type='text'
            placeholder='Username'
            defaultValue={currentUser.username}
            id='username'
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            defaultValue={currentUser.email}
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Address'
            id='address'
            defaultValue={currentUser.address}
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={handleChange}
            id='password'
            className='border-2 border-neutral-600 p-3 rounded-md'
          />
          </>
          ) : 
          currentUser.role === 'hospital' ? (
          <>
          <input
            type='text'
            placeholder='Hospital'
            defaultValue={currentUser.hospitalName}
            id='hospitalName'
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            defaultValue={currentUser.email}
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Address'
            id='address'
            defaultValue={currentUser.address}
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={handleChange}
            id='password'
            className='border-2 border-neutral-600 p-3 rounded-md'
          />
          </>
          ) :
          currentUser.role === 'organisation' ? (
          <>
          <input
            type='text'
            placeholder='Organisation'
            defaultValue={currentUser.organisationName}
            id='organisationName'
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            defaultValue={currentUser.email}
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Address'
            id='address'
            defaultValue={currentUser.address}
            className='border-2 border-neutral-600 p-3 rounded-md'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={handleChange}
            id='password'
            className='border-2 border-neutral-600 p-3 rounded-md'
          />
          </>
          ) : (
            null
          )}
          {/* <div className='flex justify-end'>
            <span
              onClick={handleDeleteUser}
              className='bg-red-600 text-white text-lg rounded-md w-36 h-10 text-center p-1 cursor-pointer hover:opacity-95 disabled:opacity-80'
            >
              Delete Account
            </span>
          </div> */}
            <Link onClick={handleLogOut} className='bg-sky-600 text-center text-white text-lg h-12 rounded-lg p-2 hover:opacity-95 disabled:opacity-80'
            >
              Logout
            </Link>
          <button
            disabled={loading}
            className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Update Profile'}
          </button>

          <div className='flex flex-col font-semibold'>
            <p className='text-green-700 text-md '>
              {updateSuccess ? 'User is updated successfully!' : ''}
            </p>
            <p className='text-red-700 text-md'>{error ? error : ''}</p>
          </div>
        </form>
      </div>
      </>
  );
}
