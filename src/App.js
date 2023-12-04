import React from 'react';
import Banner from './components/Banner/Banner';
import Header from './components/Header/Header';
import ProfilesList from './components/ProfilesList/ProfilesList';

function App() {


  return (
      <div className="App">
        <Header/>
        <Banner/>
        <ProfilesList/>
      </div>
  );
}

export default App;