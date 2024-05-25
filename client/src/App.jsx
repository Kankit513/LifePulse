import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Profile from './pages/Profile';
import Home from './pages/Home';
import ConsumerBloodRequest from './pages/consumer/ConsumerBloodRequest';
import ConsumerBloodRequestHistory from './pages/consumer/ConsumerBloodRequestHistory';
import DonorDonationRequest from './pages/donor/DonorDonationRequest';
import DonorDonationRequestHistory from './pages/donor/DonorDonationRequestHistory';
import HospitalBloodRequest from './pages/hospital/HospitalBloodRequest';
import HospitalBloodRequestHistory from './pages/hospital/HospitalBloodRequestHistory';
import OrganisationBloodRequestHistory from './pages/organisation/OrganisationBloodRequestHistory';
import OrganisationDonationRequestHistory from './pages/organisation/OrganisationDonationRequestHistory';
import AdminBloodRequestHistory from './pages/admin/AdminBloodRequestHistory';
import AdminDonationRequestHistory from './pages/admin/AdminDonationRequestHistory';
import GetConsumers from './pages/admin/GetConsumers';
import GetDonors from './pages/admin/GetDonors';
import GetHospitals from './pages/admin/GetHospitals';
import GetOrganisations from './pages/admin/GetOrganisations';
import CreateBlood from './pages/organisation/CreateBlood';
import UpdateBlood from './pages/organisation/UpdateBlood';
import OrganisationBloodStock from './pages/organisation/OrganisationBloodStock';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    setShowFooter(location.pathname !== '/');
    setShowHeader(location.pathname !== '/');
  }, [location.pathname]);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path='/' element={<GetStarted />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />GetStarted
        <Route path='/about' element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/consumer-blood-request' element={<ConsumerBloodRequest />} />
          <Route path='/consumer-blood-request-history' element={<ConsumerBloodRequestHistory />} />
          <Route path='/donor-donation-request' element={<DonorDonationRequest />} />
          <Route path='/donor-donation-request-history' element={<DonorDonationRequestHistory />} />
          <Route path='/hospital-blood-request' element={<HospitalBloodRequest />} />
          <Route path='/hospital-blood-request-history' element={<HospitalBloodRequestHistory />} />
          <Route path='/organisation-blood-request-history' element={<OrganisationBloodRequestHistory />} />
          <Route path='/organisation-donation-request-history' element={<OrganisationDonationRequestHistory />} />
          <Route path='/admin-blood-request-history' element={<AdminBloodRequestHistory />} />
          <Route path='/admin-donation-request-history' element={<AdminDonationRequestHistory />} />
          <Route path='/get-consumers' element={<GetConsumers />} />
          <Route path='/get-donors' element={<GetDonors />} />
          <Route path='/get-hospitals' element={<GetHospitals />} />
          <Route path='/get-organisations' element={<GetOrganisations />} />
          <Route path='/create-blood' element={<CreateBlood />} />
          <Route path='/update-blood' element={<UpdateBlood />} />
          <Route path='/organisation-blood-stock/:organisationId' element={<OrganisationBloodStock />} />
        </Route>
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}
