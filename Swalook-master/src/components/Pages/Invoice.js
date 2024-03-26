import React, { useEffect, useState , useRef} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import '../Styles/Invoice.css';
import l from '../../assets/SwaLookL.png';
import numberToWords from '../Pages/NumberToWords';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Popup from './Popup';

function Invoice() {
  // const componentRef = useRef();
  
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: false,
  //   pageStyle: "@page { size: A4 potrait; margin: 20mm; }",
  //   overflowStyle: "overflow-x: auto",
  //   onAfterPrint: () => alert("Print success!"),
  // });

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); 
  const [popupMessage, setPopupMessage] = useState('');

 
  const handlePrint = () => {
    const capture = document.querySelector('.invoice_main');
    const margin = 10; // Adjust margin size as needed
    const pageWidth = 300; // A4 page width in mm
    const increasedWidth = pageWidth + (2 * margin); // Increased width with margins
  
    html2canvas(capture).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', [increasedWidth, 297]); // [width, height]
      const componentWidth = pdf.internal.pageSize.getWidth();
      const componentHeight = pdf.internal.pageSize.getHeight();
  
      // Calculate position and size with margins
      const posX = margin;
      const posY = margin;
      const imgWidth = componentWidth - (2 * margin);
      const imgHeight = componentHeight - (2 * margin);
  
      pdf.addImage(imgData, 'PNG', posX, posY, imgWidth, imgHeight);
      pdf.save('download.pdf');
    });
  };
  
 
  
  const location = useLocation();
  const getCurrentDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const isGST = location.state.isGST;
  const customer_name = location.state.customer_name;
  const mobile_no = location.state.mobile_no;
  const email = location.state.email;
  const services = location.state.GBselectedServices;
  const address = location.state.address;
  const service_by = location.state.service_by;
  const discount = location.state.discount;
  const gst_number = location.state.gst_number;

  const [prices, setPrices] = useState(Array(services.length).fill(services.map(service => service.price)));
  const [quantities, setQuantities] = useState(Array(services.length).fill(1));
  const [discounts, setDiscounts] = useState(Array(services.length).fill(discount));
  const [taxes, setTaxes] = useState(Array(services.length).fill(0));
  const [cgst, setCGST] = useState(Array(location.state.GBselectedServices.length).fill(0));
  const [sgst, setSGST] = useState(Array(location.state.GBselectedServices.length).fill(0));
  const [totalAmts, setTotalAmts] = useState(Array(location.state.GBselectedServices.length).fill(0));

  const [total_prise, setTotalPrice] = useState(0);
  const [total_quantity, setTotalQuantity] = useState(0);
  const [total_discount, setTotalDiscount] = useState(0);
  const [total_tax, setTotalTax] = useState(0);
  const [total_cgst, setTotalCGST] = useState(0);
  const [total_sgst, setTotalSGST] = useState(0);
  const [grand_total, setGrandTotal] = useState(0);

  const grandTotalInWords = numberToWords(parseFloat(grand_total));

