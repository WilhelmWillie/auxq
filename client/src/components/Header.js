import React from 'react';

import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <div className='container text-center'>
        <a href={'/'}>
          <img src={'/auxq_logo.svg'} alt={'auxQ'} className='logo'/>
        </a>

        <p className='lead'>Crowdsourcing the aux cord</p> 
      </div>
    </header>
  );
};

export default Header;