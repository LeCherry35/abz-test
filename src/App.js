import React from 'react';
import Banner from './components/Banner/Banner';
import Header from './components/Header/Header';
import ProfilesList from './components/ProfilesList/ProfilesList';
import RegistrationForm from './components/ReigistrationForm/RegistrationForm';

function App() {


  return (
      <div className="App">
        <Header/>
        <Banner/>
        <ProfilesList/>
        <RegistrationForm/>
      </div>
  );
}

export default App;