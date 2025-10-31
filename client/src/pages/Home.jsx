import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            axios.get("http://localhost:3000/api/auth/profile", {
                withCredentials: true
            }).then((response) => {
                return window.location.href = '/dashboard';
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [token]);
    return (
        <>
            <Navbar navBg={'tw-bg-amber-400'} isLogin={false} />
            <div className='tw-border-b-[1px] tw-border-b-black'></div>
            <section className='tw-bg-amber-400'>
                <div className="container tw-py-32">
                    <h1 className='tw-text-[3.5rem] sm:tw-text-[6.5rem] tw-font-semibold'>Stay curious.</h1>
                    <p className='mt-4 tw-font-sans tw-tracking-tighter tw-font-medium tw-text-xl sm:tw-text-2xl'>Discover stories, thinking, and expertise from writers on any topic.</p>
                    <button className='btn btn-dark tw-rounded-full tw-px-12 tw-py-2 mt-4 tw-text-xl tw-font-sans tw-tracking-tighter'>Start Reading</button>
                </div>
            </section>
            <div className='tw-border-b-[1px] tw-border-b-black'></div>

            <div className="container tw-my-6">
                <div className="tw-flex">
                    <div className="tw-flex tw-flex-col">
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <div className="tw-flex tw-gap-2 tw-flex-wrap tw-px-4">
                            <button className="btn btn-outline-dark">Programming</button>
                            <button className="btn btn-outline-dark">Social</button>
                            <button className="btn btn-outline-dark">Politics</button>
                            <button className="btn btn-outline-dark">Technology</button>
                            <button className="btn btn-outline-dark">Music</button>
                            <button className="btn btn-outline-dark">Engineering</button>
                            <button className="btn btn-outline-dark">Mythology</button>
                            <button className="btn btn-outline-dark">Psycology</button>
                            <button className="btn btn-outline-dark">Human</button>
                            <button className="btn btn-outline-dark">Ethical</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home