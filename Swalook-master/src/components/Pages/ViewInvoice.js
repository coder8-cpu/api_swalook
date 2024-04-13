import React, { useEffect, useState , useRef} from 'react';
import axios from 'axios';
import '../Styles/showInvoice.css'
import { Helmet } from 'react-helmet';
import numberToWords from './NumberToWords';
import Logo1 from '../../assets/S_logo.png'

function showInvoice() {
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
        <div className='invoice_name'></div>
      </div>
      <div className='invoice_content'>
        <div className='invoice_left'>
          <h3>Invoice To:</h3>
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div className='invoice_right'>
          <h5>InvoiceId: </h5>
          <div className='invoice_date'>
            <p>Date of Invoice: </p>
            <p></p>
          </div>
          {/* {isGST ? ( */}
            <div className='invoice_gst'>
              <p>GST Number: </p>
            </div>
         {/* ) : null} */}
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
            {/* {services.map((service, index) => (
              <tr key={index} style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
                <td scope='col' style={{ textAlign: 'center' }}>{index + 1}</td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }}></td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                  <input type='text' className='editable-field' id={`price_input_${index}`} />
                </td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                  <input type='text' className='editable-field' id={`quantity_input_${index}`}/>
                </td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                  <input type='text' className='editable-field' id={`discount_input_${index}`} />
                </td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }}></td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }} ></td>
                <td scope='col' className='text-center' style={{ textAlign: 'center' }}></td>
                <td scope='col' style={{ width: '20%', color: 'black', textAlign: 'center' }} ></td>
              </tr>
            ))} */}
            <tr style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
              <th colSpan='2' style={{ width: '20%', color: 'white', fontWeight: 500, fontSize: 15, backgroundColor: '#0d6efd' }}>TOTAL</th>
              <th style={{ width: '5%', padding: '0.7%' }} className='text-center'></th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'></th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'></th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'></th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'></th>
              <th style={{ width: '10%', padding: '0.7%' }} className='text-center'></th>
              <th style={{ width: '10%', padding: '0.7%', backgroundColor: '#0d6efd', color: 'white' }}></th>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='invoice_footer'>
        <div className='invoice_footer_left'>
          <h4>Amount in Words:</h4>
          <p> Rupees Only</p>
        </div>
        <div className='invoice_footer_right'>
          <h4>FINAL VALUE:</h4>
          <p>Rs </p>
        </div>
      </div>
      </div>
      </form>
    </div>
  </div>
  )
}

export default showInvoice