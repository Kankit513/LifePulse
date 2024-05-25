import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HospitalBloodRequest() {

  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [allOrganisationError, setAllOrganisationError] = useState(false);
  const [allOrganisation, setAllOrganisation] = useState([]);

    useEffect(() => {
        const handleShowAllOrganisation = async () => {
            try {
              setAllOrganisationError(false);
              const res = await fetch(`/api/admin/getallorganisations`, {
                credentials: 'include'
              });
              const data = await res.json();
              if (data.success === false) {
                setAllOrganisationError(true);
                return;
              }
              console.log(data);
              setAllOrganisation(data);
            } catch (error) {
                setAllOrganisationError(true);
            }
        };
        handleShowAllOrganisation();
    },[]);


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
      const res = await fetch(`/api/hospital/createhospitalbloodrequest`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
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
      navigate('/hospital-blood-request-history');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
  return (
      <>
      <h1 className='text-3xl text-center font-semibold mt-6'>Blood Request Form</h1>
      <div className='p-5 max-w-4xl mx-auto my-6 border-2 border-slate-800 rounded-md bg-slate-300'>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
          <div className='flex flex-col gap-4 flex-1'>
              <input
                type='text'
                placeholder='Patient Name'
                className='border-2 border-neutral-600 p-3 rounded-md'
                id='patientName'
                required
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='Address'
                className='border-2 border-neutral-600 p-3 rounded-md'
                id='address'
                required
                onChange={handleChange}
              />
              <input
                type='email'
                placeholder='Email'
                className='border-2 border-neutral-600 p-3 rounded-md'
                id='email'
                required
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='Phone'
                className='border-2 border-neutral-600 p-3 rounded-md'
                id='phone'
                min='10'
                max='10'
                required
                onChange={handleChange}
              />
              <input
                type='number'
                placeholder='Age'
                className='border-2 border-neutral-600 p-3 rounded-md'
                id='age'
                min='1'
                max='100'
                required
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='Reason (if any)'
                className='border-2 border-neutral-600 p-3 rounded-md'
                id='disease'
                onChange={handleChange}
              />
          </div>
          <div className='flex flex-col flex-1 gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
              <select className='border-2 border-neutral-600 p-3 rounded-md' id='orgRef' required onChange={handleChange}>
                  <option value=''>Select a Organisation</option>
                {allOrganisation && allOrganisation.map((organisation) => (
                  <option key={organisation._id} value={organisation._id}>{organisation.organisationName}</option>
                ))}
              </select>
              <select className='border-2 border-neutral-600 p-3 rounded-md' id='gender' onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
              </select>
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
              <input
                type='number'
                placeholder='Blood Quantity (in units)'
                className='border-2 border-neutral-600 p-3 rounded-md'
                id='quantity'
                min='1'
                max='10'
                required
                onChange={handleChange}
              />
            <button
              disabled={loading}
              className='bg-green-600 border-2 border-neutral-600 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
            </div>
          </div>
        </form>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      </>
  );
}