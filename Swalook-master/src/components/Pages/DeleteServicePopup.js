import React,{useState} from 'react'
import '../Styles/DeleteServicePopup.css'
import Multiselect from 'multiselect-react-dropdown';

function DeleteServicePopup({onClose}) { 
  const [deleteSelectedServices, setDeleteSelectedServices] = useState([]);
  const serviceOptions = [
    { key: 'service1', value: 'Service 1' },
    { key: 'service2', value: 'Service 2' }
  ];
  const handleSelect = (selectedList) => {
    setDeleteSelectedServices(selectedList);
    console.log(deleteSelectedServices);
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
        </div>
    </div>
  )
}

export default DeleteServicePopup