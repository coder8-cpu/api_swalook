import React, {useState , useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import '../Styles/Appointment.css'
import Header from './Header'
import VertNav from './VertNav'
import Popup from './Popup';
import { Helmet } from 'react-helmet';
import config from '../../config';

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

function Appointment() {
  const navigate = useNavigate();
  const currentDate = getCurrentDate();
  const [services, setServices] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [customer_name, setCustomerName] = useState('');
  const [mobile_no , setMobileNo] = useState('');
  const [email , setEmail] = useState('');
  // const booking_date = currentDate;
  const [booking_date, setBookingDate] = useState('');
  const [booking_time, setBookingTime] = useState('');
  const [selectedAMPM, setSelectedAMPM] = useState('');
  const [getPresetDayAppointment, setGetPresetDayAppointment] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${config.apiUrl}/api/swalook/table/services/`,{
      headers:{
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data.table_data);
      setServiceOptions(data.table_data.map((service) => {
        return { value: service.service}
      }));
    })
    .catch((err)=>{
      console.log(err);
    })
  },[]);

  const handleSelect = (selectedList) => {
    setServices(selectedList);
  };

  // const handleTimeChange = (event) => {
  //   const { id, value } = event.target;

  //   switch (id) {
  //     case 'hours':
  //       setBookingTime(prevTime => `${value}:${prevTime.split(':')[1] || '00'} ${prevTime.split(' ')[1] || 'AM'}`);
  //       break;
  //     case 'minutes':
  //       setBookingTime(prevTime => `${prevTime.split(':')[0] || '12'}:${value} ${prevTime.split(' ')[1] || 'AM'}`);
  //       break;
  //     case 'am_pm':
  //       setBookingTime(prevTime => `${prevTime.split(':')[0] || '12'}:${prevTime.split(':')[1] || '00'} ${value}`);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleTimeChange = (event) => {
    const { id, value } = event.target;

    switch (id) {
      case 'hours':
        setBookingTime(prevTime => `${value || ''}:${prevTime.split(':')[1] || '00'} ${selectedAMPM}`);
        break;
      case 'minutes':
        setBookingTime(prevTime => `${prevTime.split(':')[0] || ''}:${value || '00'} ${selectedAMPM}`);
        break;
      case 'am_pm':
        setSelectedAMPM(value || '');
        setBookingTime(prevTime => `${prevTime.split(':')[0] || ''}:${prevTime.split(':')[1] || '00'} ${value || ''}`);
        break;
      default:
        break;
    }
  };

  const bname = atob(localStorage.getItem('branch_name'));

  console.log(booking_time);
  console.log(booking_date);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (services.length === 0) {
      alert('Please select at least one service.');
      return;
    }

    if(booking_time === ''){
      alert('Please select time');
      return;
    }

    console.log(customer_name, mobile_no, email, booking_date, booking_time, services);
    const token = localStorage.getItem('token');
    axios.post(`${config.apiUrl}/api/swalook/appointment/${bname}/`,{
      customer_name: customer_name,
      mobile_no: mobile_no,
      email: email,
      services: services.map(service => service.value).toString(),
      booking_time: booking_time,
      booking_date: booking_date
    },{
      headers:{
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res.data);
      // alert("Appointment added successfully!");
      setPopupMessage("Appointment added successfully!"); // Set popup message
      setShowPopup(true);
      console.log("appointment added");
    }).catch((err) => {
      setPopupMessage("Failed to add appointment!"); // Set popup message for failure
      setShowPopup(true);
      console.log(err);
      // alert("Failed to add appointment!");
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${config.apiUrl}/api/swalook/preset-day-appointment/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log(res.data.table_data);
        setGetPresetDayAppointment(res.data.table_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const branchName = localStorage.getItem('branch_name');
  const sname = localStorage.getItem('s-name');

  return (
    <div className='appoint_dash_main'>
      <Helmet>
        <title>Book Appointment</title>
      </Helmet>
      <Header />
      <div className='appoint_horizontal'>
      <div className='appoint_h1'>
        <div className='appoint_ver_nav'>
          <VertNav />
        </div>
      </div>
      <div class='appoint_h2'>
        <div class='appoint_left'>
        <form onSubmit={handleAddAppointment}>
        <h2 className='h_appoint'>Book Appointment</h2>
        <hr className='appoint_hr'/>
        <div className='ba_con'>
        <h3 className='cd'>Customer Details</h3>
        <div className='app'>
        <div className="appointform-group appoint-text">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="appoint_input-field" placeholder='Enter Full Name' required  onChange={(e)=> setCustomerName(e.target.value)}/>
        </div>
        <div className="appointform-group appoint-email">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="appoint_input-field" placeholder='Enter Email Address' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="appointform-group appoint-phone">
                <label htmlFor="phone">Phone:</label>
                <input type="number" id="phone" className="appoint_input-field" placeholder='Enter Mobile Number' required onChange={(e)=>setMobileNo(e.target.value )} maxLength={10}/>
        </div>
        </div>
        <h3 className='sts'>Select the Service</h3>
        <div className='appoint_select-field-cont'>
          <div className='ss'>
            <Multiselect
              options={serviceOptions}
              showSearch={true}
              onSelect={handleSelect}
              onRemove={handleSelect}
              displayValue="value"
              placeholder="Select Services...."
              className="appoint_select-field"
              showCheckbox={true}
            />
            </div>
            </div>
        <h3 className='sch'>Schedule</h3>
        </div>   
        <div className='ap-p-parent'>
        <div className='ap-p'>
        <div className="schedule_form-group">
                <label htmlFor="date" className="schedule_date-label">Date:</label>
                {/* <input type="text" id="date" className="schedule_date-input" value={currentDate} readOnly /> */}
                <input type='date' id='date' className='schedule_date-input' onChange={(e) => setBookingDate(e.target.value)} />
              </div>
              
              <div className="schedule_time-selection">
                <label htmlFor="hours" className="schedule_time-label">Time:</label>
                <select id="hours" className="schedule_time-dropdown" onChange={handleTimeChange}>
                  <option value="" disabled selected>Hours</option>
                  {[...Array(12).keys()].map(hour => (
                    <option key={hour + 1} value={hour + 1}>{hour + 1}</option>
                  ))}
                </select>
                <select id="minutes" className="schedule_time-dropdown" onChange={handleTimeChange}>
                  <option value="" disabled selected>Minutes</option>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
                <select id="am_pm" className="schedule_time-dropdown" onChange={handleTimeChange}>
                  <option value="" disabled selected>AM/PM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              </div>
              </div>
              <div className="appoint-button-container">
              <button className="appoint_submit-button">Submit</button>
              </div>
              </form>
        </div>
        <div class='appoint_right'>
        <h2 className='h_appoint'>Booked Appointments:({currentDate})</h2>
        <hr className='appoint_hr'/>
        <div class='appoint_table_wrapper'>
        <table class='appoint_table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile No.</th>
                    <th>Time</th>
                    <th>Services</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {getPresetDayAppointment.map((row) => (
                    <tr key={row.id}>
                        <td>{row.customer_name}</td>
                        <td>{row.mobile_no}</td>
                        <td>{row.booking_time}</td>
                        <td>
                          {row.services.split(',').length > 1 ? (
                            <select className='status-dropdown'>
                              {row.services.split(',').map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                              ))}
                            </select>
                          ) : row.services.split(',')[0]}
                        </td>
                        <td>
                          <select
                            className="status-dropdown"
                            // value={row.status}
                            // onChange={(e) => handleStatusChange(e, row.id)}
                          >
                            <option value="pending" selected>Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                    </tr>
                ))}     
            </tbody>
        </table>
    </div>
        </div>
    </div>
      </div>
      {showPopup && <Popup message={popupMessage} onClose={() => { setShowPopup(false); navigate(`/${sname}/${branchName}/dashboard`); }} />}
    </div>
  )
}

export default Appointment;