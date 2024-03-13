import React from 'react'
import '../Styles/Settings.css'
import { Link } from 'react-router-dom';
import Header from './Header'
import PI from '../../assets/PI.png'
import HD from '../../assets/HD.png'
import SY from '../../assets/SY.png'

function Settings() {
  return (
    <div className='settings_container'>
        <Header />
        <div className="content_container">
        <Link to="/admin/settings/personalInformation" className="settings_box" >
          <img src={PI} alt="Personal Information" />
          <h2>Personal Information</h2>
          <p>Manage your account details</p>
        </Link>
        <Link className="settings_box">
          <img src={SY} alt="Security" />
          <h2>Security</h2>
          <p>Setup your active session login hours</p>
        </Link>
        <Link className="settings_box">
          <img src={HD} alt="Help Desk" />
          <h2>Help Desk</h2>
          <p>Resolve your Query</p>
        </Link>
        </div>
    </div>
  )
}

export default Settings