import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Input from '../Components/Input'
import Editor from '../Components/Editor'
import Button from '../Components/Button'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const [loading, setLoading] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('file', files);

        setLoading(true);
        await axios.post('http://localhost:3000/api/posts/createPost', formData, {
            withCredentials: true,
        }).then((res) => {
            setLoading(false);
            setRedirect(true);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }
    if (redirect) {
        return (<Navigate to='/dashboard' />)
    }

    return (
        <div>
            <Navbar isLogin={true} />
            <hr />
            <div className="container tw-my-4 tw-w-2/4">
                <h3 className="tw-text-3xl tw-font-sans tw-mt-4 tw-tracking-tighter">
                    Create Post
                </h3>
                <form action="">
                    <Input
                        type={"text"}
                        label={"Title"}
                        align={"left"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                        type={"text"}
                        label={"Summary"}
                        align={"left"}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />

                    <Input
                        type={"file"}
                        label={"Cover Image"}
                        align={"left"}
                        onChange={(e) => setFiles(e.target.files[0])}
                    />

                    <label className='tw-font-sans tw-text-gray-500 tw-text-sm'>Content</label>
                    <Editor value={content} onChange={setContent} />

                    <br />

                    <Button variant='dark' block={true} onClick={handleFormSubmit} disabled={loading}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost