import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function GetOrganisations() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
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

    return (
        <>
            <h1 className='text-center my-4 text-3xl font-semibold'>All Organisations</h1>
            {allOrganisation.length > 0 ? (
                <>
                <div className='p-4 max-w-4xl mx-auto border-2 border-slate-600 bg-slate-300 rounded-md mb-4'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                        <table className="w-full text-center rtl:text-right text-slate-600">
                            <thead className="text-sm text-black uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Organisation Name
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
                            {allOrganisation && allOrganisation.length > 0 && (
                            <tbody className='text-md'>
                                {allOrganisation.map((organisation) => (
                                <tr key={organisation._id} className="border-2">
                                    <th className="px-6 py-4">
                                        {organisation.organisationName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {organisation.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {organisation.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {organisation.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {organisation.role}
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
                <h3 className="text-xl my-2 text-center">No Organisation Found!</h3>
            )}
        </>
    );
} 
