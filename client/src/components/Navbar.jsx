import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Modal from './Modal'
import Button from './Button'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import axios from 'axios'

const Navbar = ({ navBg, isLogin }) => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const openSignInModal = () => setIsSignInModalOpen(true);
    const closeSignInModal = () => setIsSignInModalOpen(false);

    const openSignUpModal = () => setIsSignUpModalOpen(true);
    const closeSignUpModal = () => setIsSignUpModalOpen(false);

    const handleLogout = () => {
        setLoading(true);
        axios.post("http://localhost:3000/api/auth/logout", {}, {
            withCredentials: true
        })
            .then((res) => {
                localStorage.removeItem("token");
                setLoading(false);
                setRedirect(true);
            })
            .catch((err) => {
                setLoading(false);
            })
    }

    if (redirect) {
        return <Navigate to="/" />
    }
    return (
        <>
            <nav className={`navbar navbar-expand-lg p-md-4 px-md-0 px-2 ${navBg} tw-transition-all tw-duration-200`}>
                <div className="container">
                    <Link className="navbar-brand tw-font-bold md:tw-text-3xl tw-text-2xl" to="/">PixelStack</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLink" aria-controls="navLink" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navLink">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 tw-gap-2 tw-font-sans tw-tracking-tighter tw-font-medium">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/explore">Explore</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            {isLogin && (
                                <li className="nav-item">
                                    <Button variant={"dark"} onClick={handleLogout} disabled={loading}>
                                        Logout
                                    </Button>
                                </li>
                            )}
                            {!isLogin && (
                                <>
                                    <li className="nav-item">
                                        <Button onClick={openSignInModal} disabled={false}>
                                            {"Sign in"}
                                        </Button>
                                        <Modal isOpen={isSignInModalOpen} onClose={closeSignInModal}>
                                            <Login />
                                        </Modal>
                                    </li>
                                    <li className="nav-item">
                                        <Button variant={"dark"} onClick={openSignUpModal} disabled={false}>
                                            {"Get Started"}
                                        </Button>
                                        <Modal isOpen={isSignUpModalOpen} onClose={closeSignUpModal}>
                                            <Register />
                                        </Modal>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar