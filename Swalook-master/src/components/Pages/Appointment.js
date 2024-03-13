import React, {useState} from 'react'
import Multiselect from 'multiselect-react-dropdown';
import '../Styles/Appointment.css'
import Header from './Header'
import VertNav from './VertNav'

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

function Appointment() {

  const currentDate = getCurrentDate();
  const [AppointselectedServices, AppointsetSelectedServices] = useState([]);

  const serviceOptions = [
    { key: 'service2', value: 'Service 2' },
    { key: 'service3', value: 'key 3' }
  ];

  const handleSelect = (selectedList) => {
    AppointsetSelectedServices(selectedList);
  };

  return (
    <div className='appoint_dash_main'>
      <Header />
      <div className='appoint_horizontal'>
      <div className='appoint_h1'>
        <div className='appoint_ver_nav'>
          <VertNav />
        </div>
      </div>
      <div class='appoint_h2'>
        <div class='appoint_left'>
        <h2 className='h_appoint'>Book Appointment</h2>
        <hr className='appoint_hr'/>
        <h3 className='cd'>Customer Details</h3>
        <div className="appointform-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="appoint_input-field" placeholder='Enter Full Name'/>
        </div>
        <div className="appointform-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="appoint_input-field" placeholder='Enter Email Address'/>
        </div>
        <div className="appointform-group">
                <label htmlFor="phone">Phone:</label>
                <input type="number" id="phone" className="appoint_input-field" placeholder='Enter Mobile Number' />
        </div>
        <h3 className='sts'>Select the Service</h3>
        <div className='appoint_select-field-cont'>
            <Multiselect
              options={serviceOptions}
              showSearch={true}
              onSelect={handleSelect}
              displayValue="value"
              placeholder="Select Services...."
              className="appoint_select-field"
            />
            </div>
        <h3 className='sch'>Schedule</h3>
        <div className="schedule_form-group">
                <label htmlFor="date" className="schedule_date-label">Date:</label>
                <input type="text" id="date" className="schedule_date-input" value={currentDate} readOnly />
              </div>
              <div className="schedule_time-selection">
                <label htmlFor="hours" className="schedule_time-label">Time:</label>
                <select id="hours" className="schedule_time-dropdown">
                  <option value="" disabled selected>Hours</option>
                  {[...Array(12).keys()].map(hour => (
                    <option key={hour + 1} value={hour + 1}>{hour + 1}</option>
                  ))}
                </select>
                <select id="minutes" className="schedule_time-dropdown">
                  <option value="" disabled selected>Minutes</option>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
                <select id="am_pm" className="schedule_time-dropdown">
                  <option value="" disabled selected>AM/PM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <div className="appoint-button-container">
              <button className="appoint_submit-button">Submit</button>
              </div>
        </div>
        <div class='appoint_right'>
        <h2 className='h_appoint'>Booked Appointments</h2>
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
                <tr>
                    <td>John Doe</td>
                    <td>123-456-7890</td>
                    <td>10:00 AM</td>
                    <td>Haircut</td>
                    <td>Confirmed</td>
                </tr>
               
            </tbody>
        </table>
    </div>
        </div>
    </div>
      </div>
    </div>
  )
}

export default Appointment