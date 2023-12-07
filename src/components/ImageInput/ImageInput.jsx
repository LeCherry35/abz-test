import React from 'react'

const ImageInput = ({onChange, imageName = null, error}) => {
  return (
    <label htmlFor='imgInput' className='image-input-container'>
      <div className={error ? 'image-input-container__image-upload-button image-input-container__image-upload-button_warning' : 'image-input-container__image-upload-button'}>
          Upload
      </div>
      <div className={error ?'image-input-container__image-name image-input-container__image-name_warning' :'image-input-container__image-name'}>
          {imageName || 'Upload your photo'}
      </div>
      <div  className='image-input-container__warning-text'>{error}</div>
      <input
          className='image-input-container__image-input'
          id='imgInput'
          type="file"
          // value={selectedFile}
          accept=".jpg, .jpeg"
          onChange={onChange}
      />
    </label>
  )
}

export default ImageInput