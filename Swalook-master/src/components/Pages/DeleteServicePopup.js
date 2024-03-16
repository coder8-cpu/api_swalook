import React,{useState , useEffect} from 'react'
import '../Styles/DeleteServicePopup.css'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';

function DeleteServicePopup({onClose}) { 
  const [deleteSelectedServices, setDeleteSelectedServices] = useState([]);
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
        return {id: service.id, value: service.service}
      }));
    })
    .catch((err)=>{
      console.log(err);
    })
  },[]);

  const handleSelect = (selectedList) => {
    setDeleteSelectedServices(selectedList);
    console.log(deleteSelectedServices);
  };


  const handleDelete = () => {
    const token = localStorage.getItem('token');
    deleteSelectedServices.forEach(service => {
      console.log(`Deleting service with ID ${service.id}.`);
      axios.get(`http://89.116.32.12:8000/api/swalook/delete/services/${service.id}/`, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            alert("Service deleted successfully!");
            onClose();
          } else {
            alert("Failed to delete service.");
          }
        })
        .catch(error => {
          console.error(`Error deleting service with ID ${service.id}:`, error);
        });
    });
  };

  
  return (
    <div className='DS_overlay'>
        <div className='DS_container'>
        <div className="DS_header">
        <div className='DSh3'>
        <h3>Delete Service</h3>
        </div>
            <button className="close_button" onClick={onClose}>X</button>
        </div>
        <hr></hr>
        <form onSubmit={handleDelete}>
        <div className="DS_dropdown-container">
          <Multiselect
              options={serviceOptions}
              showSearch={true}
              onRemove={handleSelect }
              onSelect={handleSelect}
              displayValue="value"
              placeholder="Select Services...."
              className="DS_select"
              showCheckbox={true}
            />
        </div>
        <button className="delete_button">Delete</button>
        </form>
        </div>
    </div>
  )
}

export default DeleteServicePopup