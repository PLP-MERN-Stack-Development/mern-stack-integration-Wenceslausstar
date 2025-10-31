import React, { useCallback, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Please fill all fields', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      setLoading(false);
      return;
    }

    if(email.includes('@') === false && email.includes('.') === false) {
      toast.error('Please Enter a Valid Email', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Login Success', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        localStorage.setItem('token', response.data.token);
        setLoading(false);
        setRedirect(true);
      }
    } catch (error) {
      if (error.response.data.status === 404) {
        toast.error('User not Found!!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        setLoading(false);
      }

      else if (error.response.data.status === 400) {
        toast.error('Invalid Credentials', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        setLoading(false);
      }
    }
  }, [email, password]);

  if (redirect) {
    return <Navigate to="/dashboard" />
  }

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
      <div className='tw-w-full tw-my-5 tw-mb-16'>
        <div className='tw-flex tw-flex-col tw-justify-center tw-items-center'>
          <div className='tw-mx-0 tw-text-center tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-gap-3'>
            <h3 className='tw-font-serif tw-text-2xl tw-tracking-normal'>Welcome Back.</h3>
          </div>
          <div className='tw-mt-12'>
            <form action="">
              <div className='tw-flex tw-flex-col'>
                <Input
                  label={"Email"}
                  type={"email"}
                  id={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label={"Password"}
                  type={"password"}
                  id={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className='tw-w-full tw-text-center tw-my-4'>
                  <h5>
                    No account? <Link to="/register" className='tw-text-blue-500'>Register</Link>
                  </h5>
                </span>
                <Button variant={"dark"} onClick={handleLogin} disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login;