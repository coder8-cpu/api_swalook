import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'
import LoginImage from '../../assets/login_bg.png'
import Logo1 from '../../assets/S_logo.png'
import Logo from '../../assets/S_logo_1.png'

function Login() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleResetPasswordClick = () => {
      
      navigate('/forgetpassword');
  };

  return (
    <div className='login_container'>
        <div className='logo'>
            <img className='S_logo' src={Logo1} alt="Logo" />
        </div>

        <div className='login_main'>
            <div className='left'>
            <div className='form'>
            <h1 className='login_head'>Login</h1>
          <div className="input-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              placeholder="Enter your phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
                placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p class="forgot-password">Forgot your password? <a onClick={handleResetPasswordClick}>Reset it</a></p>
          <button type="submit">Login</button>
        </div>
        <div className='log_design'>

        </div>
            </div>
            <div className='right'>
                <div className='loginbg'>
                 <img className='loginbg' src={LoginImage} alt="Login Image" />
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Login