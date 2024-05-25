import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaDroplet } from "react-icons/fa6";
import { MdOutlinePending } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdOutlineCancel } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import OrganisationList from "../components/OrganisationList";

export default function Home() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [allBloodError, setAllBloodError] = useState(false);
    const [bloodStock, setBloodStock] = useState([]);

    const [adminBloodRequestCount, setAdminBloodRequestCount] = useState({
      adminTotalBloodRequests: 0,
      adminPendingBloodRequests: 0,
      adminApprovedBloodRequests: 0,
      adminRejectedBloodRequests: 0,
    });
    const [adminDonationRequestCount, setAdminDonationRequestCount] = useState({
      adminTotalDonationRequests: 0,
      adminPendingDonationRequests: 0,
      adminApprovedDonationRequests: 0,
      adminRejectedDonationRequests: 0,
    });
    const [hospitalBloodRequestCount, setHospitalBloodRequestCount] = useState({
      hospitalTotalBloodRequests: 0,
      hospitalPendingBloodRequests: 0,
      hospitalApprovedBloodRequests: 0,
      hospitalRejectedBloodRequests: 0,
    });
    const [organisationBloodRequestCount, setOrganisationBloodRequestCount] = useState({
      organisationTotalBloodRequests: 0,
      organisationPendingBloodRequests: 0,
      organisationApprovedBloodRequests: 0,
      organisationRejectedBloodRequests: 0,
    });
    const [organisationDonationRequestCount, setOrganisationDonationRequestCount] = useState({
      organisationTotalDonationRequests: 0,
      organisationPendingDonationRequests: 0,
      organisationApprovedDonationRequests: 0,
      organisationRejectedDonationRequests: 0,
    });
    const [consumerBloodRequestCount, setConsumerBloodRequestCount] = useState({
      consumerTotalBloodRequests: 0,
      consumerPendingBloodRequests: 0,
      consumerApprovedBloodRequests: 0,
      consumerRejectedBloodRequests: 0,
    });
    const [donorDonationRequestCount, setDonorDonationRequestCount] = useState({
      donorTotalDonationRequests: 0,
      donorPendingDonationRequests: 0,
      donorApprovedDonationRequests: 0,
      donorRejectedDonationRequests: 0,
    });

    const [allOrganisationError, setAllOrganisationError] = useState(false);
    const [allOrganisation, setAllOrganisation] = useState([]);

      useEffect(() => {
        if(currentUser.role != 'organisation') {
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
        }
      },[]);

      useEffect(() => {
        if(currentUser.role === 'hospital') {
        const fetchHospitalBloodRequestCount = async () => {
          try {
            const response0 = await fetch(`/api/hospital/gethospitalbloodrequeststatuscount/${currentUser._id}`, {
              credentials: 'include'
            });
            const countData0 = await response0.json();
            setHospitalBloodRequestCount(countData0);
          } catch (error) {
            console.error('Error fetching Blood Requests Count: ', error);
          }
        };

        fetchHospitalBloodRequestCount();
        }
      }, []);

      useEffect(() => {
        if(currentUser.role === 'organisation') {
        const fetchOrganisationBloodRequestCount = async () => {
          try {
            const response1 = await fetch(`/api/organisation/getorganisationbloodrequeststatuscount/${currentUser._id}`, {
              credentials: 'include'
            });
            const countData1 = await response1.json();
            setOrganisationBloodRequestCount(countData1);
          } catch (error) {
            console.error('Error fetching Blood Requests Count: ', error);
          }
        };

        fetchOrganisationBloodRequestCount();
        }
      }, []);

    
      useEffect(() => {
        if(currentUser.role === 'organisation'){
        const fetchOrganisationDonationRequestCount = async () => {
          try {
            const response2 = await fetch(`/api/organisation/getorganisationdonationrequeststatuscount/${currentUser._id}`, {
              credentials: 'include'
            });
            const countData2 = await response2.json();
            setOrganisationDonationRequestCount(countData2);
          } catch (error) {
            console.error('Error Fetching Donation Requests Count: ', error);
          }
        };

        fetchOrganisationDonationRequestCount();
        }
      }, []);

      useEffect(() => {
        if(currentUser.role === 'admin') {
        const fetchAdminBloodRequestCount = async () => {
          try {
            const response3 = await fetch(`/api/admin/getadminbloodrequeststatuscount`, {
              credentials: 'include'
            });
            const countData3 = await response3.json();
            setAdminBloodRequestCount(countData3);
          } catch (error) {
            console.error('Error fetching blood requests:', error);
          }
        };
    
        fetchAdminBloodRequestCount();
        }
      }, []);

      useEffect(() => {
        if(currentUser.role === 'admin') {
        const fetchAdminDonationRequestCount = async () => {
          try {
            const response4 = await fetch(`/api/admin/getadmindonationrequeststatuscount`, {
              credentials: 'include'
            });
            const countData4 = await response4.json();
            setAdminDonationRequestCount(countData4);
          } catch (error) {
            console.error('Error fetching blood donors:', error);
          }
        };
    
        fetchAdminDonationRequestCount();
        }
      }, []);

      useEffect(() => {
        if(currentUser.role === 'consumer') {
        const fetchConsumerBloodRequestCount = async () => {
          try {
            const response5 = await fetch(`/api/consumer/getconsumerbloodrequeststatuscount/${currentUser._id}`, {
              credentials: 'include'
            });
            const countData5 = await response5.json();
            setConsumerBloodRequestCount(countData5);
          } catch (error) {
            console.error('Error fetching Blood Requests Count: ', error);
          }
        };

        fetchConsumerBloodRequestCount();
        }
      }, []);

      useEffect(() => {
        if(currentUser.role === 'donor') {
        const fetchDonorDonationRequestCount = async () => {
          try {
            const response6 = await fetch(`/api/donor/getdonordonationrequeststatuscount/${currentUser._id}`, {
              credentials: 'include'
            });
            const countData6 = await response6.json();
            setDonorDonationRequestCount(countData6);
          } catch (error) {
            console.error('Error fetching Blood Requests Count: ', error);
          }
        };

        fetchDonorDonationRequestCount();
        }
      }, []);

      useEffect(() => {
        if(currentUser.role === 'organisation'){
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
        }
      }, [setBloodStock]);

    return (
        <>
            <div>
                <div className="flex flex-col gap-6 p-14 px-3 max-w-6xl mx-auto">
                  <h1 className="text-slate-800 font-bold text-3xl lg:text-6xl">
                    Welcome to the <span className="text-slate-600">{currentUser.organisationName || currentUser.hospitalName} {currentUser.role}</span>
                    <br />
                    dashboard!
                  </h1>
                <div className="text-gray-800 text-md sm:text-md">
                  LifePulse is the place where you can receive and donate blood.
                  <br />
                  We have a good quantity of each blood & various properties for you to perform.
                </div>
                <Link
                  to={"/about"}
                  className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
                >
                  Lets Read More...
                </Link>
                </div>
                {currentUser.role != 'organisation' ? (
                <>
                <div className=''>
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold flex justify-center uppercase text-slate-800">
                      Organisation Lists
                    </h2>
                  </div>
                  <div className="flex flex-wrap max-w-6xl justify-center mx-auto gap-6">
                    {allOrganisation.map((organisation) => (
                      <OrganisationList
                        organisation={organisation}
                        key={organisation._id}
                      />
                    ))}
                  </div>
                </div>
                </>
                ) : (
                  null
                )}
                {bloodStock && bloodStock.length > 0 && currentUser.role === 'organisation' && (
                    <div className='mb-4'>
                      {/* <h1 className='text-center mt-6 text-3xl font-semibold'>Blood Stock</h1> */}
                        <div className="flex flex-wrap items-center justify-center mx-auto gap-7 max-w-6xl rounded-lg p-1">
                            {bloodStock.map((blood) => (
                              <div key={blood._id} className="flex flex-col w-28 bg-cyan-300 rounded-lg shadow-lg p-4">
                                  <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-2xl font-semibold text-black text-center'>
                                        {blood.bloodGroup}
                                      </p>
                                      <FaDroplet className='text-red-700 h-8 w-8' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {blood.unit} Units
                                      </p>
                                    </div>
                                  </div>
                              </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentUser.role === 'admin' ? (
                  <>
                    <div className='flex flex-wrap'>
                        <div className="flex flex-wrap items-center justify-center mx-auto gap-5 mb-3 mt-2 border-slate-600 rounded-lg p-5">
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Total Blood Request
                                      </p>
                                      <RiMessage2Line className='text-blue-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {adminBloodRequestCount.adminTotalBloodRequests} 
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Pending
                                      </p>
                                      <MdOutlinePending className='text-amber-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {adminBloodRequestCount.adminPendingBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Approved
                                      </p>
                                      <GrStatusGood className='text-green-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {adminBloodRequestCount.adminApprovedBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Rejected
                                      </p>
                                      <MdOutlineCancel className='text-red-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {adminBloodRequestCount.adminRejectedBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center mx-auto gap-5 mb-8 rounded-lg">
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Total Donor Request
                                      </p>
                                      <RiMessage2Line className='text-blue-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {adminDonationRequestCount.adminTotalDonationRequests} 
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Pending
                                      </p>
                                      <MdOutlinePending className='text-amber-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {adminDonationRequestCount.adminPendingDonationRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Approved
                                      </p>
                                      <GrStatusGood className='text-green-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {adminDonationRequestCount.adminApprovedDonationRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Rejected
                                      </p>
                                      <MdOutlineCancel className='text-red-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {adminDonationRequestCount.adminRejectedDonationRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </> 
                ) : currentUser.role === 'hospital' ? (
                  <>
                    <div className="flex flex-wrap items-center justify-center mx-auto gap-5 my-2 rounded-lg p-5">
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Total Blood Request
                                      </p>
                                      <RiMessage2Line className='text-blue-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {hospitalBloodRequestCount.hospitalTotalBloodRequests} 
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Pending
                                      </p>
                                      <MdOutlinePending className='text-amber-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {hospitalBloodRequestCount.hospitalPendingBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Approved
                                      </p>
                                      <GrStatusGood className='text-green-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {hospitalBloodRequestCount.hospitalApprovedBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Rejected
                                      </p>
                                      <MdOutlineCancel className='text-red-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {hospitalBloodRequestCount.hospitalRejectedBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                    </div>
                  </>
                ) : currentUser.role === 'organisation' ? (
                  <>
                      <div className='flex flex-wrap'>
                        <div className="flex flex-wrap items-center justify-center mx-auto gap-5 mb-3 border-slate-600 rounded-lg p-5">
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Total Blood Request
                                      </p>
                                      <RiMessage2Line className='text-blue-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {organisationBloodRequestCount.organisationTotalBloodRequests} 
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Pending
                                      </p>
                                      <MdOutlinePending className='text-amber-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {organisationBloodRequestCount.organisationPendingBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Approved
                                      </p>
                                      <GrStatusGood className='text-green-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {organisationBloodRequestCount.organisationApprovedBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Rejected
                                      </p>
                                      <MdOutlineCancel className='text-red-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {organisationBloodRequestCount.organisationRejectedBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center mx-auto gap-5 mb-4 rounded-lg p-1">
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Total Donor Request
                                      </p>
                                      <RiMessage2Line className='text-blue-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {organisationDonationRequestCount.organisationTotalDonationRequests} 
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Pending
                                      </p>
                                      <MdOutlinePending className='text-amber-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {organisationDonationRequestCount.organisationPendingDonationRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Approved
                                      </p>
                                      <GrStatusGood className='text-green-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {organisationDonationRequestCount.organisationApprovedDonationRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Rejected
                                      </p>
                                      <MdOutlineCancel className='text-red-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {organisationDonationRequestCount.organisationRejectedDonationRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div> 
                  </>
                ) : currentUser.role === 'consumer' ? (
                  <>
                    <div className="flex flex-wrap items-center justify-center mx-auto gap-5 my-2 rounded-lg p-5">
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Total Blood Request
                                      </p>
                                      <RiMessage2Line className='text-blue-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {consumerBloodRequestCount.consumerTotalBloodRequests} 
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Pending
                                      </p>
                                      <MdOutlinePending className='text-amber-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {consumerBloodRequestCount.consumerPendingBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Approved
                                      </p>
                                      <GrStatusGood className='text-green-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {consumerBloodRequestCount.consumerApprovedBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Blood Request Rejected
                                      </p>
                                      <MdOutlineCancel className='text-red-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {consumerBloodRequestCount.consumerRejectedBloodRequests}
                                      </p>
                                    </div>
                                </div>
                            </div>
                    </div>
                  </>
                ) : currentUser.role === 'donor' ? (
                  <>
                    <div className="flex flex-wrap items-center justify-center mx-auto gap-5 my-2 rounded-lg p-5">
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Total Donor Request
                                      </p>
                                      <RiMessage2Line className='text-blue-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {donorDonationRequestCount.donorTotalDonationRequests} 
                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Pending
                                      </p>
                                      <MdOutlinePending className='text-amber-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {donorDonationRequestCount.donorPendingDonationRequests}                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Approved
                                      </p>
                                      <GrStatusGood className='text-green-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {donorDonationRequestCount.donorApprovedDonationRequests}                                      </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-64 bg-slate-300 rounded-lg shadow-lg p-4">
                                <div className="flex flex-col gap-2">
                                    <div className='flex justify-end gap-2'>
                                      <p className='text-md font-semibold text-black text-center'>
                                        Donor Request Rejected
                                      </p>
                                      <MdOutlineCancel className='text-red-600 h-6 w-6' />
                                    </div>
                                    <div className="mt-4">
                                      <p className="text-md font-semibold text-black">
                                        {donorDonationRequestCount.donorRejectedDonationRequests}                                      </p>
                                    </div>
                                </div>
                            </div>
                    </div>
                  </>
                  ) : (
                    null
                )}
            </div>
        </>
    );
} 
