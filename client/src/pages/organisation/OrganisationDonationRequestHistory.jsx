import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import moment from 'moment';

export default function OrganisationDonationRequestHistory() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [showDonationRequestError, setShowDonationRequestError] = useState(false);
    const [donationRequest, setDonationRequest] = useState([]);

    useEffect(() => {
        const handleShowDonationRequest = async () => {
            try {
              setShowDonationRequestError(false);
              const res = await fetch(`/api/organisation/getorganisationdonationrequesthistory/${currentUser._id}`, {
                credentials: 'include'
            });
              const data = await res.json();
              if (data.success === false) {
                setShowDonationRequestError(true);
                return;
              }
              console.log(data);
              setDonationRequest(data);
            } catch (error) {
                setShowDonationRequestError(true);
            }
        };
        handleShowDonationRequest();
    },[]);

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY');
    };

    const updateStatus = async (id, newStatus) => {
        try {
          const response = await fetch(`/api/organisation/updateorganisationdonationrequeststatus/${id}/${currentUser._id}`, {
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
          setDonationRequest((prevRequests) =>
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
            <h1 className='text-center my-4 text-3xl font-semibold'>Total Donation Request Received</h1>
            {donationRequest.length > 0 ? (
                <>
                <div className='p-4 max-w-7xl mx-auto border-2 border-slate-600 bg-slate-300 rounded-md mb-4'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                        <table className="w-full text-center rtl:text-right text-slate-600">
                            <thead className="text-sm text-black uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
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
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {donationRequest && donationRequest.length > 0 && (
                            <tbody className='text-md'>
                                {donationRequest.map((request) => (
                                <tr key={request._id} className="border-2">
                                    <th className="px-6 py-4">
                                        {request.donorName}
                                    </th>
                                    {/* <td className="px-6 py-4">
                                        {request.address}
                                    </td>
                                    <td className="px-6 py-4">
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
                                        {formatDate(request.date)}
                                    </td>
                                    <td className="px-6 py-4">
                                        donor
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
                                            <div className='text-md flex-1'>{request.quantity} unit of {request.bloodGroup} blood receiced!</div>
                                        ) : (
                                            <div className='text-md flex-1'>Request Discarded!</div>
                                        )}
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
                    <h3 className="text-xl my-2 text-center">No Donation Request Found!</h3>
                </>
            )}
        </>
    );
} 