import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function GetConsumers() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [allConsumerError, setAllConsumerError] = useState(false);
    const [allConsumer, setAllConsumer] = useState([]);

    useEffect(() => {
        const handleShowAllConsumer = async () => {
            try {
                setAllConsumerError(false);
              const res = await fetch(`/api/admin/getallConsumers`, {
                credentials: 'include'
              });
              const data = await res.json();
              if (data.success === false) {
                setAllConsumerError(true);
                return;
              }
              console.log(data);
              setAllConsumer(data);
            } catch (error) {
                setAllConsumerError(true);
            }
        };
        handleShowAllConsumer();
    },[]);

    return (
        <>
            <h1 className='text-center my-4 text-3xl font-semibold'>All Consumers</h1>
            {allConsumer.length > 0 ? (
                <>
                <div className='p-4 max-w-4xl mx-auto border-2 border-slate-600 bg-slate-300 rounded-md mb-4'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                        <table className="w-full text-center rtl:text-right text-slate-600">
                            <thead className="text-sm text-black uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Consumer Name
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
                            {allConsumer && allConsumer.length > 0 && (
                            <tbody className='text-md'>
                                {allConsumer.map((consumer) => (
                                <tr key={consumer._id} className="border-2">
                                    <th className="px-6 py-4">
                                        {consumer.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {consumer.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consumer.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consumer.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consumer.role}
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
                <h3 className="text-xl my-2 text-center">No Consumer Found!</h3>
            )}
        </>
    );
} 
