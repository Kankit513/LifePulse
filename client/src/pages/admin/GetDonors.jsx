import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function GetDonors() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [allDonorError, setAllDonorError] = useState(false);
    const [allDonor, setAllDonor] = useState([]);

    useEffect(() => {
        const handleShowAllDonor = async () => {
            try {
              setAllDonorError(false);
              const res = await fetch(`/api/admin/getallDonors`, {
                credentials: 'include'
              });
              const data = await res.json();
              if (data.success === false) {
                setAllDonorError(true);
                return;
              }
              console.log(data);
              setAllDonor(data);
            } catch (error) {
                setAllDonorError(true);
            }
        };
        handleShowAllDonor();
    },[]);

    return (
        <>
            <h1 className='text-center my-4 text-3xl font-semibold'>All Donors</h1>
            {allDonor.length > 0 ? (
                <>
                <div className='p-4 max-w-4xl mx-auto border-2 border-slate-600 bg-slate-300 rounded-md mb-4'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                        <table className="w-full text-center rtl:text-right text-slate-600">
                            <thead className="text-sm text-black uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Donor Name
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
                            {allDonor && allDonor.length > 0 && (
                            <tbody className='text-md'>
                                {allDonor.map((donor) => (
                                <tr key={donor._id} className="border-2">
                                    <th className="px-6 py-4">
                                        {donor.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {donor.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {donor.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {donor.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {donor.role}
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
                <h3 className="text-xl my-2 text-center">No Donor Found!</h3>
            )}
        </>
    );
} 
