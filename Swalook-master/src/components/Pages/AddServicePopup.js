import React, {useState} from 'react';
import '../Styles/AddServicePopup.css';
import axios from 'axios';

function AddServicePopup({ onClose }) {
  const [service , setService] = useState('');
  const [service_price , setServicePrice] = useState('');
  const [service_duration , setServiceDuration] = useState('');

  const handleAddService = (e) => {
    e.preventDefault();
    console.log(service , service_price , service_duration);
    const token = localStorage.getItem('token');
   
    axios.post("https://zggwtvrk-8000.inc1.devtunnels.ms/api/swalook/add/services/",{
      service: service,
      service_price: service_price,
      service_duration: service_duration
    }).then((res) => {    
      console.log(res.data);
      console.log("service added");

    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="popup_overlay">
    <div className="popup_container">
      <div className="popup_header">
       <div className='pph3'>
       <h3>Add Service</h3>
       </div>
        <button className="close_button" onClick={onClose}>X</button>
      </div>
      <hr></hr>
      <form onSubmit={handleAddService}>
      <div className="sn1">
          <label htmlFor="service_name">Service Name:</label>
          <input type="text" id="service_name" name="service_name" placeholder='Service Name' onChange={(e)=>setService(e.target.value)}/>
      </div>
      <div className="sn2">
          <label htmlFor="duration">Duration:</label>
          <input type="text" id="duration" name="duration" placeholder="Duration (min)" onChange={(e)=>setServiceDuration(e.target.value)}/>
      </div>
      <div className="sn3">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" placeholder="Price" onChange={(e)=>setServicePrice(e.target.value)}/>
      </div>
      <div className="sn_button_container">
          <button className="sn_save_button">Save</button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default AddServicePopup;
