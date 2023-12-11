import React from 'react';
import Banner from './components/Banner';
import Header from './components/Header';
import ProfilesList from './components/ProfilesList';
import RegistrationForm from './components/ReigistrationForm';

function App() {
	return (
		<div className="App">
			<Header />
			<Banner />
			<ProfilesList />
			<RegistrationForm />
		</div>
	);
}

export default App;
