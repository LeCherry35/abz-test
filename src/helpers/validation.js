/* eslint-disable no-control-regex */
export default class Validation {


	static validateName = name => {
		if (!name || name?.length < 2 || name?.length > 100) return 'Name must be between 2 and 100 symbols'; 
    
		return null;
	};

	static validateEmail = email => {
		if(!(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email))) return 'Invalid email';
    
		return null;
	};

	static validatePhone = phone => {
		if(!(/^[+]{0,1}380([0-9]{9})$/.test(phone))) return 'Invalid phone Number';
    
		return null;
	};

	static validateImage =  async image => {

		//validete file size
		if(image?.size > 5*1024*1024) return 'Image size must be less than 5Mb';

		//get image data
		const fileAsDataURL = window.URL.createObjectURL(image);
		const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
			const img = new Image();
			img.onload = () => {
				resolve({
					height: img.height,
					width: img.width
				});
			};
			img.src = dataURL;
		});
		const { width, height } = await getHeightAndWidthFromDataUrl(fileAsDataURL);

		//validate image width and height
		if (width < 70 || height < 70) return 'Image must be larger than 70x70';

		return null;
	};
}