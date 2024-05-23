import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function AdminBloodRequestHistory() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [showBloodRequestError, setShowBloodRequestError] = useState(false);
    const [adminBloodRequest, setAdminBloodRequest] = useState([]);

    useEffect(() => {
        const handleShowBloodRequest = async () => {
            try {
              setShowBloodRequestError(false);
              const res = await fetch(`http://localhost:4000/api/admin/getadminbloodrequesthistory`, {
                credentials: 'include'
            });
              const data = await res.json();
              if (data.success === false) {
                setShowBloodRequestError(true);
                return;
              }
              console.log(data);
              setAdminBloodRequest(data);
            } catch (error) {
                setShowBloodRequestError(true);
            }
        };
        handleShowBloodRequest();
    },[]);

    const updateStatus = async (id, newStatus) => {
        try {
          const response = await fetch(`http://localhost:4000/api/admin/updateadminbloodrequeststatus/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
          });
          const data = await response.json();
          if (data.success === false) {
            return;
          }
          console.log(data);
          setAdminBloodRequest((prevRequests) =>
            prevRequests.map((request) =>
                request._id === id ? { ...request, status: newStatus } : request
            )
          );
        } catch (error) {
          console.error('Failed to update status', error);
        }
    };

    return (
        <>
            <h1 className='text-center my-4 text-3xl font-semibold'>All Blood Request</h1>
            {adminBloodRequest.length > 0 ? (
                <>
                <div className='p-4 max-w-7xl mx-auto border-2 border-slate-600 bg-slate-300 rounded-md mb-4'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                        <table className="w-full text-center rtl:text-right text-slate-600">
                            <thead className="text-sm text-black uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Address
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3">
                                        Email
                                    </th> */}
                                    {/* <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th> */}
                                    <th scope="col" className="px-6 py-3">
                                        Age
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Blood-Group
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Disease
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hospital
                                    </th>
                                </tr>
                            </thead>
                            {adminBloodRequest && adminBloodRequest.length > 0 && (
                            <tbody className='text-md'>
                                {adminBloodRequest.map((request) => (
                                <tr key={request._id} className="border-2 h-20">
                                    <th className="px-6 py-4">
                                        {request.patientName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {request.address}
                                    </td>
                                    {/* <td className="px-6 py-4">
                                        {request.email}
                                    </td> */}
                                    {/* <td className="px-6 py-4">
                                        {request.phone}
                                    </td> */}
                                    <td className="px-6 py-4">
                                        {request.age}
                                    </td>
                                    <td className="px-6 py-4">
                                        {request.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        {request.bloodGroup}
                                    </td>
                                    <td className="px-6 py-4">
                                        {request.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {request.disease}
                                    </td>
                                    <td className="px-6 py-4">
                                        {request.status === 'Pending' ? (
                                            <div className='h-7 w-20 text-white bg-sky-500'>
                                                {request.status}
                                            </div>
                                        ) : request.status === 'Approved' ? (
                                            <div className='h-7 w-20 text-white bg-green-600'>
                                                {request.status}
                                            </div>
                                        ) : (
                                            <div className='h-7 w-20 text-white bg-red-600'>
                                                {request.status}
                                            </div>
                                        )}
                                    </td>
                                    <td className="flex gap-2 px-4 py-6">
                                        {request.status === 'Pending' ? (
                                            <>
                                                <button onClick={() => updateStatus(request._id, 'Approved')} className='h-8 w-20 text-white rounded-3xl bg-green-600'>
                                                    Approve
                                                </button>
                                                <button onClick={() => updateStatus(request._id, 'Rejected')} className='h-8 w-20 text-white rounded-3xl bg-red-600'>
                                                    Reject
                                                </button>
                                            </>
                                        ) : request.status === 'Approved' ? (
                                            <div className='text-md flex-1'>{request.quantity} unit of {request.bloodGroup} blood sent!</div>
                                        ) : (
                                            <div className='text-md flex-1'>Request Discarded!</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {request.userRef.hospitalName || 'consumer role'}
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
                <>
                    <h3 className="text-xl my-2 text-center">No Blood Request Found!</h3>
                </>
            )}
        </>
    );
} 