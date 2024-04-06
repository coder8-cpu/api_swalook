import React, {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import '../Styles/EditAppointment.css';
import axios from 'axios';
import Popup from './Popup';


function EditAppointment({ onClose, appointmentId, appointmentName, appointmentPhone }) {
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [booking_date, setBookingDate] = useState('');
    const [booking_time, setBookingTime] = useState('');
    const [selectedAMPM, setSelectedAMPM] = useState('');
    const [showPopup, setShowPopup] = useState(false); 
    const [popupMessage, setPopupMessage] = useState('');

    const handleEditClose = () => {
        onClose(); 
      };

    const [services, setServices] = useState([]);
    const [serviceOptions, setServiceOptions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch("http://89.116.32.12:8000/api/swalook/table/services/",{
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

      const handleEditAppointment = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post(`http://89.116.32.12:8000/api/swalook/edit/appointment/${appointmentId}/`,{
            customer_name: appointmentName,
            mobile_no: appointmentPhone,
            email: email,
            services: services.map(service => service.value).join(', '),
            booking_date: booking_date,
            booking_time: booking_time
            },{
            headers:{
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
            })
            .then((res) => {
                console.log(res.data);
                console.log("Appointment edited");
                setPopupMessage("Appointment edited successfully!");
                setShowPopup(true);
                onClose();
                navigate('/dashboard');
                window.location.reload();
            })
            .catch((err) => {
                setPopupMessage("Failed to edit appointment.");
                setShowPopup(true);
                console.log(err);
            });
    }

  return (
    <div>
        <div class="edit_popup_overlay">
    <div class="edit_popup_container">
        <div class="edit_popup_header">
            <h3>Edit Appointment</h3>
            <button class="edit_close_button" onClick={handleEditClose}>X</button>
        </div>
        <hr/>
        <form onSubmit={handleEditAppointment}>
            <div className="edit-appointform-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" className="edit-appoint_input-field" placeholder='Enter Full Name' value={appointmentName} required readOnly/>
            </div>
            <div className="edit-appointform-group">
                <label htmlFor="phone">Phone:</label>
                <input type="number" id="phone" className="edit-appoint_input-field" placeholder='Enter Mobile Number' value={appointmentPhone} required maxLength={10}/>
            </div>
            <div className="edit-appointform-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="edit-appoint_input-field" placeholder='Enter Email Address'  onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <h3 className='sts'>Select the Service</h3>
        <div className='edit-appoint_select-field-cont'>
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
            <h3 className='sch'>Schedule</h3>
            <div className="edit-schedule_form-group">
                <label htmlFor="date" className="edit-schedule_date-label">Date:</label>
                <input type='date' id='date' className='edit-schedule_date-input' onChange={(e) => setBookingDate(e.target.value)} />
              </div>
              <div className="edit-schedule_time-selection">
                <label htmlFor="hours" className="edit-schedule_time-label">Time:</label>
                <select id="hours" className="edit-schedule_time-dropdown" onChange={handleTimeChange}>
                  <option value="" disabled selected>Hours</option>
                  {[...Array(12).keys()].map(hour => (
                    <option key={hour + 1} value={hour + 1}>{hour + 1}</option>
                  ))}
                </select>
                <select id="minutes" className="edit-schedule_time-dropdown" onChange={handleTimeChange}>
                  <option value="" disabled selected>Minutes</option>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
                <select id="am_pm" className="edit-schedule_time-dropdown" onChange={handleTimeChange}>
                  <option value="" disabled selected>AM/PM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <div className="edit-appoint-button-container">
              <button className="edit-appoint_submit-button">Submit</button>
              </div>
        </form>
    </div>
</div>
    {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  )
}

export default EditAppointment