import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Login from './components/Pages/Login';
import AdminLogin from './components/Pages/AdminLogin';
import ServiceDetails from './components/Pages/ServiceDetails';
import Header from './components/Pages/Header';
import AdminDashboard from './components/Pages/AdminDashboard';
import Settings from './components/Pages/Settings';
import PersonalInformation from './components/Pages/PersonalInformation';
import Appointment from './components/Pages/Appointment';
import GenerateInvoice from './components/Pages/GenerateInvoice';
import Invoice from './components/Pages/Invoice';
import ForgetPassword from './components/Pages/ForgetPassword';
import Cookies from 'js-cookie';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const isLoggedIn = Cookies.get('loggedIn');
  return (
    <div>
      <Router>    
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/admin" element={<AdminLogin />} /> */}
          <Route path="/admin" element={isLoggedIn ? <Navigate to= "/admin/dashboard" /> : <AdminLogin />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/service" element={<ServiceDetails />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/settings/personalInformation" element={<PersonalInformation />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/generatebill" element={<GenerateInvoice />} />
          <Route path="/invoice" element={<Invoice />} /> */}

          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/service" element={<ServiceDetails />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/settings/personalInformation" element={<PersonalInformation />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/generatebill" element={<GenerateInvoice />} />
            <Route path="/invoice" element={<Invoice />} />
          </Route>
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
