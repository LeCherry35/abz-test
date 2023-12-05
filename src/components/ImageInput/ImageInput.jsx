import React from 'react'

const ImageInput = ({onChange, imageName = null}) => {
  return (
    <div className='imageInputContainer'>
        <label htmlFor='imgInput' className='imageInput'>
        <div className='imageUploadButton'>
            Upload
        </div>
        <div >
            {imageName || 'Upload your photo'}
        </div>
        </label>
        <input
            id='imgInput'
            type="file"
            // value={selectedFile}
            accept=".jpg, .jpeg"
            onChange={onChange}
        />
    </div>
  )
}

export default ImageInput