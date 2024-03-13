import React from 'react'
import '../Styles/Invoice.css'
import l from '../../assets/SwaLookL.png'


function Invoice() {
    const getCurrentDate = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        const currentDate = new Date();
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
    
        return `${month} ${day}, ${year}`;
      };
  return (
    <div className='invoice_container'>
        <div className='invoice_main'>
        <div className='invoice_header'>  
          <img src={l} alt='Logo' className='invoice_logo' />
          <div className='invoice_name'>Your Name</div>
        </div>
        
        <div className='invoice_content'>
          <div className='invoice_left'>
            <h3>Invoice To:</h3>
            <p>Recipient Name</p>
            <p>Recipient Address</p>
            <p>Recipient Email</p>
          </div>
          <div className='invoice_right'>
            <h5>InvoiceId</h5>
            <div className='invoice_date'>
            <p>Date of Invoice:  </p>
            <p>{getCurrentDate()}</p>
            </div>
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
                <th style={{ width: '10%', color: 'white', backgroundColor:'#0d6efd' }}>TOTAL AMT</th>
              </tr>
            </thead>
            <tbody>
              {/* {service_obj.map((item, index) => ( */}
                <tr  style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
                  <td scope='col' style={{ textAlign: 'center' }}>1</td>
                  <td scope='col' className='text-center' style={{textAlign: 'center'}}>service</td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                <input type="text" className="editable-field" defaultValue="Price" />
                </td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                    <input type="text" className="editable-field" defaultValue="Quantity" />
                </td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                    <input type="text" className="editable-field" defaultValue="Discount" />
                </td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }}>taxableamt</td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }}>cgst</td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }}>sgst</td>
                  <td scope='col' style={{ width: '20%', color: 'black', textAlign: 'center' }}>total</td>
                </tr>
              {/* ))} */}
              <tr style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
                <th colSpan='2' style={{ width: '20%', color: 'white', fontWeight: 500, fontSize: 15 , backgroundColor:'#0d6efd'}}>TOTAL</th>
                <th style={{ width: '5%', padding: '0.7%' }} className='text-center'>price</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>total_quantity</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>total_discount</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>total_tax</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>total_cgst</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>total_sgst</th>
                <th style={{ width: '10%', padding: '0.7%' , backgroundColor:'#0d6efd',color:'white' }} className='text-center'>500</th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='invoice_footer'>
            <div className='invoice_footer_left'>
            <h4>Amount in Words:</h4>
            <p>Five Hundred Only</p>
            </div>
            <div className='invoice_footer_right'>
            <h4>FINAL VALUE:</h4>
            <p>Rs. 500</p>
            </div>
        </div>
        
        <div className='generate-button-container'>
            <button className='generate-button'>Generate Final Invoice</button>
        </div>
        </div>
    </div>
  )
}

export default Invoice