import React, { useState } from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button'
import axios from 'axios'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
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
        } else if (email.includes('@') === false && email.includes('.') === false) {
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
        } else if (password.length < 6) {
            toast.error('Password must be at least 6 characters long', {
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

        axios.post('http://localhost:3000/api/auth/register', {
            name: name,
            email: email,
            password: password
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Registered', {
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
                    axios.post('http://localhost:3000/api/auth/login', {
                        email: email,
                        password: password
                    })
                        .then((response) => {
                            if (response.status === 200) {
                                localStorage.setItem('token', response.data.token);
                                document.cookie = `token=${response.data.token}`;
                                setLoading(false);
                                return window.location.href = '/dashboard';
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 401) {
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
                        });
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    toast.error('User already exists!', {
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
                } else if (error.response.status === 400) {
                    toast.error('Registration failed!', {
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
            });
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
                        <h3 className='tw-font-serif tw-text-2xl tw-tracking-normal'>Join PixelStack.</h3>
                        <h5 className='tw-font-normal tw-text-sm'>
                            Register with your email and get started.
                        </h5>
                    </div>
                    <div className='tw-mt-5'>
                        <form>
                            <div className='tw-flex tw-flex-col'>
                                <Input
                                    label={"Name"}
                                    type={"text"}
                                    id={"name"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    label={"Email"}
                                    type={"email"}
                                    id={"email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    label={"Password"}
                                    type={"password"}
                                    id={"password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant={"dark"} disabled={loading} type={"submit"} onClick={handleClick}>
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register