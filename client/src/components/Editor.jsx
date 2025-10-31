import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({value, onChange}) => {

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };

    return (
        <ReactQuill
            className='tw-font-sans tw-text-lg'
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
        />
    );
}

export default Editor;