import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ServiceDetails.css';
import Header from './Header';
import AddServicePopup from './AddServicePopup';
import DeleteServicePopup from './DeleteServicePopup';
import EditServicePopup from './EditServicePopup';
import { Helmet } from 'react-helmet';

function ServiceDetails() {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [fetchService, setFetchService] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://89.116.32.12:8000/api/swalook/table/services/", {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data.table_data);
                setFetchService(res.data.table_data.map((service) => {
                    return { id: service.id, service: service.service, service_duration: service.service_duration, service_price: service.service_price }
                }));
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const AddtogglePopup = () => {
        setIsAddPopupOpen(!isAddPopupOpen);
    };

    const DeletetogglePopup = () => {
        setIsDeletePopupOpen(!isDeletePopupOpen);
    };

    const EdittogglePopup = (id, serviceName) => { // Modify EdittogglePopup to accept id and serviceName
        setIsEditPopupOpen(!isEditPopupOpen);
        // Pass id and serviceName to EditServicePopup
        setEditServiceData({ id: id, serviceName: serviceName });
    }

    const [editServiceData, setEditServiceData] = useState(null); // State variable to store data for editing

    return (
        <div className='admin_service_container'>
            <Helmet>
        <title>Services</title>
      </Helmet>
            <div className='c_header'>

            <Header />
            </div>
            <div className="service_details_header">
                <h1>Service Details</h1>
                <div>
                    <button className="add_service_button" onClick={AddtogglePopup}>Add Service</button>
                    <button className="delete_service_button" onClick={DeletetogglePopup} >Delete Service</button>
                </div>
            </div>
            <div className="horizontal_line_container">
                <hr className="horizontal_line" />
            </div>
            <div className="admin_service_table_container">
                <table className="admin_service_table">
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Edit Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchService.length > 0 && fetchService.map((ser) => (
                            <tr key={ser.id}>
                                <td>{ser.service}</td>
                                <td>{ser.service_duration}</td>
                                <td>{ser.service_price}</td>
                                <td><button className="edit_service_button" onClick={() => EdittogglePopup(ser.id, ser.service)}>Edit</button></td> {/* Pass id and service name to EdittogglePopup */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isAddPopupOpen && <AddServicePopup onClose={AddtogglePopup} />}
            {isDeletePopupOpen && <DeleteServicePopup onClose={DeletetogglePopup} />}
            {isEditPopupOpen && <EditServicePopup serviceData={editServiceData} onClose={EdittogglePopup} />} {/* Pass serviceData to EditServicePopup */}
        </div>
    )
}

export default ServiceDetails;
