"use client"
import React from 'react';
import Header from '../_components/header/header';
import Prayertimes from '../_components/Prayertimes/prayertimes';
import Service from '../_components/ourservices/service';
import Footer from '../_components/footer/footer';


const home = () => {
  return (
    <div className='h-screen'>
     <Header/>
     <div>
      <Prayertimes/>
     </div>
     <div>
      <Service/>
     </div>
     <div>
      <Footer/>
     </div>
    </div>
  );
};

export default home;