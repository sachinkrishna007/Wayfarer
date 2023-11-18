import React from 'react'
import Navbars from '../../../components/userComponents/navBar/navBar'
import Hero from '../../../components/userComponents/hero/hero'
import Destination from '../../../components/userComponents/hero/destinaion/destination'
import PopularGuides from '../../../components/userComponents/PopularGuides/popularGuides'
import Footer from '../../../components/userComponents/footer/footer'
import Loader from '../../../components/userComponents/loading'
import { useState,useEffect } from 'react'
const UserHome = () => {
   const [loading, setLoading] = useState(true);

   useEffect(()=>{
     setLoading(false);
   })
     if (loading) {
       return <Loader></Loader>;
     }
  return (
    <div>
        <Navbars />
        <Hero></Hero>
        <Destination></Destination>
        <PopularGuides></PopularGuides>
        <Footer></Footer>
    
      
    </div>
  )
}

export default UserHome