useEffect(() => {
  // Calculate and set total price
  const totalPrice = prices.reduce((acc, price) => acc + parseFloat(price), 0);
  setTotalPrice(totalPrice);

  // Calculate and set total quantity
  const totalQuantity = quantities.reduce((acc, quantity) => acc + parseFloat(quantity), 0);
  setTotalQuantity(totalQuantity);

  // Calculate and set total discount
  const totalDiscount = discounts.reduce((acc, discount) => acc + parseFloat(discount), 0);
  setTotalDiscount(totalDiscount);

  // Calculate and set taxes, cgst, and sgst
  const updatedTaxes = prices.map((price, index) => {
    const currPrice = (price * quantities[index]) - discounts[index];
    // const gst_value = (currPrice * 5) / 105;
    // const taxAmount = currPrice - gst_value;

    let taxAmount = 0; // Initialize tax amount to zero

    if (isGST) {
      const gst_value = (currPrice * 5) / 105;
      taxAmount = currPrice - gst_value;
    }

    // Calculate CGST and SGST for the current service
    const cgstValue = (taxAmount * 2.5) / 100;
    const sgstValue = (taxAmount * 2.5) / 100;

    // Update total CGST and SGST
    setCGST(prevCGST => {
      const updatedCGST = [...prevCGST];
      updatedCGST[index] = cgstValue.toFixed(2);
      return updatedCGST;
    });

    setSGST(prevSGST => {
      const updatedSGST = [...prevSGST];
      updatedSGST[index] = sgstValue.toFixed(2);
      return updatedSGST;
    });

    const totalAmt = (price * quantities[index] - discounts[index]).toFixed(2);
      setTotalAmts(prevTotalAmts => {
        const updatedTotalAmts = [...prevTotalAmts];
        updatedTotalAmts[index] = totalAmt;
        return updatedTotalAmts;
      });

    return taxAmount.toFixed(2);
  });
  setTaxes(updatedTaxes);

  // Calculate and set total tax
  const totalTax = updatedTaxes.reduce((acc, tax) => acc + parseFloat(tax), 0);
  setTotalTax(totalTax.toFixed(2));

  // Calculate and set total CGST
  const totalCGST = cgst.reduce((acc, tax) => acc + parseFloat(tax), 0);
  setTotalCGST(totalCGST.toFixed(2));

  // Calculate and set total SGST
  const totalSGST = sgst.reduce((acc, tax) => acc + parseFloat(tax), 0);
  setTotalSGST(totalSGST.toFixed(2));

  // Calculate and set grand total
  const grandTotal = totalAmts.reduce((acc, totalAmt) => acc + parseFloat(totalAmt), 0);
    setGrandTotal(grandTotal.toFixed(2));

}, [prices, quantities, discounts , cgst, sgst , totalAmts]);


  const handlePriceBlur = (index, value) => {
    const newPrices = [...prices];
    newPrices[index] = parseFloat(value);
    setPrices(newPrices);
  };

  const handleQuantityBlur = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseFloat(value);
    setQuantities(newQuantities);
  };

  // const handleDiscountBlur = (index, value) => {
  //   const newDiscounts = [...discounts];
  //   newDiscounts[index] = parseFloat(value);
  //   setDiscounts(newDiscounts);
  // };

  const handleDiscountBlur = (index, value) => {
    // If the value is null or undefined, set it to 0
    const discountValue = value === null || value === undefined ? 0 : parseFloat(value);
    const newDiscounts = [...discounts];
    newDiscounts[index] = discountValue;
    setDiscounts(newDiscounts);
  };

  const handleTaxBlur = (index, value) => {
    const newTaxes = [...taxes];
    newTaxes[index] = parseFloat(value);
    setTaxes(newTaxes);
  }

  const handleCGSTBlur = (index, value) => {
    const newCGST = [...cgst];
    newCGST[index] = parseFloat(value);
    setCGST(newCGST);
  }

  const handleSGSTBlur = (index, value) => {
    const newSGST = [...sgst];
    newSGST[index] = parseFloat(value);
    setSGST(newSGST);
  }

  const handleTotalAmtBlur = (index, value) => {
    const newTotalAmts = [...totalAmts];
    newTotalAmts[index] = parseFloat(value);
    setTotalAmts(newTotalAmts);
  }

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token);
    const data = {
      customer_name: customer_name,
      mobile_no: mobile_no,
      email: email,
      services: services.map(service => service.value) .toString(),
      address: address,
      service_by: service_by.map(service => service.value)
      .toString(),
      total_prise: total_prise,
      total_quantity: total_quantity,
      total_discount: total_discount,
      total_tax: total_tax,
      grand_total: grand_total,
      total_cgst: total_cgst,
      total_sgst: total_sgst,
      gst_number: gst_number,
    };
    console.log(data);

    // Make the POST request
    axios.post('http://89.116.32.12:8000/api/swalook/billing/', data ,{
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'    
      }
    })
      .then(response => {
        // Handle success
        setPopupMessage('Invoice generated successfully');
        setShowPopup(true);
        console.log('Invoice generated successfully:', response.data);
        // alert('Invoice generated successfully');
      })

      .catch(error => {
        // Handle error
        setPopupMessage('Error generating invoice');
        setShowPopup(true);
        console.error('Error generating invoice:', error);
      });
  };

  return (
    <div className='invoice_container'>
      <div  className='invoice_main'>
        <form onSubmit={handleGenerateInvoice}>
          <div>
        <div className='invoice_header'>
          <img src={l} alt='Logo' className='invoice_logo' />
          <div className='invoice_name'>Your Name</div>
        </div>
        <div className='invoice_content'>
          <div className='invoice_left'>
            <h3>Invoice To:</h3>
            <p>{customer_name}</p>
            <p>{address}</p>
            <p>{email}</p>
          </div>
          <div className='invoice_right'>
            <h5>InvoiceId</h5>
            <div className='invoice_date'>
              <p>Date of Invoice: </p>
              <p>{getCurrentDate()}</p>
            </div>
            {isGST ? (
              <div className='invoice_gst'>
                <p>GST Number: {gst_number}</p>
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
              {services.map((service, index) => (
                <tr key={index} style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
                  <td scope='col' style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }}>{service.value}</td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                    <input type='text' className='editable-field' id={`price_input_${index}`} defaultValue={service.price} onChange={(e) => handlePriceBlur(index, e.target.value)} />
                  </td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                    <input type='text' className='editable-field' id={`quantity_input_${index}`} defaultValue={1} onBlur={(e) => handleQuantityBlur(index, e.target.value)} />
                  </td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }}>
                    <input type='text' className='editable-field' id={`discount_input_${index}`} defaultValue={discounts[index] === null || discounts[index] === undefined ? 0 : discount}  onBlur={(e) => handleDiscountBlur(index, e.target.value)} />
                  </td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }} onChange={(e) => handleTaxBlur(index, e.target.value)}>{taxes[index]}</td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }} onChange={(e) => handleCGSTBlur(index, e.target.value)}>{cgst[index]}</td>
                  <td scope='col' className='text-center' style={{ textAlign: 'center' }} onChange={(e) => handleSGSTBlur(index, e.target.value)}>{sgst[index]}</td>
                  <td scope='col' style={{ width: '20%', color: 'black', textAlign: 'center' }} onChange={(e) => handleTotalAmtBlur(index , e.target.value)}>{totalAmts[index]}</td>
                </tr>
              ))}
              <tr style={{ border: '1px solid #787871', padding: '3px', backgroundColor: '#fff' }}>
                <th colSpan='2' style={{ width: '20%', color: 'white', fontWeight: 500, fontSize: 15, backgroundColor: '#0d6efd' }}>TOTAL</th>
                <th style={{ width: '5%', padding: '0.7%' }} className='text-center'>{total_prise}</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{total_quantity}</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{total_discount}</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{total_tax}</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{total_cgst}</th>
                <th style={{ width: '10%', padding: '0.7%' }} className='text-center'>{total_sgst}</th>
                <th style={{ width: '10%', padding: '0.7%', backgroundColor: '#0d6efd', color: 'white' }}>{grand_total}</th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='invoice_footer'>
          <div className='invoice_footer_left'>
            <h4>Amount in Words:</h4>
            <p>{grandTotalInWords} Rupees Only</p>
          </div>
          <div className='invoice_footer_right'>
            <h4>FINAL VALUE:</h4>
            <p>Rs {grand_total}</p>
          </div>
        </div>
        </div>
        <div className='generate-button-container'>
          <button className='generate-button' onClick={handlePrint}>Generate Final Invoice</button>
        </div>
        </form>
      </div>
      {showPopup && <Popup message={popupMessage} onClose={() => {setShowPopup(false); navigate('/admin/dashboard');} }/>}
    </div>
  );
}

export default Invoice;
