import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/GenerateInvoice.css'
import Multiselect from 'multiselect-react-dropdown';
import Header from './Header'
import VertNav from './VertNav'
import invoiceImg from '../../assets/invoice.png'
import {Link} from 'react-router-dom'

function GenerateInvoice() {
  const navigate = useNavigate();
    const [GBselectedServices, GBsetSelectedServices] = useState([]);
    const [GBservedBy, GBsetServedBy] = useState([]);
    const [isGST, setIsGST] = useState(false);

    const servedByOptions = [
        { key: 'John', value: 'John' },
        { key: 'Ron', value: 'Roh' } ,
    ];

    const serviceOptions = [
      { key: 'service2', value: 'Service 2' },
      { key: 'service3', value: 'key 3' }
    ];
  
    const handleServiceSelect = (selectedList) => {
      GBsetSelectedServices(selectedList);
    };

    const handleServedSelect = (selectedList) => {
        GBsetServedBy(selectedList);
    }

    const handleGSTChange = (event) => {
        setIsGST(true);
    }

    const handleGenerateInvoice = () => {
      navigate('/invoice'); 
  };
  return (
    <div className='gb_dash_main'>
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
                <input type="text" id="name" className="gb_input-field" placeholder='Enter Full Name'/>
                </div>
                <div className="gbform-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="gb_input-field" placeholder='Enter Email Address'/>
                </div>
                <div className="gbform-group">
                <label htmlFor="phone">Phone:</label>
                <input type="number" id="phone" className="gb_input-field" placeholder='Enter Mobile Number' />
                </div>
                <div className="gbform-group">
                <label htmlFor="address">Address:</label>
                <textarea id="address" className="gb_input-field" placeholder='Enter Address' rows={3}></textarea>
                </div>
                <h3 className='sts'>Select Services</h3>
                <div className='gb_select-field-cont'>
                <Multiselect
                options={serviceOptions}
                showSearch={true}
                onSelect={handleServiceSelect}
                displayValue="value"
                placeholder="Select Services "
                className="gb_select-field"
                />
                </div>
                <h3 className='sb'>Served By:</h3>
                <div className='gb_select-field-cont'>
                <Multiselect
                options={servedByOptions}
                showSearch={true}
                onSelect={handleServedSelect}
                displayValue="value"
                placeholder="Select Served By"
                className="gb_select-field"
                />
                </div>
                <div className="gbform-group" style={{marginTop:'10px'}}>
                <label htmlFor="discount" >Discount:</label>
                <input type="text" id="discount" className="gb_input-field" placeholder='Discount (In Rupees)'/>
                </div>
                <div className="gbform-group">
                            <input type="radio" id="gstYes" name="gst" value="Yes" onChange={handleGSTChange} />
                            <label>GST Number?</label>
                        </div>
                        {isGST && (
                            <div className="gbform-group">
                                <label htmlFor="gstNumber">GST Number:</label>
                                <input type="text" id="gstNumber" className="gb_input-field" placeholder='Enter GST Number' />
                            </div>
                        )}
                <div className='gb_btn_contain'>
                <button className='gb_button' onClick={handleGenerateInvoice}>Generate Invoice</button>
                </div>
            </div>
            <div className='gb_right'>
            <img src={invoiceImg} alt="Invoice" className='invoice_img' />
            </div>
        </div>
        </div>
    </div>
  )
}

export default GenerateInvoice