import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function OrganisationBloodStock() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [allBloodError, setAllBloodError] = useState(false);
    const [bloodStock, setBloodStock] = useState([]);
    const params = useParams();

    useEffect(() => {
        const handleShowAllBlood = async () => {
            try {
              setAllBloodError(false);
              const res = await fetch(`/api/blood/getall/${params.organisationId}`, {
                credentials: 'include'
              });
              const data = await res.json();
              if (data.success === false) {
                setAllBloodError(true);
                return;
              }
              console.log(data);
              setBloodStock(data);
            } catch (error) {
              setAllBloodError(true);
            }
        };
        handleShowAllBlood();
    }, [setBloodStock]);

    return (
        <>
            <h1 className='text-center my-4 text-3xl font-semibold'>Blood Stock</h1>
                {bloodStock.length > 0 ? (
                <>
                <div className='p-4 max-w-md mx-auto border-2 border-slate-600 bg-slate-300 rounded-md mb-4'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                        <table className="w-full text-center rtl:text-right text-slate-600">
                            <thead className="text-sm text-black uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Blood-Group
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            {bloodStock && bloodStock.length > 0 && (
                            <tbody className='text-md'>
                                {bloodStock.map((blood) => (
                                <tr key={blood._id} className="border-2">
                                    <th className="px-6 py-4">
                                        {blood.bloodGroup}
                                    </th>
                                    <td className="px-6 py-4">
                                        {blood.unit}
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
                  <h3 className="text-xl my-2 text-center">Blood Stock is Empty! Please Create Blood for this Organisation first...</h3>
                )}
        </>
    );
}
