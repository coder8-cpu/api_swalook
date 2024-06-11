import React , {useState} from 'react'
import Logo1 from '../../assets/S_logo.png'
import owner from '../../assets/owner.png'
import { Helmet } from 'react-helmet';
import '../Styles/OwnerLogin.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
  
function OwnerLogin() {
  const navigate = useNavigate();
  const [mobileno , setMobileno] = useState('');
  const [password , setPassword] = useState('');

  const handleAdminLogin = (e) => {
    console.log(mobileno , password);
    e.preventDefault();

    axios.post("https://api.crm.swalook.in/api/swalook/login/",{
      mobileno: mobileno,
      password: password
    })
    
    .then((res) => {
      if(res.data.text === 'login successfull !'){
        Cookies.set('loggedIn', 'true', { expires: 90 });
        const salonName = res.data.salon_name;
        Cookies.set('salonName', salonName, { expires: 90 });
        localStorage.setItem('s-name', salonName);
        localStorage.setItem('type', res.data.type);
        navigate(`/${salonName}`);
        // alert('login successfull !');
      }
      const token = res.data.token; 

      const number = btoa(res.data.user);
      localStorage.setItem('token', token);
      localStorage.setItem('number', number);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <div className='owner_login_container'>
      <Helmet>
        <title>OwnerLogin</title>
      </Helmet>
        <div className='owner_login_main'>
            <div className='owner_left'>
            <div className='owner_logo'>
            <img className='owner_S_logo' src={Logo1} alt="Logo" />
            </div>
            <div className='owner_form'>
            <h1 className='owner_login_head'>Owner Login</h1>
            <form onSubmit={handleAdminLogin}>
          <div className="OL_input-group">
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
          <div className="OL_input-group">
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
          <p class="forgot-password">Forgot your password? <a >Reset it</a></p>
          <button type="submit">Login</button>
          </form>
        </div>
            </div>

            <div className='owner_right'>
                <div className='owner_loginbg'>
                    <div className='welcome_text'>
                    
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default OwnerLogin