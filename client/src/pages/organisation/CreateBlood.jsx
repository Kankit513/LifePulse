import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Login() {

  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
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
      const res = await fetch(`/api/blood/create/${currentUser._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...formData,
            orgRef: currentUser._id,
        }),
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
      navigate('/home');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
      <>
      <h1 className='text-2xl text-center font-semibold mt-6 uppercase'>Create Blood for {currentUser.organisationName} Organisation!</h1>
      <div className='max-w-lg mx-auto my-6 border-2 border-slate-800 rounded-md bg-slate-300'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5 mt-3'>
          <div className='flex flex-col'>
            <select className='border-2 border-neutral-600 p-3 rounded-md' id='bloodGroup' onChange={handleChange}>
                <option value="">Select Blood Group</option>
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
            type='number'
            placeholder='Quantity (in units)'
            className='border-2 border-neutral-600 p-3 rounded-md my-1'
            id='unit'
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className='bg-green-600 text-white p-3 border-2 border-neutral-600 rounded-md uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Create'}
          </button>
        </form>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      </>
  );
}