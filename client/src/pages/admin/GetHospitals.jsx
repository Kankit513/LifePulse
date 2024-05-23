import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function GetHospitals() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [allHospitalError, setAllHospitalError] = useState(false);
    const [allHospital, setAllHospital] = useState([]);

    useEffect(() => {
        const handleShowAllHospital = async () => {
            try {
                setAllHospitalError(false);
              const res = await fetch(`/api/admin/getallhospitals`, {
                credentials: 'include'
              });
              const data = await res.json();
              if (data.success === false) {
                setAllHospitalError(true);
                return;
              }
              console.log(data);
              setAllHospital(data);
            } catch (error) {
                setAllHospitalError(true);
            }
        };
        handleShowAllHospital();
    },[]);

    return (
        <>
            <h1 className='text-center my-4 text-3xl font-semibold'>All Hospitals</h1>
            {allHospital.length > 0 ? (
                <>
                <div className='p-4 max-w-4xl mx-auto border-2 border-slate-600 bg-slate-300 rounded-md mb-4'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                        <table className="w-full text-center rtl:text-right text-slate-600">
                            <thead className="text-sm text-black uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Hospital Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                </tr>
                            </thead>
                            {allHospital && allHospital.length > 0 && (
                            <tbody className='text-md'>
                                {allHospital.map((hospital) => (
                                <tr key={hospital._id} className="border-2">
                                    <th className="px-6 py-4">
                                        {hospital.hospitalName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {hospital.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hospital.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hospital.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hospital.role}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            )}
                        </table>
                    </div>
                </div>
                </>
            ) : (
                <h3 className="text-xl my-2 text-center">No Hospital Found!</h3>
            )}
        </>
    );
} 
