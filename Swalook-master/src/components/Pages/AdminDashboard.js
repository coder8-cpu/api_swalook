import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.js';
import '../../components/Styles/AdminDashboard.css';
import SearchIcon from '@mui/icons-material/Search';
import VertNav from './VertNav.js';
import { Helmet } from 'react-helmet';
import EditAppointment from './EditAppointment.js';
import { useNavigate } from 'react-router-dom';
import config from '../../config.js';

function AdminDashboard() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [saloonName, setSaloonName] = useState('');
  const bname = atob(localStorage.getItem('branch_name'));
  const [orginalBillData, setOriginalBillData] = useState([]);
  const [filteredBillData, setFilteredBillData] = useState([]);
  const [searchBillTerm, setSearchBillTerm] = useState('');
  const [serviceDescriptions, setServiceDescriptions] = useState([]);

  const branchName = localStorage.getItem('branch_name');
  const sname = localStorage.getItem('s-name');
  const userType = localStorage.getItem('type');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${config.apiUrl}/api/swalook/appointment/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log(res.data);

        setOriginalData(res.data.table_data);
        setFilteredData(res.data.table_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredRows = originalData.filter(row =>
      row.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.booking_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.services.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.mobile_no.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredRows);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${config.apiUrl}/api/swalook/billing/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('saloon_name', res.data.salon_name);
        setSaloonName(localStorage.getItem('saloon_name'));

        setOriginalBillData(res.data.table_data);
        setFilteredBillData(res.data.table_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBillSearchChange = (event) => {
    const searchBillTerm = event.target.value;
    setSearchBillTerm(searchBillTerm);
    const filteredBillRows = orginalBillData.filter(row =>
      row.customer_name.toLowerCase().includes(searchBillTerm.toLowerCase()) ||
      row.mobile_no.toLowerCase().includes(searchBillTerm.toLowerCase()) ||
      row.grand_total.toLowerCase().includes(searchBillTerm.toLowerCase()) ||
      row.services.toLowerCase().includes(searchBillTerm.toLowerCase())
    );
    setFilteredBillData(filteredBillRows);
  }

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditPopup(true);
  };

  const handleShowInvoice = (id) => {
    navigate(`/${sname}/${branchName}/viewinvoice/${id}`);
  };


  return (
    <div className='Admin_dash_main'>
      <Helmet>
      <title>{userType === 'staff' ? 'Staff Dashboard' : 'Admin Dashboard'}</title>
      </Helmet>
      <Header />
      <div className='horizontal-container'>
        <div className='vertical-navigation'>
          <div className='ver_nav'>
            <VertNav />
          </div>
        </div>
        <div className={`main-content ${userType === 'staff' ? 'blurred' : ''}`}>
          <div className="content-header">
          <h1 className="gradient-heading">
            Welcome {userType === 'admin' ? 'Admin' : 'Staff'}, {bname}!
          </h1>
            <div className="US_search-bar">
              <input
                type="text"
                placeholder="Upcoming Appointments...."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <SearchIcon className="US_search-icon" />
            </div>
          </div>

          <div className="content-body">
            <div className="content-box first_ad">
              <h3>Sales Graph</h3>
              <img className='sales_img' src="path_to_your_image.jpg" alt="Sales Graph" />
            </div>
            <div className="content-box ">
              <Link to={`/${sname}/${branchName}/appointment`}>  
              <h3>Appointments</h3>
              </Link>
              <div className='US-con'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Services</th>
                      <th>Mobile No</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row) => (
                      <tr key={row.id}>
                        <td>{row.customer_name}</td>
                        <td>{row.booking_date}</td>
                        {/* <td>{row.services}</td> */}
                        <td>
                        {row.services.split(',').length > 1 ? (
                            <select className='status-dropdown'>
                              {row.services.split(',').map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                              ))}
                            </select>
                          ) : row.services.split(',')[0]}
                        </td>

                        <td>{row.mobile_no}</td>
                        <td>
                        <button className='edit_button' onClick={() => handleEditClick(row)}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="content-footer">
            <div className="f_top">
              <Link to={`/${sname}/${branchName}/generatebill`}>
              <h3>Billing Table</h3>
              </Link>
              <div className="billing_search-bar">
                <input
                  type="text"
                  placeholder="Search Billing..."
                  className="search-Billing"
                  value={searchBillTerm}
                  onChange={handleBillSearchChange}
                />
                <SearchIcon className="billing_search-icon" />
              </div>
            </div>
            <div className='BT-con'>
            <table>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Mobile No</th>
                    <th>Billing Amount</th>
                    <th>Date</th>
                    <th>Services</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBillData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.customer_name}</td>
                      <td>{row.mobile_no}</td>
                      <td>{row.grand_total}</td>
                      <td>{row.date}</td>
                      {/* <td>{row.services}</td> */}
                      <td>
                        {/* {row.services.split(',').length > 1 ? (
                          <select className='status-dropdown'>
                            {row.services.split(',').map((service, index) => (
                              <option key={index} value={service}>{service}</option>
                            ))}
                          </select>
                        ) : row.services.split(',')[0]} */}

{(() => {
  try {
    const servicesArray = JSON.parse(row.services);
    if (servicesArray.length > 1) {
      return (
        <select className='status-dropdown'>
          {servicesArray.map((service, index) => (
            <option key={index} value={service.Description}>{service.Description}</option>
          ))}
        </select>
      );
    } else if (servicesArray.length === 1) {
     
      return <span>{servicesArray[0].Description}</span>;
    } else {
      return null;
    }
  } catch (error) {
    console.error('JSON parsing error:', error);
    return null;
  }
})()}


                      </td>
                      <td><button className='invoice_button' onClick={() => handleShowInvoice(row.id)}>Show Invoice</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showEditPopup && <EditAppointment  appointment={selectedAppointment}
          onClose={() => setShowEditPopup(false)}
          appointmentId={selectedAppointment.id} // Pass the appointment ID as a prop
          appointmentName={selectedAppointment.customer_name} // Pass the appointment name as a prop
          appointmentPhone={selectedAppointment.mobile_no} />}
    </div>
  );
}

export default AdminDashboard;
