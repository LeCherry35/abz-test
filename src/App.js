import React, { useState } from 'react';
import Banner from './components/Banner';
import Header from './components/Header';
import ProfilesList from './components/ProfilesList';
import RegistrationForm from './components/ReigistrationForm';

function App() {
	const [ updateFlag, setUpdateFlag] = useState(false);

	const triggerUpdate = () => setUpdateFlag(a => !a);
	
	return (
		<div className="App">
			<Header />
			<Banner />
			<ProfilesList updateFlag={updateFlag}/>
			<RegistrationForm triggerUpdate={triggerUpdate}/>
		</div>
	);
}

export default App;
