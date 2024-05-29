import React, { useEffect, useState , useRef} from 'react';
import axios from 'axios';
import '../Styles/showInvoice.css'
import { Helmet } from 'react-helmet';
import numberToWords from './NumberToWords';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Logo1 from '../../assets/S_logo.png'
import config from '../../config';

function ViewInvoice() {
  const { id } = useParams();
  console.log(id);
  const saloon_name = localStorage.getItem('saloon_name');
  const [invoiceData, setInvoiceData] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${config.apiUrl}/api/swalook/get_bill_data/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((res) => {
        console.log(res.data.current_user_data[0]);
        setInvoiceData(res.data.current_user_data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const isGST = invoiceData.gst_number ? true : false;
  
   const grandTotalInWords = numberToWords(parseFloat(invoiceData.grand_total));

   const services = invoiceData.services ? JSON.parse(invoiceData.services) : [];
  return (
    <div className='invoice_container'>
    <Helmet>
      <title>View Invoice</title>
    </Helmet>
    <div  className='invoice_main'>
      <form >
        <div>
      <div className='invoice_header'>
        <img src={Logo1} alt='Logo' className='invoice_logo' />
        <div className='invoice_name'>{saloon_name}</div>
      </div>
      <div className='invoice_content'>
        <div className='invoice_left'>
          <h3>Invoice To:</h3>
          <p>{invoiceData.customer_name}</p>
          <p>{invoiceData.address}</p>
          <p>{invoiceData.email}</p>
        </div>
        <div className='invoice_right'>
          <h5>InvoiceId: {invoiceData.slno} </h5>
          <div className='invoice_date'>
            <p>Date of Invoice:  {invoiceData.date}  </p>
            <p></p>
          </div>
          {isGST ? (
            <div className='invoice_gst'>
              <p>GST Number:{invoiceData.gst_number} </p>
            </div> 
          ) : null} 
        </div>
      </div>

      <div className='table-responsive'>
        <table className='invoice_table table-bordered'>
          <thead>
            <tr style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
              <th style={{ width: '5%' }}>S. No.</th>
              <th style={{ width: '30%' }}>DESCRIPTION</th>
              <th style={{ width: '10%' }}>PRICE</th>
              <th style={{ width: '10%' }}>QUANTITY</th>
              <th style={{ width: '10%' }}>DISCOUNT</th>
              <th style={{ width: '10%' }}>TAX AMT</th>
              <th style={{ width: '10%' }}>CGST(2.5%)</th>
              <th style={{ width: '10%' }}>SGST(2.5%)</th>
              <th style={{ width: '10%', color: 'white', backgroundColor: '#0d6efd' }}>TOTAL AMT</th>
            </tr>
          </thead>
          <tbody>
           
           {
            services.map((item, index) => (
              <tr key={index} style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
                <td style={{ width: '5%', padding: '0.7%' }} className='text-center'>{index + 1}</td>
                <td style={{ width: '30%', padding: '0.7%' }} className='text-center'>{item.Description}</td>
                <td style={{ width: '10%', padding: '0.7%' }} className='text-center'>{item.Price}</td>
                <td style={{ width: '10%', padding: '0.7%' }} className='text-center'>{item.Quantity}</td>
                <td style={{ width: '10%', padding: '0.7%' }} className='text-center'>{item.Discount}</td>
                <td style={{ width: '10%', padding: '0.7%' }} className='text-center'>{item.Tax_amt}</td>
                <td style={{ width: '10%', padding: '0.7%' }} className='text-center'>{item.CGST}</td>
                <td style={{ width: '10%', padding: '0.7%' }} className='text-center'>{item.SGST}</td>
                <td style={{ width: '10%', padding: '0.7%' }} className='text-center'>{item.Total_amount}</td>
              </tr>
            ))
           }
            <tr style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
              <th colSpan='2' style={{ width: '20%', color: 'white', fontWeight: 500, fontSize: 15, backgroundColor: '#0d6efd' }}>TOTAL</th>
              <th style={{ width: '5%', padding: '0.7%' }} className='text-center'>{invoiceData.total_prise}</th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{invoiceData.total_quantity}</th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{invoiceData.total_discount}</th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{invoiceData.total_tax}</th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{invoiceData.total_cgst}</th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{invoiceData.total_sgst}</th>
              <th style={{ width: '10%', padding: '0.7%', backgroundColor: '#0d6efd', color: 'white' }}>{invoiceData.grand_total}</th>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='invoice_footer'>
        <div className='invoice_footer_left'>
          <h4>Amount in Words:</h4>
          <p> {grandTotalInWords} Rupees Only</p>
        </div>
        <div className='invoice_footer_right'>
          <h4>FINAL VALUE:</h4>
          <p>Rs {invoiceData.grand_total} </p>
        </div>
      </div>
      </div>
      </form>
    </div>
  </div>
  )
}

export default ViewInvoice