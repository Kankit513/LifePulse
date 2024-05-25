import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function UpdateBlood() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [allBloodError, setAllBloodError] = useState(false);
    const [bloodStock, setBloodStock] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
    const [selectedBloodGroupId, setSelectedBloodGroupId] = useState(null);

    useEffect(() => {
        const handleShowAllBlood = async () => {
            try {
              setAllBloodError(false);
              const res = await fetch(`/api/blood/getall/${currentUser._id}`, {
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

    const openModal = (id, bloodgrp) => {
        setSelectedBloodGroupId(id);
        setSelectedBloodGroup(bloodgrp);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setQuantity('');
        setSelectedBloodGroupId(null);
        setSelectedBloodGroup(null);
    };

    const handleSubmit = async () => {
        if (!quantity || quantity <= 0) {
            return;
        }
        try {
          const response = await fetch(`/api/organisation/updatebloodgroupquantity/${selectedBloodGroupId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ unit: quantity }),
          });
          const data = await response.json();
          if (data.success === false) {
            return;
          }
          console.log(data);
          setBloodStock((prevStock) =>
            prevStock.map((blood) =>
                blood._id === selectedBloodGroupId ? { ...blood, unit: (Number(blood.unit) + Number(quantity)) } : blood
            )
          );
          closeModal();
        } catch (error) {
          console.error('Failed to Update Quantity!', error);
        }
    };

    return (
        <>
            <h1 className='text-center my-4 text-2xl font-semibold uppercase'>Update Blood for {currentUser.organisationName} Organisation!</h1>
                <div className='p-4 max-w-lg mx-auto border-2 border-slate-600 bg-slate-300 rounded-md mb-4'>
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
                                    <th scope="col" className="px-6 py-3">
                                        Action
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
                                    <td className="px-6 py-4">
                                        <button onClick={() => openModal(blood._id, blood.bloodGroup)} className='h-8 w-16 text-white rounded-3xl bg-green-600'>
                                            Update
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            )}
                        </table>
                    </div>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="bg-slate-400 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-48">
                    <h2 className="text-md mb-2">Enter the quantity of {selectedBloodGroup} blood that you want to add!</h2>
                    <input
                        type="number"
                        className="border border-gray-700 p-2 rounded-md mb-4 w-full"
                        value={quantity}
                        required
                        min='1'
                        max='100'
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <button onClick={closeModal} className='bg-red-600 text-white p-2 rounded-md mr-3'>
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className='bg-green-600 text-white p-2 rounded-md'>
                            Submit
                        </button>
                    </div>
                </Modal>
        </>
    );
}
