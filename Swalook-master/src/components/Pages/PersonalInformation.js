import React, { useEffect , useState } from 'react'
import axios from 'axios'
import '../Styles/PersonalInformation.css'
import Header from './Header'
import PI from '../../assets/PI.png'

function PersonalInformation() {
  const [P , setPI] = useState('');

  const no = atob(localStorage.getItem('number'));
  useEffect(() =>{
      axios.get(`http://89.116.32.12:8000/api/swalook/get_current_user/${no}/`,{
          headers: {
              Authorization: `Token ${localStorage.getItem('token')}`
          }
      })
      .then((res) => {
          console.log(res.data);
          setPI(res.data.current_user_data);
      })
      .catch((err) => { 
          console.log(err);
      })
  })

  return (
    <div className='personal_information_container'>
        <Header/>
        <div className='pi_main'>
            <div className="pi_horizontal_container">
                <div className="pi_horizontal_item">
                <img src={PI} alt="PI Image" />
                </div>
                <div className="pi_horizontal_item">
                    <h2>Personal Details</h2>
                    <hr />
                    <div className="pi_input_container">
                    <label htmlFor="saloonName">Saloon Name:</label>
                    <input type="text" value={P.salon_name} id="saloonName" />
                    </div>
                    <div className="pi_input_container">
                <label htmlFor="ownerName">Owner Name:</label>
                <input type="text" value={P.owner_name} id="ownerName" />
              </div>
              <div className="pi_input_container pi_pn">
                <label className='pi_l' htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" value={P.mobile_no} id="phoneNumber" />
              </div>
              <div className="pi_input_container">
                <label htmlFor="emailId">Email Id:</label>
                <input type="email" value={P.email} id="emailId" />
              </div>
              <div className="pi_input_container">
                <label htmlFor="gstNumber">GST Number:</label>
                <input type="text" value={P.gst_number} id="gstNumber" />
              </div>
              <div className="pi_input_container">
                <label htmlFor="panNumber">PAN Number:</label>
                <input type="text" value={P.pan_number} id="panNumber" />
              </div>
              <div className="pi_input_container pi_pc">
                <label className='pi_l' htmlFor="pincode">Pincode:</label>
                <input type="number" value={P.pincode} id="pincode" />
              </div>
              <div className='pi_up_container'>

              <button className="pi_update_button">Update</button>
              </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PersonalInformation