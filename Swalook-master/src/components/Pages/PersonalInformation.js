import React from 'react'
import '../Styles/PersonalInformation.css'
import Header from './Header'
import PI from '../../assets/PI.png'

function PersonalInformation() {
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
                    <input type="text" id="saloonName" />
                    </div>
                    <div className="pi_input_container">
                <label htmlFor="ownerName">Owner Name:</label>
                <input type="text" id="ownerName" />
              </div>
              <div className="pi_input_container">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" />
              </div>
              <div className="pi_input_container">
                <label htmlFor="emailId">Email Id:</label>
                <input type="email" id="emailId" />
              </div>
              <div className="pi_input_container">
                <label htmlFor="gstNumber">GST Number:</label>
                <input type="text" id="gstNumber" />
              </div>
              <div className="pi_input_container">
                <label htmlFor="panNumber">PAN Number:</label>
                <input type="text" id="panNumber" />
              </div>
              <div className="pi_input_container">
                <label htmlFor="pincode">Pincode:</label>
                <input type="number" id="pincode" />
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