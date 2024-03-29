import React , {useState} from 'react'
import '../Styles/AdminLogin.css'
import { useNavigate } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';
import Logo1 from '../../assets/S_logo.png'
import axios from 'axios';
import Cookies from 'js-cookie';


function AdminLogin() {
  const navigate = useNavigate();
  const [mobileno , setMobileno] = useState('');
  const [password , setPassword] = useState('');
  
  const handleAdminLogin = (e) => {
    console.log(mobileno , password);
    e.preventDefault();

    axios.post("http://89.116.32.12:8000/api/swalook/login/",{
      mobileno: mobileno,
      password: password
    })
    
    .then((res) => {
      if(res.data.text === 'login successfull !'){
        Cookies.set('loggedIn', 'true', { expires: 90 });
        navigate('/admin/dashboard');
        // alert('login successfull !');
      }
      const token = res.data.token; 
      localStorage.setItem('token', token);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

    const handleResetPasswordClick = () => {
      
      navigate('/forgetpassword');
  };
  return (
    <div className='Admin_login_container'>
        
        <div className='admin_login_main'>
            <div className='admin_left'>
            <div className='admin_logo'>
            <img className='admin_S_logo' src={Logo1} alt="Logo" />
            </div>
            <div className='admin_form'>
            <h1 className='admin_login_head'>Admin Login</h1>
            <form onSubmit={handleAdminLogin}>
          <div className="AL_input-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input
              type="number"
              id="phone-number"
              name="phoneNumber"
              placeholder="Enter your phone number"
              onChange={(e) => setMobileno(e.target.value)}
              required
            />
          </div>
          <div className="AL_input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e)=> setPassword(e.target.value)}
              required
            />
          </div>
          <p class="forgot-password">Forgot your password? <a onClick={handleResetPasswordClick}>Reset it</a></p>
          <button type="submit">Login</button>
          </form>
        </div>
            </div>

            <div className='admin_right'>
                <div className='admin_loginbg'>
                    <div className='welcome_text'>
                    
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default AdminLogin