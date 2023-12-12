import React, { useEffect, useState } from 'react';
import Input from '../Input';
import RadioInput from '../RadioInput';
import Button from '../Button';
import ImageInput from '../ImageInput';
import Loader from '../Loader';
import successImage from '../../img/success-image.svg';
import Services from '../../services';
import Validation from '../../helpers/validation';
import PropTypes from 'prop-types';


const RegistrationForm = ({triggerUpdate}) => {

	RegistrationForm.propTypes = {
		triggerUpdate: PropTypes.func
	};
	
	const [ positions, setPositions ] = useState([]);
	const [ isRegistrationSuccessful, setIsRegistrationSuccessful ] = useState(false);
    
	//set variable and validation error for each input

	const [ inputsData, setInputsData] = useState({email:'', phone:'', name: '', position_id: null, photo: null});
	const [inputValidationErrors, setInputsValidationError] = useState({email:'', password:'', name: '', position_id: '', photo: ''});

	const setPosition_id = (position_id) => setInputsData({...inputsData, position_id:position_id});

	const [ isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);

	useEffect(() => {
		fetchPositions();
	},[]);

	const register = async e => {
		e.preventDefault();
		
		//getting validtion errors and result
		const validationResult = await validate(inputsData);

		//if validation succesful 
		if(validationResult.validated){ 

			setIsLoading(true);
			// setError(null);

			//packing FormData
			const data = new FormData();
			const inputsEntries = Object.entries(inputsData);
			for (let entry of inputsEntries) {
				data.append(entry[0], entry[1]);
			}


			try {

				const tokenRes = await Services.getToken();
				const res = await Services.registerUser(tokenRes.data.token, data);
				if (res.data.success) {
					setIsRegistrationSuccessful(true);
					triggerUpdate();
				}

			} catch(e) {

				const errorMessage = e instanceof Error ? e.message : 'Unknown Error';
				console.log(errorMessage);
				// setError(errorMessage);
          
			} finally {

				setIsLoading(false);

			}
		} else { //if orrors occcred during validation
			setInputsValidationError(validationResult.errors);
		}
	};  

	const fetchPositions = async () => {
		setIsLoading(true);
		// setError(null);

		try {

			const res = await Services.getPositions();
			setPositions(res.data.positions);

		} catch(e) {

			const errorMessage = e instanceof Error ? e.message : 'Unknown Error';
			console.log(errorMessage);
			// setError(errorMessage);

		} finally {

			setIsLoading(false);
        
		}
	};

	//validation function

	const validate = async (inputsData) => {
		const nameValidationError = Validation.validateName(inputsData.name);
		const emailValidationError = Validation.validateEmail(inputsData.email);
		const phoneValidationError = Validation.validatePhone(inputsData.phone);
		const photoValidationError = await Validation.validateImage(inputsData.photo);
		const validated = (!nameValidationError && !emailValidationError && !phoneValidationError && !photoValidationError); 
		return { 
			validated,
			errors: {
				name: nameValidationError,
				email: emailValidationError,
				phone: phoneValidationError,
				photo: photoValidationError
			}
			
		};
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
				<Input placeholder='Your name' value={inputsData.name} onChange={e => setInputsData({...inputsData, name:e.target.value})} error={inputValidationErrors.name}/>
				<Input placeholder='Email' value={inputsData.email} onChange={e => setInputsData({...inputsData, email:e.target.value})} error={inputValidationErrors.email}/>
				<Input placeholder='Phone' value={inputsData.phone} onChange={e => setInputsData({...inputsData, phone:e.target.value})} error={inputValidationErrors.phone}/>
				<div className='registration-form__select-position-block'>
					<p className='text'>Select your position</p>
					<RadioInput options={positions} setSelected={setPosition_id}/>
				</div>
				<ImageInput onChange={e => setInputsData({...inputsData, photo: e.target.files[0]})} imageName={inputsData.photo?.name} error={inputValidationErrors.photo}/>
				{isLoading ? <Loader/> : <Button name='Sign up' onClick={register} disabled={!(inputsData.name && inputsData.email && inputsData.phone && inputsData.position_id && inputsData.photo)}/>}
			</form>
		);}  
};

export default RegistrationForm;