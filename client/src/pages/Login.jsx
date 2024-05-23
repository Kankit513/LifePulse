import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/home');
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };
  return (
      <>
      <h1 className='text-3xl text-center font-semibold mt-6'>Login</h1>
      <div className='max-w-lg mx-auto my-6 border-2 border-slate-800 rounded-md bg-slate-300'>
        <div style={{borderBottom: '2px solid black'}}>
          <img src="https://www.shutterstock.com/image-photo/doctor-hand-taking-blood-sample-600nw-1114244621.jpg" alt="" />
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 mt-3'>
          <div className='flex flex-col'>
            <select className='border-2 border-neutral-600 p-3 rounded-md' id='role' onChange={handleChange}>
                <option value="">Select a Role</option>
                <option value="consumer">Consumer</option>
                <option value="donor">Donor</option>
                <option value="hospital">Hospital</option>
                <option value="organisation">Organisation</option>
                <option value="admin">Admin</option>
            </select>
          </div>
          <input
            type='email'
            placeholder='Email'
            className='border-2 border-neutral-600 p-3 rounded-md my-1'
            id='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='border-2 border-neutral-600 p-3 rounded-md my-1'
            id='password'
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className='bg-green-600 text-white p-3 border-2 border-neutral-600 rounded-md uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className='flex gap-2 mx-6 mb-4'>
          <p>Don't have an account?</p>
          <Link to={'/register'}>
            <span className='text-blue-600'>Register</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      </>
  );
}