import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../components/Styles/Header.css';
import Logo from '../../assets/S_logo_1.png';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ServiceDetails from './ServiceDetails';

function Header() {
 const [showDropdown, setShowDropdown] = useState(false);
 const inputFileRef = useRef(null);
 const [profileImage, setProfileImage] = useState("");

 const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
 };
 
 const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setProfileImage(event.target.files[0]);

};

const handleChooseImage = () => {
  console.log('Choose image button clicked');
  inputFileRef.current.click();
};
 

 return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo" className="header_logo" />
      </div>
      <div className="navbar-center">
      <button className="nav-button"><Link to="/" className="nav-link">Home</Link></button>
        <button className="nav-button"><Link to="/admin/service" className="nav-link">Service</Link></button>
        <button className="nav-button"><Link to="/admin/settings" className="nav-link">Settings</Link></button>
        <button className="nav-button"><Link to="/24*7" className="nav-link">24*7</Link></button>
      </div>
      <div className="navbar-right">
        <div className="user-photo" onClick={toggleDropdown}>
          {profileImage ? (
            <img src={URL.createObjectURL(profileImage)} alt="Profile" className="profile-image" />
          ) : (
            <AccountCircleIcon sx={{ fontSize: '36px' }} />
          )}
          <div className="down-arrow"></div>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleChooseImage}>
                <PersonAddIcon sx={{ marginRight: '5px', verticalAlign: 'middle' }} />
                <span style={{ verticalAlign: 'middle' }}>Change Profile Picture</span>
                <input
                 type="file"
                 accept="image/png, image/jpeg"
                 onChange={handleImageChange}
                 ref={inputFileRef}
                 style={{ display: 'none' }}
                />
              </div>
              <div className="dropdown-item">
                <LogoutIcon sx={{ marginRight: '5px', verticalAlign: 'middle' }} />
                <span style={{ verticalAlign: 'middle' }}>LogOut</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
 );
}

export default Header;
