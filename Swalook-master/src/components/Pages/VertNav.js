import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/VertNav.css'
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DescriptionIcon from '@mui/icons-material/Description';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

function VertNav() {
  return (
    <div className='vert_nav_main_c'>
        <div className="icon-container">
            <Link to="/appointment">
              <BookOnlineIcon style={{ fontSize: 30, margin: '10px', color: 'white' }} />
              <span className="icon-text">Appointment</span>
            </Link>
          </div>
          <div className="icon-container">
            <Link to="/generatebill">
              <DescriptionIcon style={{ fontSize: 30, margin: '10px', color: 'white' }} />
              <span className="icon-text">Invoice</span>
            </Link>
          </div>
          <div className="icon-container">
            <ShowChartIcon style={{ fontSize: 30, margin: '10px', color: 'white' }} />
            <span className="icon-text">Analysis</span>
          </div>
          <div className="icon-container">
            <StorefrontIcon style={{ fontSize: 30, margin: '10px', color: 'white' }} />
            <span className="icon-text">Store</span>
          </div>
    </div>
  )
}

export default VertNav