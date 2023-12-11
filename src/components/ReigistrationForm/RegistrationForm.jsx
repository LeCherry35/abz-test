import React, { useEffect, useState } from 'react';
import Input from '../Input';
import RadioInput from '../RadioInput';
import Button from '../Button';
import ImageInput from '../ImageInput';
import Loader from '../Loader';
import successImage from '../../img/success-image.svg';
import Services from '../../services';
import { validateEmail, validateImage, validateName, validatePhone } from '../../helpers/validation';

const RegistrationForm = () => {

	const [ positions, setPositions ] = useState([]);
	const [ isRegistrationSuccessful, setIsRegistrationSuccessful ] = useState(false);
    
	//set variable and validation error for each input
	const [ name,setName ] = useState('');
	const [ nameError,setNameError ] = useState('');
	const [ email,setEmail ] = useState('');
	const [ emailError,setEmailError ] = useState('');
	const [ phone,setPhone ] = useState('');
	const [ phoneError,setPhoneError ] = useState('');
	const [ position_id, setPosition_id ] = useState(null);
	const [ image, setImage ] = useState(null);
	const [imageError, setImageError] = useState(null);

	const [ isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchPositions();
	},[]);

	const register = async e => {

		e.preventDefault();
		if(await validate()){ //validtion

			setIsLoading(true);
			setError(null);

			//packing FormData
			const data = new FormData();
			data.append('name',name);
			data.append('email',email);
			data.append('phone',phone);
			data.append('position_id',position_id);
			data.append('photo',image);

			try {

				const tokenRes = await Services.getToken();
				const res = await Services.registerUser(tokenRes.data.token, data);
				if (res.data.success) {
					setIsRegistrationSuccessful(true);
				}

			} catch(e) {

				const errorMessage = e instanceof Error ? e.message : 'Unknown Error';
				console.log(errorMessage);
				setError(errorMessage);
          
			} finally {

				setIsLoading(false);

			}
		}
	};  

	const fetchPositions = async () => {
		// setIsLoading(true)
		setError(null);

		try {

			const res = await Services.getPositions();
			setPositions(res.data.positions);

		} catch(e) {

			const errorMessage = e instanceof Error ? e.message : 'Unknown Error';
			console.log(errorMessage);
			setError(errorMessage);

		} finally {

			// setIsLoading(false)
        
		}
	};

    

	//validation function

	const validate = async () => {
		let validated = true;

		//validate name
		const nameValidationError = validateName(name);
		setNameError(nameValidationError);
		if(nameValidationError) validated = false;

		//validate email
		const emailValidationError = validateEmail(email);
		setEmailError(emailValidationError);
		if (emailValidationError) validated = false;

		//validate phone
		const phoneValidationError = validatePhone(phone);
		setPhoneError(phoneValidationError);
		if (phoneValidationError) validated = false;

		//validate image
		const imageValidationError = await validateImage(image);
		setImageError(imageValidationError);
		if (imageValidationError) validated = false;


		return validated;
	};
	if (isRegistrationSuccessful) {
		return (
			<div className='ssuccesful-refistration-screen container'>
				<h2 className='heading'>User successfully registered</h2>
				<img src={successImage} alt='Registration is successfull'/>
			</div>
		);
	} else {
		return (
			<form className='registration-form container'>
				<h2 className='heading'>Working with POST request</h2>
				<Input placeholder='Your name' value={name} onChange={e => setName(e.target.value)} error={nameError}/>
				<Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} error={emailError}/>
				<Input placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} error={phoneError}/>
				<div className='registration-form__select-position-block'>
					<p className='text'>Select your position</p>
					<RadioInput options={positions} setSelected={setPosition_id}/>
				</div>
				<ImageInput onChange={e => setImage(e.target.files[0])} imageName={image?.name} error={imageError}/>
				{isLoading ? <Loader/> : <Button name='Sign up' onClick={register} disabled={!(name && email && phone && position_id && image)}/>}
			</form>
		);}  
};

export default RegistrationForm;