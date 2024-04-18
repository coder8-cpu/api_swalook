import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/GenerateInvoice.css'
import Multiselect from 'multiselect-react-dropdown';
import Header from './Header'
import VertNav from './VertNav'
import invoiceImg from '../../assets/invoice.png'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

function GenerateInvoice() {
  const navigate = useNavigate();
    const currentDate = getCurrentDate();
   const [serviceOptions, setServiceOptions] = useState([]);
   const [customer_name , setCustomerName] = useState('');
   const [email , setEmail] = useState('');
   const [mobile_no , setMobileNo] = useState('');
   const [address , setAddress] = useState('');
    const [GBselectedServices, GBsetSelectedServices] = useState([]);
    const [service_by, setServiceBy] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [isGST, setIsGST] = useState(false);
    const [gst_number, setGSTNumber] = useState('');

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
          return {key:service.id , value: service.service , price: service.service_price}
        }));
      })
      .catch((err)=>{
        console.log(err);
      })
    },[]);
  
    const handleServiceSelect = (selectedList) => {
      GBsetSelectedServices(selectedList);
    };

    
    const servedByOptions = [
      { key: 'John', value: 'John' },
      { key: 'Ron', value: 'Roh' } ,
  ];


    const handleServedSelect = (selectedList) => {
        setServiceBy(selectedList);
    }

    const handleGSTChange = (event) => {
        setIsGST(true);
    }

    const handleGenerateInvoice = () => {
      if(GBselectedServices.length === 0){
        alert('Please select services!');
        return;
      }

      if(service_by.length === 0){
        alert('Please select served by!');
        return;
      }

      navigate('/invoice',{
        state: {
          customer_name,
          email,
          mobile_no,
          address,
          GBselectedServices,
          service_by,
          discount,
          isGST,
          gst_number
        }
      }); 
      console.log(customer_name , email , mobile_no , address , GBselectedServices , service_by , discount , isGST , gst_number);
  };

  const [get_persent_day_bill, setGet_persent_day_bill] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://89.116.32.12:8000/api/swalook/get_present_day_bill/",{
      headers:{
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      // console.log(res.data.current_user_data);
      setGet_persent_day_bill(res.data.current_user_data);
      console.log(get_persent_day_bill);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[]);

  const handleShowInvoice = (id) => {
    navigate(`/viewinvoice/${id}`);
  };

  return (
    <div className='gb_dash_main'>
      <Helmet>
        <title>Generate Invoice</title>
      </Helmet>
        <Header />
        <div className='gb_horizontal'>
        <div className='gb_h1'>
        <div className='gb_ver_nav'>
          <VertNav />
        </div>
        </div>
        <div className='gb_h2'>
            <div className='gb_left'>
                <h2 className='GI'>Generate Invoice</h2>
                <hr className='gb_hr'/>
                <h3 className='cd'>Customer Details</h3>
                <div className="gbform-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="gb_input-field" placeholder='Enter Full Name' required onChange={(e) => setCustomerName(e.target.value)}/>
                </div>
                <div className="gbform-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="gb_input-field" placeholder='Enter Email Address' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="gbform-group">
                <label htmlFor="phone">Phone:</label>
                <input type="number" id="phone" className="gb_input-field" placeholder='Enter Mobile Number' required onChange={(e)=>setMobileNo(e.target.value)}/>
                </div>
                <div className="gbform-group">
                <label htmlFor="address">Address:</label>
                <textarea id="address" className="gb_input-field" placeholder='Enter Address' rows={3} onChange={(e)=>setAddress(e.target.value)}></textarea>
                </div>
                <h3 className='sts'>Select Services</h3>
                <div className='gb_select-field-cont'>
                <Multiselect
                options={serviceOptions}
                showSearch={true}
                onSelect={handleServiceSelect}
                onRemove={handleServiceSelect}
                displayValue="value"
                placeholder="Select Services "
                className="gb_select-field"
                showCheckbox={true}
                />
                </div>
                <h3 className='sb'>Served By:</h3>
                <div className='gb_select-field-cont'>
                <Multiselect
                options={servedByOptions}
                showSearch={true}
                onSelect={handleServedSelect}
                onRemove={handleServedSelect}
                displayValue="value"
                placeholder="Select Served By"
                className="gb_select-field"
                />
                </div>
                <div className="gbform-group" style={{marginTop:'10px'}}>
                <label htmlFor="discount" >Discount:</label>
                <input type="number" id="discount" className="gb_input-field" placeholder='Discount (In Rupees)' onChange={(e)=>setDiscount(e.target.value)}/>
                </div>
                <div className="gbform-group">
                            <input type="radio" id="gstYes" name="gst" value="Yes" onChange={handleGSTChange} />
                            <label>GST Number?</label>
                        </div>
                        {isGST && (
                            <div className="gbform-group">
                                <label htmlFor="gstNumber">GST Number:</label>
                                <input type="text" id="gstNumber" className="gb_input-field" placeholder='Enter GST Number' required onChange={(e)=>setGSTNumber(e.target.value)} />
                            </div>
                        )}
                <div className='gb_btn_contain'>
                <button className='gb_button' onClick={handleGenerateInvoice}>Generate Invoice</button>
                </div>
            </div>
            <div className='gb_right'>
            <h2 className='gb_appoint'>Billing:({currentDate})</h2>
            <hr className='gb_hr'/>
            <div class='gb_table_wrapper'>
        <table class='gb_table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile No.</th>
                    <th>Amount</th>
                    <th>Services</th>
                    <th>View Invoice</th>
                </tr>
            </thead>
            <tbody>
            {get_persent_day_bill.map((item, index) => (
                        <tr key={index}>
                            <td>{item.customer_name}</td>
                            <td>{item.mobile_no}</td>
                            <td>{item.grand_total}</td>
                
                            <td>
                            {/* {item.services.split(',').length > 1 ? (
                            <select className='status-dropdown'>
                              {item.services.split(',').map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                              ))}
                            </select>
                          ) : item.services.split(',')[0]} */}

                          
{(() => {
  try {
    const servicesArray = JSON.parse(item.services);
    if (servicesArray.length > 1) {
      return (
        <select className='status-dropdown'>
          {servicesArray.map((service, index) => (
            <option key={index} value={service.Description}>{service.Description}</option>
          ))}
        </select>
      );
    } else if (servicesArray.length === 1) {
     
      return <span>{servicesArray[0].Description}</span>;
    } else {
      return null;
    }
  } catch (error) {
    console.error('JSON parsing error:', error);
    return null;
  }
})()}
                            </td>
                            <td><button onClick={() => handleShowInvoice(item.id)}>View</button></td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default GenerateInvoice