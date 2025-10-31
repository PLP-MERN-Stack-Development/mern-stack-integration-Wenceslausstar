import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { formatISO9075 } from 'date-fns'
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa6";
import { CiBookmarkPlus } from "react-icons/ci";
import { CiShare1 } from "react-icons/ci";

const BlogPost = () => {

    const { id } = useParams();
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3000/api/posts/${id}`)
            .then(res => {
                console.log(res.data)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [id])

    return (
        <>
            <Navbar isLogin={true} />
            <hr />
            <div className="container tw-my-5">
                <div className="tw-flex tw-justify-center">
                    <div className="tw-flex tw-flex-col md:tw-w-2/4 tw-w-full tw-px-3">
                        <div>
                            <h3 className='md:tw-text-5xl tw-text-3xl tw-font-sans tw-font-bold tw-tracking-tight'>
                                {posts.data ? posts.data.title : 'Loading...'}
                            </h3>
                            <h5 className='tw-font-sans tw-tracking-tighter tw-mt-5 tw-text-gray-500 tw-text-sm md:tw-text-base md:tw-leading-6'>
                                {posts.data ? posts.data.summary : 'Loading...'}
                            </h5>
                            <div className='tw-rounded-full tw-shadow-sm tw-my-3 tw-flex tw-gap-4 tw-items-center'>
                                <img className='md:tw-w-12 tw-w-10 tw-h-full' src="../userImg.png" alt="User Profile Image" />
                                <div className="tw-flex tw-flex-col">
                                    <h5 className='tw-font-sans tw-tracking-tighter tw-font-medium md:tw-text-lg tw-text-base'>
                                        {posts.data ? <p>{posts.data.author.name}</p> : 'Loading...'}
                                    </h5>
                                    <span className='tw-text-gray-500 tw-text-xs md:tw-text-sm tw-font-sans'>
                                        {posts.data ? formatISO9075(new Date(posts.data.createdAt)) : 'Loading...'}
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className='tw-flex tw-justify-between'>
                                <div className="tw-flex tw-gap-7">
                                    <SlLike className='tw-my-5 tw-text-xl tw-text-gray-500 hover:tw-text-gray-800 tw-cursor-pointer' />
                                    <FaRegComment className='tw-my-5 tw-text-xl tw-text-gray-500 hover:tw-text-gray-800 tw-cursor-pointer' />
                                </div>
                                <div className='tw-flex tw-gap-5'>
                                    <CiBookmarkPlus className='tw-my-5 tw-text-2xl tw-text-gray-500 hover:tw-text-gray-800 tw-cursor-pointer' />
                                    <CiShare1 className='tw-my-5 tw-text-2xl tw-text-gray-500 hover:tw-text-gray-800 tw-cursor-pointer' />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="tw-flex tw-flex-col">
                            <img src={`http://localhost:3000/${posts.data ? posts.data.cover : 'Loading...'}`} alt="Banner" />
                            <div className='tw-mt-5 tw-text-lg tw-font-sans tw-tracking-tighter tw-leading-7'>
                                <div className='tw-text-lg' dangerouslySetInnerHTML={{ __html: posts.data ? posts.data.content : 'Loading...' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogPost