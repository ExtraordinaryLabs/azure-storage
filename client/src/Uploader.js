import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
    }

    const fileUploadHandler = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://localhost:5000/upload', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div>
            <input type="file" onChange={fileSelectedHandler} />
            <button onClick={fileUploadHandler}>Upload</button>
        </div>
    );
}

export default FileUpload;