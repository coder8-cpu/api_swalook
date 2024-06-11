import React, { useState, useEffect } from 'react';
import '../Styles/AdminLogin.css';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import ForgetPassword from './ForgetPassword';
import Logo1 from '../../assets/S_logo.png';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const navigate = useNavigate();
  const { admin_url } = useParams();
  const params = useParams(); 
  const burl = btoa(params.admin_url);
  const sname = params.salon_name; 
  localStorage.setItem('s-name', sname);
  console.log(admin_url, sname);
  const [isValid, setIsValid] = useState(false);
  const [mobileno, setMobileno] = useState('');
  const [password, setPassword] = useState('');
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get('loggedIn')) {
      setAlreadyLoggedIn(true);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://api.crm.swalook.in/api/swalook/${sname}/${admin_url}/`);
          if (response.data.status === true) {
            console.log(response.data);
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [sname, admin_url]);

  useEffect(() => {
    localStorage.setItem('branch_name', burl);
  }, [admin_url]);

  const handleAdminLogin = (e) => {
    console.log(mobileno, password);
    
    e.preventDefault();

    axios.post('https://api.crm.swalook.in/api/swalook/staff/login/', {
      mobileno: mobileno,
      password: password,
    })
    .then((res) => {
      if (res.data.text === 'login successfull !') {
        Cookies.set('loggedIn', 'true', { expires: 90 });
        navigate(`/${sname}/${burl}/dashboard`); // Navigate to the dashboard with URL parameter
        // alert('login successfull !');
        const token = res.data.token;

        const number = btoa(res.data.user);
        localStorage.setItem('token', token);
        localStorage.setItem('number', number);
        localStorage.setItem('type', res.data.type);
      }
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // const handleGoToStaffLogin = () => {
  //   navigate('/staff');
  // };

  const handleResetPasswordClick = () => {
    navigate('/forgetpassword');
  };

  return (
    <div className='Admin_login_container'>
      <Helmet>
        <title>Admin Login</title>
      </Helmet>
      {alreadyLoggedIn ? (
        <div>
          <h1>Please logout from the other account before logging in.</h1>
        </div>
      ) : isValid ? (
        <div className='admin_login_main'>
          <div className='admin_left'>
            <div className='admin_logo'>
              <img className='admin_S_logo' src={Logo1} alt='Logo' />
            </div>
            <div className='admin_form'>
              <h1 className='admin_login_head'>Admin Login</h1>
              <form onSubmit={handleAdminLogin}>
                <div className='AL_input-group'>
                  <label htmlFor='phone-number'>Staff Name:</label>
                  <input
                    type='text'
                    id='phone-number'
                    name='phoneNumber'
                    placeholder='Enter your phone number'
                    onChange={(e) => setMobileno(e.target.value)}
                    required
                  />
                </div>
                <div className='AL_input-group'>
                  <label htmlFor='password'>Password:</label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p className='forgot-password'>
                  Forgot your password?{' '}
                  <a onClick={handleResetPasswordClick}>Reset it</a>
                </p>
                <button type='submit'>Login</button>
              </form>

              {/* <div className='l_al'>
                <button
                  className='Admin_L_button'
                  onClick={handleGoToStaffLogin}
                >
                  Staff Login
                </button>
              </div> */}
            </div>
          </div>

          <div className='admin_right'>
            <div className='admin_loginbg'>
              <div className='welcome_text'></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Invalid Staff URL</h1>
        </div>
      )}
    </div>
  );
}

export default Login;
