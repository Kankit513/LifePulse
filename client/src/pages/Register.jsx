import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ role : 'consumer' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/register`, {
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
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
      <>
      <h1 className='text-3xl text-center font-semibold mt-6'>Register</h1>
      <div className='max-w-lg mx-auto my-6 border-2 border-slate-800 rounded-md bg-slate-300'>
        <div style={{borderBottom: '2px solid black'}}>
          <img src="https://png.pngtree.com/thumb_back/fh260/background/20230306/pngtree-patient-during-blood-test-sampling-procedure-taken-for-analysis-photo-image_1806184.jpg" alt="" />
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 mt-2'>
          <div className='flex flex-col'>
            <label htmlFor="role" className='mb-1 ml-1'>Select Role</label>
            <select className='border-2 border-neutral-600 p-3 rounded-md' id='role' onChange={handleChange}>
                <option value="consumer">Consumer</option>
                <option value="donor">Donor</option>
                <option value="hospital">Hospital</option>
                <option value="organisation">Organisation</option>
                {/* <option value="admin">Admin</option> */}
            </select>
          </div>
          
          <div className='flex flex-col gap-3'>
            {(formData.role === 'consumer' || formData.role === 'donor') ? (
            <>
              <div className='flex flex-col'>
                <select className='border-2 border-neutral-600 p-3 rounded-md' id='bloodGroup' onChange={handleChange}>
                    <option value="">Your Blood-Group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>
              </div>
              <input
                type='text'
                placeholder='Username'
                className='border-2 border-neutral-600 p-3 rounded-md my-1'
                id='username'
                onChange={handleChange}
              />
            </>
            ) : formData.role === 'hospital' ? (
              <input
                type='text'
                placeholder='Hospital Name'
                className='border-2 border-neutral-600 p-3 rounded-md my-1'
                id='hospitalName'
                onChange={handleChange}
              />
            ) : formData.role === 'organisation' ? (
              <input
                type='text'
                placeholder='Organisation Name'
                className='border-2 border-neutral-600 p-3 rounded-md my-1'
                id='organisationName'
                onChange={handleChange}
              />
            ) : (
              null
            )}
              <input
                type='email'
                placeholder='Email'
                className='border-2 border-neutral-600 p-3 rounded-md my-1'
                id='email'
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='Phone'
                className='border-2 border-neutral-600 p-3 rounded-md my-1'
                id='phone'
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='Address'
                className='border-2 border-neutral-600 p-3 rounded-md my-1'
                id='address'
                onChange={handleChange}
              />
              <input
                type='password'
                placeholder='Password'
                className='border-2 border-neutral-600 p-3 rounded-md my-1'
                id='password'
                onChange={handleChange}
              />
          </div>
          <button
            disabled={loading}
            className='bg-green-600 border-2 border-neutral-600 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <div className='flex gap-2 mx-6 mb-4'>
          <p>Having an account?</p>
          <Link to={'/login'}>
            <span className='text-blue-600'>Login</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      </>
  );
}