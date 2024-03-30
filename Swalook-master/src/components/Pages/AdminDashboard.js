import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.js';
import '../../components/Styles/AdminDashboard.css';
import SearchIcon from '@mui/icons-material/Search';
import VertNav from './VertNav.js';
import { Helmet } from 'react-helmet';

function AdminDashboard() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [saloonName, setSaloonName] = useState('');

  const [orginalBillData, setOriginalBillData] = useState([]);
  const [filteredBillData, setFilteredBillData] = useState([]);
  const [searchBillTerm, setSearchBillTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://89.116.32.12:8000/api/swalook/appointment/", {
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
    axios.get("http://89.116.32.12:8000/api/swalook/billing/", {
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


  return (
    <div className='Admin_dash_main'>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Header />
      <div className='horizontal-container'>
        <div className='vertical-navigation'>
          <div className='ver_nav'>
            <VertNav />
          </div>
        </div>
        <div className='main-content'>
          <div className="content-header">
            <h1 class="gradient-heading">Welcome, {saloonName}</h1>
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
            <div className="content-box">
              <Link to="/appointment">  
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
                        <td><button className='edit_button'>Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="content-footer">
            <div className="f_top">
              <Link to="/generatebill">
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBillData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.customer_name}</td>
                      <td>{row.mobile_no}</td>
                      <td>{row.grand_total}</td>
                      <td>14/4/23</td>
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
                      <td><button className='invoice_button'>Show Invoice</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
